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
  180000 //Far
);
camera.position.set( -10000, 3000, -4800 );

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

var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
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
      gltf.receiveShadow = true;

      // first sphere
      var distance = 700;
      var hue = 0xffa700;
      var geometry = new THREE.SphereBufferGeometry();
      var material = new THREE.MeshBasicMaterial( { color: hue, transparent: true, opacity: 0.3 } );
      var sphere = new THREE.Mesh( geometry, material);
      sphere.position.set( lat[0]/distance, 0, long[0]/distance);

      // sprite glow
      var spriteMap = new THREE.TextureLoader().load( "images/glow.png" );
      var spriteMaterial = new THREE.SpriteMaterial(
      {
        map: spriteMap,
        color: hue,
        transparency: true,
        opacity: 0.1,
        blending: THREE.AdditiveBlending
      });

      var spritesize = 250;
      var spritesize2 = spritesize/2;

      var sprite = new THREE.Sprite( spriteMaterial );
      sprite.scale.set(spritesize,spritesize,spritesize);
      sphere.add(sprite);
      var sprite1 = new THREE.Sprite( spriteMaterial );
      sprite1.scale.set(spritesize2,spritesize2,spritesize2);
      sphere.add(sprite1);

      //light loop
      for (var i=1; i<lat.length; i++) {
        geometry1 = new THREE.SphereGeometry();
        var light = new THREE.Mesh ( geometry1, material );

        var sprite = new THREE.Sprite( spriteMaterial );
        sprite.scale.set(spritesize,spritesize,spritesize);

        var sprite1 = new THREE.Sprite( spriteMaterial );
        sprite1.scale.set(spritesize2,spritesize2,spritesize2);

        light.add(sprite);
        light.add(sprite1);

        light.position.set( (lat[i]-lat[0])/distance, 0, (long[i]-long[0])/distance);
        sphere.add(light);
      }

      gltf.scene.add(sphere);
      scene.add(gltf.scene);
     },
     undefined,
     function ( error ) {
  	    console.log('an error occurred');
      }
    );

//changing array into set for faster runtime
// var latset = new Set(lat);
// var longset = new Set(long);
//
// latset.forEach( latvalue => {
//     geometry1 = new THREE.SphereGeometry();
//     var light = new THREE.Mesh ( geometry1, material );
//
//     var sprite = new THREE.Sprite( spriteMaterial );
//     sprite.scale.set(spritesize,spritesize,spritesize);
//
//     var sprite1 = new THREE.Sprite( spriteMaterial );
//     sprite1.scale.set(spritesize2,spritesize2,spritesize2);
//
//     light.add(sprite);
//     light.add(sprite1);
//
//     light.position.set( latvalue/distance, 0, 100);
//     sphere.add(light);
// });

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
