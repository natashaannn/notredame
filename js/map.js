//WebGL Error Message
if ( WEBGL.isWebGLAvailable() === false ) {
  container.appendChild( WEBGL.getWebGLErrorMessage() );
}

//Get container
var container = document.getElementById( 'container' );

//Load 3D Scene
var scene = new THREE.Scene();
var clock = new THREE.Clock();

//Load Camera Perspective
var camera = new THREE.PerspectiveCamera(
  100, //Field of view
  window.innerWidth / window.innerHeight, //Aspect Ratio
  10, //Near
  18000 //Far
);
camera.position.set( -10000, 1000, -4800 );

//Load a Renderer
var renderer = new THREE.WebGLRenderer({ alpha: false });
renderer.setClearColor( 0x000000 );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild( renderer.domElement );

// Load the Orbitcontroller
var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.maxPolarAngle = 0.9 * Math.PI / 2;

// Load Surrounding Light
var ambientLight = new THREE.AmbientLight( 0xcccccc );
scene.add( ambientLight );

var directionalLight = new THREE.DirectionalLight( 0xffffff );
directionalLight.position.set( 0, 1, 1 ).normalize();
scene.add( directionalLight );

//Ground
var groundgeometry = new THREE.PlaneBufferGeometry( 18000000, 9000000 );
var groundmat = new THREE.MeshPhongMaterial ( { color: 0x000000} );
var ground = new THREE.Mesh( groundgeometry, groundmat );
ground.position.y = -300;
ground.receiveshadow = true;
ground.rotation.x = - Math.PI / 2.0;
scene.add( ground );


// //Model glTf Loader
// var loader = new THREE.GLTFLoader();
//   loader.load(
//     'js/notredame/scene.gltf',
//     function ( gltf ) {
//       var object = gltf.scene;
//       gltf.scene.scale.set( 0.5, 0.5, 0.5 );
// 	    gltf.scene.position.x = 0;
//       gltf.scene.position.y = 0;
// 	    gltf.scene.position.z = 0;
//       gltf.castShadow = true;
//       gltf.receiveShadow = false;
//   	  scene.add(gltf.scene);
//      },
//      undefined,
//      function ( error ) {
//   	    console.log('an error occurred');
//       }
//     );
//
// // first sphere
// var hue = 0xffa700;
// var geometry = new THREE.SphereBufferGeometry();
// var material = new THREE.MeshBasicMaterial( { color: hue, transparent: true, opacity: 0.3 } );
// var sphere = new THREE.Mesh( geometry, material);
// sphere.position.set( lat[0]/1000, 0, long[0]/1000);
//
// // sprite glow
// var spriteMap = new THREE.TextureLoader().load( "images/glow.png" );
// var spriteMaterial = new THREE.SpriteMaterial(
// {
//   map: spriteMap,
//   color: hue,
//   transparency: true,
//   opacity: 0.3,
//   blending: THREE.AdditiveBlending
// });
// var sprite = new THREE.Sprite( spriteMaterial );
// sprite.scale.set(500,500,500);
// sphere.add(sprite);
// var sprite1 = new THREE.Sprite( spriteMaterial );
// sprite1.scale.set(250,250,250);
// sphere.add(sprite1);
//
// //light loop
// for (var i=1; i<10; i++) {
//   geometry1 = new THREE.SphereGeometry();
//   var light = new THREE.Mesh ( geometry1, material);
//
//   var sprite1 = new THREE.Sprite( spriteMaterial );
//   sprite1.scale.set(500, 500, 500);
//   light.add(sprite1);
//   var sprite2 = new THREE.Sprite( spriteMaterial );
//   sprite2.scale.set(250, 250, 250);
//   light.add(sprite2);
//
//   light.add(sprite1);
//
//   light.position.set( (lat[i]-lat[0])/1000, 0, (long[i]-long[0])/1000);
//   sphere.add(light);
// }
//
// scene.add(sphere);

// Model glTf Loader
var loader = new THREE.GLTFLoader();
  loader.load(
    'js/notredame/scene.gltf',
    function ( gltf ) {
      var object = gltf.scene;
      gltf.scene.scale.set( 0.5, 0.5, 0.5 );
	    gltf.scene.position.x = 0;
      gltf.scene.position.y = 0;
	    gltf.scene.position.z = 0;
      gltf.castShadow = true;
      gltf.receiveShadow = false;
      scene.add(gltf.scene);
     },
     undefined,
     function ( error ) {
  	    console.log('an error occurred');
      }
    );

// first sphere
var hue = 0xffa700;
var geometry = new THREE.SphereBufferGeometry();
var material = new THREE.MeshBasicMaterial( { color: hue, transparent: true, opacity: 0.3 } );
var sphere = new THREE.Mesh( geometry, material);
sphere.position.set( lat[0]/1000, 0, long[0]/1000);

// sprite glow
var spriteMap = new THREE.TextureLoader().load( "images/glow.png" );
var spriteMaterial = new THREE.SpriteMaterial(
{
  map: spriteMap,
  color: hue,
  transparency: true,
  opacity: 0.3,
  blending: THREE.AdditiveBlending
});
var sprite = new THREE.Sprite( spriteMaterial );
sprite.scale.set(500,500,500);
sphere.add(sprite);
var sprite1 = new THREE.Sprite( spriteMaterial );
sprite1.scale.set(250,250,250);
sphere.add(sprite1);

//light loop
for (var i=1; i<10; i++) {
  geometry1 = new THREE.SphereGeometry();
  var light = new THREE.Mesh ( geometry1, material);

  var sprite1 = new THREE.Sprite( spriteMaterial );
  sprite1.scale.set(500, 500, 500);
  light.add(sprite1);
  var sprite2 = new THREE.Sprite( spriteMaterial );
  sprite2.scale.set(250, 250, 250);
  light.add(sprite2);

  light.add(sprite1);

  light.position.set( (lat[i]-lat[0])/1000, 0, (long[i]-long[0])/1000);
  sphere.add(light);
}

scene.add(sphere);

//Loop for Rendering
function animate() {
  render();
  requestAnimationFrame(animate);
	}

function render() {

  // var time = Date.now() * 0.000000000005;
  //
  // light1.scale.x = time;
  // light1.scale.y = time;
  // light1.scale.z = time;
  //
  // controls.update( clock.getDelta() );

  renderer.render(scene,camera);
}

render();
animate();
