'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

/**
 * Full-width cinematic video banner shown directly beneath the hero.
 * The clip is a muted, looping stock reference of professional hair styling.
 * Copy sits over a soft ink gradient so it stays legible on any frame.
 */
export default function VideoBanner() {
  return (
    <section
      id="film-banner"
      className="relative w-full h-[70vh] min-h-[440px] overflow-hidden bg-ink"
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

      {/* Legibility gradients — darker on the left where the copy lives */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-ink/20" />

      <div className="relative z-10 h-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl space-y-6"
        >
          <span className="mono-tag text-xs text-white/70 border-b border-accent/60 pb-2 inline-block">
            INFINITE STYLING IN MOTION
          </span>
          <h2 className="editorial-text text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05]">
            Where Precision Meets the Chair
          </h2>
          <p className="text-sm md:text-base text-white/75 leading-relaxed max-w-md">
            Seamless, hand-polished teeth glide through every texture — the quiet
            craft behind salon-perfect results, powered by GlamLock, Flexinite and
            StaticBlock technologies.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/#product-collections"
              className="group flex items-center gap-2 bg-white text-ink hover:bg-accent hover:text-white px-7 py-3.5 mono-tag text-xs transition-colors cursor-pointer"
            >
              Explore Collections
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/#core-technologies"
              className="flex items-center gap-2 border border-white/40 text-white hover:border-white px-7 py-3.5 mono-tag text-xs transition-colors cursor-pointer"
            >
              The Technology
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
