"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function ThreeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);
    camera.position.setX(-3);

    // Lights
    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(5, 5, 5);
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(pointLight, ambientLight);

    // Stars
    function addStar() {
      const geometry = new THREE.SphereGeometry(0.25, 24, 24);
      const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(geometry, material);
      const [x, y, z] = Array(3)
        .fill(null)
        .map(() => THREE.MathUtils.randFloatSpread(100));
      star.position.set(x, y, z);
      scene.add(star);
    }
    Array(200).fill(null).forEach(addStar);

    // Background
    const spaceTexture = new THREE.TextureLoader().load("/space.jpg");
    scene.background = spaceTexture;

    // Earth
    let earth: THREE.Object3D | null = null;
    const gltfLoader = new GLTFLoader();
    gltfLoader.load("/scene.gltf", (gltf) => {
      earth = gltf.scene;
      earth.scale.set(0.75, 0.75, 0.75);
      earth.position.z = 30;
      earth.position.x = -10;
      scene.add(earth);
    });

    // Satellite
    let satellite: THREE.Object3D | null = null;
    let orbitAngle = 0;
    const orbitRadius = 8;
    const orbitSpeed = 0.01;

    gltfLoader.load("/satellite_model/scene.gltf", (gltf) => {
      satellite = gltf.scene;
      satellite.scale.set(0.25, 0.25, 0.25);
      scene.add(satellite);
    });

    // Moon
    const moonTexture = new THREE.TextureLoader().load("/moon.jpg");
    const normalTexture = new THREE.TextureLoader().load("/normal.jpg");
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(3, 32, 32),
      new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture,
      })
    );
    scene.add(moon);
    moon.position.z = -5;
    moon.position.x = 2;

    // Scroll Animation
    function moveCamera() {
      const t = document.body.getBoundingClientRect().top;
      moon.rotation.y += 0.075;

      if (earth) {
        earth.rotation.y += 0.01;
      }

      camera.position.z = t * -0.01;
      camera.position.x = t * -0.0002;
      camera.rotation.y = t * -0.0002;
    }

    document.body.onscroll = moveCamera;
    moveCamera();

    // Animation Loop
    let animationId: number;

    function animate() {
      animationId = requestAnimationFrame(animate);

      moon.rotation.y += 0.005;

      if (earth) {
        earth.rotation.y += 0.005;
      }

      if (satellite && earth) {
        orbitAngle += orbitSpeed;
        satellite.position.x =
          earth.position.x + Math.cos(orbitAngle) * orbitRadius;
        satellite.position.z =
          earth.position.z + Math.sin(orbitAngle) * orbitRadius;
        satellite.position.y =
          earth.position.y + Math.sin(orbitAngle * 0.5) * 2;
        satellite.rotation.y += 0.01;
      }

      renderer.render(scene, camera);
    }

    animate();

    // Resize handler
    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      document.body.onscroll = null;
      renderer.dispose();
    };
  }, []);

  return <canvas id="bg" ref={canvasRef} />;
}
