'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export interface FeatureRowProps {
  index: string;          // "01"
  kicker: string;         // small uppercase label
  sub?: string;           // secondary small label (bilingual-style)
  title: string;          // large editorial heading
  body: string;
  image: string;
  href?: string;
  cta?: string;
  reverse?: boolean;      // image on the right instead of left
  id?: string;
}

/**
 * The alternating text↔image "content rhythm" block. Image occupies one half,
 * copy the other; `reverse` flips the sides so consecutive rows zig-zag.
 * A large faded index number and paired kicker labels echo the editorial,
 * minimalist Japanese-brand layout the site is modelled on.
 */
export default function FeatureRow({
  index,
  kicker,
  sub,
  title,
  body,
  image,
  href,
  cta = 'View More',
  reverse = false,
  id,
}: FeatureRowProps) {
  return (
    <section
      id={id}
      className="relative z-10 py-20 md:py-28 lg:py-32 px-6 md:px-12 lg:px-20"
    >
      <div
        className={`max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center ${
          reverse ? 'lg:[&>*:first-child]:order-2' : ''
        }`}
      >
        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-90px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden aspect-[4/3] lg:aspect-[5/4]"
        >
          <motion.img
            src={image}
            alt={title}
            referrerPolicy="no-referrer"
            initial={{ scale: 1.14 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
          {/* Oversized index number floating on the image edge */}
          <span
            className={`absolute -bottom-4 display-text text-[7rem] md:text-[9rem] leading-none text-white/90 mix-blend-difference pointer-events-none select-none ${
              reverse ? 'right-4' : 'left-4'
            }`}
          >
            {index}
          </span>
        </motion.div>

        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-90px' }}
          transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className={`space-y-6 ${reverse ? 'lg:pr-6' : 'lg:pl-6'}`}
        >
          <div className="flex items-center gap-4">
            <span className="mono-tag text-xs text-accent">{index}</span>
            <span className="h-px w-10 bg-accent/40" />
            <span className="mono-tag text-xs text-silver">{kicker}</span>
          </div>

          <h2 className="editorial-text text-4xl md:text-5xl lg:text-[3.4rem] text-ink leading-[1.08]">
            {title}
          </h2>

          {sub && (
            <p className="mono-tag text-[11px] tracking-[0.25em]" style={{ color: '#00adbb' }}>
              {sub}
            </p>
          )}

          <p className="text-sm md:text-base text-silver leading-[1.9] max-w-md">
            {body}
          </p>

          {href && (
            <Link
              href={href}
              className="group inline-flex items-center gap-3 mono-tag text-xs text-ink pt-2 cursor-pointer"
            >
              <span className="relative">
                {cta}
                <span className="absolute -bottom-1 left-0 h-px w-full bg-ink/30 group-hover:bg-accent transition-colors" />
              </span>
              <ArrowRight className="w-4 h-4 text-accent transition-transform group-hover:translate-x-1.5" />
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}
