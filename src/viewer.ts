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
    black:    new THREE.Color('#000000'),
}


interface ModelViewerOptions {
    wireframeColor?: string | number | THREE.Color
    backgroundColor?: string | number | THREE.Color
    renderEdges?: Boolean
}


export class ModelViewer {
    container: HTMLElement
    loader: GLTFLoader

    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    controls: OrbitControls

    wireframeColor: THREE.Color = colors.black
    backgroundColor: THREE.Color = colors.gray_4
    renderEdges: Boolean = true

    constructor(container: HTMLElement, options: ModelViewerOptions = {}) {
        this.container = container
        if (options.backgroundColor !== undefined)
            this.backgroundColor = new THREE.Color(options.backgroundColor)
        if (options.wireframeColor !== undefined)
            this.wireframeColor = new THREE.Color(options.wireframeColor)
        if (options.renderEdges !== undefined)
            this.renderEdges = options.renderEdges

        const draco = new DRACOLoader()
        draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
        this.loader = new GLTFLoader()
        this.loader.setPath(siteRoot)
        this.loader.setDRACOLoader(draco)

        this.scene = new THREE.Scene()
        this.scene.background = this.backgroundColor
        this.addLights()
        this.camera = new THREE.PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight)

        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
        this.renderer.outputEncoding = THREE.sRGBEncoding

        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.addEventListener('change', this.render.bind(this))
        this.controls.update()

        matchMedia(`resolution: ${window.devicePixelRatio}dppx`).addListener(this.updatePixelRatio.bind(this))

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

            if (this.renderEdges) {
                this.addWireframeToGroup(gltf.scene)
            }

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
        const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.0)
        this.scene.add(ambientLight)
    }

    addWireframeToGroup(group: THREE.Group) {
        const wireMaterial = new THREE.LineBasicMaterial({
            color: this.wireframeColor,
            linewidth: 2
        })
        // For each material, turn on polygonOffset. This very slightly
        // moves the surface to prevent z-fighting with the wireframe. Store
        // (and check for) materials we've already updated.
        const updatedMaterials: THREE.Material[] = []
        const setPolygonOffset = (material: THREE.Material) => {
            if (!updatedMaterials.includes(material)) {
                console.log('Updating material...')
                material.polygonOffset = true
                material.polygonOffsetFactor = 1
                material.polygonOffsetUnits = 1
                material.needsUpdate = true
                updatedMaterials.push(material)
            }
        }
        group.traverse(element => {
            if (element instanceof THREE.Mesh) {
                if (element.material instanceof THREE.Material) {
                    setPolygonOffset(element.material)
                } else {
                    element.material.forEach(setPolygonOffset)
                }
                // Create the wireframe from the mesh geometry.
                console.log('Adding wireframe to mesh...')
                let wireGeometry = new THREE.EdgesGeometry(element.geometry)
                let wireframe = new THREE.LineSegments(wireGeometry, wireMaterial)
                element.add(wireframe)
            }
        });
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

    updatePixelRatio() {
        this.renderer.setPixelRatio(window.devicePixelRatio)
    }

    render() {
        this.renderer.render(this.scene, this.camera)
    }
}
