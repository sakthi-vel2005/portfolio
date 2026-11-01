import { useEffect, useState } from 'react'

export function useMedia(query) {
  const get = () => typeof window !== 'undefined' && window.matchMedia(query).matches
  const [match, setMatch] = useState(get)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = (e) => setMatch(e.matches)
    setMatch(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return match
}
export const useIsMobile = () => useMedia('(max-width: 768px)')
export const useReducedMotion = () => useMedia('(prefers-reduced-motion: reduce)')
export const useFinePointer = () => useMedia('(pointer: fine)')

export function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
  } catch {
    return false
  }
}
