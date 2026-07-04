'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Banner {
  src: string;
  tag: string;
  title: string;
  href: string;
}

const banners: Banner[] = [
  {
    src: '/images/pegasus_luxury_salon.jpg',
    tag: 'THE CAMPAIGN',
    title: 'The Atelier Sessions',
    href: '/#product-collections',
  },
  {
    src: '/images/pegasus_hard_rubber.jpg',
    tag: 'COLLECTION 01',
    title: 'Hard Rubber · Flexinite',
    href: '/collections/hard-rubber',
  },
  {
    src: '/images/pegasus_cellulose.jpg',
    tag: 'COLLECTION 02',
    title: 'Cellulose Acetate',
    href: '/collections/cellulose',
  },
  {
    src: '/images/pegasus_ecowood.jpg',
    tag: 'COLLECTION 03',
    title: 'Ecowood · StaticBlock',
    href: '/collections/ecowood',
  },
];

const SLIDE_MS = 5000;
const HOVER_INTENT_MS = 1000;

/**
 * Campaign banner slider. Collapsed: an autoplaying crossfade slideshow.
 * With `expandable` (desktop hero), hovering for ~1s widens the container
 * and reveals ALL banners as a sharp-edged filmstrip of vertical panels —
 * the hovered panel grows while its neighbours compress (jitter-style).
 */
export default function BannerSlider({
  className = '',
  expandable = false,
}: {
  className?: string;
  expandable?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [panel, setPanel] = useState(0);
  const intentTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const next = useCallback(() => setIndex((i) => (i + 1) % banners.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + banners.length) % banners.length), []);

  useEffect(() => {
    if (paused || expanded) return;
    const t = setInterval(next, SLIDE_MS);
    return () => clearInterval(t);
  }, [next, paused, expanded, index]);

  useEffect(() => () => {
    if (intentTimer.current) clearTimeout(intentTimer.current);
  }, []);

  const handleEnter = () => {
    setPaused(true);
    if (!expandable) return;
    intentTimer.current = setTimeout(() => {
      setPanel(index);
      setExpanded(true);
    }, HOVER_INTENT_MS);
  };

  const handleLeave = () => {
    setPaused(false);
    if (intentTimer.current) clearTimeout(intentTimer.current);
    setExpanded(false);
  };

  const banner = banners[index];

  /* Collapsed slideshow face */
  const slideshow = (
    <>
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
            <span className="mono-tag text-[11px] text-accent block mb-1">{banner.tag}</span>
            <span className="editorial-text text-2xl md:text-3xl text-white block">{banner.title}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Index counter */}
      <div className="absolute top-4 right-5 z-10 mono-tag text-xs text-white/90">
        0{index + 1} <span className="text-white/40">/ 0{banners.length}</span>
      </div>

      {/* Arrows */}
      <div className="absolute right-4 bottom-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={prev}
          aria-label="Previous banner"
          className="w-9 h-9 bg-white/90 backdrop-blur text-ink hover:bg-accent hover:text-white flex items-center justify-center transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button
          onClick={next}
          aria-label="Next banner"
          className="w-9 h-9 bg-white/90 backdrop-blur text-ink hover:bg-accent hover:text-white flex items-center justify-center transition-all cursor-pointer"
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
            className={`h-1.5 transition-all duration-300 cursor-pointer ${
              i === index ? 'w-6 bg-accent' : 'w-1.5 bg-white/60 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </>
  );

  /* Expanded filmstrip — all banners visible, hovered panel grows */
  const filmstrip = (
    <div className="flex h-full w-full gap-1.5 bg-white">
      {banners.map((b, i) => (
        <motion.div
          key={b.src}
          onMouseEnter={() => setPanel(i)}
          animate={{ flexGrow: panel === i ? 3 : 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ flexBasis: 0 }}
          className="relative h-full overflow-hidden min-w-0"
        >
          <Link href={b.href} className="absolute inset-0 block cursor-pointer">
            <img
              src={b.src}
              alt={b.title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />

            {/* Caption fades in on the grown panel */}
            <AnimatePresence>
              {panel === i && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="absolute left-4 bottom-4 whitespace-nowrap"
                >
                  <span className="mono-tag text-[11px] text-accent block mb-1">{b.tag}</span>
                  <span className="editorial-text text-xl xl:text-2xl text-white block">{b.title}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
        </motion.div>
      ))}
    </div>
  );

  if (!expandable) {
    return (
      <div
        className={`relative overflow-hidden border border-black/10 group ${className}`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {slideshow}
      </div>
    );
  }

  return (
    /* Anchored to the centre of its grid cell; width swells past the column
       edges when expanded, revealing the full filmstrip. */
    <motion.div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ x: '-50%' }}
      animate={{ width: expanded ? 'min(78vw, 1240px)' : '100%' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute inset-y-0 left-1/2 overflow-hidden border border-black/10 group bg-white ${
        expanded ? 'z-40 shadow-[0_30px_80px_-30px_rgba(16,16,20,0.35)]' : 'z-10'
      } ${className}`}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {expanded ? (
          <motion.div
            key="strip"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            {filmstrip}
          </motion.div>
        ) : (
          <motion.div
            key="single"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            {slideshow}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
