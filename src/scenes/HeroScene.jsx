import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'
import FloatingObject from './FloatingObject'

function Particles({ count }) {
  const ref = useRef()
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const a = new Float32Array(count * 3)
    for (let i = 0; i < a.length; i++) a[i] = (Math.random() - 0.5) * 14
    g.setAttribute('position', new THREE.BufferAttribute(a, 3))
    return g
  }, [count])
  useEffect(() => () => geometry.dispose(), [geometry])
  useFrame((_, dt) => { ref.current.rotation.y += dt * 0.025 })
  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial size={0.025} color="#a99bff" transparent opacity={0.65} sizeAttenuation depthWrite={false} />
    </points>
  )
}

// Camera drift + a warm light that follows the pointer.
function Rig() {
  const light = useRef()
  useFrame(({ camera, pointer }) => {
    camera.position.x += (pointer.x * 0.7 - camera.position.x) * 0.04
    camera.position.y += (pointer.y * 0.45 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
    light.current.position.set(pointer.x * 5, pointer.y * 3, 3)
  })
  return <pointLight ref={light} color="#ff9a3c" intensity={30} distance={14} />
}

export default function HeroScene({ scrollRef, mobile }) {
  return (
    <>
      <color attach="background" args={['#07070a']} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[-4, 3, 2]} intensity={2} color="#6d5bff" />
      <directionalLight position={[4, -2, -2]} intensity={1.5} color="#3b82f6" />
      <Rig />
      <FloatingObject scrollRef={scrollRef} mobile={mobile} />
      <Particles count={mobile ? 250 : 900} />
      {/* Local studio lighting: no HDR download needed */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={4} position={[0, 5, -3]} scale={[10, 3, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={3} position={[-5, 0, 2]} scale={[2, 8, 1]} color="#7c6cff" />
        <Lightformer form="rect" intensity={2} position={[5, 0, 2]} scale={[2, 8, 1]} color="#4d8dff" />
        <Lightformer form="ring" intensity={2} position={[0, -3, 3]} scale={4} color="#ffb26b" />
      </Environment>
    </>
  )
}
