'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { label: 'Products', href: '/#products' },
  { label: 'Technology', href: '/#technology' },
  { label: 'About', href: '/#about' },
  { label: 'Journal', href: '/#journal' },
  { label: 'Contact', href: '/#contact' },
];

const collectionLinks = [
  { label: 'Hard Rubber · Flexinite', href: '/collections/hard-rubber' },
  { label: 'Cellulose Acetate', href: '/collections/cellulose' },
  { label: 'Ecowood · StaticBlock', href: '/collections/ecowood' },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<'EN' | 'JP'>('EN');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Solid bar once scrolled or when the drawer is open; transparent over the hero.
  const solid = scrolled || menuOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          solid
            ? 'bg-white/90 backdrop-blur-md border-b border-black/5 py-3.5'
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
        <div className="w-full px-6 md:px-10 lg:px-14 flex items-center justify-between">
          {/* Logo — top left */}
          <Link href="/" className="cursor-pointer shrink-0" onClick={() => setMenuOpen(false)}>
            <img
              src="/images/pegasus-logo.png"
              alt="PEGASUS — Infinite Styling"
              className={`w-auto transition-all duration-500 ${solid ? 'h-8 md:h-9' : 'h-9 md:h-11'} ${
                solid ? '' : 'drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]'
              }`}
              draggable={false}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-9">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={`mono-tag text-xs transition-colors cursor-pointer whitespace-nowrap ${
                  solid ? 'text-ink/70 hover:text-accent' : 'text-white/90 hover:text-white'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right cluster: language toggle + online shop */}
          <div className="hidden lg:flex items-center gap-6">
            <div className={`flex items-center gap-1.5 mono-tag text-[11px] ${solid ? 'text-ink/60' : 'text-white/80'}`}>
              {(['EN', 'JP'] as const).map((l, i) => (
                <React.Fragment key={l}>
                  {i > 0 && <span className="opacity-40">/</span>}
                  <button
                    onClick={() => setLang(l)}
                    className={`transition-colors cursor-pointer ${
                      lang === l ? 'text-accent' : 'hover:opacity-100 opacity-70'
                    }`}
                  >
                    {l}
                  </button>
                </React.Fragment>
              ))}
            </div>

            <a
              href="https://www.pegasushairtools.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center gap-1.5 mono-tag text-[11px] px-5 py-2.5 border transition-all cursor-pointer ${
                solid
                  ? 'border-ink/20 text-ink hover:bg-ink hover:text-white hover:border-ink'
                  : 'border-white/50 text-white hover:bg-white hover:text-ink'
              }`}
            >
              Online Shop
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className={`lg:hidden p-2 transition-colors ${solid ? 'text-ink' : 'text-white'}`}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[60px] bg-white z-[45] flex flex-col justify-between p-8 overflow-y-auto lg:hidden"
          >
            <div className="space-y-1 pt-4">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="block w-full editorial-text text-3xl text-ink hover:text-accent py-3 border-b border-black/5"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              <div className="pt-8">
                <span className="mono-tag text-[11px] text-accent block mb-4">The Collections</span>
                <div className="space-y-3">
                  {collectionLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      className="block w-full text-sm text-silver hover:text-ink tracking-[0.12em] uppercase"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-black/5 pt-6 flex items-center justify-between">
              <a
                href="https://www.pegasushairtools.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mono-tag text-[11px] px-5 py-2.5 border border-ink/20 text-ink"
              >
                Online Shop <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <div className="flex items-center gap-2 mono-tag text-[11px] text-ink/60">
                <button onClick={() => setLang('EN')} className={lang === 'EN' ? 'text-accent' : ''}>EN</button>
                <span className="opacity-40">/</span>
                <button onClick={() => setLang('JP')} className={lang === 'JP' ? 'text-accent' : ''}>JP</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
