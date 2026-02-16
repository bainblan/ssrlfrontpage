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
    // Initial position set by moveCamera() below

    // Lights — point light at the origin (the sun)
    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(0, 0, 0);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
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
      earth.scale.set(0.5, 0.5, 0.5);
      // Placed at radius 40, angle 0° (of 5)
      earth.position.x = Math.sin(0) * 40;
      earth.position.z = Math.cos(0) * 40;
      scene.add(earth);
    });

    // Sun model at the origin
    let sun: THREE.Object3D | null = null;
    gltfLoader.load("/simple_sun/scene.gltf", (gltf) => {
      sun = gltf.scene;
      sun.scale.set(3, 3, 3);
      sun.position.set(0, 0, 0);
      sun.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.emissive = new THREE.Color(0xffaa33);
          mat.emissiveIntensity = 1.5;
        }
      });
      scene.add(sun);
    });

    // Satellite
    let satellite: THREE.Object3D | null = null;
    let orbitAngle = 0;
    const orbitRadius = 5;
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
    // Placed at radius 40, angle 288° (5 of 5)
    moon.position.x = Math.sin((8 * Math.PI) / 5) * 40;
    moon.position.z = Math.cos((8 * Math.PI) / 5) * 40;

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
      pepe.scale.set(2, 2, 2);
      // Placed at radius 40, angle 144° (3 of 5)
      pepe.position.x = Math.sin((4 * Math.PI) / 5) * 40;
      pepe.position.z = Math.cos((4 * Math.PI) / 5) * 40;
      pepe.position.y = -3;
      scene.add(pepe);
    });

    // Satellite Dish (planet)
    let dish: THREE.Object3D | null = null;
    gltfLoader.load("/satellite_dish/scene.gltf", (gltf) => {
      dish = gltf.scene;
      dish.scale.set(4, 4, 4);
      // Placed at radius 40, angle 216° (4 of 5)
      dish.position.x = Math.sin((6 * Math.PI) / 5) * 40;
      dish.position.z = Math.cos((6 * Math.PI) / 5) * 40;
      dish.position.y = -4;
      scene.add(dish);
    });

    // Retro Computer (planet)
    let computer: THREE.Object3D | null = null;
    gltfLoader.load(
      "/retro_computer.glb",
      (gltf) => {
        computer = gltf.scene;
        computer.scale.set(0.1, 0.1, 0.1);
        // Placed at radius 40, angle 72° (2 of 5)
        computer.position.x = Math.sin((2 * Math.PI) / 5) * 40;
        computer.position.z = Math.cos((2 * Math.PI) / 5) * 40;
        computer.position.y = -3;
        scene.add(computer);
      },
      undefined,
      (error) => {
        console.error("Error loading computer model:", error);
      }
    );

    // Scroll Animation — camera flyby waypoints
    // All 5 planet angles and y-offsets
    const allAngles = [0, 1, 2, 3, 4].map((i) => (i * 2 * Math.PI) / 5);
    const allY = [0, -3, -3, -4, 0];
    // Visit order: Earth(0), Moon(4), Dish(3), Pepe(2), Computer(1)
    const visitOrder = [0, 4, 3, 2, 1];
    const cameraRadius = 30;
    const tangentOffset = 5;

    const waypoints = visitOrder.map((pi) => {
      const angle = allAngles[pi];
      // Radial direction (outward from origin)
      const rx = Math.sin(angle);
      const rz = Math.cos(angle);
      // Tangent direction (CW) — shifts lookAt so planet appears on the right
      const tx = rz;
      const tz = -rx;

      const planetX = rx * 40;
      const planetZ = rz * 40;

      return {
        pos: new THREE.Vector3(rx * cameraRadius, 1, rz * cameraRadius),
        lookAt: new THREE.Vector3(
          planetX + tx * tangentOffset,
          allY[pi],
          planetZ + tz * tangentOffset
        ),
      };
    });

    function smoothstep(t: number): number {
      return t * t * (3 - 2 * t);
    }

    const lookAtTarget = new THREE.Vector3();

    function moveCamera() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      // Hold at Earth until SPOC section reaches vertical center of screen
      const spocEl = document.getElementById("spoc-section");
      const spocThreshold = spocEl
        ? spocEl.offsetTop - window.innerHeight / 2
        : 0;

      let progress: number;
      if (scrollTop <= spocThreshold) {
        progress = 0;
      } else {
        const remaining = maxScroll - spocThreshold;
        progress = Math.min((scrollTop - spocThreshold) / remaining, 1);
      }

      const segments = waypoints.length - 1;
      const scaled = progress * segments;
      const idx = Math.min(Math.floor(scaled), segments - 1);
      const localT = smoothstep(scaled - idx);

      const from = waypoints[idx];
      const to = waypoints[Math.min(idx + 1, segments)];

      camera.position.lerpVectors(from.pos, to.pos, localT);
      lookAtTarget.lerpVectors(from.lookAt, to.lookAt, localT);
      camera.lookAt(lookAtTarget);
    }

    document.body.onscroll = moveCamera;
    moveCamera();

    // Animation Loop
    let animationId: number;

    function animate() {
      animationId = requestAnimationFrame(animate);

      moon.rotation.y += 0.005;

      if (sun) {
        sun.rotation.y += 0.003;
      }

      if (earth) {
        earth.rotation.y += 0.005;
      }

      if (dish) {
        dish.rotation.y += 0.005;
      }

      if (pepe) {
        pepe.rotation.y += 0.005;
      }

      if (computer) {
        computer.rotation.y += 0.005;
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
