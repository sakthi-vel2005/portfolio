import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../hooks/useEnv'

gsap.registerPlugin(ScrollTrigger)

// Word-by-word masked reveal, triggered on scroll.
export default function Split({ text, as: Tag = 'h2', className = '' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  useEffect(() => {
    if (reduced || !ref.current) return
    const ctx = gsap.context(() => {
      gsap.from('.w > span', {
        yPercent: 115, duration: 1, stagger: 0.035, ease: 'power4.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true }
      })
    }, ref)
    return () => ctx.revert()
  }, [reduced])
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span className="w" aria-hidden="true" key={i}><span>{w}</span></span>
      ))}
    </Tag>
  )
}
