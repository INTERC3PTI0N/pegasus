'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Banner {
  src: string;
  tag: string;
  title: string;
}

const banners: Banner[] = [
  {
    src: '/images/pegasus_luxury_salon.jpg',
    tag: 'THE CAMPAIGN',
    title: 'The Atelier Sessions',
  },
  {
    src: '/images/pegasus_hard_rubber.jpg',
    tag: 'COLLECTION 01',
    title: 'Vulcanite Noir',
  },
  {
    src: '/images/pegasus_cellulose.jpg',
    tag: 'COLLECTION 02',
    title: 'Tortoise Acetate',
  },
  {
    src: '/images/pegasus_ecowood.jpg',
    tag: 'COLLECTION 03',
    title: 'Ecowood Grain',
  },
];

const SLIDE_MS = 5000;

export default function BannerSlider({ className = '' }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % banners.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + banners.length) % banners.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, SLIDE_MS);
    return () => clearInterval(t);
  }, [next, paused, index]);

  const banner = banners[index];

  return (
    <div
      className={`relative overflow-hidden rounded-xl lux-card group ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides — slow Ken Burns crossfade */}
      <AnimatePresence mode="popLayout">
        <motion.img
          key={banner.src}
          src={banner.src}
          alt={banner.title}
          referrerPolicy="no-referrer"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.9, ease: 'easeInOut' }, scale: { duration: 6, ease: 'linear' } }}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </AnimatePresence>

      {/* Soft readability gradient */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 via-black/15 to-transparent pointer-events-none" />

      {/* Caption */}
      <div className="absolute left-5 bottom-5 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={banner.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="mono-tag text-[10px] text-accent block mb-1">{banner.tag}</span>
            <span className="editorial-text text-2xl md:text-3xl text-white block">{banner.title}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Index counter */}
      <div className="absolute top-4 right-5 z-10 mono-tag text-[11px] text-white/90">
        0{index + 1} <span className="text-white/40">/ 0{banners.length}</span>
      </div>

      {/* Arrows */}
      <div className="absolute right-4 bottom-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={prev}
          aria-label="Previous banner"
          className="w-9 h-9 rounded-full bg-white/90 backdrop-blur text-ink hover:bg-accent hover:text-white flex items-center justify-center transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button
          onClick={next}
          aria-label="Next banner"
          className="w-9 h-9 rounded-full bg-white/90 backdrop-blur text-ink hover:bg-accent hover:text-white flex items-center justify-center transition-all cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Dots + autoplay progress */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-[3px] bg-white/20">
        <motion.div
          key={`${index}-${paused}`}
          initial={{ width: '0%' }}
          animate={{ width: paused ? '0%' : '100%' }}
          transition={{ duration: SLIDE_MS / 1000, ease: 'linear' }}
          className="h-full bg-accent"
        />
      </div>
      <div className="absolute top-4 left-5 z-10 flex gap-1.5">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to banner ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === index ? 'w-6 bg-accent' : 'w-1.5 bg-white/60 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
