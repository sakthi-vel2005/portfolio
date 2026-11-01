import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { input } from '../hooks/useInput';

export default function Particles({ count = 600 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const r = 4 + Math.random() * 6;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      a[i * 3] = r * Math.sin(ph) * Math.cos(th);
      a[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.7;
      a[i * 3 + 2] = r * Math.cos(ph) - 2;
    }
    return a;
  }, [count]);

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    ref.current.rotation.y += d * 0.02;
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, input.y * 0.06, 2, d);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#b9a8ff"
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}
