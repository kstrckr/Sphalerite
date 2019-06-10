
/// <reference path='three.js' />


const randomColor = () => "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});

const renderer = new THREE.WebGLRenderer();
const resFactor = 4
renderer.setSize( window.innerWidth/resFactor, window.innerHeight/resFactor, false);
document.body.appendChild( renderer.domElement );



const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0.5, 1, -25 );
camera.lookAt( 0, 0, 0 );

const scene = new THREE.Scene();

function spawnLineBox() {
    let material = new THREE.LineBasicMaterial(
        {
            color: randomColor(),
        }
    )

    let geometry = new THREE.BoxBufferGeometry(.1, 10, .1);
    let line = new THREE.Mesh( geometry, material );

    return line;
}

const theLineBox = spawnLineBox();

const lineBoxes = []

function animate() {
    let newLineBox = spawnLineBox()
    lineBoxes.push(newLineBox);
    scene.add(newLineBox);

    lineBoxes.forEach(x => {
        x.position.z -= 0.075;
        x.rotation.z += 0.05;

        if (x.position.z <= -30) {
            
            
            let trash = lineBoxes.shift();
            scene.remove(trash);
        }
    })

    console.log(lineBoxes.length);

    requestAnimationFrame(animate);

    // camera.rotation.z += 0.001;
    renderer.render(scene,camera);
}
animate();