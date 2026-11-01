import { useEffect } from 'react';

// Shared mutable input state read by the 3D scenes every frame (no React re-renders).
export const input = { x: 0, y: 0, scroll: 0 };

export function useInputTracking() {
  useEffect(() => {
    const move = (e) => {
      input.x = (e.clientX / window.innerWidth) * 2 - 1;
      input.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const scroll = () => {
      input.scroll = Math.min(window.scrollY / window.innerHeight, 3);
    };
    scroll();
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', scroll);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('resize', scroll);
    };
  }, []);
}
