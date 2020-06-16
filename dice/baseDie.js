import * as THREE from '../node_modules/three/build/three.module.js';
const direction = new THREE.Vector3(0, 0, 1); 

class BaseDie {
  constructor(scene, geometry, materialArray, triangleFaceCount) {
    this.mesh = new THREE.Mesh(geometry, materialArray);
    this.countTriangleFaces = triangleFaceCount;
    scene.add(this.mesh);
    console.log(this)
  }
  
  getMutablePosition = () => this.mesh.position;
  
  getMutableRotation = () => this.mesh.rotation;
  
  startRoll() {
    this.rotationSpeed = (3 + Math.random()) * 0.1;;
    this.deceleration = (2 + 4* Math.random()) * 0.001;
    const randomNum = Math.floor(Math.random() * this.countTriangleFaces);
    const randomFace = this.mesh.geometry.faces[randomNum];
    const normal = randomFace.normal;

    this.mesh.quaternion.setFromUnitVectors(normal, direction);
    this.targetX = (this.mesh.rotation.x+2*Math.PI)%(2*Math.PI);
  }

  tick() { 
    this.updateRotation();
  }
  
  updateRotation() {
    const diff = (this.mesh.rotation.x - this.targetX) %(2*Math.PI);
    const rotation = this.mesh.rotation;
    if (this.rotationSpeed > 0.08) {
      rotation.x += this.rotationSpeed;
      rotation.y += this.rotationSpeed;
      this.rotationSpeed -= this.deceleration;
    } else if (diff > 0.041 && diff < 2*Math.PI -0.041 ) {
      rotation.x += this.rotationSpeed;
      rotation.y += this.rotationSpeed;
      this.rotationSpeed -= 0.0005 * Math.random();
    }
  }
}

export default BaseDie;