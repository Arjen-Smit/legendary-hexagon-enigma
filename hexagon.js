var createApp = require('canvas-testbed')

var THREE = require('three')
var OrbitControls = require('three-orbit-controls')(THREE);

createApp(render, start, {
    context: 'webgl',
    onResize: resize
})

var renderer,
        scene,
        camera,
        controls;

function start(gl, width, height) {
    renderer = new THREE.WebGLRenderer({
        canvas: gl.canvas
    })
    renderer.setClearColor(0x000000, 1.0)

    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(75, width / height, .1, 1000)
    camera.position.z = 90
    camera.lookAt(new THREE.Vector3())

    var dirLight = new THREE.DirectionalLight(0xffffff, 0.125);
    dirLight.position.set(0, 0, 100).normalize();
    scene.add(dirLight);

    var pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(0, 100, 90);
    scene.add(pointLight);

    controls = new OrbitControls(camera)
    addGrid();
    addField();
}

function addField() {
    var lines = 5;
    var grid = [];

    var geo = new THREE.CylinderGeometry(5, 5, .5, 6)
    var mat = new THREE.MeshPhongMaterial({color: 0x5baad7,  shading: THREE.FlatShading})

    for (var l=lines;l<=lines+lines-1;l++) {
        for (var i=1; i<=l; i++) {
            var box = new THREE.Mesh(geo, mat)

            box.position.setX((l * 8));
            box.position.setY((i * 9) - (l * 4.5) );
            box.rotateX(1.57);
            box.rotateY(1.57);
            scene.add(box);

            var mat = new THREE.MeshPhongMaterial({color: 0xffaad7,  shading: THREE.FlatShading})
        }
    }

    for (var l=lines+lines-2; l>= lines; l--) {
        for (var i=1; i<=l; i++) {
            var box = new THREE.Mesh(geo, mat)

            box.position.setX((lines * 8) - (l * 8));
            box.position.setY((i * 9) - (l * 4.5) );
            box.rotateX(1.57);
            box.rotateY(1.57);
            scene.add(box);

            var mat = new THREE.MeshPhongMaterial({color: 0xffaad7,  shading: THREE.FlatShading})
        }
    }

    scene.add(box);
}

function addGrid() {
    var planeW = 50; // pixels
    var planeH = 50; // pixels
    var numW = 5; // how many wide (50*50 = 2500 pixels wide)
    var numH = 5; // how many tall (50*50 = 2500 pixels tall)
    var plane = new THREE.Mesh(
        new THREE.PlaneGeometry( planeW*numW, planeH*numH, planeW, planeH ),
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true
        })
  );

  scene.add(plane);
}

function render(gl, width, height) {
    renderer.render(scene, camera)
}

function resize(width, height) {
    if (!renderer)
        return

    renderer.setViewport(0, 0, width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
}
