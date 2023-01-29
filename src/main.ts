import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {Camera, MeshBasicMaterial, PerspectiveCamera, Scene} from "three";
//引入gui控制器
import gui_init from "./dat-gui/index";
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
// const cubeGeometry = new THREE.BoxGeometry(1,1,1)
const vertices = new Float32Array([
    1,1,1,
    1,-1,1,
    -1,-1,1,
    1,1,1,
    -1,-1,1,
    -1,1,1
])
const geometry = new THREE.BufferGeometry()
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
const cubeMaterial:MeshBasicMaterial = new  THREE.MeshBasicMaterial({ color: 0xffff00 })
// 创建物体
const cube = new THREE.Mesh(geometry,cubeMaterial)
scene.add(cube)

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(SCREEN_WIDTH,SCREEN_HEIGHT)
document.body.appendChild(renderer.domElement)
// 创建控制器
const controls:OrbitControls = new OrbitControls(camera,renderer.domElement)
// 设置阻尼，并需要在每一帧添加update
controls.enableDamping = true
// 创建坐标轴
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)
// 创建时间
const clock = new THREE.Clock()
// 适配屏幕
window.addEventListener("resize",()=>{
    //更新比例
    const newScreenRadio = window.innerWidth/window.innerHeight
    //更新相机投影矩阵
    camera.aspect = newScreenRadio
    camera.updateProjectionMatrix()
    //更新渲染器
    renderer.setSize(window.innerWidth,window.innerHeight)
    //设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio)

})
// 加载
const render = ()=>{
    //做1per/s的速度做匀速运动,5s为周期
    // const speed = 1 // 1per/s
    // const allTime = clock.getElapsedTime()
    // cube.position.x = allTime % 5 *speed
    controls.update()
    renderer.render(scene,camera)
    requestAnimationFrame(render)
}
render()
gui_init(cube)