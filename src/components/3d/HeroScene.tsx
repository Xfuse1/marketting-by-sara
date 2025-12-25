import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { Float, RoundedBox, Sphere, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface HeroSceneProps {
  onConnect: () => void;
  isWeakDevice?: boolean;
}

const Avatar = () => {
  const headRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (headRef.current) {
      // Gentle breathing and head turn
      const t = state.clock.getElapsedTime();
      headRef.current.position.y = Math.sin(t * 0.5) * 0.05;
      headRef.current.rotation.y = Math.sin(t * 0.3) * 0.1;
      headRef.current.rotation.x = Math.cos(t * 0.2) * 0.05;
    }
  });

  return (
    <group position={[1.5, -1, 0]}>
      {/* Stylized Body */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.5, 0.7, 1.5, 32]} />
        <meshStandardMaterial color="#0b0f14" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Head */}
      <group ref={headRef} position={[0, 0.5, 0]}>
        <Sphere args={[0.4, 32, 32]}>
          <MeshDistortMaterial
            color="#0F94B9"
            speed={2}
            distort={0.3}
            radius={1}
            emissive="#0F94B9"
            emissiveIntensity={0.5}
          />
        </Sphere>
        {/* Glow behind head */}
        <pointLight intensity={1} color="#0F94B9" distance={2} />
      </group>

      {/* Arm holding plug */}
      <mesh position={[-0.6, -0.2, 0.5]} rotation={[0.5, 0, 0.4]}>
        <cylinderGeometry args={[0.1, 0.1, 1, 16]} />
        <meshStandardMaterial color="#0b0f14" />
      </mesh>
    </group>
  );
};

const DraggablePlug = ({ onConnect }: { onConnect: () => void }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [connected, setConnected] = useState(false);
  const plugRef = useRef<THREE.Group>(null);
  const [pos, setPos] = useState<[number, number, number]>([-1.5, -1.2, 1]);

  const targetSocket = new THREE.Vector3(2.5, 0, 0);

  const { springPos, springRotation, emissiveIntensity, bulbScale, plugScale } = useSpring({
    springPos: connected ? [2.5, 0, 0] : pos,
    springRotation: connected ? [0, 0, 0] : [0, 0, isDragging ? 0.2 : 0],
    emissiveIntensity: connected ? 10 : isDragging ? 1 : 0.2,
    bulbScale: connected ? 1 : 0,
    plugScale: connected ? 0.2 : 1,
    config: { mass: 1, tension: 170, friction: 26 }
  }) as any;

  const handlePointerDown = (e: any) => {
    if (connected) return;
    e.stopPropagation();
    setIsDragging(true);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    // Check distance to socket
    const currentPos = new THREE.Vector3(...pos);
    if (currentPos.distanceTo(targetSocket) < 1.0) {
      setConnected(true);
      setTimeout(onConnect, 1000);
    } else {
      // Snap back if not connected
      setPos([-1.5, -1.2, 1]);
    }
  };

  const handlePointerMove = (e: any) => {
    if (!isDragging || connected) return;

    // Project mouse to 3D space at a fixed depth
    const x = (e.intersections[0]?.point.x || e.point.x);
    const y = (e.intersections[0]?.point.y || e.point.y);
    setPos([x, y, 1]);
  };

  return (
    <animated.group
      ref={plugRef}
      position={springPos}
      rotation={springRotation}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      <animated.group scale={plugScale}>
        <Float speed={connected ? 0 : 2} rotationIntensity={0.2} floatIntensity={0.5}>
          <RoundedBox args={[1.2, 0.6, 0.6]} radius={0.1}>
            <meshStandardMaterial
              color={connected ? "#F0580E" : "#2a2a2a"}
              emissive={connected ? "#F0580E" : "#0F94B9"}
              emissiveIntensity={emissiveIntensity}
            />
          </RoundedBox>
          {/* Pins */}
          <mesh position={[0.7, 0.15, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <cylinderGeometry args={[0.05, 0.05, 0.4]} />
            <meshStandardMaterial color="#aaa" metalness={1} />
          </mesh>
          <mesh position={[0.7, -0.15, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <cylinderGeometry args={[0.05, 0.05, 0.4]} />
            <meshStandardMaterial color="#aaa" metalness={1} />
          </mesh>
          {/* Cable */}
          <mesh position={[-1.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.1, 1.5, 16]} />
            <meshStandardMaterial color="#111" />
          </mesh>
        </Float>
      </animated.group>

      {/* Light Bulb Morph Effect */}
      <animated.group scale={bulbScale}>
        <Sphere args={[0.8, 32, 32]}>
          <meshStandardMaterial
            color="#F0580E"
            emissive="#F0580E"
            emissiveIntensity={10}
            transparent
            opacity={0.9}
          />
        </Sphere>
        <pointLight intensity={10} color="#F0580E" distance={10} />
      </animated.group>
    </animated.group>
  );
};

const Socket = () => {
  return (
    <group position={[2.5, 0, 0]}>
      <RoundedBox args={[0.8, 1.5, 0.4]} radius={0.1}>
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.5} />
      </RoundedBox>
      <mesh position={[-0.41, 0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
        <circleGeometry args={[0.1]} />
        <meshBasicMaterial color="#000" />
      </mesh>
      <mesh position={[-0.41, -0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
        <circleGeometry args={[0.1]} />
        <meshBasicMaterial color="#000" />
      </mesh>
      {/* Glow highlight */}
      <rectAreaLight width={1} height={2} intensity={0.5} color="#0F94B9" position={[-0.5, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
    </group>
  );
};

export const HeroScene = ({ onConnect, isWeakDevice }: HeroSceneProps) => {
  if (isWeakDevice) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-darker">
        <div className="relative group cursor-pointer" onClick={() => onConnect()}>
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 group-hover:bg-primary/40 transition-all duration-700" />
          <div className="w-64 h-64 border-4 border-dashed border-primary/30 rounded-full flex items-center justify-center animate-spin-slow">
            <div className="w-48 h-48 bg-brand-gradient rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-white font-bold text-xl">CONNECT</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-5, 5, 5]} intensity={0.5} />

        <Avatar />
        <DraggablePlug onConnect={onConnect} />
        <Socket />

        {/* Particle/Dust effects */}
        <fog attach="fog" args={['#0b0f14', 5, 15]} />
      </Canvas>
    </div>
  );
};

export default HeroScene;
