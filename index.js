import * as THREE from './node_modules/three/build/three.module.js';
import DiceController from './dice/diceController.js';
const height = window.innerHeight * 0.90;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / height,
  0.1,
  1000
);
camera.position.z = 8;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, height);
document.getElementById("diceBoard").appendChild(renderer.domElement);


var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.z = 30
scene.add(directionalLight);
renderer.setClearColor(0xCDCDCD, 1);

const diceController = new DiceController(scene, window.innerWidth, height);

let sum = 0;

const displaySum = () => document.getElementById('total_score').innerHTML = `Total: ${sum}`;

const addToSum = a => {
  sum += a;
  displaySum();
}
const setSum = a => {
  sum = a;
  displaySum();
}

[4, 6, 8, 10, 12, 20].forEach(numSides =>
  document.getElementById(`insert_D${numSides}`).addEventListener('click', () => diceController.addDie("D" + numSides, addToSum))
)

document.getElementById("reroll").addEventListener('click', () => {
  diceController.reroll();
  setSum(0);
});

function animate() {
  diceController.tick();

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

