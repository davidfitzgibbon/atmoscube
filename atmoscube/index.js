import * as THREE from "three";
import vertex from "./vertex";
import fragment from "./fragment";

class Atmoscube {
  constructor(sketch) {
    this.sketch = sketch;
    this.scene = sketch.scene;
    this.skybox;
    this.light = null;
    this.uniforms = {
      // sky
      topColorProxy: "#0077ff",
      bottomColorProxy: "#001133",
      topColor: { value: null },
      bottomColor: { value: null },
      offset: { value: 400 },
      exponent: { value: 0.6 },

      // sun
      sunColorProxy: "#ffd42c",
      sunColor: { value: null },
      sunAngle: { value: new THREE.Vector3(0, 0.2, -1) },
      sunSizeExponent: { value: 3 },
      sunOpacity: { value: 1 },
    };
    this.uniforms.topColor.value = new THREE.Color(this.uniforms.topColorProxy);
    this.uniforms.bottomColor.value = new THREE.Color(
      this.uniforms.bottomColorProxy
    );
    this.uniforms.sunColor.value = new THREE.Color(this.uniforms.sunColorProxy);

    this.material = null;
    this.create();
  }
  create() {
    // GEOMETRY
    let geometry = new THREE.BoxGeometry(1000, 1000, 1000, 1, 1, 1);

    // MATERIAL
    this.material = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      transparent: true,
      // depthTest: false,
      // depthWrite: false,
      uniforms: this.uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    // SKY
    this.sky = this.sketch.gui.addFolder("sky");
    this.sky
      .addColor(this.uniforms, "topColorProxy")
      .name("upper color")
      .onFinishChange(this.update.bind(this));
    this.sky
      .addColor(this.uniforms, "bottomColorProxy")
      .name("lower color")
      .onFinishChange(this.update.bind(this));
    this.sky.add(this.uniforms.offset, "value", -1000, 1000, 10).name("offset");
    this.sky.add(this.uniforms.exponent, "value", 0, 2, 0.1).name("exponent");

    // SUN
    this.sun = this.sketch.gui.addFolder("sun");
    this.sun
      .addColor(this.uniforms, "sunColorProxy")
      .name("color")
      .onFinishChange(this.update.bind(this));
    this.sun
      .add(this.uniforms.sunSizeExponent, "value", 1, 10, 0.1)
      .name("size");
    this.sun
      .add(this.uniforms.sunOpacity, "value", 0, 1, 0.01)
      .name("opacity")
      .onFinishChange(this.update.bind(this));

    this.sun
      .add(this.uniforms.sunAngle.value, "x", -1, 1, 0.01)
      .onFinishChange(this.update.bind(this));
    this.sun
      .add(this.uniforms.sunAngle.value, "y", -1, 1, 0.01)
      .onFinishChange(this.update.bind(this));
    this.sun
      .add(this.uniforms.sunAngle.value, "z", -1, 1, 0.01)
      .onFinishChange(this.update.bind(this));

    // MESH
    this.skybox = new THREE.Mesh(geometry, this.material);
    this.skybox.name = "atmoscube";

    this.scene.add(this.skybox);

    this.light = new THREE.DirectionalLight(
      this.uniforms.sunColor.value,
      this.uniforms.sunOpacity.value * 5
    );
    this.light.position.set(
      this.uniforms.sunAngle.value.x,
      this.uniforms.sunAngle.value.y,
      this.uniforms.sunAngle.value.z
    );
    this.light.castShadow = true;
    this.scene.add(this.light);
  }
  update() {
    this.material.uniforms.topColor.value = new THREE.Color(
      this.uniforms.topColorProxy
    );
    this.material.uniforms.bottomColor.value = new THREE.Color(
      this.uniforms.bottomColorProxy
    );
    this.material.uniforms.sunColor.value = new THREE.Color(
      this.uniforms.sunColorProxy
    );
    this.light.color = this.uniforms.sunColor.value;
    this.light.intensity = this.uniforms.sunOpacity.value;

    this.light.position.set(
      this.uniforms.sunAngle.value.x,
      this.uniforms.sunAngle.value.y,
      this.uniforms.sunAngle.value.z
    );
  }
}
export default Atmoscube;
