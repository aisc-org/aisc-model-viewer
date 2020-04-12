import * as THREE from 'three'
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import modelPath from './neyland-connection.gltf'
import { Vector3 } from 'three'

// Set up the renderer
let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
let renderer = new THREE.WebGLRenderer({ antialias: true });

scene.background = new THREE.Color(0xCCCCCC)

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 0.8
renderer.outputEncoding = THREE.sRGBEncoding
document.body.appendChild(renderer.domElement)

// Controls
let controls = new OrbitControls(camera, renderer.domElement)
controls.addEventListener('change', render)
controls.update()

// Load the model
const loader = new GLTFLoader()
loader.load(modelPath, function(gltf) {
    const box = new THREE.Box3().setFromObject(gltf.scene)
    const size = box.getSize(new Vector3()).length()
    const center = box.getCenter(new Vector3())

    controls.reset()

    gltf.scene.position.x += (gltf.scene.position.x - center.x)
    gltf.scene.position.y += (gltf.scene.position.y - center.y)
    gltf.scene.position.z += (gltf.scene.position.z - center.z)

    controls.maxDistance = size*10
    camera.near = size / 100
    camera.far = size * 100
    camera.updateProjectionMatrix()

    camera.position.copy(center)
    camera.position.x += size / 2.0
    camera.position.y += size / 5.0
    camera.position.z += size / 2.0
    camera.lookAt(center)

    scene.add(gltf.scene)
    render()
})

window.addEventListener('resize', onWindowResize, false)

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function render() {
    renderer.render(scene, camera)
}
