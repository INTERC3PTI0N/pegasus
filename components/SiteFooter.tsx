'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export default function SiteFooter() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  return (
    <footer className="bg-white border-t border-black/5 pt-20 pb-10 px-6 md:px-12 lg:px-24 relative overflow-hidden">

      {/* Massive PEGASUS wordmark — the comb comes home to rest across it */}
      <div className="text-center mb-16 select-none pointer-events-none relative">
        <h2 className="display-text text-[12vw] text-ink/[0.05] tracking-[0.08em] leading-none uppercase">
          PEGASUS
        </h2>
        <span className="mono-tag text-xs text-accent/70 tracking-[0.3em] block -mt-4">
          INFINITE STYLING
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 mb-12 border-b border-black/5 relative z-30">
        {/* Col 1: Brand + Newsletter */}
        <div className="space-y-4">
          <img
            src="/images/pegasus-logo.png"
            alt="PEGASUS — Infinite Styling"
            className="h-10 w-auto"
            draggable={false}
          />
          <p className="text-xs text-silver leading-relaxed">
            Receive periodic briefs on material science breakthroughs, professional tool launches, and exclusive salon masterclass guides.
          </p>

          {newsletterSubscribed ? (
            <div className="bg-accent/10 border border-accent p-3 text-center text-xs text-ink">
              Verified. You are on the registry.
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Corporate email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="p-3 custom-input text-xs flex-1"
              />
              <button
                onClick={() => {
                  if (newsletterEmail.includes('@')) {
                    setNewsletterSubscribed(true);
                  }
                }}
                className="px-4 py-3 bg-ink text-white hover:bg-accent transition-colors mono-tag text-xs cursor-pointer"
              >
                Join
              </button>
            </div>
          )}
        </div>

        {/* Col 2: Atelier links */}
        <div className="space-y-4 lg:pl-12">
          <span className="mono-tag text-[11px] text-accent block">Atelier</span>
          <ul className="space-y-2 text-xs text-silver">
            <li><Link href="/" className="hover:text-ink transition-all cursor-pointer">The Campaign</Link></li>
            <li><Link href="/#about-timeline" className="hover:text-ink transition-all cursor-pointer">Presto Chronicles</Link></li>
            <li><Link href="/#core-technologies" className="hover:text-ink transition-all cursor-pointer">Patented Technologies</Link></li>
            <li><Link href="/#ai-styling-assistant" className="hover:text-ink transition-all text-accent cursor-pointer">Custom Regimens</Link></li>
            <li><Link href="/#editorial-blog" className="hover:text-ink transition-all cursor-pointer">The Pegasus Chronicle</Link></li>
          </ul>
        </div>

        {/* Col 3: Collections */}
        <div className="space-y-4 lg:pl-12">
          <span className="mono-tag text-[11px] text-accent block">Collections</span>
          <ul className="space-y-2 text-xs text-silver">
            <li><Link href="/collections/hard-rubber" className="hover:text-ink transition-all cursor-pointer">Hard Rubber · Flexinite</Link></li>
            <li><Link href="/collections/cellulose" className="hover:text-ink transition-all cursor-pointer">Cellulose Acetate</Link></li>
            <li><Link href="/collections/ecowood" className="hover:text-ink transition-all cursor-pointer">Ecowood · StaticBlock</Link></li>
            <li><Link href="/#request-brochure" className="hover:text-ink transition-all cursor-pointer">Tactile Catalog Portfolio</Link></li>
            <li>
              <a href="https://www.pegasushairtools.com" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-all flex items-center gap-1">
                pegasushairtools.com <ExternalLink className="w-3 h-3 text-accent" />
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Address / Contact */}
        <div className="space-y-4 text-xs text-silver">
          <span className="mono-tag text-[11px] text-accent block">Mumbai Headquarters</span>
          <p>
            Presto Industries<br />
            215/216, Vasan Udyog Bhavan, 2nd Floor,<br />
            Senapati Bapat Marg, opp. Phoenix Mill,<br />
            Lower Parel, Mumbai, Maharashtra 400013
          </p>
          <p className="space-y-1">
            <a href="tel:+912243151400" className="hover:text-ink transition-colors block">+91 22431 51400</a>
            <a href="mailto:info@pegasushairtools.com" className="hover:text-ink transition-colors block">info@pegasushairtools.com</a>
          </p>
        </div>
      </div>

      {/* Copyright / Legal Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center text-[11px] mono-tag text-silver/70 gap-4 relative z-30">
        <span>
          © {new Date().getFullYear()} PEGASUS HAIR TOOLS. A PRESTO INDUSTRIES BRAND.
        </span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-ink transition-colors">PRIVACY REGISTRY</a>
          <a href="#" className="hover:text-ink transition-colors">TRADEMARKS</a>
          <a href="#" className="hover:text-ink transition-colors">REGULATORY METRICS</a>
        </div>
      </div>
    </footer>
  );
}
