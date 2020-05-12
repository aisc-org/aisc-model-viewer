import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { siteRoot } from './utils'


const colors = {
    orange:   new THREE.Color('#FF8200'),
    white:    new THREE.Color('#FFFFFF'),
    smokey:   new THREE.Color('#58595B'),
    valley:   new THREE.Color('#00746F'),
    globe:    new THREE.Color('#006C93'),
    smokey_x: new THREE.Color('#333333'),
    gray_1:   new THREE.Color('#F6F6F6'),
    gray_2:   new THREE.Color('#E0E0E0'),
    gray_3:   new THREE.Color('#CACACA'),
    gray_4:   new THREE.Color('#B6B6B6'),
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

        const draco = new DRACOLoader()
        draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
        this.loader = new GLTFLoader()
        this.loader.setPath(siteRoot)
        this.loader.setDRACOLoader(draco)

        this.scene = new THREE.Scene()
        this.scene.background = colors.gray_3
        this.addLights()
        this.camera = new THREE.PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight)

        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
        this.renderer.outputEncoding = THREE.sRGBEncoding

        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.addEventListener('change', this.render.bind(this))
        this.controls.update()

        this.render()
    }

    setModelAsCurrent(path: string) {
        this.clearScene()
        this.loader.load(path, (gltf) => {
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
            this.controls.update()
        })
        this.onWindowResize()
    }

    addLights() {
        const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5)
        const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.5)
        directionalLight.position.set(1, 1, 1)

        this.scene.add(ambientLight, directionalLight)
    }

    clearScene() {
        this.scene.traverse(child => {
            if (child instanceof THREE.Group) {
                this.scene.remove(child)
            }
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
