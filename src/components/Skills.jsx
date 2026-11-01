import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Split from './Split'
import { skillGroups } from '../data'

export default function Skills() {
  const [active, setActive] = useState(0)
  const group = skillGroups[active]
  return (
    <section id="skills" className="section skills">
      <Split text="Technical skills" className="section-title" />
      <div className="skills-grid">
        <div className="skill-tabs" role="tablist" aria-label="Skill groups">
          {skillGroups.map((g, i) => (
            <button key={g.name} role="tab" aria-selected={i === active} className={i === active ? 'on' : ''}
              onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}>
              {g.name}
            </button>
          ))}
        </div>
        <div className="skill-stage" role="tabpanel" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.ul key={group.name} className="skill-cloud"
              initial="hide" animate="show" exit="hide"
              variants={{ show: { transition: { staggerChildren: 0.06 } }, hide: { transition: { staggerChildren: 0.02, staggerDirection: -1 } } }}>
              {group.items.map((item, i) => (
                <motion.li key={item} style={{ '--d': `${(i % 4) * 0.7}s` }}
                  variants={{ hide: { opacity: 0, scale: 0.8, y: 20 }, show: { opacity: 1, scale: 1, y: 0 } }}>
                  <span className="chip">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
