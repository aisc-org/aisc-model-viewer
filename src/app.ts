import { ModelViewer } from './viewer'
import './app-style.css'
import './assets/house-white.svg'

export class App {
    children: Array<any>
    viewer: ModelViewer

    constructor(children: Array<any>) {
        this.children = children

        const container = document.createElement('div')
        container.className = 'viewer-container'
        document.body.appendChild(container)

        this.viewer = new ModelViewer(container)
        window.addEventListener('resize', this.viewer.onWindowResize.bind(this.viewer), false)
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
        button.onclick = () => {app.viewer.setModelAsCurrent(this.path)}

        listitem.appendChild(button)
        list.appendChild(listitem)
    }
}
