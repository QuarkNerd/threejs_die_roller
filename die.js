import * as THREE from './node_modules/three/build/three.module.js';
const direction = new THREE.Vector3(0, 0, 1); 
const textureLoader = new THREE.TextureLoader()

// boundary designed to fit square perfectly in triangle
const triangleBoundary = [
  new THREE.Vector2(-0.58, 0),
  new THREE.Vector2(1.58, 0),
  new THREE.Vector2(0.5, 1.87),
];

const faces = [];
for (let i = 1; i < 7; i++) {
  faces.push(textureLoader.load(`faces/${i}.png`));
}

const D4_geom = new THREE.TetrahedronGeometry();
D4_geom.faceVertexUvs[0] = new Array(4).fill(triangleBoundary);
D4_geom.faces.forEach((face, i) => {
  face.materialIndex = i
});


const detailsByDiceType = {
  4 :  {
    geometry: D4_geom,
    triangleFaceCount : 4,
  },
  6 :  { 
    geometry: new THREE.BoxGeometry(),
    triangleFaceCount: 12
  },
}

class Die {
  constructor(scene, numSides, colorHex = 0x00FF00) {
    const details = detailsByDiceType[numSides];
    const materialArray = Array.apply(null, Array(numSides)).map((_, i) => 
      new THREE.MeshLambertMaterial({ color: colorHex, map: faces[i] }));
    this.mesh = new THREE.Mesh(details.geometry, materialArray);
    this.countTriangleFaces = details.triangleFaceCount;
    scene.add(this.mesh);
    console.log(this)
  }
  
  getMutablePosition = () => this.mesh.position;
  
  getMutableRotation = () => this.mesh.rotation;
  
  startRoll() {
    this.rotationSpeed = 0.3;
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
      this.rotationSpeed -= 0.005 * Math.random();
    } else if (diff > 0.041 && diff < 2*Math.PI -0.041 ) {
      rotation.x += this.rotationSpeed;
      rotation.y += this.rotationSpeed;
      this.rotationSpeed -= 0.0005 * Math.random();
    }
  }
}

export default Die;