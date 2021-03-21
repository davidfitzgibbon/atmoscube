import * as THREE from "three";

class Camera {
  constructor(sketch, settings) {
    this.sketch = sketch;
    this.settings = { ...settings };

    this.camera = new THREE.PerspectiveCamera(
      75,
      this.sketch.sizes.width / this.sketch.sizes.height,
      1,
      2000
    );
    this.camera.position.x = 0;
    this.camera.position.y = 1;
    this.camera.position.z = 6;
    this.sketch.scene.add(this.camera);

    return this.camera;
  }
}
export default Camera;
