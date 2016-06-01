var createApp = require('canvas-testbed')

var THREE = require('three')
var OrbitControls = require('three-orbit-controls')(THREE)

createApp(render, start, {
    context: 'webgl',
    onResize: resize
})

var renderer,
        scene,
        camera,
        controls

function start(gl, width, height) {
    renderer = new THREE.WebGLRenderer({
        canvas: gl.canvas
    })
    renderer.setClearColor(0x000000, 1.0)

    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000)
    camera.position.set(0, 50, -20)
    camera.lookAt(new THREE.Vector3())

    var dirLight = new THREE.DirectionalLight(0xffffff, 0.125);
    dirLight.position.set(0, 0, 1).normalize();
    scene.add(dirLight);

    var pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(0, 100, 90);
    scene.add(pointLight);

    controls = new OrbitControls(camera)

    var geo = new THREE.CylinderGeometry(5, 5, 1, 6)
    var mat = new THREE.MeshPhongMaterial({color: 0x5baad7})
    var box = new THREE.Mesh(geo, mat)
    scene.add(box)
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
