'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';

import type { SiteContent } from '@/lib/cms';

export default function SiteHeader({ content }: { content: SiteContent['global.header'] }) {
  const { navLinks, logo, logoOnDark, shopLabel, shopUrl } = content;
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Transparent only over the home page's video hero; solid everywhere else.
  const solid = scrolled || menuOpen || pathname !== '/';
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          solid
            ? 'bg-white/95 backdrop-blur-md border-b border-black/5 py-3.5'
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
        <div className="w-full px-6 md:px-10 lg:px-14 flex items-center justify-between gap-6">
          {/* Logo — top left */}
          <Link href="/" className="cursor-pointer shrink-0" onClick={() => setMenuOpen(false)}>
            <img
              src={solid ? logo : logoOnDark || logo}
              alt="PEGASUS® — Mastery in Your Hands"
              className={`w-auto transition-all duration-500 ${solid ? 'h-11 md:h-12' : 'h-12 md:h-16'} ${
                solid ? '' : 'drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]'
              }`}
              draggable={false}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={`mono-tag text-[11px] xl:text-xs transition-colors cursor-pointer whitespace-nowrap ${
                  solid
                    ? isActive(l.href)
                      ? 'text-accent'
                      : 'text-ink/70 hover:text-accent'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Enquire */}
          <Link
            href={shopUrl}
            className={`hidden lg:inline-flex group items-center gap-1.5 mono-tag text-[11px] px-5 py-2.5 border transition-all cursor-pointer shrink-0 ${
              solid
                ? 'border-ink bg-ink text-white hover:bg-accent hover:border-accent'
                : 'border-white/50 text-white hover:bg-white hover:text-ink'
            }`}
          >
            {shopLabel}
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
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
                    className={`block w-full editorial-text text-3xl py-3 border-b border-black/5 ${
                      isActive(l.href) ? 'text-accent' : 'text-ink hover:text-accent'
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-black/5 pt-6">
              <Link
                href={shopUrl}
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center gap-1.5 mono-tag text-[11px] px-5 py-2.5 bg-ink text-white"
              >
                {shopLabel} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
