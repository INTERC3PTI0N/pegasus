'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';

/**
 * Full-viewport cinematic video hero. A muted, looping reference clip of
 * professional styling sits full-bleed with a centred, minimalist overlay
 * and a scroll cue — the opening banner of the editorial layout.
 */
export default function VideoBanner() {
  return (
    <section
      id="hero"
      className="relative z-40 w-full h-[100svh] min-h-[560px] overflow-hidden bg-ink"
    >
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/pegasus_luxury_salon.jpg"
      >
        <source src="/videos/hair-banner.mp4" type="video/mp4" />
      </video>

      {/* Legibility wash */}
      <div className="absolute inset-0 bg-ink/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/40" />

      {/* Centred hero copy */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mono-tag text-[11px] md:text-xs text-white/80 mb-6"
        >
          PROFESSIONAL HAIR TOOLS · SINCE 1961
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="editorial-text text-white text-5xl md:text-7xl lg:text-[6.5rem] leading-[1.02] max-w-5xl"
        >
          Infinite Styling,
          <br />
          Handcrafted.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm md:text-base text-white/75 leading-relaxed max-w-lg mt-7"
        >
          Seamless, hand-polished combs engineered by Presto Industries — where
          precision, craft and material science meet the professional&rsquo;s chair.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-4 justify-center mt-10"
        >
          <Link
            href="/#products"
            className="bg-white text-ink hover:bg-accent hover:text-white px-8 py-4 mono-tag text-xs transition-colors cursor-pointer"
          >
            Explore Products
          </Link>
          <Link
            href="/#technology"
            className="border border-white/45 text-white hover:bg-white hover:text-ink px-8 py-4 mono-tag text-xs transition-colors cursor-pointer"
          >
            The Technology
          </Link>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="mono-tag text-[10px] text-white/60">SCROLL</span>
        <span className="relative h-10 w-px bg-white/25 overflow-hidden">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-white"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  );
}
