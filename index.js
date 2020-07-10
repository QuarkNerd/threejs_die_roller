import * as THREE from './node_modules/three/build/three.module.js';
import DiceController from './dice/diceController.js';

let renderer;
let sum = 0;
let cameraZTarget = 2;
const FOVdegrees = 65;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  FOVdegrees,
  1,
  0.1,
  1000
);
camera.position.z = cameraZTarget;

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.z = 2;
scene.add(directionalLight);

const diceController = new DiceController(scene, setZFromDieCoor);

setSizesAndRenderer()
animate();


[4, 6, 8, 10, 12, 20].forEach(numSides =>
  document.getElementById(`insert_D${numSides}`).addEventListener('click', () => diceController.addDie("D" + numSides, addToSum))
)

document.getElementById("roll").addEventListener('click', () => {
  diceController.reroll();
  setSum(0);
});

window.addEventListener('resize', setSizesAndRenderer);


function animate() {
  diceController.tick();
  // camer tick
  if (Math.abs(camera.position.z - cameraZTarget) > 0.1) {
    camera.position.z += 0.03;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function setSizesAndRenderer() {
  const horizontal = window.innerHeight < window.innerWidth;
  const sceneSize = horizontal ? window.innerHeight : window.innerWidth;
  if (horizontal) {
    document.getElementById("main").classList.add("screenIsHorizontal");
    document.getElementById("buttonHolder").classList.remove("screenIsVertical");
  } else {
    document.getElementById("buttonHolder").classList.add("screenIsVertical");
    document.getElementById("main").classList.remove("screenIsHorizontal");
  }
  const button = document.getElementById("insert_D6");
  const buttonSize = button.offsetHeight < button.offsetWidth ? button.offsetHeight : button.offsetWidth;
  const buttonList = document.getElementsByClassName("button");
  for (let item of buttonList) {
    item.style["font-size"] = 0.4 * buttonSize + "px";
  }
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(sceneSize, sceneSize);
  document.getElementById("diceBoard").innerHTML = "";
  document.getElementById("diceBoard").appendChild(renderer.domElement);
  renderer.setClearColor(0xCDCDCD, 1);
}

function setZFromDieCoor(coor) {
  const x = Math.abs(coor.x) + 1;
  const y = Math.abs(coor.y) + 1;
  console.log({x,y})
  const dist = Math.max(x, y);
  console.log({dist})
  const FOVradians = FOVdegrees * Math.PI/ 180;
  const minZ = dist / Math.tan(FOVradians / 2); 
  if (minZ > camera.position.z) {
    cameraZTarget = minZ;
    console.log(99);
  }
}

function updateSumDisplay() {
  document.getElementById('total_score').innerHTML = `Total: ${sum}`;
}

function addToSum(a) {
  sum += a;
  updateSumDisplay();
}

function setSum(a) {
  sum = a;
  updateSumDisplay();
}