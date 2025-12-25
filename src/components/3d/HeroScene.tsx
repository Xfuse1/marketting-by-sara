import { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { Float, RoundedBox, Sphere, MeshDistortMaterial, PerspectiveCamera, QuadraticBezierLine } from '@react-three/drei';
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
      headRef.current.rotation.x = Math.cos(t * 0.2) * 0.05;
    }
  });

  return (
    <group position={[1.8, -1, 0]}>
      {/* Stylized Body */}
      <mesh position={[0, -0.5, 0]} castShadow>
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
        <pointLight intensity={1} color="#0F94B9" distance={2} />
      </group>

      {/* Shoulder Joint for Cable */}
      <mesh position={[-0.4, -0.2, 0.2]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#111" />
      </mesh>
    </group>
  );
};

const DraggablePlug = ({ onConnect }: { onConnect: () => void }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [connected, setConnected] = useState(false);
  const [showSpark, setShowSpark] = useState(false);
  const plugRef = useRef<THREE.Group>(null);
  const [pos, setPos] = useState<[number, number, number]>([-1.8, -0.5, 1.5]);

  const targetSocket = new THREE.Vector3(2.5, 0.2, 0);
  const avatarShoulder = new THREE.Vector3(1.4, -1.2, 0.2);

  const { springPos, springRotation, emissiveIntensity, bulbScale, plugScale, cableOpacity } = useSpring({
    springPos: connected ? [2.1, 0.2, 0] : pos,
    springRotation: connected ? [0, Math.PI / 2, 0] : [0, 0, isDragging ? 0.2 : -0.2],
    emissiveIntensity: connected ? 15 : isDragging ? 2 : 0.4,
    bulbScale: connected ? 1.2 : 0,
    plugScale: connected ? 0.35 : 1,
    cableOpacity: connected ? 0.5 : 1,
    config: { mass: 1, tension: 180, friction: 28 }
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

    const currentPos = new THREE.Vector3(...pos);
    if (currentPos.distanceTo(targetSocket) < 1.2) {
      setConnected(true);
      setShowSpark(true);
      setTimeout(() => setShowSpark(false), 200);
      onConnect();
    } else {
      setPos([-1.8, -0.5, 1.5]);
    }
  };

  const handlePointerMove = (e: any) => {
    if (!isDragging || connected) return;
    const x = e.intersections[0]?.point.x || e.point.x;
    const y = e.intersections[0]?.point.y || e.point.y;
    // Constrain to reasonable area
    setPos([Math.min(Math.max(x, -4), 1.5), Math.min(Math.max(y, -3), 3), 1.5]);
  };

  return (
    <group>
      {/* Flexible Power Cable */}
      <QuadraticBezierLine
        start={avatarShoulder}
        end={new THREE.Vector3(...pos).add(new THREE.Vector3(-0.6, 0, 0))}
        mid={new THREE.Vector3((avatarShoulder.x + pos[0]) / 2, Math.min(avatarShoulder.y, pos[1]) - 1, (avatarShoulder.z + pos[2]) / 2)}
        color={connected ? "#F0580E" : "#111"}
        lineWidth={3}
        transparent
        opacity={cableOpacity}
      />

      <animated.group
        ref={plugRef}
        position={springPos}
        rotation={springRotation}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
      >
        <animated.group scale={plugScale}>
          <Float speed={connected ? 0 : 3} rotationIntensity={0.3} floatIntensity={0.8}>
            {/* Main Plug Body */}
            <RoundedBox args={[0.8, 0.5, 0.5]} radius={0.12} castShadow>
              <meshStandardMaterial
                color={connected ? "#F0580E" : "#1a1a1a"}
                emissive={connected ? "#F0580E" : "#0F94B9"}
                emissiveIntensity={emissiveIntensity}
                roughness={0.2}
                metalness={0.8}
              />
            </RoundedBox>

            {/* Detailed Pins */}
            <mesh position={[0.5, 0.12, 0]} rotation={[0, 0, -Math.PI / 2]}>
              <cylinderGeometry args={[0.045, 0.045, 0.5]} />
              <meshStandardMaterial color="#c0c0c0" metalness={1} roughness={0.1} />
            </mesh>
            <mesh position={[0.5, -0.12, 0]} rotation={[0, 0, -Math.PI / 2]}>
              <cylinderGeometry args={[0.045, 0.045, 0.5]} />
              <meshStandardMaterial color="#c0c0c0" metalness={1} roughness={0.1} />
            </mesh>

            {/* Cable Strain Relief */}
            <mesh position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.08, 0.12, 0.3, 16]} />
              <meshStandardMaterial color="#000" />
            </mesh>
          </Float>
        </animated.group>

        {/* Spark/Flash Effect on connection */}
        {showSpark && (
          <group position={[0.5, 0, 0]}>
            <Sphere args={[0.5, 16, 16]}>
              <meshBasicMaterial color="#fff" transparent opacity={0.8} />
            </Sphere>
            <pointLight intensity={50} color="#fff" distance={5} />
          </group>
        )}

        {/* Energy Aura when connected */}
        <animated.group scale={bulbScale}>
          <Sphere args={[1.2, 32, 32]}>
            <MeshDistortMaterial
              color="#F0580E"
              emissive="#F0580E"
              emissiveIntensity={5}
              transparent
              opacity={0.4}
              speed={4}
              distort={0.4}
            />
          </Sphere>
          <pointLight intensity={15} color="#F0580E" distance={12} />
        </animated.group>
      </animated.group>
    </group>
  );
};

const Socket = () => {
  return (
    <group position={[2.5, 0.2, 0]}>
      {/* Socket Wall Plate */}
      <RoundedBox args={[0.7, 1.2, 0.3]} radius={0.08} receiveShadow>
        <meshStandardMaterial color="#111" roughness={0.4} metalness={0.3} />
      </RoundedBox>

      {/* Decorative inner ring */}
      <mesh position={[-0.16, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.35, 0.35, 0.05, 32]} />
        <meshStandardMaterial color="#080808" />
      </mesh>

      {/* Socket Holes */}
      <mesh position={[-0.16, 0.12, 0]} rotation={[0, 0, Math.PI / 2]}>
        <circleGeometry args={[0.06]} />
        <meshBasicMaterial color="#000" />
      </mesh>
      <mesh position={[-0.16, -0.12, 0]} rotation={[0, 0, Math.PI / 2]}>
        <circleGeometry args={[0.06]} />
        <meshBasicMaterial color="#000" />
      </mesh>

      {/* Subtle "Power Available" Glow */}
      <mesh position={[-0.17, 0, 0]}>
        <circleGeometry args={[0.38]} />
        <meshBasicMaterial color="#0F94B9" transparent opacity={0.05} />
      </mesh>
      <rectAreaLight width={0.5} height={1} intensity={2} color="#0F94B9" position={[-0.2, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
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
              <span className="text-white font-bold text-xl tracking-widest text-shadow">CONNECT</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />

        <color attach="background" args={['#0b0f14']} />

        <ambientLight intensity={0.4} />
        <spotLight
          position={[5, 5, 5]}
          angle={0.15}
          penumbra={1}
          intensity={2}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-5, 5, 5]} intensity={1} color="#0F94B9" />
        <pointLight position={[0, -5, 5]} intensity={0.5} color="#A20870" />

        <Avatar />
        <DraggablePlug onConnect={onConnect} />
        <Socket />

        <fog attach="fog" args={['#0b0f14', 4, 12]} />
      </Canvas>
    </div>
  );
};

export default HeroScene;
