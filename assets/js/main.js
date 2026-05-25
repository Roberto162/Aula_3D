import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js';

import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.165/examples/jsm/controls/OrbitControls.js';

import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.165/examples/jsm/loaders/GLTFLoader.js';

import { VRButton } from 'https://cdn.jsdelivr.net/npm/three@0.165/examples/jsm/webxr/VRButton.js';


// ESCENA
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

// CAMARA
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 2, 5);

// RENDERER
const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;

document.getElementById('container3D')
  .appendChild(renderer.domElement);

// BOTON VR
document.body.appendChild(VRButton.createButton(renderer));

// CONTROLES
const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;

// LUCES
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);

directionalLight.position.set(5, 10, 5);

scene.add(directionalLight);

// GRID
const grid = new THREE.GridHelper(20, 20);
scene.add(grid);

// CARGAR MODELO
const loader = new GLTFLoader();

loader.load(
  '../models/modelo.glb',

  function(gltf){

    const model = gltf.scene;

    model.position.set(0, 0, 0);

    model.scale.set(1,1,1);

    scene.add(model);

    console.log('Modelo cargado');

  },

  function(xhr){

    console.log(
      (xhr.loaded / xhr.total * 100) + '% cargado'
    );

  },

  function(error){

    console.error('Error cargando modelo:', error);

  }
);

// RESPONSIVE
window.addEventListener('resize', () => {

  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );

});

// ANIMACION
renderer.setAnimationLoop(() => {

  controls.update();

  renderer.render(scene, camera);

});