import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// Pointer-driven 3D tilt (mouse only; touch is left alone).
export default function Tilt({ children, className = '', max = 8 }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), { stiffness: 160, damping: 16 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), { stiffness: 160, damping: 16 })
  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => { x.set(0); y.set(0) }
  return (
    <motion.div className={className} style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </motion.div>
  )
}
