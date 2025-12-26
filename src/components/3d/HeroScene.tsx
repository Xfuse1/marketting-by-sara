import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { Float, Sphere, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface HeroSceneProps {
  onConnect: () => void;
  isWeakDevice?: boolean;
}

const Avatar = () => {
  const headRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (headRef.current) {
      const t = state.clock.getElapsedTime();
      headRef.current.position.y = Math.sin(t * 0.5) * 0.05;
      headRef.current.rotation.y = Math.sin(t * 0.3) * 0.1;
    }
  });

  return (
    <group position={[0, -2, -2]}>
      {/* Moved Avatar slightly back to focus on interaction */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.5, 0.7, 1.5, 32]} />
        <meshStandardMaterial color="#0b0f14" roughness={0.1} metalness={0.8} />
      </mesh>
      <group ref={headRef} position={[0, 0.5, 0]}>
        <Sphere args={[0.4, 32, 32]}>
          <MeshDistortMaterial color="#0F94B9" speed={2} distort={0.3} radius={1} emissive="#0F94B9" emissiveIntensity={0.5} />
        </Sphere>
      </group>
    </group>
  );
};

// --- New "Slide to Unlock" Style Components ---

const GuideTrack = ({ start, end }: { start: THREE.Vector3, end: THREE.Vector3 }) => {
  const width = Math.abs(end.x - start.x);
  const center = (start.x + end.x) / 2;

  return (
    <group position={[center, start.y, 0]}>
      {/* The Track Line */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, width, 16]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Glow under track */}
      <mesh position={[0, -0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <planeGeometry args={[width, 0.2]} />
        <meshBasicMaterial color="#0F94B9" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
      {/* Arrows indicating direction */}
      <group position={[0, 0.2, 0]}>
        {[-1, 0, 1].map((offset) => (
          <mesh key={offset} position={[offset * 0.5, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <coneGeometry args={[0.08, 0.2, 3]} />
            <meshBasicMaterial color="#333" />
          </mesh>
        ))}
      </group>
    </group>
  );
};

const ActivationCore = ({ onClick }: { onClick: () => void }) => {
  const [hovered, setHovered] = useState(false);

  // Pulse effect
  const { scale, intensity } = useSpring({
    from: { scale: 1, intensity: 1 },
    to: async (next) => {
      while (true) {
        await next({ scale: 1.1, intensity: 2 });
        await next({ scale: 1, intensity: 1 });
      }
    },
    config: { duration: 1000 }
  }) as any;

  return (
    <animated.group
      position={[2.5, 0, 0]}
      scale={scale}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
    >
      {/* Outer Ring */}
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.8, 0.1, 16, 32]} />
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Inner Target Sphere */}
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <animated.meshStandardMaterial
          color="#000"
          emissive="#0F94B9"
          emissiveIntensity={intensity}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Target Ring Glow */}
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <ringGeometry args={[0.5, 0.7, 32]} />
        <meshBasicMaterial color="#0F94B9" transparent opacity={hovered ? 0.4 : 0.1} side={THREE.DoubleSide} />
      </mesh>

      <pointLight color="#0F94B9" intensity={2} distance={4} />
    </animated.group>
  );
};

const SlidingKey = ({ onConnect, autoTrigger }: { onConnect: () => void, autoTrigger: number }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [connected, setConnected] = useState(false);
  const [pos, setPos] = useState<[number, number, number]>([-2.5, 0, 0]);

  const startX = -2.5;
  const endX = 2.5;

  useEffect(() => {
    if (autoTrigger > 0 && !connected) {
      completeConnection();
    }
  }, [autoTrigger]);

  const completeConnection = () => {
    setConnected(true);
    onConnect();
  };

  const { springX } = useSpring({
    springX: connected ? endX - 0.5 : pos[0],
    config: { tension: 120, friction: 14 }
  }) as any;

  const handlePointerDown = (e: any) => {
    if (connected) return;
    e.stopPropagation();
    setIsDragging(true);
    document.body.style.cursor = 'grabbing';
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    document.body.style.cursor = 'auto';
    if (pos[0] > 0) { // If dragged past middle
      completeConnection();
    } else {
      setPos([startX, 0, 0]); // Snap back
    }
  };

  const handlePointerMove = (e: any) => {
    if (!isDragging || connected) return;
    // Constrain to track X axis
    const newX = Math.min(Math.max(e.point.x, startX), endX - 0.5);
    setPos([newX, 0, 0]);
  };

  return (
    <>
      <GuideTrack start={new THREE.Vector3(startX, 0, 0)} end={new THREE.Vector3(endX, 0, 0)} />

      <animated.group
        position-x={springX}
        position-y={0}
        position-z={0}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
      >
        <Float speed={connected ? 0 : 2} floatIntensity={0.2} floatingRange={[-0.1, 0.1]}>
          {/* The Key Object */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <capsuleGeometry args={[0.3, 1.2, 4, 16]} />
            <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Visual Handle / Grip */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.35, 0.05, 8, 16]} />
            <meshStandardMaterial color="#F0580E" emissive="#F0580E" emissiveIntensity={2} />
          </mesh>

          {/* Arrow inside key */}
          <mesh position={[0.2, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <coneGeometry args={[0.1, 0.3, 32]} />
            <meshBasicMaterial color="#F0580E" />
          </mesh>
        </Float>
      </animated.group>
    </>
  );
};

export const HeroScene = ({ onConnect, isWeakDevice }: HeroSceneProps) => {
  const [trigger, setTrigger] = useState(0);

  if (isWeakDevice) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-darker">
        <div className="relative group cursor-pointer" onClick={onConnect}>
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 group-hover:bg-primary/40 transition-all duration-700" />
          <div className="w-64 h-64 border-4 border-dashed border-primary/30 rounded-full flex items-center justify-center animate-spin-slow">
            <div className="w-48 h-48 bg-brand-gradient rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-white font-bold text-xl tracking-widest text-shadow">START</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 45 }}>
        <color attach="background" args={['#0b0f14']} />
        <fog attach="fog" args={['#0b0f14', 5, 15]} />

        <ambientLight intensity={0.5} />
        <pointLight position={[0, 5, 5]} intensity={1} color="#0F94B9" />
        <pointLight position={[0, -5, 5]} intensity={0.5} color="#A20870" />

        {/* Catch-all plane for easier dragging */}
        <mesh position={[0, 0, -1]} visible={false}>
          <planeGeometry args={[20, 10]} />
        </mesh>

        <Avatar />

        <group position={[0, 0, 0]}>
          <SlidingKey onConnect={onConnect} autoTrigger={trigger} />
          <ActivationCore onClick={() => setTrigger(t => t + 1)} />
        </group>

      </Canvas>
    </div>
  );
};

export default HeroScene;
