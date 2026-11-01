import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Education from './components/Education'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useReducedMotion } from './hooks/useEnv'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [ready, setReady] = useState(false)
  const reduced = useReducedMotion()
  const done = useCallback(() => setReady(true), [])

  // Generic scroll reveals for anything marked data-reveal.
  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((el) =>
        gsap.from(el, { y: 60, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }))
    })
    return () => ctx.revert()
  }, [reduced])

  useEffect(() => { document.body.style.overflow = ready ? '' : 'hidden' }, [ready])

  return (
    <>
      <AnimatePresence>{!ready && <Loader key="loader" onDone={done} />}</AnimatePresence>
      <Navbar />
      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Hero ready={ready} />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Certifications />
        <Contact />
      </motion.main>
      <Footer />
    </>
  )
}
