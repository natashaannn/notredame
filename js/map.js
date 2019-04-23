//WebGL Error Message
if ( WEBGL.isWebGLAvailable() === false ) {
  container.appendChild( WEBGL.getWebGLErrorMessage() );
}

//Get container
var container = document.getElementById( 'container' );

//Load 3D Scene
var scene = new THREE.Scene();
scene.fog = new THREE.Fog( scene.background, 3500, 15000 );

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
var emoji = ["a", "b", "c"];
var lat = [5000, 6000, 7000];
var long = [7000, 8000, 9000];

for (var i=0; i<4; i++) {
  var hue;

  if (emoji[i] == "a") {
    hue = 0xffa700;
  }
  else if (emoji[i] == "b") {
    hue = 0xff5050;
  }
  else if (emoji[i] == "c") {
    hue = 0x6699ff;
  }

  var sphere = new THREE.SphereBufferGeometry( 200, 100, 8 );
  var light1 = new THREE.PointLight( hue, 2.5, 25000 );
  light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: hue, transparent: true } ) ) );
  light1.position.set( lat[i], 0, long[i] );
  light1.castShadow = true;
  scene.add( light1 );
}

//Set up shadow properties for the light
light1.shadow.mapSize.width = 18000000;
light1.shadow.mapSize.height = 9000000;
light1.shadow.camera.near = 1;
light1.shadow.camera.far = 1000;


//Loop for Rendering
function animate() {
  render();
  requestAnimationFrame(animate);
	}
function render() {
  renderer.render(scene,camera);
}

render();
animate();
