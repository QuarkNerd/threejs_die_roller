import * as THREE from '../node_modules/three/build/three.module.js';
import BaseDie from './baseDie.js'
import getPentagonalTrapezohedronGeometry from './pentagonalTrapezohedronGeometry.js';

const textureLoader = new THREE.TextureLoader();

const radius = 0.5;
const cubeSide = 2 * radius / Math.sqrt(3);

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
    [coor.W, coor.V, coor.X],
    [coor.V, coor.Z, coor.X],
    [coor.Z, coor.Y, coor.X]
];

const zeroVector = new THREE.Vector2(0, 0);

const emptyTriangleBound = [
    zeroVector,
    zeroVector,
    zeroVector,
]

const faces = [];
for (let i = 1; i < 21; i++) {
    faces.push(textureLoader.load(`./dice/faces/${i}.png`));
}

const getDiceFaceMaterials = (numFaces, colorHex, threeMaterial) => Array.apply(null, Array(numFaces)).map((_, i) =>
    new threeMaterial({ color: colorHex, map: faces[i] }));

const setMaterialIndices = (geom, materialMapping, trianglesPerFullface = 1) => geom.faces.forEach((face, i) => {
    face.materialIndex = materialMapping[Math.floor(i / trianglesPerFullface)];
})


class D4 extends BaseDie {
    constructor(scene, onRollEnd, colorHex) {
        const materialArray = getDiceFaceMaterials(4, colorHex, THREE.MeshToonMaterial);
        const D4_geom = new THREE.TetrahedronGeometry(radius);
        D4_geom.faceVertexUvs[0] = new Array(4).fill(triangleBoundary);
        setMaterialIndices(D4_geom, [0, 1, 2, 3]);
        super(scene, D4_geom, materialArray, 4, onRollEnd);
    }
}

class D6 extends BaseDie {
    constructor(scene, onRollEnd, colorHex) {
        const materialArray = getDiceFaceMaterials(6, colorHex, THREE.MeshToonMaterial);
        const D6_geom = new THREE.BoxGeometry(cubeSide, cubeSide, cubeSide);
        setMaterialIndices(D6_geom, [0, 5, 2, 3, 4, 1], 2);
        super(scene, D6_geom, materialArray, 12, onRollEnd);
    }
}

class D8 extends BaseDie {
    constructor(scene, onRollEnd, colorHex) {
        const materialArray = getDiceFaceMaterials(8, colorHex, THREE.MeshLambertMaterial);
        const D8_geom = new THREE.OctahedronGeometry(radius);
        D8_geom.faceVertexUvs[0] = new Array(8).fill(triangleBoundary);
        setMaterialIndices(D8_geom, [0, 1, 2, 3, 6, 7, 4, 5]);
        super(scene, D8_geom, materialArray, 8, onRollEnd);
    }
}

class D10 extends BaseDie {
    constructor(scene, onRollEnd, colorHex) {
        const materialArray = getDiceFaceMaterials(10, colorHex, THREE.MeshLambertMaterial);
        const D10_geom = getPentagonalTrapezohedronGeometry(radius, radius);
        D10_geom.faceVertexUvs[0] = (new Array(10).fill([triangleBoundary, emptyTriangleBound])).flat();
        setMaterialIndices(D10_geom, [0, 1, 2, 3, 4, 5, 9, 8, 7, 6], 2);
        super(scene, D10_geom, materialArray, 20, onRollEnd);
    }
}

class D12 extends BaseDie {
    constructor(scene, onRollEnd, colorHex) {
        const materialArray = getDiceFaceMaterials(12, colorHex, THREE.MeshLambertMaterial);
        const D12_geom = new THREE.DodecahedronGeometry(radius);
        D12_geom.faceVertexUvs[0] = (new Array(12).fill(pentagonBoundaries)).flat();
        setMaterialIndices(D12_geom, [0, 1, 2, 3, 10, 4, 5, 9, 11, 8, 6, 7], 3);
        super(scene, D12_geom, materialArray, 36, onRollEnd);
    }
}

class D20 extends BaseDie {
    constructor(scene, onRollEnd, colorHex) {
        const materialArray = getDiceFaceMaterials(20, colorHex, THREE.MeshLambertMaterial);
        const D20_geom = new THREE.IcosahedronGeometry(radius);
        D20_geom.faceVertexUvs[0] = new Array(20).fill(triangleBoundary);
        setMaterialIndices(D20_geom, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 16, 17, 18, 19, 15, 11, 10, 14, 13, 12]);
        super(scene, D20_geom, materialArray, 20, onRollEnd);
    }
}

export { D4, D6, D8, D10, D12, D20 }