import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Split from './Split'
import { useReducedMotion } from '../hooks/useEnv'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { when: '2022 – 2026', title: 'B.Tech Information Technology', where: 'Vel Tech Multi Tech College, Avadi, Tiruvallur', note: 'CGPA 7.48' },
  { when: 'Training', title: 'Java Full Stack Development', where: 'Tap Academy', note: 'Core Java, JDBC, Servlets, JSP, Hibernate, SQL and database management; backend development, CRUD operations and AI integration.' },
  { when: 'Schooling', title: 'Sowdambikaa Matric Hr. Sec. School', where: 'Tiruchirappalli', note: 'Class XII (BioMaths) 74.26%. Class X 85%.' }
]

export default function Education() {
  const root = useRef(null)
  const reduced = useReducedMotion()
  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.tl-line', { scaleY: 0 }, {
        scaleY: 1, ease: 'none', transformOrigin: 'top',
        scrollTrigger: { trigger: '.tl', start: 'top 70%', end: 'bottom 70%', scrub: true }
      })
      gsap.utils.toArray('.tl-item').forEach((el) =>
        gsap.from(el, { x: -40, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 80%', once: true } }))
    }, root)
    return () => ctx.revert()
  }, [reduced])
  return (
    <section id="education" className="section education" ref={root}>
      <Split text="Education and training" className="section-title" />
      <div className="tl">
        <span className="tl-line" aria-hidden="true" />
        <ol>
        {steps.map((s) => (
          <li className="tl-item" key={s.title}>
            <span className="tl-dot" aria-hidden="true" />
            <p className="tl-when">{s.when}</p>
            <h3>{s.title}</h3>
            <p className="tl-where">{s.where}</p>
            <p>{s.note}</p>
          </li>
        ))}
        </ol>
      </div>
    </section>
  )
}
