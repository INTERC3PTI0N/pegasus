'use client';

import React, { useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
} from 'motion/react';

/**
 * FloatingComb — the hero Pegasus comb photograph travelling the whole page
 * on a choreographed 3D path. A heavily-damped spring trails the scroll
 * position so the comb glides at its own speed (parallax), while the mouse
 * adds a subtle specular tilt. It is fixed, pointer-events-none, and its
 * waypoints are measured from the real section positions so it docks into
 * empty layout slots and never covers copy.
 */

interface Pose {
  x: number; // vw offset from centre
  y: number; // vh offset from centre
  rz: number;
  rx: number;
  ry: number;
  s: number;
  o: number;
}

// Docked pose for each section, in document order.
const POSES: { id: string; pose: Pose }[] = [
  { id: 'hero',           pose: { x: 0,   y: 0,   rz: -4,  rx: 8,  ry: -6,  s: 0.6,  o: 0 } },
  { id: 'about',          pose: { x: 30,  y: 6,   rz: -10, rx: 16, ry: 12,  s: 0.34, o: 0.9 } },
  { id: 'products',       pose: { x: -40, y: -4,  rz: 10,  rx: 20, ry: -16, s: 0.24, o: 0.9 } },
  { id: 'technology',     pose: { x: 40,  y: -18, rz: 12,  rx: 24, ry: -14, s: 0.24, o: 0.9 } },
  { id: 'philosophy',     pose: { x: -40, y: 16,  rz: -12, rx: 22, ry: 16,  s: 0.24, o: 0.9 } },
  { id: 'sustainability', pose: { x: 40,  y: -22, rz: 12,  rx: 28, ry: -14, s: 0.22, o: 0.9 } },
  { id: 'journal',        pose: { x: -40, y: 26,  rz: -14, rx: 30, ry: 18,  s: 0.22, o: 0.9 } },
  { id: 'who-we-serve',   pose: { x: 37,  y: -30, rz: 18,  rx: 32, ry: 12,  s: 0.22, o: 0.9 } },
  { id: 'brochure',       pose: { x: -40, y: 24,  rz: -16, rx: 28, ry: 16,  s: 0.24, o: 0.9 } },
  { id: 'contact',        pose: { x: 37,  y: -28, rz: 10,  rx: 20, ry: -10, s: 0.22, o: 0.9 } },
];

// Final resting pose across the giant footer wordmark.
const FOOTER_POSE: Pose = { x: 0, y: -7, rz: -2, rx: 6, ry: 0, s: 0.58, o: 1 };

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function FloatingComb() {
  const { scrollYProgress } = useScroll();

  // The lag between page scroll and comb movement is what sells the parallax.
  const drift = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 18,
    mass: 0.8,
  });

  // Measured stops: [{ at, pose }], progress-sorted, with plateaus.
  const stopsRef = useRef<{ at: number; pose: Pose }[]>([
    { at: 0, pose: POSES[0].pose },
    { at: 1, pose: FOOTER_POSE },
  ]);

  useEffect(() => {
    const measure = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const anchors: { at: number; pose: Pose }[] = [];
      const starts: number[] = [];

      POSES.forEach(({ id, pose }, i) => {
        const el = document.getElementById(id);
        if (!el) return;
        const start = Math.min(1, Math.max(0, el.offsetTop / scrollable));
        starts.push(start);
        anchors.push({ at: start, pose });
      });

      // Insert plateaus: hold each pose for 55% of the gap to the next section,
      // so the comb stays docked while the section is being read.
      const withPlateaus: { at: number; pose: Pose }[] = [];
      anchors.forEach((a, i) => {
        withPlateaus.push(a);
        const nextAt = i < anchors.length - 1 ? anchors[i + 1].at : 1;
        const hold = a.at + (nextAt - a.at) * 0.55;
        if (hold > a.at && hold < nextAt) {
          withPlateaus.push({ at: hold, pose: a.pose });
        }
      });
      withPlateaus.push({ at: 1, pose: FOOTER_POSE });

      stopsRef.current = withPlateaus;
    };

    measure();
    // Re-measure once layout settles (fonts, images) and on resize.
    const t1 = setTimeout(measure, 800);
    const t2 = setTimeout(measure, 2500);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', measure);
    };
  }, []);

  const sample = (v: number, key: keyof Pose): number => {
    const stops = stopsRef.current;
    if (v <= stops[0].at) return stops[0].pose[key];
    for (let i = 0; i < stops.length - 1; i++) {
      const a = stops[i];
      const b = stops[i + 1];
      if (v >= a.at && v <= b.at) {
        const span = b.at - a.at;
        const t = span > 0 ? easeInOut((v - a.at) / span) : 1;
        return a.pose[key] + (b.pose[key] - a.pose[key]) * t;
      }
    }
    return stops[stops.length - 1].pose[key];
  };

  const x = useTransform(drift, (v) => `${sample(v, 'x')}vw`);
  const y = useTransform(drift, (v) => `${sample(v, 'y')}vh`);
  const rotateZ = useTransform(drift, (v) => sample(v, 'rz'));
  const rotateXScroll = useTransform(drift, (v) => sample(v, 'rx'));
  const rotateYScroll = useTransform(drift, (v) => sample(v, 'ry'));
  const scale = useTransform(drift, (v) => sample(v, 's'));
  const opacity = useTransform(drift, (v) => sample(v, 'o'));

  // Mouse-driven specular tilt layered on top of the scroll choreography
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltY = useSpring(mouseX, { stiffness: 40, damping: 14 });
  const tiltX = useSpring(mouseY, { stiffness: 40, damping: 14 });

  const rotateY = useTransform(
    [rotateYScroll, tiltY] as const,
    ([rys, ty]: number[]) => rys + ty
  );
  const rotateX = useTransform(
    [rotateXScroll, tiltX] as const,
    ([rxs, tx]: number[]) => rxs + tx
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 10);
      mouseY.set(-(e.clientY / window.innerHeight - 0.5) * 8);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      className="fixed inset-0 z-20 pointer-events-none select-none flex items-center justify-center max-md:opacity-30"
      style={{ perspective: 1400 }}
      aria-hidden="true"
    >
      <motion.div
        style={{
          x,
          y,
          rotateX,
          rotateY,
          rotateZ,
          scale,
          opacity,
          transformStyle: 'preserve-3d',
        }}
        className="will-change-transform"
      >
        {/* Idle levitation so the comb never feels static */}
        <motion.img
          src="/images/comb.png"
          alt=""
          draggable={false}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="comb-shadow w-[58vw] max-w-[760px] min-w-[340px]"
        />
      </motion.div>
    </div>
  );
}
