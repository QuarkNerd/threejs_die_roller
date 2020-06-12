import * as THREE from './node_modules/three/build/three.module.js';

const geometry = new THREE.TetrahedronGeometry();
const material = new THREE.MeshLambertMaterial({ color: 0x00FF00,  map: THREE.ImageUtils.loadTexture("faces/6.png") });
const material1 = new THREE.MeshLambertMaterial({ color: 0x00FF00,  map: THREE.ImageUtils.loadTexture("faces/5.png") });
const material2 = new THREE.MeshLambertMaterial({ color: 0x00FF00,  map: THREE.ImageUtils.loadTexture("faces/4.png") });
const material3 = new THREE.MeshLambertMaterial({ color: 0x00FF00,  map: THREE.ImageUtils.loadTexture("faces/3.png") });
const material4 = new THREE.MeshLambertMaterial({ color: 0x00FF00,  map: THREE.ImageUtils.loadTexture("faces/2.png") });
const materialNum = new THREE.MeshLambertMaterial({ color: 0x00FF00,  map: THREE.ImageUtils.loadTexture("faces/1.png") });
const matArray = [material, materialNum, material1, material2, material3, material4]
const direction = new THREE.Vector3(0, 0, 1); 

class Die {
  constructor(scene) {
    this.mesh = new THREE.Mesh(geometry, matArray);
    scene.add(this.mesh);
  }
  
  getMutablePosition = () => this.mesh.position;
  
  getMutableRotation = () => this.mesh.rotation;
  
  startRoll = () => {
    this.rotationSpeed = 0.5;
    const randomNum = Math.floor(Math.random() * 11);
    const randomFace = this.mesh.geometry.faces[randomNum];
    const normal = randomFace.normal;

    this.mesh.quaternion.setFromUnitVectors(normal, direction);
    this.targetX = (this.mesh.rotation.x+2*Math.PI)%(2*Math.PI);
  }

  tick = () => this.updateRotation();
  
  updateRotation() {
    // console.log(this.mesh.geometry.faces);
    // this.mesh.geometry.elementsNeedUpdate = true; 
    // this.mesh.geometry.colorsNeedUpdate = true; 
    const diff = (this.mesh.rotation.x - this.targetX) %(2*Math.PI);
    const rotation = this.mesh.rotation;
    if (this.rotationSpeed > 0.08) {
      rotation.x += this.rotationSpeed;
      rotation.y += this.rotationSpeed;
      this.rotationSpeed -= 0.005 * Math.random();
    } else if (diff > 0.041 && diff < 2*Math.PI -0.041 ) {
      rotation.x += this.rotationSpeed;
      rotation.y += this.rotationSpeed;
      this.rotationSpeed -= 0.0005 * Math.random();
      console.log(rotation.x);
    } else {
      console.log(rotation.x);
    }
  }
}

export default Die;
