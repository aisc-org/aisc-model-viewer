import { ModelViewer } from './viewer'
import './app.css'
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
    viewer: ModelViewer
    sidebarIsOpen: Boolean = true
    contentSizingMode: DisplayMode = DisplayMode.Landscape

    constructor(params: {title: string, groups: SidebarGroup[]}) {
        this.groups = params.groups;
        this.contentLinkMap = new Map<string, SidebarItem>()
        this.contentScrollState = new Map<string, number>()

        // Set up the viewer
        this.contentContainer = document.getElementById('content-container') as HTMLDivElement
        this.viewer = new ModelViewer(this.contentContainer)
        const resizeViewer = this.viewer.onWindowResize.bind(this.viewer)
        window.addEventListener('resize', resizeViewer, false)
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
                    item.createItem(this, list)
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
            resizeViewer()
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
            if (linkname in this.contentLinkMap) {
                // Save scroll position
                if (this.currentElement) {
                    console.log('Saving', this.currentContent, 'scroll position as', this.contentContainer.scrollTop)
                    this.contentScrollState[this.currentContent] = this.contentContainer.scrollTop
                }

                const item = this.contentLinkMap[linkname]
                await item.onclick(this)
                this.currentContent = linkname
                console.log(linkname, 'loaded;', 'The current scroll position is', this.contentContainer.scrollTop)

                // Restore scroll position
                const scrollPosition = this.contentScrollState[linkname]
                if (scrollPosition) {
                    console.log('Restoring', linkname, 'to scroll position', scrollPosition)
                    this.contentContainer.scrollBy(scrollPosition, scrollPosition)
                    console.log(linkname, 'restored;', 'The current scroll position is', this.contentContainer.scrollTop)
                }
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


abstract class SidebarItem {
    name: string
    linkname: string
    onclick?: (app: App) => void;

    constructor(name: string) {
        this.name = name
        this.linkname = name.replace(/\s/g, '-')
    }

    /**
     * Create the item in the given section.
     * @param app - The parent application.
     * @param list - the list element to insert the item into.
     */
    createItem(app: App, list: HTMLUListElement) {}
}


export interface SidebarGroup {
    name: string
    items?: SidebarItem[]
}


export class Link extends SidebarItem {
    url: string

    constructor(params: {name: string, url: string}) {
        super(params.name)
        this.url = params.url
    }

    createItem(app: App, list: HTMLUListElement) {
        const listitem = document.createElement('li')
        const anchor = document.createElement('a')
        anchor.href = this.url
        anchor.innerHTML = this.name
        listitem.appendChild(anchor)
        list.appendChild(listitem)
    }
}


export class HtmlItem extends SidebarItem {
    url: string
    fetchedContent: string

    constructor(params: {name: string, url: string}) {
        super(params.name)
        this.url = params.url
        this.onclick = async (app) => {
            const responseDiv = document.createElement('div')
            responseDiv.className = 'html-content'
            app.setContentElement(responseDiv);
            if (this.fetchedContent) {
                responseDiv.innerHTML = this.fetchedContent
            } else {
                responseDiv.innerHTML = 'Loading...'
                await fetch(this.url).then(response => {
                    return response.text()
                }).then(text => {
                    this.fetchedContent = text
                    responseDiv.innerHTML = text
                })
            }
            (window as any).MathJax.typesetPromise([responseDiv])
        }
    }

    createItem(app: App, list: HTMLUListElement) {
        const listitem = document.createElement('li')
        const anchor = document.createElement('a')
        anchor.href = `#${this.linkname}`
        anchor.innerHTML = this.name
        listitem.appendChild(anchor)
        list.appendChild(listitem)
    }
}


export class Model extends SidebarItem {
    path: string

    constructor(params: {name: string, path: string}) {
        super(params.name)
        this.path = params.path
        this.onclick = (app) => {
            app.setContentElement(app.viewer.renderer.domElement)
            app.viewer.setModelAsCurrent(this.path)
        }
    }

    createItem(app: App, list: HTMLUListElement) {
        const listitem = document.createElement('li')
        const anchor = document.createElement('a')
        anchor.href = `#${this.linkname}`
        anchor.innerHTML = this.name
        listitem.appendChild(anchor)
        list.appendChild(listitem)
    }
}
