import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { VRButton } from 'three/addons/webxr/VRButton.js';


// ESCENA
const scene = new THREE.Scene();

scene.fog = new THREE.Fog(0x050510, 15, 60);

scene.background = new THREE.Color(0x050510);


// CAMARA
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 5, 15);


// RENDERER
const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.xr.enabled = true;

document.getElementById('container3D')
  .appendChild(renderer.domElement);


// BOTON VR
document.body.appendChild(
  VRButton.createButton(renderer)
);


// CONTROLES
const controls = new OrbitControls(
  camera,
  renderer.domElement
);

controls.enableDamping = true;


// LUCES
const ambientLight =
new THREE.AmbientLight(0x00ffff, 1.2);

scene.add(ambientLight);


const pinkLight =
new THREE.PointLight(0xff00ff, 40, 100);

pinkLight.position.set(10, 15, 10);

scene.add(pinkLight);


const blueLight =
new THREE.PointLight(0x00ffff, 40, 100);

blueLight.position.set(-10, 10, -10);

scene.add(blueLight);


const directionalLight =
  new THREE.DirectionalLight(0xffffff, 2);

directionalLight.position.set(5, 10, 5);

scene.add(directionalLight);


// GRID
const grid = new THREE.GridHelper(20, 20);

scene.add(grid);


// CARGAR MODELO
const loader = new GLTFLoader();

loader.load(
  './assets/models/Aula_Y8.glb',

  function (gltf) {

    const model = gltf.scene;

    model.position.set(0, 0, 0);

    model.scale.set(1, 1, 1);

    scene.add(model);

    console.log('Modelo cargado');

  },

  undefined,

  function (error) {

    console.error(error);

  }

);


// RESPONSIVE
window.addEventListener('resize', () => {

  camera.aspect =
    window.innerWidth / window.innerHeight;

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