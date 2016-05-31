//=require three/build/three.js

var scene, camera, renderer;
var geometry, material, cylinder;

init();
//animate();

function init() {

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 1000;
    camera.position.y += 450;

    geometry = new THREE.CylinderGeometry( 250, 250, 20, 6 );
    material = new THREE.MeshBasicMaterial( {color: 0x5baad7} );
    cylinder = new THREE.Mesh( geometry, material );
    scene.add( cylinder );

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );

	document.body.appendChild( renderer.domElement );

    renderer.render( scene, camera );
}

//function animate() {
//
//	requestAnimationFrame( animate );
////
////	cylinder.rotation.x += 0.01;
////	cylinder.rotation.y += 0.02;
//
//    camera.position.y += 2;
//
//    console.log(camera.position.y);
//
//	renderer.render( scene, camera );
//
//}
