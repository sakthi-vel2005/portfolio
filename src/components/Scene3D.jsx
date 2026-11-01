import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import HeroScene from '../scenes/HeroScene'
import { useIsMobile, useReducedMotion } from '../hooks/useEnv'

// Lazy-loaded from Hero. Pauses rendering when scrolled out of view.
export default function Scene3D({ scrollRef }) {
  const wrap = useRef(null)
  const [visible, setVisible] = useState(true)
  const mobile = useIsMobile()
  const reduced = useReducedMotion()
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 })
    io.observe(wrap.current)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={wrap} className="scene" aria-hidden="true">
      <Canvas
        dpr={[1, mobile ? 1.5 : 2]}
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        gl={{ antialias: !mobile, powerPreference: 'high-performance' }}
        frameloop={reduced ? 'demand' : visible ? 'always' : 'never'}
      >
        <HeroScene scrollRef={scrollRef} mobile={mobile} />
      </Canvas>
    </div>
  )
}
