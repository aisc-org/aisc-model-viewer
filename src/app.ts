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
