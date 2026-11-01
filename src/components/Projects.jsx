import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Github } from 'lucide-react'
import Split from './Split'
import Tilt from './Tilt'
import { projects, profile } from '../data'

function Project({ p, flip }) {
  const [open, setOpen] = useState(false)
  return (
    <article className="project" data-reveal>
      <Tilt className="project-visual" max={7}>
        <div className="layer l1" aria-hidden="true" />
        <div className="layer l2" aria-hidden="true" />
        <ol className="flow" aria-label={`${p.title} data flow`}>
          {p.flow.map((n) => <li key={n}>{n}</li>)}
        </ol>
      </Tilt>
      <div className="project-body">
        <span className={`status ${p.status === 'Built' ? 'built' : ''}`}>{p.status}</span>
        <h3 className="project-title">{p.title}</h3>
        <p className="project-kicker">{p.kicker}</p>
        <p>{p.description}</p>
        <button className="toggle" onClick={() => setOpen(!open)} aria-expanded={open}>
          Features <ChevronDown size={16} aria-hidden="true" className={open ? 'rot' : ''} />
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.ul className="features" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
              {p.features.map((f) => <li key={f}>{f}</li>)}
            </motion.ul>
          )}
        </AnimatePresence>
        <ul className="tags">{p.tech.map((t) => <li key={t}>{t}</li>)}</ul>
        {p.github
          ? <a className="btn btn-ghost" href={p.github} target="_blank" rel="noreferrer"><Github size={16} aria-hidden="true" /> View on GitHub</a>
          : <a className="btn btn-ghost" href={profile.github} target="_blank" rel="noreferrer"><Github size={16} aria-hidden="true" /> GitHub profile</a>}
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <Split text="Selected projects" className="section-title" />
      {projects.map((p) => <Project key={p.id} p={p} />)}
    </section>
  )
}
