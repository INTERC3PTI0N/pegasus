'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Truck, Ship, Building2, ShoppingCart, Store, Scissors, Users, Globe, Sparkles } from 'lucide-react';
import type { SiteContent } from '@/lib/cms';

// Luxury components
import VideoBanner from '@/components/VideoBanner';
import FeatureRow from '@/components/FeatureRow';
import BrochureForm from '@/components/BrochureForm';
import Blog from '@/components/Blog';
import InteractiveMap from '@/components/InteractiveMap';

// Icon choices offered in the admin for "Who we serve".
const ICONS = { truck: Truck, ship: Ship, building: Building2, cart: ShoppingCart, store: Store, scissors: Scissors, users: Users, globe: Globe, sparkles: Sparkles };

function SectionLabel({ n, kicker, title, sub }: { n: string; kicker: string; title: string; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="text-center mb-14 md:mb-20"
    >
      <div className="flex items-center justify-center gap-4 mb-5">
        <span className="mono-tag text-xs text-accent">{n}</span>
        <span className="h-px w-10 bg-accent/40" />
        <span className="mono-tag text-xs text-silver">{kicker}</span>
      </div>
      <h2 className="editorial-text text-4xl md:text-5xl lg:text-6xl text-ink">{title}</h2>
      {sub && <p className="text-silver max-w-xl mx-auto text-sm md:text-base leading-relaxed mt-4">{sub}</p>}
    </motion.div>
  );
}

export default function HomePage({ content }: { content: SiteContent }) {
  const c = content;
  const [loading, setLoading] = useState(true);
  const [loadPercent, setLoadPercent] = useState(0);

  // Cinematic preloader
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 3;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => setLoading(false), 700);
      }
      setLoadPercent(current);
    }, 110);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-ink selection:bg-accent selection:text-white">
      {/* Luxury paper-noise overlay */}
      <div className="noise-overlay" />

      {/* Preloader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-white z-[60] flex flex-col justify-between p-8 md:p-12 overflow-hidden"
          >
            <div>
              <span className="mono-tag text-[11px] text-accent tracking-[0.3em] block mb-3">
                {c['home.preloader'].kicker}
              </span>
              <img src={c['global.header'].logo} alt="PEGASUS — Mastery in Your Hands" className="h-12 md:h-14 w-auto" draggable={false} />
            </div>

            <div className="w-full h-72 max-w-2xl mx-auto flex items-center justify-center" style={{ perspective: 1200 }}>
              <motion.img
                src={c['home.preloader'].image}
                alt="Pegasus comb"
                draggable={false}
                animate={{ y: [0, -18, 0], rotateZ: [-3, 3, -3], rotateY: [-10, 10, -10] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="comb-shadow w-[70%] max-w-lg"
              />
            </div>

            <div className="flex justify-between items-end gap-6">
              <span className="text-xs text-silver max-w-xs leading-relaxed">
                {c['home.preloader'].text}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="editorial-text text-5xl md:text-6xl text-ink font-light tracking-tighter">{loadPercent}</span>
                <span className="mono-tag text-xs text-accent">%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative">
        {/* Full-screen video hero */}
        <VideoBanner content={c['home.hero']} />

        {/* 01 — About / Heritage (alternating: image right) */}
        <FeatureRow
          id="about"
          index="01"
          kicker={c['home.about'].kicker}
          sub={c['home.about'].sub}
          title={c['home.about'].title}
          body={c['home.about'].body}
          image={c['home.about'].image}
          href={c['home.about'].ctaHref}
          cta={c['home.about'].ctaLabel}
          reverse
        />

        {/* 02 — Products: the three collections */}
        <section id="products" className="relative z-10 py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-mist border-y border-black/5">
          <SectionLabel n="02" kicker={c['home.products'].kicker} title={c['home.products'].title} sub={c['home.products'].sub} />

          <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {c['home.products'].items.map((p, i) => (
              <motion.div
                key={p.href + i}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={p.href} className="group block cursor-pointer">
                  <div className="relative overflow-hidden aspect-[4/5] bg-white">
                    <img
                      src={p.image}
                      alt={p.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[900ms]"
                      draggable={false}
                    />
                    <span className="absolute top-4 left-4 mono-tag text-[11px] text-white mix-blend-difference">{p.n}</span>
                  </div>
                  <div className="pt-6 space-y-2">
                    <span className="mono-tag text-[11px]" style={{ color: '#00adbb' }}>{p.sub}</span>
                    <h3 className="editorial-text text-2xl md:text-3xl text-ink group-hover:text-accent transition-colors">{p.title}</h3>
                    <p className="text-xs text-silver leading-relaxed">{p.blurb}</p>
                    <span className="inline-flex items-center gap-2 mono-tag text-[11px] text-ink pt-2">
                      {c['home.products'].cardCta}
                      <ArrowRight className="w-3.5 h-3.5 text-accent transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 03 — Technology (alternating: image left) */}
        <FeatureRow
          id="technology"
          index="03"
          kicker={c['home.technology'].kicker}
          sub={c['home.technology'].sub}
          title={c['home.technology'].title}
          body={c['home.technology'].body}
          image={c['home.technology'].image}
          href={c['home.technology'].ctaHref}
          cta={c['home.technology'].ctaLabel}
        />

        {/* 04 — Philosophy: centred statement, generous whitespace */}
        <section id="philosophy" className="relative z-10 py-28 md:py-40 px-6 md:px-12 lg:px-20 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center gap-4 mb-8"
            >
              <span className="mono-tag text-xs text-accent">04</span>
              <span className="h-px w-10 bg-accent/40" />
              <span className="mono-tag text-xs text-silver">{c['home.philosophy'].kicker}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="editorial-text text-3xl md:text-5xl lg:text-[3.6rem] text-ink leading-[1.25]"
            >
              {c['home.philosophy'].statementBefore}{' '}
              <span style={{ color: '#00adbb' }}>{c['home.philosophy'].highlight}</span>{' '}
              {c['home.philosophy'].statementAfter}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm md:text-base text-silver leading-[1.9] max-w-xl mx-auto mt-10"
            >
              {c['home.philosophy'].body}
            </motion.p>
          </div>
        </section>

        {/* 05 — Sustainability (alternating: image left) */}
        <FeatureRow
          id="sustainability"
          index="05"
          kicker={c['home.sustainability'].kicker}
          sub={c['home.sustainability'].sub}
          title={c['home.sustainability'].title}
          body={c['home.sustainability'].body}
          image={c['home.sustainability'].image}
          href={c['home.sustainability'].ctaHref}
          cta={c['home.sustainability'].ctaLabel}
        />

        {/* 06 — Journal (blog) */}
        <section id="journal" className="relative z-10 py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-mist border-y border-black/5">
          <SectionLabel n="06" kicker={c['home.journal'].kicker} title={c['home.journal'].title} sub={c['home.journal'].sub} />
          <div className="relative z-10">
            <Blog articles={c['home.journal'].articles} />
          </div>
        </section>

        {/* 07 — Who We Serve */}
        <section id="who-we-serve" className="relative z-10 py-24 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
          <div className="absolute top-[20%] left-[10%] w-72 h-72 rounded-full bg-accent/5 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
          <SectionLabel
            n="07"
            kicker={c['home.whoWeServe'].kicker}
            title={c['home.whoWeServe'].title}
            sub={c['home.whoWeServe'].sub}
          />

          <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-12">
            {c['home.whoWeServe'].items.map((item, i) => {
              const Icon = ICONS[item.icon as keyof typeof ICONS] ?? Sparkles;
              return (
                <motion.div
                  key={item.label + i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex flex-col items-center text-center px-4 lg:border-r border-black/10 last:border-r-0"
                >
                  <Icon
                    className="w-12 h-12 md:w-14 md:h-14 text-ink/80 group-hover:text-accent transition-colors duration-300"
                    strokeWidth={1}
                  />
                  <span className="mono-tag text-[11px] md:text-xs text-ink mt-5 group-hover:text-accent transition-colors duration-300">
                    {item.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* 08 — Brochure */}
        <section id="brochure" className="relative z-10 py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-mist border-y border-black/5">
          <SectionLabel n="08" kicker={c['home.brochure'].kicker} title={c['home.brochure'].title} sub={c['home.brochure'].sub} />
          <div className="relative z-10">
            <BrochureForm content={c['home.brochure']} />
          </div>
        </section>

        {/* 09 — Contact */}
        <section id="contact" className="relative z-10 py-24 md:py-32 px-6 md:px-12 lg:px-20">
          <SectionLabel n="09" kicker={c['home.contact'].kicker} title={c['home.contact'].title} sub={c['home.contact'].sub} />
          <div className="relative z-10">
            <InteractiveMap content={c['home.contact']} />
          </div>
        </section>
      </main>
    </div>
  );
}
