'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Youtube, ArrowUp, ArrowUpRight } from 'lucide-react';

import type { SiteContent } from '@/lib/cms';

export default function SiteFooter({
  content,
  header,
}: {
  content: SiteContent['global.footer'];
  header: SiteContent['global.header']; // logo + shop button are shared with the header
}) {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-white border-t border-black/5 pt-20 pb-10 px-6 md:px-12 lg:px-20">
      {/* Centred brand block */}
      <div className="flex flex-col items-center text-center gap-6 mb-16">
        <Link href="/" className="cursor-pointer">
          <img src={header.logo} alt="PEGASUS — Mastery in Your Hands" className="h-16 w-auto" draggable={false} />
        </Link>
        <p className="text-xs text-silver max-w-sm leading-relaxed">
          {content.tagline}
        </p>
        <div className="flex items-center gap-4">
          {[
            { Icon: Instagram, label: 'Instagram', href: content.instagramUrl },
            { Icon: Facebook, label: 'Facebook', href: content.facebookUrl },
            { Icon: Youtube, label: 'YouTube', href: content.youtubeUrl },
          ].filter(({ href }) => href).map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-ink/60 hover:text-white hover:bg-accent hover:border-accent transition-all"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>

      {/* Nav columns */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-8 pb-12 mb-10 border-b border-black/5">
        {content.columns.map((col) => (
          <div key={col.heading} className="space-y-4 text-center md:text-left">
            <span className="mono-tag text-[11px] text-accent block">{col.heading}</span>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-xs text-silver hover:text-ink transition-colors cursor-pointer">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Online shop + language */}
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
        <a
          href={header.shopUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 mono-tag text-[11px] px-6 py-3 border border-ink/20 text-ink hover:bg-ink hover:text-white transition-all"
        >
          {header.shopLabel}
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
        <div className="flex items-center gap-2 mono-tag text-[11px] text-ink/60">
          <span className="text-accent">EN</span>
          <span className="opacity-40">/</span>
          <span className="hover:text-ink transition-colors cursor-pointer">JP</span>
        </div>
      </div>

      {/* Legal */}
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] mono-tag text-silver/70">
        <span>© {new Date().getFullYear()} {content.copyright}</span>
        <div className="flex gap-6">
          <a href={content.privacyUrl || '#'} className="hover:text-ink transition-colors">Privacy</a>
          <a href={content.termsUrl || '#'} className="hover:text-ink transition-colors">Terms</a>
        </div>
      </div>

      {/* Back-to-top */}
      <button
        onClick={scrollTop}
        aria-label="Back to top"
        className="group absolute right-6 md:right-10 -top-6 w-12 h-12 bg-ink text-white hover:bg-accent flex items-center justify-center transition-colors cursor-pointer"
      >
        <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
        <span className="sr-only">TOP</span>
      </button>
    </footer>
  );
}
