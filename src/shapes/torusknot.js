import * as THREE from 'three'

const knotgeometry = new THREE.TorusKnotGeometry( 10/20, 3/25, 100, 16 )
const material = new THREE.MeshBasicMaterial()
material.color = new THREE.Color(0x0000ff)
const torusKnot = new THREE.Mesh( knotgeometry, material )
