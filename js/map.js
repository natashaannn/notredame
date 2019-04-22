//Creating the scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Notredame
var loader = new THREE.GLTFLoader();

loader.load(
  'js/scene.gltf',
  function ( gltf ) {
	   scene.add( gltf.scene );
   },
   function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	 },
   function ( error ) {
	    console.error( error );
    }
  );

// //Cube
// var geometry = new THREE.BoxGeometry( 1, 1, 1 );
// var material = new THREE.MeshBasicMaterial( { color: 0x008080 } );
// var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );
// camera.position.z = 5;

//Loop for Rendering the Cube
// function animate() {
// 	requestAnimationFrame( animate );
//   cube.rotation.x += 0.01; //rotating the cube
//   cube.rotation.y += 0.01;
// 	renderer.render( scene, camera );
// }
// animate();

//Loop for Rendering Notre Dame
function render () {
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}
