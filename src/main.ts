import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {Camera, PerspectiveCamera, Scene} from "three";
//屏幕宽高
const SCREEN_WIDTH:number =  window.innerWidth
const SCREEN_HEIGHT:number = window.innerHeight
const SCREE_RADIO = SCREEN_WIDTH/SCREEN_HEIGHT
//创建场景
const scene:Scene = new THREE.Scene()
//创建相机
const camera:PerspectiveCamera = new THREE.PerspectiveCamera(50,SCREE_RADIO,.1,1000)
//设置相机位置
camera.position.set(0,0,10)
scene.add(camera)
// 创建立方体
const cubeGeometry = new THREE.BoxGeometry(1,1,1)
const cubeMaterial = new  THREE.MeshBasicMaterial({ color: 0xffff00 })
// 创建物体
const cube = new THREE.Mesh(cubeGeometry,cubeMaterial)
scene.add(cube)

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(SCREEN_WIDTH,SCREEN_HEIGHT)
document.body.appendChild(renderer.domElement)
// 创建控制器
const controls:OrbitControls = new OrbitControls(camera,renderer.domElement)
// 适配屏幕
window.addEventListener("resize",()=>{
    //更新比例
    const newScreenRadio = window.innerWidth/window.innerHeight
    camera.aspect = newScreenRadio
    //更新相机投影矩阵
    camera.updateProjectionMatrix()
    //更新渲染器
    renderer.setSize(window.innerWidth,window.innerHeight)
    //设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio)

})
// 加载
const render = ()=>{
    controls.update()
    renderer.render(scene,camera)
    requestAnimationFrame(render)
}
render()