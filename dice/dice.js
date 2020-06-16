import * as THREE from '../node_modules/three/build/three.module.js';
import BaseDie from './baseDie.js'

const textureLoader = new THREE.TextureLoader()

// boundary designed to fit square perfectly in triangle
const triangleBoundary = [
    new THREE.Vector2(-0.58, 0),
    new THREE.Vector2(1.58, 0),
    new THREE.Vector2(0.5, 1.87),
];

const faces = [];
for (let i = 1; i < 9; i++) {
    faces.push(textureLoader.load(`./dice/faces/${i}.png`));
}

const getMaterialArray = (numFaces, colorHex) => Array.apply(null, Array(numFaces)).map((_, i) =>
    new THREE.MeshLambertMaterial({ color: colorHex, map: faces[i] }));


class D4 extends BaseDie {
    constructor(scene, colorHex) {
        const materialArray = getMaterialArray(4, colorHex);
        const D4_geom = new THREE.TetrahedronGeometry(0.6);
        D4_geom.faceVertexUvs[0] = new Array(4).fill(triangleBoundary);
        D4_geom.faces.forEach((face, i) => {
            face.materialIndex = i
        });
        super(scene, D4_geom, materialArray, 4);
    }
}

class D6 extends BaseDie {
    constructor(scene, colorHex) {
        const materialArray = getMaterialArray(6, colorHex);
        const D6_geom = new THREE.BoxGeometry(0.6);
        super(scene, D6_geom, materialArray, 12);
    }
}

class D8 extends BaseDie {
    constructor(scene, colorHex) {
        const materialArray = getMaterialArray(8, colorHex);
        const D8_geom = new THREE.OctahedronGeometry(0.6);
        D8_geom.faceVertexUvs[0] = new Array(8).fill(triangleBoundary);
        D8_geom.faces.forEach((face, i) => {
            face.materialIndex = i
        });
        super(scene, D8_geom, materialArray, 8);
    }
}

class D20 extends BaseDie {
    constructor(scene, colorHex) {
        const t = textureLoader.load(`./dice/faces/dd.png`)
        const materialArray = Array.apply(null, Array(20)).map((_, i) =>
            new THREE.MeshLambertMaterial({ color: colorHex, map: t }));
        const D8_geom = new THREE.IcosahedronGeometry(0.6);
        D8_geom.faceVertexUvs[0] = new Array(20).fill(triangleBoundary);
        D8_geom.faces.forEach((face, i) => {
            face.materialIndex = i
        });
        super(scene, D8_geom, materialArray, 8);
    }
}

export { D4, D6, D8, D20 }