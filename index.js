import * as THREE from './node_modules/three/build/three.module.js';
import DiceController from './dice/diceController.js';

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

const diceController = new DiceController(scene, window.innerWidth, window.innerHeight - 200);
diceController.addDie("D4");

var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.y = 4
directionalLight.position.z = 10
scene.add(directionalLight);
renderer.setClearColor(0xCDCDCD, 1);

function animate() {
  diceController.tick();

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();