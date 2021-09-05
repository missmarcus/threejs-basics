import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';



// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);
    const camera = new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,1,5000);
    const renderer = new THREE.WebGL1Renderer({antialias:true});
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 3d model
    const loader = new GLTFLoader();
    const obj;
    loader.load( './lilly.gltf',function(gltf) {
        obj = gltf.scene;
        scene.add(gltf.scene);
    });

    const light = new THREE.AmbientLight(0x404040,100);
    scene.add(light)
    camera.position.set(0,0,10);
    function animate(){
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
    






