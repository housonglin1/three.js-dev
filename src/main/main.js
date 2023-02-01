import * as THREE from 'three'
import { OrbitControls } from  'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'

import * as dat from 'dat.gui'

// 控制物体的移动

// 1.创建场景
const scene =new THREE.Scene()

// 2创建相机
const camera =new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)

// 3.添加相机位置
camera.position.set(0,0,10)
scene.add(camera)

// 4.添加物体(添加几何体)
const cubeGeometry=new THREE.BoxGeometry(2,2,2)
// 设置物体颜色
const cubeMaterial=new THREE.MeshBasicMaterial({color:0xfff200})
// 根据几何体和材质创建物体
const cube =new THREE.Mesh(cubeGeometry,cubeMaterial)

cube.position.x=0
cube.scale.x=1
// cube.rotation.set(Math.PI/4,0,0)
//将几何体添加到场景
scene.add(cube)
const gui=new dat.GUI();
gui.add(cube.position,'x').min(0).max(5).step(0.01).name('移动轴调试').onChange((value)=>{
    console.log('修改值的大小',value)
}).onFinishChange((value)=>{
    console.log("完全停下来触发",value)
})

const params={
    color:"#ffff00",
    fn:()=>{
        gsap.to(cube.position,{x:5,duration:2,yoyo:true,repeat:-1})
    }
}
gui.addColor(params,'color').onChange((value)=>{
    console.log("改变物体颜色：改变的值",value)
    cube.material.color.set(value)
})

// 设置选项框
gui.add(cube,'visible').name('物体是否显示')

// 设置按钮点击触发某个时间
gui.add(params,'fn').name('立方体运动')

// 设置文件夹
var folder=gui.addFolder("设置文件夹")
folder.add(cube.material,'wireframe');
folder.add(params,'fn').name('立方体运动')










// 初始化渲染器
const renderer  =new THREE.WebGLRenderer()
// 设置渲染器大小
renderer.setSize(window.innerWidth,window.innerHeight)
// 将webgl渲染的canvas内容添加到body

document.body.appendChild(renderer.domElement)

// // 使用渲染器，通过相机将场景渲染进来
// renderer.render(scene,camera)

// 创建轨道控制器
const controls=new OrbitControls(camera,renderer.domElement)

// 设置控制器阻尼，让控制器更加真实效果
controls.enableDamping=true

//添加坐标轴f辅助器
const axesHelper=new THREE.AxesHelper(5)
scene.add(axesHelper)

// 设置时钟
const clock=new THREE.Clock();
gsap:{
    // repeat 重复多少次(-1是无限重复)
    // yoyo是否做往返运动
    // delay 延迟多少秒
}


// var animate1=gsap.to(cube.position,{x:5,duration:5,ease:'power1.inOut',repeat:-1,yoyo:true,delay:2, onComplete:()=>{
//         console.log("动画结束")
        
// },

// onStart:()=>{
//     console.log("动画开始")
// }
// })

gsap.to(cube.rotation,{x:2*Math.PI,duration:5,ease:'power1.inOut'})

function render(){
    // cube.position.x+=0.01;
    // cube.rotation.x+=0.01
    // if(cube.position.x>5){
    //     cube.position.x=0
    // }
    // let time=clock.getElapsedTime();
    // console.log(time,'运行总时长');
    // let t=time%5
    // cube.position.x=t*1
    // cube.rotation.x=t*1

    // if(cube.position.x>5){
    //     cube.position.x=0
    // }
   
    controls.update()
    renderer.render(scene,camera)
    // 渲染下一帧的时候就会调用render函数
    requestAnimationFrame(render)
}
render();

window,addEventListener('dblclick',()=>{
    // if(animate1.isActive()){
    //     animate1.pause()
    // }else{
    //     animate1.resume()
    // }

 })

window.addEventListener('resize',()=>{
    // 更新摄像头
    camera.aspect=window.innerWidth/window.innerHeight
    // 设置摄像机的投影矩阵
    camera.updateProjectionMatrix()

    // 更新渲染器
    renderer.setSize(window.innerWidth,window.innerHeight)

    // 设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio)
})

