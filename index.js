import * as THREE from './node_modules/three/build/three.module.js';
import DiceController from './dice/diceController.js';

const horizontal = window.innerHeight < window.innerWidth;
const sceneSize = horizontal ? window.innerHeight : window.innerWidth;
if (horizontal) {
  document.getElementById("main").classList.add("screenIsHorizontal");
} else {
  document.getElementById("buttonHolder").classList.add("screenIsVertical");
}
const button = document.getElementById("insert_D6");
const buttonSize = button.offsetHeight < button.offsetWidth ? button.offsetHeight : button.offsetWidth;
const buttonList = document.getElementsByClassName("button");
for (let item of buttonList) {
  item.style["font-size"] = 0.5*buttonSize + "px";
}
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sceneSize, sceneSize);


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  1,
  0.1,
  1000
);
camera.position.z = 10;

document.getElementById("diceBoard").appendChild(renderer.domElement);

var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(0, 0, 10);

scene.add(spotLight);
renderer.setClearColor(0xCDCDCD, 1);

const diceController = new DiceController(scene);

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

