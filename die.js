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
for (let i = 1; i < 9; i++) {
  faces.push(textureLoader.load(`faces/${i}.png`));
}

const getMaterialArray = (numFaces, colorHex) => Array.apply(null, Array(numFaces)).map((_, i) =>
  new THREE.MeshLambertMaterial({ color: colorHex, map: faces[i] }));

class Die {
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

class D4 extends Die {
  constructor(scene, colorHex = 0x00FF00) {
    const materialArray = getMaterialArray(4, colorHex);
    const D4_geom = new THREE.TetrahedronGeometry();
    D4_geom.faceVertexUvs[0] = new Array(4).fill(triangleBoundary);
    D4_geom.faces.forEach((face, i) => {
      face.materialIndex = i
    });
    super(scene, D4_geom, materialArray, 4);
  }
}

class D6 extends Die {
  constructor(scene, colorHex = 0x00FF00) {
    const materialArray = getMaterialArray(6, colorHex);
    const D6_geom = new THREE.BoxGeometry();
    super(scene, D6_geom, materialArray, 12);
  }
}

class D8 extends Die {
  constructor(scene, colorHex = 0x00FF00) {
    const materialArray = getMaterialArray(8, colorHex);
    const D8_geom = new THREE.OctahedronGeometry();
    D8_geom.faceVertexUvs[0] = new Array(8).fill(triangleBoundary);
    D8_geom.faces.forEach((face, i) => {
      face.materialIndex = i
    });
    super(scene, D8_geom, materialArray, 8);
  }
}

export { D4, D6, D8 };