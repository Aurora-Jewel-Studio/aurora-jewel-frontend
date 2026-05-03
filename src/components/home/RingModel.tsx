"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, useGLTF, Float } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  CONFIGURATION                                                      */
/* ------------------------------------------------------------------ */

const CUSTOM_MODEL_PATH: string | null = "/3d/ring.glb";

/* ------------------------------------------------------------------ */
/*  Custom GLB/GLTF Model Ring                                         */
/* ------------------------------------------------------------------ */

interface CustomModelRingProps {
  scrollProgress: number;
  modelPath: string;
}

const CustomModelRing = ({
  scrollProgress,
  modelPath,
}: CustomModelRingProps) => {
  const groupRef = useRef<THREE.Group>(null!);
  const { scene } = useGLTF(modelPath);

  const startColor = useMemo(() => new THREE.Color("#043b26"), []); // Aurora Deep Green
  const endColor = useMemo(() => new THREE.Color("#043b26"), []); // Same — solid green, no transition

  const emeraldMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#043b26",
        metalness: 0.05,
        roughness: 0.02,
        transmission: 0.85,
        thickness: 0.5,
        envMapIntensity: 4,
        clearcoat: 1,
        clearcoatRoughness: 0,
        ior: 2.42,
        emissive: "#0D8A4E",
        emissiveIntensity: 0.4,
        transparent: true,
        opacity: 1,
      }),
    [],
  );

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);

    // Sterling silver material — realistic metal with soft highlights
    const silverMat = new THREE.MeshPhysicalMaterial({
      color: "#B5B7BB",
      metalness: 0.95,
      roughness: 0.05,
      envMapIntensity: 1.0,
      clearcoat: 0.3,
      clearcoatRoughness: 0.15,
      reflectivity: 0.5,
    });

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        // Assign Emerald/Diamond dynamic material to "Brillant_1" (the gemstone node)
        if (mesh.name.includes("Brillant")) {
          mesh.material = emeraldMat;
        } else {
          // Everything else is Silver metal
          mesh.material = silverMat;
        }
      }
    });
    return clone;
  }, [scene, emeraldMat]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Scale tracking completely managed in 3D WebGL (avoids pixelated DOM zoom)
    // Scale 1.5 is massive covering the screen, down to 0.3 normal ring size
    const startScale = 1.6;
    const endScale = 0.3;
    // We zoom out rapidly during the first 65% of the scroll journey
    const scaleProgress = Math.min(1, scrollProgress * 1.5);
    const currentScale = THREE.MathUtils.lerp(
      startScale,
      endScale,
      scaleProgress,
    );
    groupRef.current.scale.set(currentScale, currentScale, currentScale);

    // Initial Y offset to center the top gemstone in the viewport
    // then slide it back to 0 so the ring sits naturally
    const startY = -1.4;
    const endY = 0;
    const currentY = THREE.MathUtils.lerp(startY, endY, scaleProgress);
    groupRef.current.position.y +=
      (currentY - groupRef.current.position.y) * 0.1;

    // Rotate to show the ring from top (gemstone) first, then tilt down perfectly level
    const targetRotationX = (1 - scaleProgress) * (Math.PI / 2.5) + 0.1;
    // Standard rotation
    const targetRotationY = scrollProgress * Math.PI * 2;

    groupRef.current.rotation.x +=
      (targetRotationX - groupRef.current.rotation.x) * 0.1;
    groupRef.current.rotation.y +=
      (targetRotationY - groupRef.current.rotation.y) * 0.1;

    // Gemstone stays solid Aurora deep green — no color transition
  });

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} />
    </group>
  );
};

/* ------------------------------------------------------------------ */
/*  Procedural Silver Band                                             */
/* ------------------------------------------------------------------ */

const SilverBand = () => {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Create a more detailed ring geometry using a tube along a circular path
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      Array.from({ length: 64 }, (_, i) => {
        const angle = (i / 64) * Math.PI * 2;
        return new THREE.Vector3(
          Math.cos(angle) * 1.0,
          0,
          Math.sin(angle) * 1.0,
        );
      }),
      true,
      "catmullrom",
      0.5,
    );
    return new THREE.TubeGeometry(curve, 128, 0.12, 32, true);
  }, []);

  return (
    <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
      <meshPhysicalMaterial
        color="#C8C8CE"
        metalness={0.85}
        roughness={0.25}
        envMapIntensity={1.0}
        clearcoat={0.3}
        clearcoatRoughness={0.15}
        reflectivity={0.5}
      />
    </mesh>
  );
};

/* ------------------------------------------------------------------ */
/*  Green Gemstone                                                     */
/* ------------------------------------------------------------------ */

const Gemstone = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  // Create a custom gemstone shape — a pointed octahedron-like gem
  const gemGeometry = useMemo(() => {
    const geo = new THREE.OctahedronGeometry(0.22, 2);
    // Squash it slightly to look more gem-like
    geo.scale(1, 0.75, 1);
    return geo;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Subtle emissive pulse for sparkle effect
    const mat = meshRef.current.material as THREE.MeshPhysicalMaterial;
    const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.5 + 0.5;
    mat.emissiveIntensity = 0.15 + pulse * 0.25;

    // Glow pulse
    if (glowRef.current) {
      const glowMat = glowRef.current.material as THREE.MeshBasicMaterial;
      glowMat.opacity = 0.05 + pulse * 0.08;
    }
  });

  return (
    <group position={[0, 0.26, -1.0]}>
      {/* Main gemstone */}
      <mesh ref={meshRef} geometry={gemGeometry} castShadow>
        <meshPhysicalMaterial
          color="#0D8A4E"
          metalness={0.1}
          roughness={0.05}
          transmission={0.6}
          thickness={0.5}
          envMapIntensity={3}
          clearcoat={1}
          clearcoatRoughness={0}
          ior={2.42}
          emissive="#0D8A4E"
          emissiveIntensity={0.2}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Glow effect sphere behind the gemstone */}
      <mesh ref={glowRef} scale={1.8}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial
          color="#1AFF80"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Prong setting — 4 small prongs */}
      {[0, 90, 180, 270].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <mesh
            key={i}
            position={[Math.cos(rad) * 0.15, -0.06, Math.sin(rad) * 0.15]}
            scale={[0.02, 0.18, 0.02]}
          >
            <cylinderGeometry args={[1, 0.5, 1, 8]} />
            <meshPhysicalMaterial
              color="#C8C8CE"
              metalness={0.85}
              roughness={0.25}
              envMapIntensity={1.0}
            />
          </mesh>
        );
      })}
    </group>
  );
};

/* ------------------------------------------------------------------ */
/*  Sparkle Particles around the ring                                  */
/* ------------------------------------------------------------------ */

const SparkleParticles = () => {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, sizes } = useMemo(() => {
    const count = 60;
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.2 + Math.random() * 1.5;
      const height = (Math.random() - 0.5) * 1.5;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
      sz[i] = Math.random() * 0.03 + 0.01;
    }
    return { positions: pos, sizes: sz };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.15;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#C9A84C"
        size={0.025}
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

/* ------------------------------------------------------------------ */
/*  Main RingModel Component                                           */
/* ------------------------------------------------------------------ */

interface RingModelProps {
  scrollProgress: number;
}

const RingModel = ({ scrollProgress }: RingModelProps) => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Remove automatic spinning completely.
    // The model will now only move when the user scrolls, controlled by CustomModelRing.
  });

  return (
    <>
      {/* Pure black scene background */}
      <color attach="background" args={["#000000"]} />

      {/* Lighting setup — boosted for bright silver reflections */}
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={2}
        castShadow
        color="#FFFFFF"
      />
      <directionalLight
        position={[-3, 3, -5]}
        intensity={1.2}
        color="#E8F0FF"
      />
      <directionalLight position={[0, -3, 5]} intensity={0.8} color="#FFFFFF" />
      <spotLight
        position={[0, 5, 0]}
        intensity={1.5}
        angle={0.5}
        penumbra={1}
        color="#ffffff"
      />
      {/* Emerald accent light */}
      <pointLight
        position={[0, 1, -1]}
        intensity={0.6}
        color="#1AFF80"
        distance={4}
      />
      {/* Rim light from behind for silver edge highlights */}
      <pointLight
        position={[0, 0, -3]}
        intensity={1}
        color="#FFFFFF"
        distance={6}
      />

      {/* Environment for realistic reflections — boosted intensity */}
      <Environment preset="studio" environmentIntensity={2.5} />

      {/* Ring group */}
      <group ref={groupRef} rotation={[0.4, 0, 0]} scale={1.3}>
        {CUSTOM_MODEL_PATH ? (
          <CustomModelRing
            scrollProgress={scrollProgress}
            modelPath={CUSTOM_MODEL_PATH}
          />
        ) : (
          <>
            <SilverBand />
            <Gemstone />
          </>
        )}
        <SparkleParticles />
      </group>
    </>
  );
};

export default RingModel;
