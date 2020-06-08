const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 10;

var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.y = 0
directionalLight.position.z = 10
scene.add(directionalLight);

renderer.setClearColor(0xCDCDCD, 1);

function animate() {
  cube.rotation.x += 0.1;
  cube.rotation.y += 0.07;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();