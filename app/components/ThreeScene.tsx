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
        .map(() => THREE.MathUtils.randFloatSpread(200));
      star.position.set(x, y, z);
      scene.add(star);
    }
    Array(300).fill(null).forEach(addStar);

    // Background
    const spaceTexture = new THREE.TextureLoader().load("/space.jpg");
    scene.background = spaceTexture;

    // Earth
    let earth: THREE.Object3D | null = null;
    const gltfLoader = new GLTFLoader();
    gltfLoader.load("/scene.gltf", (gltf) => {
      earth = gltf.scene;
      earth.scale.set(0.75, 0.75, 0.75);
      // Placed at radius 20, angle 0°
      earth.position.x = 0;
      earth.position.z = 20;
      scene.add(earth);
    });

    // Satellite
    let satellite: THREE.Object3D | null = null;
    let orbitAngle = 0;
    const orbitRadius = 9;
    const orbitSpeed = 0.01;

    gltfLoader.load("/satellite_model/scene.gltf", (gltf) => {
      satellite = gltf.scene;
      satellite.scale.set(0.5, 0.5, 0.5);
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
    // Placed at radius 20, angle 90°
    moon.position.x = Math.sin(Math.PI / 2) * 20;
    moon.position.z = Math.cos(Math.PI / 2) * 20;

    // Moon Rover
    let rover: THREE.Object3D | null = null;
    let roverAngle = 0;
    const roverOrbitRadius = 2.95; // just above moon surface (radius 3)
    const roverOrbitSpeed = 0.01;

    gltfLoader.load("/moon_rover/scene.gltf", (gltf) => {
      rover = gltf.scene;
      rover.scale.set(0.05, 0.05, 0.05);
      scene.add(rover);
    });

    // Pepe (planet)
    let pepe: THREE.Object3D | null = null;
    gltfLoader.load("/meme_pepe/scene.gltf", (gltf) => {
      pepe = gltf.scene;
      pepe.scale.set(1, 1, 1);
      // Placed at radius 20, angle 180°
      pepe.position.x = Math.sin(Math.PI) * 20;
      pepe.position.z = Math.cos(Math.PI) * 20;
      scene.add(pepe);
    });

    // Satellite Dish (planet)
    let dish: THREE.Object3D | null = null;
    gltfLoader.load("/satellite_dish/scene.gltf", (gltf) => {
      dish = gltf.scene;
      dish.scale.set(2, 2, 2);
      // Placed at radius 20, angle 270°
      dish.position.x = Math.sin((3 * Math.PI) / 2) * 20;
      dish.position.z = Math.cos((3 * Math.PI) / 2) * 20;
      scene.add(dish);
    });

    // Scroll Animation
    function moveCamera() {
      const t = document.body.getBoundingClientRect().top;
      moon.rotation.y += 0.02;

      if (earth) {
        earth.rotation.y += 0.02;
      }

      // Orbit camera around the origin based on scroll
      const cameraOrbitRadius = 30;
      const angle = t * -0.0005;
      camera.position.x = Math.sin(angle) * cameraOrbitRadius;
      camera.position.z = Math.cos(angle) * cameraOrbitRadius;
      // Always look at the origin
      camera.lookAt(0, 0, 0);
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

      if (dish) {
        dish.rotation.y += 0.005;
      }

      if (pepe) {
        pepe.rotation.y += 0.005;
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

      // Rover hugging moon surface
      if (rover) {
        roverAngle -= roverOrbitSpeed;
        rover.position.x =
          moon.position.x + Math.cos(roverAngle) * roverOrbitRadius;
        rover.position.z =
          moon.position.z + Math.sin(roverAngle) * roverOrbitRadius;
        rover.position.y = moon.position.y;
        // Face the direction of travel, tilted 90° so wheels touch the moon
        rover.rotation.x = Math.PI / 2;
        rover.rotation.z = roverAngle - Math.PI / 2;
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

  return <canvas id="bg" ref={canvasRef} className="fixed top-0 left-0 z-0" />;
}
