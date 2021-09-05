import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
//import torusKnot from './shapes/torusknot'

// Texture Loader
const loader = new THREE.TextureLoader()
const star = loader.load('./assets/dot2.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const torusgeometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const knotgeometry = new THREE.TorusKnotGeometry( 10/20, 3/25, 100, 16 )
const particlesgeometry = new THREE.BufferGeometry;
const particleCnt = 300;

const posArray = new Float32Array(particleCnt * 3);
/// xyz, xyz, xyz, xyz

for( let i = 0; i < particleCnt * 3; i++ ){
   // posArray[i] = Math.random()
   // posArray[i] = Math.random() - 0.5
  // posArray[i] = (Math.random() - 0.5) *5
   posArray[i] = (Math.random() - 0.5) * (Math.random() *5)


}

particlesgeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

// Materials

const material = new THREE.PointsMaterial({
    size: 0.0095,
    color: '#37C8B2'
})
const starMaterial = new THREE.PointsMaterial({
    size: 0.007,
    map: star,
    transparent: true,
    color: 'white'
})
//material.color = new THREE.Color(0x00ffff)

// Mesh
const torus = new THREE.Points(torusgeometry,material)
const torusKnot = new THREE.Points( knotgeometry, material )
const particlesMesh = new THREE.Points(particlesgeometry, starMaterial)

scene.add(torusKnot, particlesMesh)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)

pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 3
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(new THREE.Color('#21282a'))

// mouse
document.addEventListener('mousemove', animateParticles)
let mouseX = 0
let mouseY = 0

function animateParticles(event){
    mouseY = event.clientY
    mouseX = event.clientX
}

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    torusKnot.rotation.y = .3 * elapsedTime
    //knot.rotation.y = .8 * elapsedTime
    particlesMesh.rotation.y = 0.1 * elapsedTime
    if (mouseX > 0){
        particlesMesh.rotation.x = -mouseY * (elapsedTime * 0.00007)
        particlesMesh.rotation.y = -mouseX * (elapsedTime * 0.00007)
    }


    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()