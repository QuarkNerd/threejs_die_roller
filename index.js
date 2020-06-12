import * as THREE from './node_modules/three/build/three.module.js';
import Die from './die.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const cube = new Die (scene)

var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.y = 4
directionalLight.position.z = 10
scene.add(directionalLight);
renderer.setClearColor(0xCDCDCD, 1);

const speed = { value: 0.3 };
const speed2 = { value: 0.3 };

function animate() {
  cube.tick();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
const time = new Date();
cube.startRoll();
animate();