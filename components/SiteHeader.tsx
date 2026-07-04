'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '/#about-timeline' },
  { label: 'Collections', href: '/#product-collections' },
  { label: 'Technology', href: '/#core-technologies' },
  { label: 'Rituals', href: '/#ai-styling-assistant', accent: true },
  { label: 'Chronicles', href: '/#editorial-blog' },
];

const collectionLinks = [
  { label: 'Hard Rubber · Flexinite', href: '/collections/hard-rubber' },
  { label: 'Cellulose Acetate', href: '/collections/cellulose' },
  { label: 'Ecowood · StaticBlock', href: '/collections/ecowood' },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 bg-white/70 backdrop-blur-md border-b border-black/5 py-4 px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="cursor-pointer shrink-0" onClick={() => setMenuOpen(false)}>
          <img
            src="/images/pegasus-logo.png"
            alt="PEGASUS — Infinite Styling"
            className="h-9 md:h-10 w-auto"
            draggable={false}
          />
        </Link>

        {/* Centered Desktop Links */}
        <nav className="hidden lg:flex items-center gap-10 text-[13px] mono-tag text-ink/60 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={`hover:text-ink transition-all cursor-pointer whitespace-nowrap ${l.accent ? 'text-accent' : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right CTA — quiet, editorial */}
        <div className="hidden lg:flex items-center gap-6">
          <Link
            href="/#request-brochure"
            className="mono-tag text-[13px] text-ink/60 hover:text-ink transition-all cursor-pointer"
          >
            Brochure
          </Link>
          <Link
            href="/#global-contact"
            className="group flex items-center gap-2 mono-tag text-[13px] text-ink transition-all cursor-pointer"
          >
            Contact Us
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          className="lg:hidden p-2 text-ink hover:text-accent transition-all"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[68px] bg-white z-[45] flex flex-col justify-between p-8 overflow-y-auto"
          >
            <div className="space-y-5 text-center pt-6">
              {[...navLinks, { label: 'Brochure', href: '/#request-brochure' }, { label: 'Contact Us', href: '/#global-contact' }].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-lg text-silver hover:text-ink py-2 uppercase tracking-[0.2em]"
                >
                  {l.label}
                </Link>
              ))}

              <div className="pt-6 border-t border-black/5">
                <span className="mono-tag text-xs text-accent block mb-4">THE COLLECTIONS</span>
                {collectionLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="block w-full text-sm text-silver hover:text-ink py-2 uppercase tracking-[0.15em]"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-black/5 pt-6 text-center space-y-3">
              <span className="mono-tag text-xs text-accent uppercase">
                PRESTO INDUSTRIES — EST. 1961
              </span>
              <p className="text-xs text-silver">
                Handcrafted professional hair tools. Mumbai, India.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
