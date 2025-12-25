import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Instances, Instance } from '@react-three/drei';
import * as THREE from 'three';

const Particles = () => {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.08;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.15;
    }
  });

  return (
    <group ref={ref}>
      <Instances range={40}>
        <icosahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial
          color="#A20870"
          wireframe
          transparent
          opacity={0.4}
          emissive="#A20870"
          emissiveIntensity={0.3}
        />
        {Array.from({ length: 40 }).map((_, i) => (
          <Instance
            key={i}
            position={[
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 10 - 5
            ]}
            scale={Math.random() * 2.5 + 0.8}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          />
        ))}
      </Instances>
    </group>
  );
};

export const Global3DBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] bg-darker">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#F0580E" intensity={1} />
        <Particles />
        <fog attach="fog" args={['#0b0f14', 5, 25]} />
      </Canvas>
    </div>
  );
};

export default Global3DBackground;
