import * as THREE from "three";

import Scene from "./scene";
import Renderer from "./renderer";
import Controls from "./controls";
import Camera from "./camera";
import Lights from "./lights";
import Events from "./events";
import Animator from "./animator";
import Atmoscube from "../atmoscube/index.js";
import gui from "./gui";
import { TextureLoader } from "three";

class Sketch {
  constructor(sketch) {
    this.gui = gui;
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.scene = new Scene(this);
    this.renderer = new Renderer(this);
    this.camera = new Camera(this);
    this.lights = new Lights(this);
    this.controls = new Controls(this);
    this.events = new Events(this);
    this.animator = new Animator(this);
    this.atmoscube = new Atmoscube(this);
  }
  init() {
    this.addObjects();
    document.body.appendChild(this.renderer.domElement);
    this.animator.animate();
  }
  addObjects() {
    console.log(this.atmoscube);

    let cubeG = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
    let cubeM = new THREE.MeshStandardMaterial({ color: 0x005599 });
    let cube = new THREE.Mesh(cubeG, cubeM);
    cube.castShadow = true;
    this.scene.add(cube);

    let groundG = new THREE.PlaneGeometry(100, 100);
    let groundM = new THREE.MeshStandardMaterial({ color: 0x00a500 });
    let ground = new THREE.Mesh(groundG, groundM);
    ground.rotation.x = Math.PI * -0.5;
    ground.position.y = -0.5;
    ground.receiveShadow = true;
    this.scene.add(ground);
  }
}

export default Sketch;
