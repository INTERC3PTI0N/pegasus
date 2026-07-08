'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

// Luxury components
import FloatingComb from '@/components/FloatingComb';
import VideoBanner from '@/components/VideoBanner';
import FeatureRow from '@/components/FeatureRow';
import AiAssistant from '@/components/AiAssistant';
import BrochureForm from '@/components/BrochureForm';
import Blog from '@/components/Blog';
import InteractiveMap from '@/components/InteractiveMap';

const products = [
  {
    key: 'hard-rubber',
    n: '01',
    title: 'Hard Rubber',
    sub: 'Flexinite Technology',
    blurb: 'Precision cutting and styling for professionals. 100% Ebonite, high-heat and chemical resistant.',
    image: '/images/pegasus_hard_rubber.jpg',
    href: '/collections/hard-rubber',
  },
  {
    key: 'cellulose',
    n: '02',
    title: 'Cellulose Acetate',
    sub: 'GlamLock Technology',
    blurb: 'Seamless, hand-polished teeth that detangle easily, stimulate the scalp and leave hair smooth and shiny.',
    image: '/images/pegasus_cellulose.jpg',
    href: '/collections/cellulose',
  },
  {
    key: 'ecowood',
    n: '03',
    title: 'Ecowood',
    sub: 'StaticBlock Technology',
    blurb: 'Sustainable, natural and eco-friendly. Prevents fly-aways and reduces frizz with a gentle glide.',
    image: '/images/pegasus_ecowood.jpg',
    href: '/collections/ecowood',
  },
];

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

export default function Home() {
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

      {/* The signature comb — one object travelling the whole page in 3D */}
      {!loading && <FloatingComb />}

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
                PRESTO INDUSTRIES — EST. 1961
              </span>
              <img src="/images/pegasus-logo.png" alt="PEGASUS" className="h-9 md:h-10 w-auto" draggable={false} />
            </div>

            <div className="w-full h-72 max-w-2xl mx-auto flex items-center justify-center" style={{ perspective: 1200 }}>
              <motion.img
                src="/images/comb.png"
                alt="Pegasus comb"
                draggable={false}
                animate={{ y: [0, -18, 0], rotateZ: [-3, 3, -3], rotateY: [-10, 10, -10] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="comb-shadow w-[70%] max-w-lg"
              />
            </div>

            <div className="flex justify-between items-end gap-6">
              <span className="text-xs text-silver max-w-xs leading-relaxed">
                Professional hair styling tools, handcrafted through material innovation and six decades of precision.
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
        <VideoBanner />

        {/* 01 — Philosophy: centred statement, generous whitespace */}
        <section id="philosophy" className="relative z-10 py-28 md:py-40 px-6 md:px-12 lg:px-20 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center gap-4 mb-8"
            >
              <span className="mono-tag text-xs text-accent">01</span>
              <span className="h-px w-10 bg-accent/40" />
              <span className="mono-tag text-xs text-silver">Philosophy</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="editorial-text text-3xl md:text-5xl lg:text-[3.6rem] text-ink leading-[1.25]"
            >
              We believe a comb should be made like a{' '}
              <span style={{ color: '#00adbb' }}>precision instrument</span> — not a
              disposable novelty. Every tooth is saw-cut, hand-bevelled and polished
              to protect the hair and the scalp it serves.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm md:text-base text-silver leading-[1.9] max-w-xl mx-auto mt-10"
            >
              Since 1961, Presto Industries has engineered professional styling tools
              trusted by hairdressers across the world. This is the craft behind
              Pegasus — infinite styling, in every strand.
            </motion.p>
          </div>
        </section>

        {/* 02 — Products: the three collections */}
        <section id="products" className="relative z-10 py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-mist border-y border-black/5">
          <SectionLabel n="02" kicker="Products" title="The Collections" sub="Three material philosophies, each engineered for a specific styling and chemical discipline." />

          <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {products.map((p, i) => (
              <motion.div
                key={p.key}
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
                      View Collection
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
          kicker="Technology"
          sub="GLAMLOCK · FLEXINITE · STATICBLOCK"
          title="Three technologies, one seamless glide."
          body="Ordinary combs have sharp, seamed teeth that roughen the hair. Ours are engineered instead — GlamLock hand-polishes every tooth seamless, Flexinite responds to salon heat while resisting chemicals, and StaticBlock naturally dissipates the fly-aways that friction creates."
          image="/images/pegasus_cellulose.jpg"
          href="/collections/hard-rubber"
          cta="Discover the Technology"
        />

        {/* 04 — About / Heritage (alternating: image right) */}
        <FeatureRow
          id="about"
          index="04"
          kicker="Heritage"
          sub="SINCE 1961"
          title="Six decades of handcrafted precision."
          body="Founded by Lookman Qadir in 1961, Presto Industries began saw-cutting and hand-polishing combs in 1977. After years researching hair textures and climates across the world, Pegasus launched in 2012 — the culmination of a craft passed from one generation of toolmakers to the next."
          image="/images/pegasus_luxury_salon.jpg"
          href="/#journal"
          cta="Read Our Story"
          reverse
        />

        {/* 05 — Sustainability (alternating: image left) */}
        <FeatureRow
          id="sustainability"
          index="05"
          kicker="Sustainability"
          sub="KIND TO HAIR, KIND TO EARTH"
          title="Beautiful hair, in balance with nature."
          body="Our Ecowood range is completely earth and scalp friendly — naturally anti-static and anti-bacterial, handcrafted from sustainable natural wood. Because caring for hair should never mean compromising the world it lives in."
          image="/images/pegasus_ecowood.jpg"
          href="/collections/ecowood"
          cta="Explore Ecowood"
        />

        {/* 06 — Journal (blog) */}
        <section id="journal" className="relative z-10 py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-mist border-y border-black/5">
          <SectionLabel n="06" kicker="Journal" title="The Pegasus Académie" sub="Notes on hair, craft and material science from the Pegasus editorial team." />
          <div className="relative z-10">
            <Blog />
          </div>
        </section>

        {/* 07 — Ritual (AI styling assistant) */}
        <section id="ritual" className="relative z-10 py-24 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
          <div className="absolute top-[20%] left-[10%] w-72 h-72 rounded-full bg-accent/5 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
          <SectionLabel n="07" kicker="Bespoke Ritual" title="Your Styling Protocol" sub="Map your hair characteristics into a personalised daily combing and styling ritual." />
          <div className="relative z-10">
            <AiAssistant />
          </div>
        </section>

        {/* 08 — Brochure */}
        <section id="brochure" className="relative z-10 py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-mist border-y border-black/5">
          <SectionLabel n="08" kicker="Catalogue" title="Request the Brochure" sub="Access six decades of engineering excellence in our printed master catalogue." />
          <div className="relative z-10">
            <BrochureForm />
          </div>
        </section>

        {/* 09 — Contact */}
        <section id="contact" className="relative z-10 py-24 md:py-32 px-6 md:px-12 lg:px-20">
          <SectionLabel n="09" kicker="Contact" title="Dealer & Corporate Enquiries" sub="Connecting professional salons, distributors and retail groups with Presto Industries." />
          <div className="relative z-10">
            <InteractiveMap />
          </div>
        </section>
      </main>
    </div>
  );
}
