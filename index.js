import * as THREE from './node_modules/three/build/three.module.js';
import DiceController from './dice/diceController.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / (window.innerHeight - 200),
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight - 200);
document.getElementById("diceBoard").appendChild(renderer.domElement);

const diceController = new DiceController(scene, window.innerWidth, window.innerHeight - 200);

var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.z = 30
scene.add(directionalLight);
renderer.setClearColor(0xCDCDCD, 1);

function animate() {
  diceController.tick();

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

document.getElementById("insert_D4").addEventListener('click', () => diceController.addDie("D4"));
document.getElementById("insert_D6").addEventListener('click', () => diceController.addDie("D6"));
document.getElementById("insert_D8").addEventListener('click', () => diceController.addDie("D8"));
document.getElementById("insert_D10").addEventListener('click', () => diceController.addDie("D10"));
document.getElementById("insert_D12").addEventListener('click', () => diceController.addDie("D12"));
document.getElementById("insert_D20").addEventListener('click', () => diceController.addDie("D20"));
document.getElementById("reroll").addEventListener('click', () => diceController.reroll());