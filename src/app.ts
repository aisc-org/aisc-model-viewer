import { ModelViewer } from './viewer'
import './style.ts'
import './assets/house-white.svg'
import './assets/hamburger-menu-white.svg'


enum DisplayMode {
    Landscape,
    Portrait
}


export class App {
    groups: SidebarGroup[]
    contentLinkMap: Map<string, SidebarItem>
    contentScrollState: Map<string, number>
    contentContainer: HTMLElement
    currentElement: HTMLElement
    currentContent: string
    sidebarIsOpen: Boolean = true
    contentSizingMode: DisplayMode = DisplayMode.Landscape

    constructor(params: { title: string, groups: SidebarGroup[] }) {
        this.groups = params.groups;
        this.contentLinkMap = new Map<string, SidebarItem>()
        this.contentScrollState = new Map<string, number>()

        // Set up the viewer
        this.contentContainer = document.getElementById('content-container') as HTMLDivElement
        const headerTitle = document.getElementById('header-title') as HTMLHeadingElement
        headerTitle.innerHTML = params.title

        // Set up the sidebar
        const sidebar = document.getElementById('sidebar') as HTMLElement
        params.groups.forEach((group, index) => {
            // Each group corresponds to a section in the sidebar.
            let section = document.createElement('section')
            section.id = 'sidebar.section.' + group.name.replace(/\s/g, '_')

            // Each section consists of an <h2> header and a list of items.
            let header = document.createElement('h2')
            let list = document.createElement('ul')
            header.innerHTML = group.name
            section.appendChild(header)
            section.appendChild(list)

            // If the group has items, append each item to the list.
            if (group.items != null) {
                group.items.forEach(item => {
                    list.appendChild(item.createItem())
                    this.contentLinkMap[item.linkname] = item
                })
            }

            sidebar.appendChild(section)
            // Sections are separated by <hr>s. But we don't add a rule after
            // the last group.
            if (index !== params.groups.length - 1) {
                sidebar.appendChild(document.createElement('hr'))
            }
        })

        // Responsive content sizing
        // On portrait displays, we want the content to extend under the sidebar
        // even when its open.
        const updateDisplayMode = () => {
            if (window.innerWidth < window.innerHeight && this.contentSizingMode === DisplayMode.Landscape) {
                this.contentSizingMode = DisplayMode.Portrait
                if (this.sidebarIsOpen) {
                    this.contentContainer.style.width = '100%'
                }
            } else if (window.innerWidth > window.innerHeight && this.contentSizingMode === DisplayMode.Portrait) {
                this.contentSizingMode = DisplayMode.Landscape
                if (this.sidebarIsOpen) {
                    this.contentContainer.style.width = 'calc(100% - 250px)'
                }
            }
        }
        window.addEventListener('resize', updateDisplayMode)
        updateDisplayMode()

        // Toggling of sidebar
        const sidebarToggle = document.getElementById('sidebar-toggle') as HTMLButtonElement
        const toggleSidebar = () => {
            if (this.sidebarIsOpen) {
                sidebar.style.visibility = 'hidden'
                if (this.contentSizingMode === DisplayMode.Landscape)
                    this.contentContainer.style.width = '100%'
            } else {
                sidebar.style.visibility = 'visible'
                if (this.contentSizingMode === DisplayMode.Landscape)
                    this.contentContainer.style.width = 'calc(100% - 250px)'
            }
            this.sidebarIsOpen = !this.sidebarIsOpen
        }
        sidebarToggle.onclick = toggleSidebar

        // If starting in portrait mode, hide the sidebar
        if (this.contentSizingMode === DisplayMode.Portrait) {
            toggleSidebar()
        }

        // The current content item is specified by the hash. setCurrentContent
        // handles:
        // - saving/restoring the scroll state
        // - calling the 'onclick' method of the activated item
        //
        const setCurrentContent = async () => {
            const linkname = window.location.hash.substr(1)
            const item: SidebarItem = this.contentLinkMap[linkname]
            if (linkname in this.contentLinkMap) {
                await item.createContent(this.contentContainer).then(content => {
                    // Save scroll position
                    if (this.currentElement) {
                        console.log('Saving', this.currentContent, 'scroll position as', this.contentContainer.scrollTop)
                        this.contentScrollState[this.currentContent] = this.contentContainer.scrollTop
                    }

                    // Set up content element
                    this.setContentElement(content)
                    this.currentContent = linkname
                    console.log(linkname, 'loaded;', 'The current scroll position is', this.contentContainer.scrollTop)

                    // Restore scroll position
                    const scrollPosition = this.contentScrollState[linkname]
                    if (scrollPosition) {
                        console.log('Restoring', linkname, 'to scroll position', scrollPosition)
                        this.contentContainer.scrollBy(scrollPosition, scrollPosition)
                        console.log(linkname, 'restored;', 'The current scroll position is', this.contentContainer.scrollTop)
                    }
                }, error => {
                    if (error instanceof NoContentError) {
                        /* No content, no problem */
                    } else {
                        console.error(error)
                    }
                })
            }
        }
        window.addEventListener('hashchange', setCurrentContent)
        setCurrentContent()
    }

    setContentElement(content: HTMLElement) {
        if (this.currentElement != null) {
            this.contentContainer.removeChild(this.currentElement)
        }
        this.currentElement = content
        this.contentContainer.appendChild(this.currentElement)
    }
}


class NoContentError extends Error { }


abstract class SidebarItem {
    name: string
    linkname: string

    constructor(name: string) {
        this.name = name
        this.linkname = name.replace(/\s/g, '-')
    }

    /**
     * Create the list item that will be added to the sidebar.
     * @returns listitem - the created HTMLLIElement
     */
    abstract createItem(): HTMLLIElement

    /**
     * Create the content element that will be displayed.
     * 
     * @param contentContainer - the parent HTMLElement, provided by the running
     *                           App instance.
     * @returns Promise&lt;HTMLElement&gt; - the created HTMLElement. The App will handle
     *                           adding this to the page.
     */
    async createContent(contentContainer: HTMLElement): Promise<HTMLElement> {
        return Promise.reject(new NoContentError)
    }
}


export interface SidebarGroup {
    name: string
    items?: SidebarItem[]
}


export class Link extends SidebarItem {
    url: string

    constructor(params: { name: string, url: string }) {
        super(params.name)
        this.url = params.url
    }

    createItem(): HTMLLIElement {
        const listitem = document.createElement('li')
        const anchor = document.createElement('a')
        anchor.href = this.url
        anchor.innerHTML = this.name

        // Open link in new tab/window
        anchor.target = '_blank'
        anchor.rel = 'noreferrer noopener'

        listitem.appendChild(anchor)
        return listitem
    }
}


export class HtmlItem extends SidebarItem {
    content: string
    fetchedContent: string

    constructor(params: { name: string, content: string }) {
        super(params.name)
        this.content = params.content
    }

    async createContent(contentContainer: HTMLElement): Promise<HTMLDivElement> {
        const contentDiv = document.createElement('div')
        contentDiv.className = 'html-content'
        contentDiv.innerHTML = this.content
        await (window as any).MathJax.typesetPromise([contentDiv])
        return Promise.resolve(contentDiv)
    }

    createItem(): HTMLLIElement {
        const listitem = document.createElement('li')
        const anchor = document.createElement('a')
        anchor.href = `#${this.linkname}`
        anchor.innerHTML = this.name
        listitem.appendChild(anchor)
        return listitem
    }
}


export class Model extends SidebarItem {
    path: string
    static viewer: ModelViewer

    constructor(params: { name: string, path: string }) {
        super(params.name)
        this.path = params.path
        if (Model.viewer === undefined) {
            Model.viewer = new ModelViewer()
        }
    }

    async createContent(contentContainer: HTMLElement): Promise<HTMLCanvasElement> {
        Model.viewer.attachToContainer(contentContainer)
        Model.viewer.setModelAsCurrent(this.path)
        return Model.viewer.renderer.domElement
    }

    createItem() {
        const listitem = document.createElement('li')
        const anchor = document.createElement('a')
        anchor.href = `#${this.linkname}`
        anchor.innerHTML = this.name
        listitem.appendChild(anchor)
        return listitem
    }
}
