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
document.body.appendChild( renderer.domElement );

// Load the Orbitcontroller
var controls = new THREE.OrbitControls( camera, renderer.domElement );

// Load Light
var ambientLight = new THREE.AmbientLight( 0xcccccc );
scene.add( ambientLight );

var directionalLight = new THREE.DirectionalLight( 0xffffff );
directionalLight.position.set( 0, 1, 1 ).normalize();
scene.add( directionalLight );

//Model glTf Loader
var loader = new THREE.GLTFLoader();
  loader.load(
    'js/notredame/scene.gltf',
    function ( gltf ) {
      var object = gltf.scene;
      gltf.scene.scale.set( 2, 2, 2 );
	    gltf.scene.position.x = 0;				    //Position (x = right+ left-)
      gltf.scene.position.y = 0;				    //Position (y = up+, down-)
	    gltf.scene.position.z = 0;
  	  scene.add(gltf.scene);
     },
     // undefined,
     // function ( error ) {
  	 //    console.log('an error occurred');
     //  }
    );

//Load plane
var planeGeometry = new THREE.PlaneGeometry( 5000, 100 );
var material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );
scene.add( plane );

//Light spheres
var sphere = new THREE.SphereBufferGeometry( 200, 100, 8 );
var light1 = new THREE.PointLight( 0xffa700, 2.5, 50000 );
light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffa700 } ) ) );
light1.position.set( 3000, 0, -8000 );
scene.add( light1 );

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
