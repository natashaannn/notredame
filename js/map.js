//WebGL Error Message
if ( WEBGL.isWebGLAvailable() === false ) {
  container.appendChild( WEBGL.getWebGLErrorMessage() );
}

  var container = document.getElementById( 'container' );
  var scene = new THREE.Scene();
  var clock = new THREE.Clock();

  //Camera Perspective
  var camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    10,
    1800000
  );
  camera.position.set( -10000, 3000, -4800 );

  //Renderer
  var renderer = new THREE.WebGLRenderer({ alpha: false });
  renderer.setClearColor( 0x000000 );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  //Orbitcontroller
  var controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.maxPolarAngle = 0.9 * Math.PI / 2;

  //Surrounding Light
  var ambientLight = new THREE.AmbientLight( 0xcccccc );
  scene.add( ambientLight );

  //Ground
  var groundgeometry = new THREE.PlaneBufferGeometry( 18000000, 9000000 );
  var groundmat = new THREE.MeshPhongMaterial ( { color: 0x000000} );
  var ground = new THREE.Mesh( groundgeometry, groundmat );
  ground.position.y = -700;
  ground.receiveshadow = true;
  ground.rotation.x = - Math.PI / 2.0;
  scene.add( ground );

  //glTf
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
        gltf.receiveShadow = true;

        // first sphere
        var distance = 100;
        var hue = 0xffa700;
        var geometry = new THREE.SphereBufferGeometry();
        var material = new THREE.MeshBasicMaterial( { color: hue } );
        var sphere = new THREE.Mesh( geometry, material);

        // glow
        var spriteMap = new THREE.TextureLoader().load( "images/glow.png" );
        var spriteMaterial = new THREE.SpriteMaterial(
        {
          map: spriteMap,
          color: hue,
          opacity: 0.3,
          blending: THREE.AdditiveBlending
        });

        var spritesize = 700;

        function light() {
          geometry1 = new THREE.SphereGeometry();
          var light = new THREE.Mesh ( geometry1, material );

          var sprite = new THREE.Sprite( spriteMaterial );
          sprite.scale.set(spritesize,spritesize,spritesize);
          light.add(sprite);

          light.position.set( lat[i]/distance, 0, long[i]/distance);
          sphere.add(light);
        };

        //light loop
        for (var i=0; i<lat.length; i++) {
          light();
        }
        gltf.scene.add(sphere);
        scene.add(gltf.scene);
       },
       undefined,
       function ( error ) {
    	    console.log('an error occurred');
        }


//Loop for Rendering
function animate() {
  requestAnimationFrame(animate);
  render();
	}

function render() {

  renderer.render(scene,camera);
}

render();
animate();
