import { lazy, Suspense, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download } from 'lucide-react'
import Magnetic from './Magnetic'
import { hasWebGL } from '../hooks/useEnv'
import { profile } from '../data'

const Scene3D = lazy(() => import('./Scene3D'))
const ease = [0.16, 1, 0.3, 1]

export default function Hero({ ready }) {
  const scrollRef = useRef(0)
  const webgl = useRef(hasWebGL()).current
  useEffect(() => {
    const onScroll = () => { scrollRef.current = Math.min(window.scrollY / window.innerHeight, 1) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const show = (delay) => ({
    initial: { y: '110%' }, animate: ready ? { y: 0 } : {},
    transition: { duration: 1.1, ease, delay }
  })
  return (
    <section id="top" className="hero">
      {webgl
        ? <Suspense fallback={<div className="scene scene-fallback" />}><Scene3D scrollRef={scrollRef} /></Suspense>
        : <div className="scene scene-fallback" aria-hidden="true"><div className="orb" /></div>}
      <div className="hero-copy">
        <h1 aria-label="Sakthivel V, Java Full Stack Developer">
          <span className="mask" aria-hidden="true">
            <motion.span className="hero-name" {...show(0)}>SAKTHIVEL V</motion.span>
          </span>
        </h1>
        <motion.div className="hero-meta" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 0.7, duration: 1 }}>
          <p className="hero-role">{profile.title}</p>
          <p className="hero-tag">Building intelligent digital experiences.</p>
          <div className="hero-cta">
            <Magnetic><a className="btn btn-solid" href="#projects">View projects</a></Magnetic>
            <Magnetic><a className="btn btn-ghost" href={profile.resume} download><Download size={16} aria-hidden="true" /> Download resume</a></Magnetic>
          </div>
        </motion.div>
      </div>
      <a className="scroll-cue" href="#about" aria-label="Scroll to explore">
        <span>Scroll to explore</span><ArrowDown size={16} aria-hidden="true" />
      </a>
    </section>
  )
}
