'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PresentationControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import styles from './CinematicBackground.module.css';

// A placeholder abstract chess piece (King)
function AbstractKing(props: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1} floatingRange={[-0.1, 0.1]}>
      <mesh ref={meshRef} {...props}>
        {/* Abstract shape: a tall cylinder with a sphere on top */}
        <group>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.8, 1, 3, 32]} />
            <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} envMapIntensity={1} />
          </mesh>
          <mesh position={[0, 1.8, 0]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.2} envMapIntensity={2} />
          </mesh>
          <mesh position={[0, 2.5, 0]}>
            <boxGeometry args={[0.2, 0.6, 0.2]} />
            <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.2} />
          </mesh>
          <mesh position={[0, 2.5, 0]}>
            <boxGeometry args={[0.6, 0.2, 0.2]} />
            <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.2} />
          </mesh>
        </group>
      </mesh>
    </Float>
  );
}

// Floating generic piece
function FloatingPiece({ position, scale, speed, color }: any) {
  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={2} floatingRange={[-0.5, 0.5]}>
      <mesh position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.8} 
          roughness={0.2} 
          wireframe={true}
          transparent={true}
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
}

export const CinematicBackground = () => {
  return (
    <div className={styles.backgroundContainer} style={{ zIndex: -1, position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#3B82F6" />
        <pointLight position={[10, -10, 10]} intensity={1} color="#D4AF37" />

        <PresentationControls global config={{ mass: 2, tension: 500 }} snap={{ mass: 4, tension: 1500 }} rotation={[0, 0.3, 0]} polar={[-Math.PI / 3, Math.PI / 3]} azimuth={[-Math.PI / 1.4, Math.PI / 2]}>
          <AbstractKing position={[2, -1, 0]} rotation={[0.2, -0.2, 0]} />
        </PresentationControls>

        <FloatingPiece position={[-4, 2, -5]} scale={0.8} speed={1} color="#ffffff" />
        <FloatingPiece position={[5, -3, -8]} scale={1.2} speed={1.2} color="#D4AF37" />
        <FloatingPiece position={[-3, -2, -3]} scale={0.5} speed={2} color="#3B82F6" />

        <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
        <Environment preset="city" />
      </Canvas>
      <div className={styles.darkOverlay} style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, #000 100%)', opacity: 0.8 }} />
    </div>
  );
};
