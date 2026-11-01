import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'

// Chrome torus-knot wrapped around a glassy core. Reacts to pointer + scroll.
export default function FloatingObject({ scrollRef, mobile }) {
  const group = useRef()
  const knot = useRef()
  useFrame((state, dt) => {
    const s = scrollRef.current
    const g = group.current
    g.rotation.y += dt * 0.15
    g.rotation.x += (state.pointer.y * 0.5 + s * 1.2 - g.rotation.x) * 0.04
    g.position.y += (s * 2.2 - g.position.y) * 0.06
    const sc = 1 + s * 0.6
    g.scale.setScalar(g.scale.x + (sc - g.scale.x) * 0.06)
    knot.current.rotation.z += dt * 0.12
  })
  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={group}>
        <mesh ref={knot}>
          <torusKnotGeometry args={[1, 0.3, mobile ? 128 : 256, mobile ? 16 : 32, 2, 3]} />
          <meshStandardMaterial color="#c9c7d6" metalness={1} roughness={0.14} envMapIntensity={1.4} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.55, mobile ? 0 : 1]} />
          {mobile
            ? <meshStandardMaterial color="#6d5bff" metalness={0.6} roughness={0.2} emissive="#3b2bd1" emissiveIntensity={0.6} />
            : <meshPhysicalMaterial color="#8b7bff" transmission={0.9} thickness={0.8} roughness={0.05} ior={1.4} emissive="#3b2bd1" emissiveIntensity={0.35} />}
        </mesh>
      </group>
    </Float>
  )
}
