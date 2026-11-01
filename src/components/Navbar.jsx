import { useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  ['about', 'About'], ['skills', 'Skills'], ['projects', 'Projects'],
  ['education', 'Journey'], ['contact', 'Contact']
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  return (
    <header className="nav">
      <motion.div className="nav-progress" style={{ scaleX }} />
      <a href="#top" className="nav-logo" aria-label="Sakthivel V, back to top">SV</a>
      <nav className="nav-links" aria-label="Primary">
        {links.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>
      <button className="nav-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav className="nav-sheet" aria-label="Mobile"
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            {links.map(([id, label], i) => (
              <motion.a key={id} href={`#${id}`} onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.05 * i } }}>
                {label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
