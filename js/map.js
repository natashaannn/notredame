//WebGL Error Message
if ( WEBGL.isWebGLAvailable() === false ) {
  document.body.appendChild( WEBGL.getWebGLErrorMessage() );
}

//Load 3D Scene
var scene = new THREE.Scene();

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
document.body.appendChild( renderer.domElement );

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
var groundmat = new THREE.MeshPhongMaterial ( { color: 0xd3d3d3} );
var ground = new THREE.Mesh( groundgeometry, groundmat );
ground.position.y = - 500;
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

//Light spheres
var sphere = new THREE.SphereBufferGeometry( 200, 100, 8 );
sphere.opacity = 0.5;
var light1 = new THREE.PointLight( 0xffa700, 2.5, 25000 );
light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffa700 } ) ) );
light1.position.set( 3000, 0, -8000 );
light1.castShadow = true;
light1.opacity=0.5;
scene.add( light1 );

//Set up shadow properties for the light
light1.shadow.mapSize.width = 18000;
light1.shadow.mapSize.height = 9000;
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
