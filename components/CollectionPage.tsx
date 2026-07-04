'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

export interface CollectionPageData {
  tag: string;
  title: string;
  subtitle: string;
  heroImage: string;
  intro: string;
  features: { title: string; desc: string }[];
  techName: string;
  techTagline: string;
  techDesc: string;
  benefits: string[];
  otherCollections: { label: string; href: string }[];
}

const reveal = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
};

export default function CollectionPage({ data }: { data: CollectionPageData }) {
  return (
    <div className="relative min-h-screen bg-white text-ink selection:bg-accent selection:text-white">
      {/* Luxury noise filter overlay */}
      <div className="noise-overlay" />

      <main className="pt-28 pb-24">
        {/* Hero */}
        <section className="px-6 md:px-12 lg:px-24 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-6xl mx-auto"
          >
            <Link
              href="/#product-collections"
              className="inline-flex items-center gap-2 mono-tag text-xs text-silver hover:text-ink transition-all mb-10 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> All Collections
            </Link>

            <span className="mono-tag text-xs text-accent border-b border-accent/30 pb-2 mb-6 block w-fit">
              {data.tag}
            </span>
            <h1 className="editorial-text text-5xl md:text-6xl lg:text-7xl text-ink mb-4 max-w-4xl">
              {data.title}
            </h1>
            <p className="display-text text-lg md:text-xl uppercase tracking-[0.12em]" style={{ color: '#00adbb' }}>
              {data.subtitle}
            </p>
          </motion.div>
        </section>

        {/* Hero image + intro */}
        <section className="px-6 md:px-12 lg:px-24 mb-24">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <motion.div {...reveal} className="lg:col-span-7 overflow-hidden border border-black/10">
              <motion.img
                src={data.heroImage}
                alt={data.title}
                referrerPolicy="no-referrer"
                initial={{ scale: 1.12 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-[340px] md:h-[440px] object-cover"
              />
            </motion.div>
            <motion.div {...reveal} className="lg:col-span-5 space-y-5">
              <span className="mono-tag text-xs text-accent block">The Craft</span>
              <p className="editorial-text text-2xl md:text-3xl text-ink leading-snug">
                {data.intro}
              </p>
              <div className="pt-4 space-y-2.5">
                {data.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-silver">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" /> {b}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Technology band */}
        <section className="bg-mist border-y border-black/5 py-20 px-6 md:px-12 lg:px-24 mb-24">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <motion.div {...reveal} className="lg:col-span-5">
              <span className="mono-tag text-xs text-accent border-b border-accent/30 pb-2 mb-5 block w-fit">
                PATENTED SYSTEM
              </span>
              <h2 className="editorial-text text-4xl md:text-5xl text-ink mb-3">{data.techName}</h2>
              <p className="text-sm uppercase tracking-[0.15em] italic mb-6" style={{ color: '#00adbb' }}>
                {data.techTagline}
              </p>
              <p className="text-sm text-silver leading-relaxed">{data.techDesc}</p>
            </motion.div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-5">
              {data.features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="lux-card p-7 hover:border-accent/40 hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="mono-tag text-xs text-accent block mb-3">0{i + 1}</span>
                  <h3 className="text-base text-ink font-medium mb-2">{f.title}</h3>
                  <p className="text-xs text-silver leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA + other collections */}
        <section className="px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 border-t border-black/5 pt-14">
            <div>
              <span className="mono-tag text-xs text-accent block mb-3">Continue Exploring</span>
              <div className="flex flex-wrap gap-6">
                {data.otherCollections.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="group flex items-center gap-2 editorial-text text-xl md:text-2xl text-ink hover:text-accent transition-colors cursor-pointer"
                  >
                    {c.label}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/#request-brochure"
              className="shrink-0 bg-ink text-white hover:bg-accent px-8 py-4 mono-tag text-xs transition-colors cursor-pointer"
            >
              Request The Brochure
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
