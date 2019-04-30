//require
var csv = require('node_modules/jquery-csv/src/jquery.csv.js');

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
  1, //Near
  18000000 //Far
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


//Model glTf Loader
var loader = new THREE.GLTFLoader();
  loader.load(
    'js/notredame/scene.gltf',
    function ( gltf ) {
      var object = gltf.scene;
      gltf.scene.scale.set( 2, 2, 2 );
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

//light sphere loop
// var emoji = ["a", "b", "c"];
// var lat = [-5000, -6000, -7000];
// var long = [-7000, -8000, -9000];
var lat;
var long;

//parse geolocation data
$.ajax({
    url: "data/testlat1.csv",
    async: false,
    success: function (csvd) {
        data = $.csv.toArrays(csvd);
    },
    dataType: "text",
    complete: function () {
        lat = data;
    }
});

$.ajax({
    url: "data/testlong1.csv",
    async: false,
    success: function (csvd) {
        data = $.csv.toArrays(csvd);
    },
    dataType: "text",
    complete: function () {
        long = data;
    }
});

for (var i=0; i<4; i++) {
  var hue = 0xffa700;

  // if (emoji[i] == "a") {
  //   hue = 0xffa700;
  // }
  // else if (emoji[i] == "b") {
  //   hue = 0xff5050;
  // }
  // else if (emoji[i] == "c") {
  //   hue = 0x6699ff;
  // }

  var sphere = new THREE.SphereBufferGeometry( 10 );
  var light1 = new THREE.PointLight( hue, 2.5, 250000, 2 );
  light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: hue, transparent: true, opacity: 0.3 } ) ) );
  light1.position.set( lat[i], 0, long[i] );
  light1.castShadow = false;
  scene.add( light1 );

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
  sprite.scale.set(1000, 1000, 1000);
  light1.add(sprite);
  var sprite1 = new THREE.Sprite( spriteMaterial );
  sprite1.scale.set(500, 500, 500);
  light1.add(sprite1);

}

//Set up shadow properties for the light
light1.shadow.mapSize.width = 18000000;
light1.shadow.mapSize.height = 9000000;
light1.shadow.camera.near = 1;
light1.shadow.camera.far = 1000;

// SUPER SIMPLE GLOW EFFECT
// use sprite because it appears the same from all angles



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
