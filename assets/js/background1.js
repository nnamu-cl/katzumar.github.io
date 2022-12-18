var scene, renderer, camera, light, controls, ambLight, loader, stone 


scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
scene.background = 0x000000

renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
  });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//controls = new THREE.OrbitControls( camera, renderer.domElement );

window.addEventListener("resize", redimensionar)

function redimensionar() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
}


var mouse = {
    x: 0,
    y: 0,
}

const spheres = []
const stoneDisplacements = []

// light = new THREE.PointLight(0x229794, 2, 60)
// light.position.set(0, 0, 10)
// light.scale.set(10, 10, 10)
// scene.add(light)

const color = 0x966DFF
const intensity = 2
light = new THREE.PointLight(color, intensity, 50)
light.position.set(0, 0, 0.1)
light.scale.set(1, 1, 1)
scene.add(light)



ambLight = new THREE.AmbientLight(0x79DA2B, 0.02)
scene.add(ambLight)

loader = new THREE.GLTFLoader()
loader.load('./assets/stone/scene.gltf',
function(gltf){
for (let i = 0; i < 800; i++){
    let currentMesh = gltf.scene.clone()
    let scale = Math.random() / 200
    let xposition = Math.random() * 50 - 5
    let yposition = Math.random() * 50 - 5
    currentMesh.position.x = xposition
    currentMesh.position.y = yposition
    currentMesh.scale.set(scale, scale, scale)

    let dispalcement = {x: Math.random(), y:Math.random()}
    stoneDisplacements.push(dispalcement)

    scene.add(currentMesh)

    spheres.push(currentMesh)
}


})





// const geometry = new THREE.PlaneGeometry( 100, 100);
// const material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide} );

// const plane = new THREE.Mesh( geometry, material );
// plane.position.set(0, 0, 0)
// scene.add( plane );

const planeSize = 10000;
const plangeometry = new THREE.PlaneGeometry( planeSize,planeSize );
const planmaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( plangeometry, planmaterial );
//plane.rotateX( Math.PI / 2 );
scene.add( plane );



document.addEventListener("mousemove", onMouseMove, true)

function onMouseMove(event){
    event.preventDefault()

    mouse.x = (event.clientX/window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY/window.innerHeight) * 2 + 1

    let vector = new THREE.Vector3(mouse.x , mouse.y, .1)
    vector.unproject(camera)

    let dir = vector.sub(camera.position).normalize()

    let distance = -camera.position.z / dir.z
    let pos = camera.position.clone().add(dir.multiplyScalar(distance))

    light.position.copy(new THREE.Vector3(pos.x, pos.y, pos.z  + 0.16))
}

camera.position.set( 0, 0, 40);


//controls.update();

function animate() {
requestAnimationFrame( animate );
const timer = 0.0001 * Date.now()

camera.lookAt(scene.position)

for (let i = 5; i < spheres.length; i++){
    let sphere = spheres [i]
    let dispalcement = stoneDisplacements [i]
    let lerpSpeedx = .007/ dispalcement.x
    let lerpSpeedy = .007/ dispalcement.y
    let lerpSpeedz = .007/ dispalcement.x

    let targetXPosition = light.position.x + (Math.cos(timer + i * 0.8) * dispalcement.x * 30)
    let targetYPosition = light.position.y + (Math.sin(timer + i * 0.8) * dispalcement.y * 50)
    let targetZPosition = light.position.z + (Math.tan(timer + i * 0.4) * dispalcement.x * 40)

    let rotationSpeed = new THREE.Vector3(1, 1, 1)


    sphere.position.x = new THREE.Vector3().lerpVectors(sphere.position, new THREE.Vector3(targetXPosition, 0, 0), lerpSpeedx).x
    sphere.position.y = new THREE.Vector3().lerpVectors(sphere.position, new THREE.Vector3(0, targetYPosition, 0), lerpSpeedy).y
    sphere.position.z = new THREE.Vector3().lerpVectors(sphere.position, new THREE.Vector3(0, 0, targetZPosition), lerpSpeedz).z

    sphere.rotation.x += Math.PI * dispalcement.x/ (rotationSpeed.x * 40) 
    sphere.rotation.y += Math.PI * dispalcement.y/ (rotationSpeed.y * 40) 
    sphere.rotation.z += Math.PI * dispalcement.x/ (rotationSpeed.x * 40) 

}

//controls.update();

renderer.render( scene, camera );


};

animate();





// var light

// var mouse = {
// x: 0,
// y: 0
// };


// const spheres = [];

// var scene, camera, renderer, light
// scene = new THREE.Scene();
// camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );


// const controls = new THREE.OrbitControls( camera, renderer.domElement );


// //controls.update() must be called after any manual changes to the camera's transform
// controls.update();

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// //scene.add( cube );

// camera.position.set(0, 0, 32);



// const color = 0x0000ff;
// const intensity = 1;
// light = new THREE.PointLight(color, intensity, 30);
// light.position.set(0, 0, 0.1);
// light.scale.set( 1, 1, 1)
// scene.add(light);
// const helper = new THREE.PointLightHelper(light);
// //scene.add(helper);



// const spheregeo = new THREE.SphereGeometry( 0.1, 32, 16 );
// const spheremat = new THREE.MeshPhongMaterial( { color: 0xffffff} );

// for ( let i = 0; i < 700; i ++ ) {

// const mesh = new THREE.Mesh( spheregeo, spheremat );

// mesh.position.x = Math.random() * 50 - 5;
// mesh.position.y = Math.random() * 50 - 5;

// mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 5 + 2;

// scene.add( mesh );

// spheres.push( mesh );

// }



// const planeSize = 10000;
// const plangeometry = new THREE.PlaneGeometry( planeSize,planeSize );
// const planmaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
// const plane = new THREE.Mesh( plangeometry, planmaterial );
// //plane.rotateX( Math.PI / 2 );
// scene.add( plane );






// document.addEventListener('mousemove', onMouseMove, false);


// function onMouseMove(event) {

// event.preventDefault();
// mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
// mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

// // Make the sphere follow the mouse
// var vector = new THREE.Vector3(mouse.x, mouse.y, 0.1);
// vector.unproject(camera);
// var dir = vector.sub(camera.position).normalize();
// var distance = -camera.position.z / dir.z;
// var pos = camera.position.clone().add(dir.multiplyScalar(distance));
// //light.position.copy(pos);

// light.position.copy(new THREE.Vector3(pos.x, pos.y, pos.z + 0.5));


// }

// const animate = function () {
// requestAnimationFrame( animate );



// const timer = 0.0001 * Date.now();


// camera.lookAt( scene.position );

// for ( let i = 0, il = spheres.length; i < il; i ++ ) {

//     const sphere = spheres[ i ];

//     sphere.position.x = 60 * Math.cos( timer + i * 5);
//     sphere.position.y = 30 * Math.sin( timer + i * 5.1 );

// }

// renderer.render( scene, camera );
// };

// animate();