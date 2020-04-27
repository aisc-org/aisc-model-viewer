import { Model, ModelViewer } from './viewer'
import pathToDoubleAngle from './neyland-connection.gltf'
import './app-style.css'
import './assets/house-white.svg'

const modelList = [
    new Model('Double Angle Connection', pathToDoubleAngle)
]

// Set up the page
const container = document.createElement('div')
container.className = 'viewer-container'
document.body.appendChild(container)

const viewer = new ModelViewer(container)
viewer.setModelAsCurrent(modelList[0])

window.addEventListener('resize', viewer.onWindowResize.bind(viewer), false)
