import { ModelViewer } from './viewer'
import './app.css'
import './assets/house-white.svg'
import './assets/hamburger-menu-white.svg'

export class App {
    groups: Array<SidebarGroup>
    content_container: HTMLElement
    current_content: HTMLElement
    viewer: ModelViewer
    sidebar_is_open: Boolean = true

    constructor(params: {title: string, groups: Array<SidebarGroup>}) {
        this.groups = params.groups;

        // Set up the viewer
        this.content_container = document.getElementById('content-container')
        this.viewer = new ModelViewer(this.content_container)
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

                    // The first model encountered is used as the default.
                    if (item instanceof Model && !defaultModelHasBeenSet) {
                        this.viewer.setModelAsCurrent(item.path)
                        this.setCurrentContent(this.viewer.renderer.domElement)
                        defaultModelHasBeenSet = true
                    }
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
                this.content_container.style.width = '100%'
            } else {
                sidebar.style.visibility = 'visible'
                this.content_container.style.width = 'calc(100% - 250px)'
            }
            this.sidebar_is_open = !this.sidebar_is_open
            resize_viewer()
        }
    }

    setCurrentContent(content: HTMLElement) {
        if (this.current_content != null) {
            this.content_container.removeChild(this.current_content)
        }
        this.current_content = content
        this.content_container.appendChild(this.current_content)
    }
}


abstract class SidebarItem {
    name: string

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
        super()
        this.name = params.name
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

    constructor(params: {name: string, url: string}) {
        super()
        this.name = params.name
        this.url = params.url
    }

    createItem(app: App, list: HTMLUListElement) {
        const listitem = document.createElement('li')
        const button = document.createElement('button')
        button.className = 'button-load-html'
        button.innerHTML = this.name
        button.onclick = async () => {
            const responseDiv = document.createElement('div')
            responseDiv.className = 'html-content'
            responseDiv.innerHTML = 'Loading...'
            app.setCurrentContent(responseDiv);
            fetch(this.url).then(response => {
                return response.text()
            }).then(text => {
                responseDiv.innerHTML = text
                return (window as any).MathJax.typesetPromise() as Promise<any>
            }).catch(err => {
                console.log('Typesetting failed:')
                console.log(err)
            })
            app.content_container.style.overflowY = 'scroll'
        }
        listitem.appendChild(button)
        list.appendChild(listitem)
    }
}


export class Model extends SidebarItem {
    path: string

    constructor(params: {name: string, path: string}) {
        super()
        this.name = params.name
        this.path = params.path
    }

    createItem(app: App, list: HTMLUListElement) {
        const listitem = document.createElement('li')
        const button = document.createElement('button')
        button.className = 'button-use-model'
        button.innerHTML = this.name
        button.onclick = () => {
            app.setCurrentContent(app.viewer.renderer.domElement)
            app.content_container.style.overflowY = 'hidden'
            app.viewer.setModelAsCurrent(this.path)
        }

        listitem.appendChild(button)
        list.appendChild(listitem)
    }
}
