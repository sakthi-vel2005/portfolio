import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import StudioEnv from './StudioEnv';

const KINDS = ['ico', 'knot', 'oct', 'dodeca', 'torus', 'box', 'tetra'];
const POSITIONS = [
  [-2.7, 1.5, 0], [0, 1.7, -0.4], [2.7, 1.4, 0],
  [-3.1, -1.2, 0.2], [-0.9, -1.5, 0.3], [1.5, -1.3, 0.4], [3.3, -1.1, -0.2],
];

function Geometry({ kind }) {
  switch (kind) {
    case 'knot': return <torusKnotGeometry args={[0.38, 0.13, 100, 16]} />;
    case 'oct': return <octahedronGeometry args={[0.6]} />;
    case 'dodeca': return <dodecahedronGeometry args={[0.55]} />;
    case 'torus': return <torusGeometry args={[0.4, 0.17, 20, 48]} />;
    case 'box': return <boxGeometry args={[0.7, 0.7, 0.7]} />;
    case 'tetra': return <tetrahedronGeometry args={[0.65]} />;
    default: return <icosahedronGeometry args={[0.55, 0]} />;
  }
}

function Shape({ group, kind, position, index, active, onSelect }) {
  const mesh = useRef();
  const [hover, setHover] = useState(false);

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    mesh.current.rotation.x += d * 0.3;
    mesh.current.rotation.y += d * 0.4;
    const s = active ? 1.3 : hover ? 1.12 : 0.88;
    mesh.current.scale.setScalar(THREE.MathUtils.damp(mesh.current.scale.x, s, 6, d));
  });

  return (
    <Float speed={1.4 + index * 0.15} floatIntensity={1.1} rotationIntensity={0.2}>
      <group position={position}>
        <mesh
          ref={mesh}
          onClick={() => onSelect(group.id)}
          onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
          onPointerOut={() => setHover(false)}
        >
          <Geometry kind={kind} />
          <meshPhysicalMaterial
            color={active ? group.color : '#bdb7d6'}
            emissive={active ? group.color : '#000000'}
            emissiveIntensity={0.3}
            metalness={1}
            roughness={active ? 0.12 : 0.32}
            clearcoat={1}
            envMapIntensity={1.4}
          />
        </mesh>
        <Html position={[0, -0.95, 0]} center zIndexRange={[5, 0]} style={{ pointerEvents: 'none' }}>
          <span className={`shape-label${active ? ' is-active' : ''}`}>{group.label}</span>
        </Html>
      </group>
    </Float>
  );
}

export default function SkillsScene({ groups, activeId, onSelect }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7.5], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 3, 4]} intensity={40} color="#8466ff" decay={2} />
        <pointLight position={[3, -3, 3]} intensity={25} color="#ff8a3d" decay={2} />
        <StudioEnv />
        {groups.map((g, i) => (
          <Shape
            key={g.id}
            group={g}
            kind={KINDS[i % KINDS.length]}
            position={POSITIONS[i % POSITIONS.length]}
            index={i}
            active={g.id === activeId}
            onSelect={onSelect}
          />
        ))}
      </Suspense>
    </Canvas>
  );
}
