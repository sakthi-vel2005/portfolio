import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Loader({ onDone }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    let raf, start
    const tick = (t) => {
      start ??= t
      const p = Math.min((t - start) / 1600, 1)
      setN(Math.round(p * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(onDone, 250)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])
  return (
    <motion.div className="loader" role="status" aria-label="Loading portfolio"
      exit={{ y: '-100%' }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}>
      <div className="loader-count">{String(n).padStart(3, '0')}</div>
      <div className="loader-bar"><span style={{ transform: `scaleX(${n / 100})` }} /></div>
      <p>Sakthivel V</p>
    </motion.div>
  )
}
