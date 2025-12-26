import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Plane, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FluidMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <Plane args={[30, 30, 32, 32]} rotation={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#020406"
        speed={1.5}
        distort={0.4}
        radius={1}
      >
        {/* Custom gradient behavior via lights */}
      </MeshDistortMaterial>
    </Plane>
  );
};

const LightSystem = () => {
  const light1 = useRef<THREE.PointLight>(null);
  const light2 = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (light1.current) {
      light1.current.position.x = Math.sin(t * 0.5) * 10;
      light1.current.position.y = Math.cos(t * 0.3) * 10;
    }
    if (light2.current) {
      light2.current.position.x = Math.cos(t * 0.4) * -10;
      light2.current.position.y = Math.sin(t * 0.6) * -10;
    }
  });

  return (
    <>
      <pointLight ref={light1} distance={20} intensity={15} color="#0F94B9" />
      <pointLight ref={light2} distance={20} intensity={10} color="#A20870" />
      <ambientLight intensity={0.2} />
    </>
  );
};

export const Global3DBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#020406]">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 2]}>
        <LightSystem />
        <FluidMesh />
        <fog attach="fog" args={['#020406', 2, 10]} />
      </Canvas>
    </div>
  );
};

export default Global3DBackground;
