import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useFinePointer, useReducedMotion } from '../hooks/useEnv'

// Wraps a child so it drifts toward the pointer.
export default function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null)
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  useEffect(() => {
    const el = ref.current
    if (!el || !fine || reduced) return
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' })
    const move = (e) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * strength)
      yTo((e.clientY - (r.top + r.height / 2)) * strength)
    }
    const leave = () => { xTo(0); yTo(0) }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
      gsap.killTweensOf(el)
    }
  }, [fine, reduced, strength])
  return <span ref={ref} className="magnetic">{children}</span>
}
