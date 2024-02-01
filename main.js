import './style.css'
import {PerspectiveCamera,Scene,BoxGeometry,MeshNormalMaterial,Mesh,WebGLRenderer,BufferGeometry,BufferAttribute, MeshBasicMaterial,DoubleSide} from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls";
import {getStrokeGeometry} from "./src/utils/geometryUtils"
import {Point} from "./src/utils/Point"
 
const width = window.innerWidth, height = window.innerHeight;
let camera,scene,renderer,mesh,controls;
const points= [
  new Point(500, 100),
  new Point(100, 300),
  new Point(400, 500),
  new Point(600, 400),
]
const attr={
    cap:"round",
    join:"round",
    miterLimit: 10,
    width: 2,
}
function  init(){
  camera = new PerspectiveCamera( 70, width / height, 0.01, 1000 );
  camera.position.set(500, 50,100)
  camera.lookAt(500, 100,0)
  scene = new Scene();
  
  const geometry = new BoxGeometry( 0.2, 0.2, 0.2 );
  const pos=getStrokeGeometry(points,attr);
  const array=pos?.reduce((total,coord)=>{
    debugger
    total.push(coord.x,0,coord.y)
    return total;
  },[])
  const lineGeometry=new BufferGeometry();
  lineGeometry.setAttribute('position',new BufferAttribute(new Float32Array(array),3))
  debugger
  const material = new MeshBasicMaterial({
    side:DoubleSide,
    // wireframe:true
  });
  
  mesh = new Mesh( lineGeometry, material );
  scene.add( mesh );
  
  renderer = new WebGLRenderer( { antialias: true } );
  renderer.setSize( width, height );
  // renderer.setAnimationLoop( animation );
  controls = new OrbitControls( camera, renderer.domElement );
  document.body.appendChild( renderer.domElement );
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

// animation
function  render( scene, camera ) {
  controls.update(); 
	// mesh.rotation.x = time / 2000;
	// mesh.rotation.y = time / 1000;
	renderer.render( scene, camera );
}
function animate( time ) {
  requestAnimationFrame( animate );
  render(scene, camera)
}

init();
animate()