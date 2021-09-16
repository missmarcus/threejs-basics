import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// add point light
var spLight = new THREE.PointLight(0xffffff, 1.75, 1000);
spLight.position.set(-100, 200, 200);
scene.add(spLight);

// Objects
const cubeGeometry = new THREE.BoxGeometry(50, 10, 50);

// material
const cubeMaterial = new THREE.MeshLambertMaterial({color:0xffffff * Math.random()}) 

var cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
cube.position.set(0, 0, 0);
scene.add(cube);


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
var VIEW_ANGLE = 35, ASPECT = sizes.width/ sizes.height, NEAR = 1, FAR = 1000;
const camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
scene.add(camera);
camera.position.set(0, 90, 300);
camera.lookAt(new THREE.Vector3(0,0,0));


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// prepare container
const container = document.createElement('div');
document.body.appendChild(container);
container.appendChild(renderer.domElement);


/**
 * Animate
 */

const clock = new THREE.Clock()

/* prepare stats
var stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '50px';
stats.domElement.style.bottom = '50px';
stats.domElement.style.zIndex = 1;
container.appendChild( stats.domElement ); */

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    cube.rotation.y = .1 * elapsedTime

    // Update Orbital Controls
    controls.update()

    //stats update
    //stats.update();

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()