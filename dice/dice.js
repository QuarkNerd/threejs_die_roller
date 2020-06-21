import * as THREE from '../node_modules/three/build/three.module.js';
import BaseDie from './baseDie.js'

const textureLoader = new THREE.TextureLoader();

// boundary designed to fit square perfectly in triangle
const triangleBoundary = [
    new THREE.Vector2(-0.58, 0),
    new THREE.Vector2(1.58, 0),
    new THREE.Vector2(0.5, 1.87),
];

// boundary for pentagons, based on below ABCD is the texture, A = (0,0)
//         X
//      _/   \_
//    B---------C
//  _/|         |\_
// W  |         |  Y
//  \ |         | /
//   \|         |/
//    A---------D
//     V-------Z
// threejs splits pentagon into three triangles, WCX, XVZ and XZY

const coor = {
    V: new THREE.Vector2(0.0285, -0.0877),
    W: new THREE.Vector2(-0.2629, 0.8001),
    X: new THREE.Vector2(0.5, 1.697),
    Y: new THREE.Vector2(1.263, 0.8001),
    Z: new THREE.Vector2(0.9714, -0.0877),
}

const pentagonBoundaries = [
    [ coor.W, coor.V, coor.X ], 
    [ coor.V, coor.Z, coor.X ],
    [ coor.Z, coor.Y, coor.X ]
];

const faces = [];
for (let i = 1; i < 13; i++) {
    faces.push(textureLoader.load(`./dice/faces/${i}.png`));
}

const getDiceFaceMaterials = (numFaces, colorHex, threeMaterial) => Array.apply(null, Array(numFaces)).map((_, i) =>
    new threeMaterial({ color: colorHex, map: faces[i] }));


class D4 extends BaseDie {
    constructor(scene, colorHex) {
        const materialArray = getDiceFaceMaterials(4, colorHex, THREE.MeshToonMaterial);
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
        const materialArray = getDiceFaceMaterials(6, colorHex, THREE.MeshToonMaterial);
        const D6_geom = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        super(scene, D6_geom, materialArray, 12);
    }
}

class D8 extends BaseDie {
    constructor(scene, colorHex) {
        const materialArray = getDiceFaceMaterials(8, colorHex, THREE.MeshToonMaterial);
        const D8_geom = new THREE.OctahedronGeometry(0.6);
        D8_geom.faceVertexUvs[0] = new Array(8).fill(triangleBoundary);
        D8_geom.faces.forEach((face, i) => {
            face.materialIndex = i
        });
        super(scene, D8_geom, materialArray, 8);
    }
}

class D12 extends BaseDie {
    constructor(scene, colorHex) {
        const materialArray = getDiceFaceMaterials(12, colorHex, THREE.MeshLambertMaterial);
        const D12_geom = new THREE.DodecahedronGeometry(0.6);
        D12_geom.faceVertexUvs[0] = (new Array(12).fill(pentagonBoundaries)).flat();
        D12_geom.faces.forEach((face, i) => {
            face.materialIndex = Math.floor(i/3);
        });
        super(scene, D12_geom, materialArray, 36);
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

export { D4, D6, D8, D12, D20 }