import * as THREE from "three";

class Lights {
  constructor(sketch, settings) {
    this.sketch = sketch;
    this.settings = { ...settings };

    this.ambient();
    this.directional();
  }
  ambient() {
    let ambLight = new THREE.AmbientLight(0xffffff, 0.7, 100);
    this.sketch.scene.add(ambLight);
  }
  directional() {
    let dirLight = new THREE.DirectionalLight(0xffffff, 1, 100);
    dirLight.position.set(-3, 5, -3);
    this.sketch.scene.add(dirLight);
  }
}
export default Lights;
