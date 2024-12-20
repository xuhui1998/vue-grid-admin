<template>
  <div id="canvasContainer" ref="canvasContainer" :style="canvasSize"></div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, nextTick, computed } from 'vue';
  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

  const props = withDefaults(
    defineProps<{
      size: [number, number];
    }>(),
    {
      size: () => [100, 100],
    }
  );

  const canvasSize = computed(() => {
    return {
      width: `${props.size[0]}px`,
      height: `${props.size[1]}px`,
    };
  });

  const canvasContainer = ref<HTMLElement>();
  const initThreeJS = () => {
    const container = canvasContainer.value;
    const w = container.clientWidth;
    const h = container.clientHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(60, w / h, 0.001, 1000);
    camera.position.set(0, 3, 24);
    camera.lookAt(scene.position);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(w, h);
    // renderer.setClearColor(0x160016, 1);
    renderer.setClearColor(0x000000, 0); // 设置清除颜色为完全透明
    document.getElementById('canvasContainer').appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    // controls.enableDamping = true;
    // controls.enablePan = false;

    // const geometry = new THREE.SphereGeometry(1, 64, 64);
    const count1 = 50000;
    const count2 = 100000;

    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const sizes = [];
    const shifts = [];
    for (let i = 0; i < count1 + count2; i++) {
      const theta = Math.random() * Math.PI * 2;
      // let phi = Math.random() * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      const angle = (Math.random() * 0.9 + 0.1) * Math.PI * 0.1;
      const strength = Math.random() * 0.9 + 0.1; // 0.1-1.0
      shifts.push(theta, phi, angle, strength);

      const size = Math.random() * 1.5 + 0.5; // 0.5-2.0
      sizes.push(size);

      if (i < count1) {
        // 中心球体粒子
        const r = Math.random() * 0.5 + 9.5;
        const { x, y, z } = new THREE.Vector3()
          .randomDirection()
          .multiplyScalar(r);
        positions.push(x, y, z);
      }
    }

    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizes, 1));
    geometry.setAttribute(
      'aShift',
      new THREE.Float32BufferAttribute(shifts, 4)
    );

    const vertexShader = /* GLSL */ `
  attribute float aSize;
  attribute vec4 aShift;

  uniform float uTime;

  varying vec3 vColor;

  const float PI = 3.141592653589793238;

  void main() {
      // float d = abs(position.y) / 10.0;
      float d = length(abs(position) / vec3(40., 10., 40.)); // 中间黄色、外面紫色
      d = clamp(d, 0., 1.);
      
      // rgb(227, 155, 0)
      // rgb(100, 50, 255)
      vec3 color1 = vec3(227., 155., 0.);
      vec3 color2 = vec3(100., 50., 255.);
      vColor = mix(color1, color2, d) / 255.;

      vec3 transformed = position;
      float theta = mod(aShift.x + aShift.z * uTime, PI * 2.);
      float phi = mod(aShift.y + aShift.z * uTime, PI * 2.);
      transformed += vec3(sin(phi) * cos(theta), cos(phi), sin(phi) * sin(theta)) * aShift.w;
      
      vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
      gl_PointSize = aSize * 50.0 / -mvPosition.z;
      gl_Position = projectionMatrix * mvPosition;
  }
`;

    const fragmentShader = /* GLSL */ `
  varying vec3 vColor;

  void main() {
    float d = length(gl_PointCoord.xy - 0.5);
    if (d > 0.5) discard;
    // gl_FragColor = vec4(vColor, step(0.5, 1.0 - d));
    gl_FragColor = vec4(vColor, smoothstep(0.5, 0.1, d));
  }
`;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
    });

    // const mesh = new THREE.Mesh(geometry, material);
    const mesh = new THREE.Points(geometry, material);
    mesh.rotation.order = 'ZYX';
    mesh.rotation.z = 0.2;
    scene.add(mesh);

    // let time = 0;
    const clock = new THREE.Clock();

    function render() {
      // time += 0.05;
      const time = clock.getElapsedTime();
      mesh.rotation.y = time * 0.1;
      material.uniforms.uTime.value = time;
      renderer.render(scene, camera);
      controls.update();

      requestAnimationFrame(render);
    }

    render();
  };

  onMounted(() => {
    nextTick(() => {
      initThreeJS();
    });
  });
</script>

<script lang="ts">
  export default {
    name: 'ParticleBall',
  };
</script>

<style lang="less" scoped></style>
