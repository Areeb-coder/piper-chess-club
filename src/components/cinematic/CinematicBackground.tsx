'use client';

import React, { useRef, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, Float, PresentationControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import styles from './CinematicBackground.module.css';

class CanvasErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('WebGL Context lost or failed to create. Falling back to static background.', error);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

// A placeholder abstract chess piece (King)
function AbstractKing({ isMobile, ...props }: any) {
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

function ResponsiveScene() {
  const { viewport } = useThree();
  const isMobile = viewport.width < 6;

  // On mobile, use a much smaller scale and tuck it nicely to the bottom right
  const kingPosition: [number, number, number] = isMobile ? [1.2, -1.5, -1] : [2, -1, 0];
  const kingScale = isMobile ? 0.55 : 1;

  return (
    <>
      {/* Higher ambient light for mobile ensures pieces remain visible even if HDR fails to load */}
      <ambientLight intensity={isMobile ? 1.5 : 0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#3B82F6" />
      <pointLight position={[10, -10, 10]} intensity={1} color="#D4AF37" />

      <PresentationControls global snap={true} rotation={[0, 0.3, 0]} polar={[-Math.PI / 3, Math.PI / 3]} azimuth={[-Math.PI / 1.4, Math.PI / 2]}>
        <AbstractKing isMobile={isMobile} position={kingPosition} rotation={[0.2, -0.2, 0]} scale={kingScale} />
      </PresentationControls>

      <FloatingPiece position={isMobile ? [-2, 2.5, -5] : [-4, 2, -5]} scale={isMobile ? 0.6 : 0.8} speed={1} color="#ffffff" />
      <FloatingPiece position={isMobile ? [2, -1.5, -8] : [5, -3, -8]} scale={isMobile ? 0.9 : 1.2} speed={1.2} color="#D4AF37" />
      <FloatingPiece position={isMobile ? [-1.5, -2, -3] : [-3, -2, -3]} scale={isMobile ? 0.4 : 0.5} speed={2} color="#3B82F6" />

      {/* Re-enable WebGL features on mobile to maintain cinematic look */}
      <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
      
      <React.Suspense fallback={null}>
        <Environment preset="city" />
      </React.Suspense>
    </>
  );
}

export const CinematicBackground = () => {
  return (
    <div className={styles.backgroundContainer} style={{ zIndex: -1, position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none' }}>
      {/* Decorative HTML Layers */}
      <div className={styles.gridLayer} />
      <div className={styles.ghostMoves} />
      <div className={styles.lightTrails}>
        <div className={styles.trail} />
        <div className={styles.trail} />
        <div className={styles.trail} />
      </div>
      <div className={styles.fogLayer} />
      <div className={styles.particleLayer} />

      {/* 3D Scene */}
      <CanvasErrorBoundary>
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ResponsiveScene />
        </Canvas>
      </CanvasErrorBoundary>

      {/* Final Vignette/Overlay */}
      <div className={styles.darkOverlay} style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, #000 100%)', opacity: 0.8 }} />
    </div>
  );
};
