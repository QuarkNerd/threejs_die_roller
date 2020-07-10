import * as THREE from '../three.module.min.js';

/**
 * 
 * @param {number} R Distance in x-y plane from centre to middle vertices (the ones with 3 edges)
 * @param {number} H Height from middle of the solid to top/bottom (defined as the vertices with 5 edges)
 */

function getPentagonalTrapezohedronGeometry(R, H) {

    const X = 2* Math.PI / 5 //72 degrees
    const Y = Math.PI / 5 //36 degrees

    const h = H * (1 - Math.cos(Y)) / (1 + Math.cos(Y)) // Distance in z direction from centre to middle vertices(the ones with 3 edges)

    const R_COS_X = R * Math.cos(X);
    const R_COS_Y = R * Math.cos(Y);
    const R_SIN_X = R * Math.sin(X);
    const R_SIN_Y = R * Math.sin(Y);

    const geometry = new THREE.Geometry();

    geometry.vertices.push(
        new THREE.Vector3(0, 0, H),  // 0
        new THREE.Vector3(0, R, h),  // 1
        new THREE.Vector3(R_SIN_Y, R_COS_Y, -h),  // 2
        new THREE.Vector3(R_SIN_X, R_COS_X, h),  // 3
        new THREE.Vector3(R_SIN_X, -R_COS_X, -h),  // 4
        new THREE.Vector3(R_SIN_Y, -R_COS_Y, h),  // 5
        new THREE.Vector3(0, -R, -h),  // 6
        new THREE.Vector3(-R_SIN_Y, -R_COS_Y, h),  // 7
        new THREE.Vector3(-R_SIN_X, -R_COS_X, -h),  // 8
        new THREE.Vector3(-R_SIN_X, R_COS_X, h), //9
        new THREE.Vector3(-R_SIN_Y, R_COS_Y, -h),  // 10
        new THREE.Vector3(0, 0, -H),  // 11
    );

    geometry.faces.push(
        new THREE.Face3(1, 9, 0),
        new THREE.Face3(9, 1, 10),
        new THREE.Face3(3, 1, 0),
        new THREE.Face3(1, 3, 2),
        new THREE.Face3(5, 3, 0),
        new THREE.Face3(3, 5, 4),
        new THREE.Face3(7, 5, 0,),
        new THREE.Face3(5, 7, 6),
        new THREE.Face3(9, 7, 0),
        new THREE.Face3(7, 9, 8),

        new THREE.Face3(2, 4, 11),
        new THREE.Face3(4, 2, 3),
        new THREE.Face3( 4, 6, 11),
        new THREE.Face3(6, 4, 5),
        new THREE.Face3(6, 8, 11),
        new THREE.Face3(8, 6, 7),
        new THREE.Face3(8, 10, 11),
        new THREE.Face3(10, 8, 9),
        new THREE.Face3(10, 2, 11),
        new THREE.Face3(2, 10, 1),
    );

    geometry.computeFaceNormals();

    return geometry;
}

export default getPentagonalTrapezohedronGeometry;