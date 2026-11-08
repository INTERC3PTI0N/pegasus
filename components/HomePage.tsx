'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Briefcase, Check, Globe, GraduationCap, Mail, Scissors, ScissorsLineDashed, Store, Truck, Users } from 'lucide-react';
import type { Catalogue, SiteContent } from '@/lib/cms';

import VideoBanner from '@/components/VideoBanner';
import FeatureRow from '@/components/FeatureRow';

// Icon choices offered in the admin for "Who we serve".
const ICONS = { scissors: Scissors, razor: ScissorsLineDashed, store: Store, graduation: GraduationCap, truck: Truck, briefcase: Briefcase, users: Users, globe: Globe };

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
});

function SectionLabel({ n, kicker, title, sub }: { n: string; kicker: string; title: string; sub?: string }) {
  return (
    <motion.div {...reveal()} className="text-center mb-14 md:mb-20">
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

export default function HomePage({ content: c, catalogue }: { content: SiteContent; catalogue: Catalogue }) {
  const intro = c['home.intro'];
  const fns = c['home.functions'];
  const enquiry = c['home.enquiry'];

  // Each function tile shows a comb from that function (any comb until the catalogue is tagged).
  const tiles = catalogue.functions.map((f, i) => {
    const combs = catalogue.products.filter((p) => p.function === f.id);
    return { ...f, count: combs.length, image: (combs[0] ?? catalogue.products[(i * 11) % catalogue.products.length])?.image };
  });

  return (
    <div className="relative min-h-screen bg-white text-ink selection:bg-accent selection:text-white">
      <main className="relative">
        <VideoBanner content={c['home.hero']} />

        {/* 01 — Brand statement */}
        <section id="intro" className="relative z-10 py-24 md:py-32 px-6 md:px-12 lg:px-20">
          <div className="max-w-5xl mx-auto">
            <motion.div {...reveal()} className="flex items-center gap-4 mb-8">
              <span className="mono-tag text-xs text-accent">01</span>
              <span className="h-px w-10 bg-accent/40" />
              <span className="mono-tag text-xs text-silver">{intro.kicker}</span>
            </motion.div>
            <motion.p {...reveal(0.1)} className="text-xl md:text-2xl lg:text-[1.7rem] text-ink leading-[1.6]">
              {intro.statement}
            </motion.p>
            <motion.ul {...reveal(0.2)} className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4 border-t border-black/10 pt-10">
              {intro.talkPoints.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-silver">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" /> {t}
                </li>
              ))}
            </motion.ul>
          </div>
        </section>

        {/* 02 — Find the right comb: the six functions */}
        <section id="functions" className="relative z-10 py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-mist border-y border-black/5">
          <SectionLabel n="02" kicker={fns.kicker} title={fns.title} sub={fns.sub} />
          <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {tiles.map((f, i) => (
              <motion.div key={f.id} {...reveal(i * 0.06)}>
                <Link href={`/products?function=${f.id}`} className="group flex h-full flex-col bg-white border border-black/5 hover:border-accent/40 transition-colors">
                  <div className="relative aspect-[4/3] bg-white border-b border-black/5 flex items-center justify-center overflow-hidden">
                    {f.image && (
                      <img
                        src={f.image}
                        alt=""
                        className="h-[82%] w-auto object-contain rotate-[28deg] transition-transform duration-700 group-hover:rotate-[22deg] group-hover:scale-105"
                        draggable={false}
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5 md:p-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="editorial-text text-2xl md:text-3xl text-ink group-hover:text-accent transition-colors">{f.name}</h3>
                      {f.count > 0 && <span className="mono-tag text-[10px] text-silver shrink-0">{f.count} combs</span>}
                    </div>
                    <p className="text-xs md:text-sm text-silver leading-relaxed">{f.purpose}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/products" className="inline-flex items-center gap-2 bg-ink text-white hover:bg-accent px-8 py-4 mono-tag text-xs transition-colors">
              {fns.ctaLabel} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* 03 — Flexinite® */}
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

        {/* 04 — Masterclass */}
        <div className="bg-mist border-y border-black/5">
          <FeatureRow
            id="masterclass"
            index="04"
            kicker={c['home.masterclass'].kicker}
            sub={c['home.masterclass'].sub}
            title={c['home.masterclass'].title}
            body={c['home.masterclass'].body}
            image={c['home.masterclass'].image}
            imageFit="contain"
            href={c['home.masterclass'].ctaHref}
            cta={c['home.masterclass'].ctaLabel}
            reverse
          />
        </div>

        {/* 05 — Who we serve */}
        <section id="who-we-serve" className="relative z-10 py-24 md:py-32 px-6 md:px-12 lg:px-20">
          <SectionLabel n="05" kicker={c['home.whoWeServe'].kicker} title={c['home.whoWeServe'].title} sub={c['home.whoWeServe'].sub} />
          <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-12">
            {c['home.whoWeServe'].items.map((item, i) => {
              const Icon = ICONS[item.icon as keyof typeof ICONS] ?? Users;
              return (
                <motion.div
                  key={item.label + i}
                  {...reveal(i * 0.06)}
                  className="group flex flex-col items-center text-center px-4 lg:border-r border-black/10 last:border-r-0"
                >
                  <Icon className="w-12 h-12 md:w-14 md:h-14 text-ink/80 group-hover:text-accent transition-colors duration-300" strokeWidth={1} />
                  <span className="mono-tag text-[11px] md:text-xs text-ink mt-5 group-hover:text-accent transition-colors duration-300">{item.label}</span>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* 06 — Enquiry */}
        <section id="enquiry" className="relative z-10 bg-ink text-white py-24 md:py-28 px-6 md:px-12 lg:px-20">
          <motion.div {...reveal()} className="max-w-4xl mx-auto text-center">
            <span className="mono-tag text-xs text-accent">{enquiry.kicker}</span>
            <h2 className="editorial-text text-4xl md:text-6xl mt-5">{enquiry.title}</h2>
            <p className="text-white/70 text-sm md:text-base leading-relaxed mt-5 max-w-xl mx-auto">{enquiry.text}</p>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Link href={enquiry.ctaHref} className="bg-accent text-white hover:bg-white hover:text-ink px-8 py-4 mono-tag text-xs transition-colors">
                {enquiry.ctaLabel}
              </Link>
              <a href={`mailto:${enquiry.email}`} className="inline-flex items-center gap-2 border border-white/40 hover:bg-white hover:text-ink px-8 py-4 mono-tag text-xs transition-colors">
                <Mail className="w-3.5 h-3.5" /> {enquiry.email}
              </a>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
