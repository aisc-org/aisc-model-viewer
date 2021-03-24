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


export class ModelViewer {
    container: HTMLElement
    loader: GLTFLoader

    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    controls: OrbitControls

    wireframeColor: THREE.Color = colors.black
    backgroundColor: THREE.Color = colors.gray_4

    // Whether to render edges as lines in the model.
    renderEdges: Boolean = true

    // Controls whether the EdgesGeometry used for the outline draws the edge.
    // If the angle between the adjacent normals exceeds the threshold, the edge
    // is drawn. Use a fairly high threshold angle -- 20 degrees -- so that
    // edges don't show up on curved surfaces.
    edgeThresholdAngle: number = 20

    // Observer that watches for window resizes, and updates the canvas size to
    // match.
    private resizeObserver: MutationObserver

    constructor() {
        const draco = new DRACOLoader()
        draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
        this.loader = new GLTFLoader()
        this.loader.setPath(siteRoot)
        this.loader.setDRACOLoader(draco)

        this.scene = new THREE.Scene()
        this.scene.background = this.backgroundColor
        this.addLights()
        this.camera = new THREE.PerspectiveCamera(75)

        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.outputEncoding = THREE.sRGBEncoding

        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.addEventListener('change', this.render.bind(this))
        this.controls.update()

        matchMedia(`resolution: ${window.devicePixelRatio}dppx`).addListener(this.updatePixelRatio.bind(this))

        const resizeCallback = this.updateCanvasSize.bind(this)
        this.resizeObserver = new MutationObserver(resizeCallback)
        window.addEventListener('resize', resizeCallback)

        // Add viewer as global variable for console access
        ;(window as any).modelViewer = this
    }

    attachToContainer(container: HTMLElement) {
        this.resizeObserver.disconnect()
        this.container = container
        this.resizeObserver.observe(this.container, { attributeFilter: ['style'], childList: true })
        this.updateCanvasSize()
    }

    setModelAsCurrent(path: string, center = true) {
        this.clearScene()
        this.loader.load(path, (gltf) => {
            const box = new THREE.Box3().setFromObject(gltf.scene)
            const size = box.getSize(new THREE.Vector3()).length()
            const theCenter = new THREE.Vector3()
            if (center) {
                // Determine the size of the model, and move it to the center of the scene
                box.getCenter(theCenter)
                gltf.scene.position.x += (gltf.scene.position.x - theCenter.x)
                gltf.scene.position.y += (gltf.scene.position.y - theCenter.y)
                gltf.scene.position.z += (gltf.scene.position.z - theCenter.z)
            } else {
                theCenter.copy(gltf.scene.position)
            }

            if (this.renderEdges) {
                this.addWireframeToGroup(gltf.scene)
            }

            this.controls.reset()
            this.controls.maxDistance = size*10
            this.camera.near = size / 100
            this.camera.far = size * 100
            this.camera.updateProjectionMatrix()

            this.camera.position.copy(theCenter)
            this.camera.position.x += size / 2.0
            this.camera.position.y += size / 5.0
            this.camera.position.z += size / 2.0
            this.camera.lookAt(theCenter)

            this.scene.add(gltf.scene)
            this.controls.update()
        })
        this.updateCanvasSize()
    }

    addLights() {
        const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.95)
        const directionalLightUp = new THREE.DirectionalLight(0xFFFFFF, 0.35)
        directionalLightUp.position.set(0, -1, 0);
        const directionalLightDn = new THREE.DirectionalLight(0xFFFFFF, 0.35)
        this.scene.add(ambientLight, directionalLightUp, directionalLightDn)
    }

    addWireframeToGroup(group: THREE.Group) {
        const wireMaterial = new THREE.LineBasicMaterial({
            color: this.wireframeColor,
            linewidth: 1.5,
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
                let wireGeometry = new THREE.EdgesGeometry(element.geometry, this.edgeThresholdAngle)
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

    updateCanvasSize() {
        if (this.container !== undefined) {
            console.log('Updating canvas size...')
            this.camera.aspect = this.container.clientWidth / this.container.clientHeight
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
            this.render()
        }
    }

    updatePixelRatio() {
        this.renderer.setPixelRatio(window.devicePixelRatio)
    }

    render() {
        this.renderer.render(this.scene, this.camera)
    }
}
