'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

/**
 * Custom cursor: a small Pegasus comb that trails the pointer with a soft
 * spring lag. Enabled only on fine-pointer (non-touch) devices, where it also
 * hides the native cursor via the `comb-cursor` class on <html>. Grows slightly
 * over interactive elements for affordance.
 */
export default function CombCursor() {
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.35 });

  const scale = useMotionValue(1);
  const sScale = useSpring(scale, { stiffness: 400, damping: 28 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;

    setEnabled(true);
    document.documentElement.classList.add('comb-cursor');

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      scale.set(el && el.closest('a, button, input, textarea, select, [role="button"]') ? 1.55 : 1);
    };
    const leave = () => scale.set(0); // tuck away when the pointer exits the window
    const enter = () => scale.set(1);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
      document.documentElement.classList.remove('comb-cursor');
    };
  }, [x, y, scale]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform"
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        <motion.img
          src="/images/comb.png"
          alt=""
          draggable={false}
          style={{ scale: sScale, rotate: 20 }}
          className="w-16 select-none drop-shadow-[0_5px_10px_rgba(16,16,20,0.4)]"
        />
      </div>
    </motion.div>
  );
}
