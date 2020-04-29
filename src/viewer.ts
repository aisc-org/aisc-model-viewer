import * as THREE from 'three'
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


/**
 * Metadata wrapper around the standard GLTF object.
 *
 * @param name - The name of the model
 * @param gltf - The actual GLTF object
 */
export class Model {
    name: string
    path: string
    gltf: GLTF

    /**
     * @param name - The name to use in the sidebar for this model
     * @param path - The path to the GLTF file for this model
     */
    constructor(name: string, path: string) {
        this.name = name
        this.path = path
    }
}


export class ModelViewer {
    container: HTMLElement
    loader: GLTFLoader

    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    controls: OrbitControls

    constructor(container: HTMLElement) {
        this.container = container

        this.loader = new GLTFLoader()
        this.loader.setPath('/')

        this.scene = new THREE.Scene()
        this.addLights()
        this.camera = new THREE.PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight)

        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
        this.renderer.outputEncoding = THREE.sRGBEncoding

        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.addEventListener('change', this.render.bind(this))
        this.controls.update()

        this.container.appendChild(this.renderer.domElement)
        this.render()
    }

    setModelAsCurrent(model: Model) {
        this.clearScene()
        this.loader.load(model.path, (gltf) => {
            // Determine the size of the model, and move it to the center of the scene
            const box = new THREE.Box3().setFromObject(gltf.scene)
            const size = box.getSize(new THREE.Vector3()).length()
            const center = box.getCenter(new THREE.Vector3())

            gltf.scene.position.x += (gltf.scene.position.x - center.x)
            gltf.scene.position.y += (gltf.scene.position.y - center.y)
            gltf.scene.position.z += (gltf.scene.position.z - center.z)

            this.controls.reset()
            this.controls.maxDistance = size*10
            this.camera.near = size / 100
            this.camera.far = size * 100
            this.camera.updateProjectionMatrix()

            this.camera.position.copy(center)
            this.camera.position.x += size / 2.0
            this.camera.position.y += size / 5.0
            this.camera.position.z += size / 2.0
            this.camera.lookAt(center)

            this.scene.add(gltf.scene)
        })
        this.render()
    }

    addLights() {
        const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5)
        const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.5)
        directionalLight.position.set(1, 1, 1)

        this.scene.add(ambientLight, directionalLight)
    }

    clearScene() {
        this.scene.traverse(function (child) {
        })
    }

    onWindowResize() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
        this.render()
    }

    render() {
        this.renderer.render(this.scene, this.camera)
    }
}
