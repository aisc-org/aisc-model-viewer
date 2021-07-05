import * as THREE from 'three'
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GUI } from 'dat.gui'
import { siteRoot } from './utils'


const colors = {
    aisc_blue: new THREE.Color('#00558A'),
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


interface MorphedAttributes {
    positionAttribute: THREE.Float32BufferAttribute
    normalAttribute: THREE.Float32BufferAttribute
    morphedPositionAttribute: THREE.Float32BufferAttribute
    morphedNormalAttribute: THREE.Float32BufferAttribute
}


function getMorphedGeometry(mesh: THREE.Mesh) {
    const attributes = BufferGeometryUtils.computeMorphedAttributes(mesh) as MorphedAttributes

    const morphed = new THREE.BufferGeometry()
    morphed.setAttribute('position', attributes.morphedPositionAttribute)
    morphed.setAttribute('normal', attributes.morphedNormalAttribute)
    morphed.setIndex(mesh.geometry.index)

    morphed.morphTargetsRelative = mesh.geometry.morphTargetsRelative

    return morphed
}


interface WireframeOptions {
    useMorphed?: boolean
    useWireframe?: boolean
}


export class ModelViewer {
    container: HTMLElement
    loader: GLTFLoader

    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    controls: OrbitControls
    loadingSpinner?: HTMLDivElement
    gui?: GUI
    titleBlock?: TitleBlock

    wireframeColor: THREE.Color = colors.black
    backgroundColor: THREE.Color = colors.aisc_blue

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
        this.camera = new THREE.PerspectiveCamera(75)
        this.addLights()
        this.scene.add(this.camera)

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

    destroyContent() {
        this.destroyGUI()
        this.titleBlock?.destroy()
        this.titleBlock = undefined
    }

    attachToContainer(container: HTMLElement) {
        this.resizeObserver.disconnect()
        this.container = container
        this.resizeObserver.observe(this.container, { attributeFilter: ['style'], childList: true })
        this.updateCanvasSize()
    }

    setModelAsCurrent(name: string, desc: string, path: string, center = true, maxScale = 25.0, title?: string) {
        this.clearScene()
        this.addLoadingSpinner()
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

            let morphableMeshes: THREE.Mesh[] = []
            gltf.scene.traverse(element => {
                if (element instanceof THREE.Mesh && element.morphTargetInfluences?.length) {
                    morphableMeshes.push(element)
                }
            })
            if (morphableMeshes.length > 0) {
                this.updateGUI(morphableMeshes, maxScale)
            }

            if (this.renderEdges) {
                this.addWireframeToGroup(gltf.scene, { useMorphed: true })
            }

            this.controls.update()
            this.removeLoadingSpinner()
        })
        this.updateCanvasSize()

        if (this.titleBlock === undefined) {
            this.titleBlock = new TitleBlock()
            this.container.appendChild(this.titleBlock.domElement)
        }
        this.titleBlock.update(title ? title : name, desc)
    }

    addLoadingSpinner() {
        if (this.loadingSpinner !== undefined) {
            this.loadingSpinner.style.visibility = 'visible'
            return
        }

        this.loadingSpinner = document.createElement('div')
        this.loadingSpinner.appendChild(document.createElement('div'))
        this.loadingSpinner.appendChild(document.createElement('div'))
        this.loadingSpinner.appendChild(document.createElement('div'))
        this.loadingSpinner.className = 'loading-spinner'
        this.container.appendChild(this.loadingSpinner)
    }

    removeLoadingSpinner() {
        if (this.loadingSpinner === undefined)
            return

        this.loadingSpinner.style.visibility = 'hidden'
    }

    addGUI() {
        this.destroyGUI()
        this.gui = new GUI({ autoPlace: false, closeOnTop: true,  })

        let guiContainer = document.getElementById('gui-wrapper') as HTMLDivElement | null
        if (guiContainer === null) {
            guiContainer = document.createElement('div')
            guiContainer.id = 'gui-wrapper'
            this.container.appendChild(guiContainer)
        }
        guiContainer.appendChild(this.gui.domElement)

        return this.gui
    }

    updateGUI(morphMeshes: THREE.Mesh[], maxScale = 25.0) {
        const gui = this.gui ? this.gui : this.addGUI()
        const params = {
            Scale: 0.5*maxScale,
        }

        gui.__controllers.forEach(controller => {
            gui.remove(controller)
        })

        const updateScale = (scale: number) => {
            morphMeshes.forEach(mesh => {
                if (mesh.morphTargetInfluences?.length){
                    mesh.morphTargetInfluences.forEach((_, index, mti) => {
                        mti[index] = scale
                    })
                    if (this.renderEdges) {
                        this.updateWireframe(mesh, { useMorphed: true })
                    }
                }
            })
            this.render()
        }

        gui.add(params, 'Scale', 0, maxScale, 0.01).onChange(updateScale)
        updateScale(params.Scale)
    }

    destroyGUI() {
        if (this.gui !== undefined) {
            this.gui.domElement.remove()
            this.gui.destroy()
            this.gui = undefined
        }
    }

    addLights() {
        const ambient = new THREE.AmbientLight(0xFFFFFF, 0.35)
        const directional = new THREE.DirectionalLight(0xFFFFFF, 0.65)
        directional.position.set(1, 1, 0)

        this.camera.add(ambient, directional)
    }

    addWireframeToGroup(group: THREE.Group, options?: WireframeOptions) {
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
                this.updateWireframe(element, options)
            }
        });
    }

    /**
     * Remove any existing wireframe(s) from a mesh.
     * 
     * @param mesh The mesh to remove wireframe(s) from.
     */
    removeWireframe(mesh: THREE.Mesh) {
        mesh.children.forEach(child => {
            if (child instanceof THREE.LineSegments) {
                mesh.remove(child)
            }
        })
    }

    /**
     * Update the wireframe for a given mesh.
     * 
     * @param mesh The mesh to add a wireframe to.
     * @param useMorphed If true, use the morphed geometry to create the edges. Buggy. Default: false
     * @param useWireframe If true, use WireframeGeometry instead of EdgesGeometry.
     */
    updateWireframe(mesh: THREE.Mesh, options?: WireframeOptions) {
        console.log('Updating wireframe for mesh ', mesh)

        // Remove the previous wireframe(s)
        this.removeWireframe(mesh)

        const wireMaterial = new THREE.LineBasicMaterial({
            color: this.wireframeColor,
            linewidth: 1.5,
        })

        const geometry = options?.useMorphed
            ? getMorphedGeometry(mesh)
            : mesh.geometry

        const wireGeometry = options?.useWireframe 
            ? new THREE.WireframeGeometry(geometry)
            : new THREE.EdgesGeometry(geometry, this.edgeThresholdAngle)

        const wireframe = new THREE.LineSegments(wireGeometry, wireMaterial)
        mesh.add(wireframe)
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
            // Fire twice; fixes issue where scrollbars leave blank edges around
            // the canvas.
            this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
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


class TitleBlock {
    domElement: HTMLDivElement
    private nameElement: HTMLHeadElement
    private descElement: HTMLParagraphElement

    constructor() {
        this.domElement = document.createElement('div')
        this.domElement.id = 'model-title'

        this.nameElement = document.createElement('h2')
        this.nameElement.id = 'model-name'
        this.descElement = document.createElement('p')
        this.descElement.id = 'model-desc'

        this.domElement.appendChild(this.nameElement)
        this.domElement.appendChild(this.descElement)
    }

    update(name: string, desc: string = "") {
        this.nameElement.innerText = name
        this.descElement.innerHTML = desc
    }

    destroy() {
        this.domElement.remove()
    }
}
