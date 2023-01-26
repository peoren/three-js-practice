import * as dat from "dat.gui"
import {Mesh} from "three";
const gui_init = (mesh:Mesh)=>{
    const gui = new dat.GUI();
    gui.add(mesh.position, "x", -5, 5,.01).name("x移动");
    gui.add(mesh.position, "y", -5, 5,.01).name("y移动");
    gui.add(mesh.position, "z", -5, 5,.01).name("z移动");
    const params = {
        rotateX:0,
        color:"#000000"
    }
    gui.add(params, "rotateX", 0,360).name("x旋转").onChange((value)=>{
        const angle = value / 360 * Math.PI;
        mesh.rotation.set(angle,0,0)
    });
    gui.addColor(params,"color").name("颜色").onChange((value)=>{
        // @ts-ignore
        mesh.material.color.set(value)
    })

}

export default gui_init