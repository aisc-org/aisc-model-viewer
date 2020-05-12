import { ModelViewer } from './viewer'
import './app.css'
import './assets/house-white.svg'
import './assets/hamburger-menu-white.svg'


export class App {
    groups: Array<SidebarGroup>
    contentLinkMap: Map<string, SidebarItem>
    contentScrollState: Map<string, number>
    contentContainer: HTMLElement
    currentElement: HTMLElement
    currentContent: string
    viewer: ModelViewer
    sidebar_is_open: Boolean = true

    constructor(params: {title: string, groups: Array<SidebarGroup>}) {
        this.groups = params.groups;
        this.contentLinkMap = new Map<string, SidebarItem>()
        this.contentScrollState = new Map<string, number>()

        // Set up the viewer
        this.contentContainer = document.getElementById('content-container')
        this.viewer = new ModelViewer(this.contentContainer)
        const resize_viewer = this.viewer.onWindowResize.bind(this.viewer)
        window.addEventListener('resize', resize_viewer, false)
        const header_title = document.getElementById('header-title')
        header_title.innerHTML = params.title

        // Set up the sidebar
        const sidebar = document.getElementById('sidebar')
        let defaultModelHasBeenSet = false
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

        // Toggling of sidebar
        const sidebar_toggle = document.getElementById('sidebar-toggle')
        sidebar_toggle.onclick = () => {
            if (this.sidebar_is_open) {
                sidebar.style.visibility = 'hidden'
                this.contentContainer.style.width = '100%'
            } else {
                sidebar.style.visibility = 'visible'
                this.contentContainer.style.width = 'calc(100% - 250px)'
            }
            this.sidebar_is_open = !this.sidebar_is_open
            resize_viewer()
        }

        // If an item has been specified by the hash, go there
        const onhashchange = async () => {
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
        window.addEventListener('hashchange', onhashchange)
        onhashchange()
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
    items?: Array<SidebarItem>
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
            app.contentContainer.style.overflowY = 'scroll'
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
            app.contentContainer.style.overflowY = 'hidden'
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
