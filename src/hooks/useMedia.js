import { useEffect, useState } from 'react';

export function useMediaQuery(query) {
  const get = () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false);
  const [matches, setMatches] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

export const useIsMobile = () => useMediaQuery('(max-width: 767px)');
export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');

let webglSupport;
export function hasWebGL() {
  if (webglSupport !== undefined) return webglSupport;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    webglSupport = !!gl;
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}
