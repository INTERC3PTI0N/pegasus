'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Globe,
  User,
  Scissors
} from 'lucide-react';

// Luxury components
import FloatingComb from '@/components/FloatingComb';
import BannerSlider from '@/components/BannerSlider';
import VideoBanner from '@/components/VideoBanner';
import AiAssistant from '@/components/AiAssistant';
import BrochureForm from '@/components/BrochureForm';
import Blog from '@/components/Blog';
import InteractiveMap from '@/components/InteractiveMap';

export default function Home() {
  // Preloader State
  const [loading, setLoading] = useState(true);
  const [loadPercent, setLoadPercent] = useState(0);

  // Active View and Interaction States
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedTech, setSelectedTech] = useState<'glamlock' | 'flexinite' | 'staticblock'>('flexinite');
  const [activeCollection, setActiveCollection] = useState<'rubber' | 'cellulose' | 'wood'>('rubber');
  const [activeTimelineYear, setActiveTimelineYear] = useState('1961');

  // Simulating Preloader Loading Experience (0 to 100%)
  useEffect(() => {
    let currentPercent = 0;
    const interval = setInterval(() => {
      currentPercent += Math.floor(Math.random() * 8) + 3;
      if (currentPercent >= 100) {
        currentPercent = 100;
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
        }, 800); // Elegant hold at 100%
      }
      setLoadPercent(currentPercent);
    }, 120);

    return () => clearInterval(interval);
  }, []);

  // Smooth jump to sections
  const navigateToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Timeline specifications — the real Presto Industries story
  const timelineData = [
    {
      year: '1961',
      title: 'Presto Industries Founded',
      desc: 'Lookman Qadir establishes Presto Industries with a singular conviction: grooming tools must be manufactured like precision instruments, not disposable novelties. The foundation of six decades of toolmaking begins.',
    },
    {
      year: '1977',
      title: 'Comb Manufacturing Begins',
      desc: 'Presto Industries begins manufacturing combs, mastering the craft of saw-cutting individual teeth and hand-polishing every edge — the seamless, rounded finish that still defines Pegasus today.',
    },
    {
      year: '2012',
      title: 'Pegasus Launches',
      desc: 'After extensive research examining global hair textures and climate conditions, Pegasus launches as Presto Industries’ hard rubber comb brand, featuring proprietary Flexinite Technology.',
    },
    {
      year: 'Today',
      title: 'Infinite Styling Standard',
      desc: 'Professional hair styling tools trusted by hairdressers across the world — supported by three core technologies: GlamLock, Flexinite and StaticBlock, across Cellulose, Hard Rubber and Ecowood ranges.',
    }
  ];

  const collectionsData = {
    rubber: {
      title: 'Hard Rubber (100% Ebonite)',
      materials: '100% Hard Rubber with Flexinite Technology',
      href: '/collections/hard-rubber',
      description: 'The only professional combs that provide precision, quality and sustainability along with glamour and funk to groom all hair types. High-heat and chemical resistant; flexible, strong and durable.',
      specifications: ['100% hard rubber (Ebonite) base', 'Proprietary FLEXINITE technology', 'High-heat and chemical resistant', 'Saw-cut, hand-bevelled teeth'],
    },
    cellulose: {
      title: 'Cellulose Acetate',
      materials: 'Plant-based Wood Pulp & Cotton Fibers',
      href: '/collections/cellulose',
      description: 'Saw-cut, then hand polished and buffed to ensure smooth, rounded teeth that massage your scalp. GlamLock seamless teeth detangle hair easily, stimulate the scalp and make hair smooth and shiny.',
      specifications: ['GLAMLOCK seamless teeth', 'Hand polished and buffed', 'Spreads natural oils root to tip', 'Hair and scalp friendly'],
    },
    wood: {
      title: 'Ecowood',
      materials: 'Natural Wood — Anti-static & Anti-bacterial',
      href: '/collections/ecowood',
      description: 'Sustainable, natural, eco-friendly. StaticBlock Technology prevents fly-aways and reduces frizz, while smooth polished teeth ensure a gentle glide — perfect for sensitive scalps.',
      specifications: ['STATICBLOCK fly-away control', 'Naturally anti-static & anti-bacterial', 'Gentle rounded tips for sensitive scalps', 'Earth & scalp friendly'],
    }
  };

  const techData = {
    flexinite: {
      title: 'FLEXINITE TECHNOLOGY',
      subtitle: 'A Truly Versatile Experience',
      highlights: 'Flexible. Responds to temperature changes for versatile styling.',
      details: 'Developed after extensive research examining global hair textures and climate conditions, Flexinite is the proprietary technology behind Pegasus 100% hard rubber (Ebonite) combs. The material responds to temperature changes, staying high-heat and chemical resistant while remaining flexible, strong and durable — precision cutting and styling, for professionals.',
      hotspots: [
        { title: 'Thermo-Responsive Body', desc: 'Responds to temperature changes under dryers and irons for a frictionless glide.' },
        { title: 'Salon-Grade Resistance', desc: 'High-heat and chemical resistant for daily professional use.' },
      ]
    },
    glamlock: {
      title: 'GLAMLOCK TECHNOLOGY',
      subtitle: 'Smooth. Shiny. Seamless.',
      highlights: 'Seamless teeth that detangle easily and stimulate the scalp.',
      details: 'Ordinary combs have sharp teeth which can roughen the hair and cause scalp damage. GlamLock combs are saw-cut, then hand polished and buffed so seamless, rounded teeth detangle hair easily, massage the scalp for healthy blood circulation, and spread the hair’s natural oils evenly from roots to tips — making hair smooth and shiny.',
      hotspots: [
        { title: 'Seamless Rounded Teeth', desc: 'Hand-finished tips glide without scraping the cuticle or the scalp.' },
        { title: 'Natural Shine', desc: 'Distributes natural oils from roots to tips for healthy lustre.' },
      ]
    },
    staticblock: {
      title: 'STATICBLOCK TECHNOLOGY',
      subtitle: 'Calm Hair. Naturally.',
      highlights: 'Prevents fly-aways and reduces frizz — naturally anti-static.',
      details: 'StaticBlock is the natural intelligence of the Pegasus Ecowood range. The organic wood body is inherently anti-static and anti-bacterial, preventing fly-aways and reducing frizz, while smooth polished teeth ensure a gentle glide — perfect for sensitive scalps, and completely earth friendly.',
      hotspots: [
        { title: 'Natural Static Control', desc: 'Anti-static material calms fly-aways during dry combing.' },
        { title: 'Sensitive-Scalp Safe', desc: 'Gentle rounded tips prevent scraping or bruising the scalp.' },
      ]
    }
  };

  const whoWeServeData = [
    {
      title: 'Hair Salons',
      role: 'Elite Establishments',
      icon: Scissors,
      desc: 'Empowering salon teams with durable, heat-resistant tools that elevate professional styling and protect client cuticles daily.',
      features: ['Unmatched chemical tolerance', 'High thermal thresholds', 'Professional brand posture']
    },
    {
      title: 'Professional Stylists',
      role: 'Creative Artists',
      icon: User,
      desc: 'The trusted secret of session stylists in Paris, London, and New York runway backstages to secure frictionless precision.',
      features: ['Frictionless precision parting', 'Seamless zero-snag teeth', 'Perfect ergonomic balance']
    },
    {
      title: 'Wholesale Distributors',
      role: 'Authorized Networks',
      icon: Globe,
      desc: 'Exclusive allocations of premium FLEXINITE lines, backed by Presto Industries manufacturing capacity and global trust.',
      features: ['Reliable supply pipelines', 'Extensive master catalogs', 'Robust retail marketing support']
    }
  ];

  // Shared reveal animation for section headers
  const reveal = {
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <div className="relative min-h-screen bg-white text-ink select-none selection:bg-accent selection:text-white">
      {/* Cinematic grid line overlays */}
      <div className="grid-overlay">
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
      </div>

      {/* Luxury noise filter overlay */}
      <div className="noise-overlay" />

      {/* The comb — one object, travelling the entire site in 3D */}
      {!loading && <FloatingComb />}

      {/* 1. Cinematic Preloader Experience */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-white z-50 flex flex-col justify-between p-12 overflow-hidden"
          >
            <div>
              <span className="mono-tag text-[11px] text-accent tracking-[0.3em] block mb-3">
                PRESTO INDUSTRIES — EST. 1961
              </span>
              <img
                src="/images/pegasus-logo.png"
                alt="PEGASUS — Infinite Styling"
                className="h-10 w-auto"
                draggable={false}
              />
            </div>

            {/* Levitating comb in pure light */}
            <div className="w-full h-80 max-w-2xl mx-auto flex items-center justify-center relative" style={{ perspective: 1200 }}>
              <motion.img
                src="/images/comb.png"
                alt="Pegasus comb"
                draggable={false}
                animate={{ y: [0, -18, 0], rotateZ: [-3, 3, -3], rotateY: [-10, 10, -10] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="comb-shadow w-[70%] max-w-lg"
              />
            </div>

            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div>
                <span className="mono-tag text-[11px] text-accent block mb-1">INFINITE STYLING</span>
                <span className="text-xs text-silver block max-w-xs leading-relaxed">
                  Engineering professional hair styling tools through material innovation and six decades of handcrafted precision.
                </span>
              </div>

              {/* Progress counter */}
              <div className="text-right">
                <span className="text-xs text-silver block mb-1">Curating the atelier</span>
                <div className="flex items-baseline justify-end gap-2">
                  <span className="editorial-text text-5xl md:text-6xl text-ink font-light tracking-tighter">
                    {loadPercent}
                  </span>
                  <span className="mono-tag text-xs text-accent">%</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Dots (Sticky Right) — header/footer live in the root layout */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">
        {['hero', 'about-timeline', 'product-collections', 'core-technologies', 'ai-styling-assistant', 'professional-markets', 'editorial-blog', 'request-brochure', 'global-contact'].map((sec) => (
          <button
            key={sec}
            onClick={() => navigateToSection(sec)}
            className="group flex items-center justify-end gap-3 focus:outline-none"
          >
            <span className="mono-tag text-[10px] text-accent uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {sec.replace(/-/g, ' ')}
            </span>
            <span
              className={`w-2 h-2 rounded-full border transition-all duration-300 ${
                activeSection === sec
                  ? 'bg-accent border-accent scale-125 pulse-accent'
                  : 'bg-transparent border-ink/20 group-hover:border-ink'
              }`}
            />
          </button>
        ))}
      </div>

      {/* MAIN VIEW SCROLLER */}
      <main className="relative">

        {/* SECTION 1: HERO — JUUN.J editorial campaign look */}
        <section
          id="hero"
          onMouseEnter={() => setActiveSection('hero')}
          className="relative min-h-screen flex flex-col justify-between pt-28 pb-10 px-6 md:px-12 lg:px-20 overflow-hidden"
        >
          {/* Giant campaign wordmark — the comb floats over it */}
          {/* On desktop the wordmark sits ABOVE the comb (z-25 vs z-20) with a
              translucent fill, so the comb reads through the letterforms. */}
          <div className="absolute inset-0 z-10 lg:z-[25] flex items-start justify-center select-none pointer-events-none pt-[14vh] lg:pt-[18vh]">
            <motion.h2
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              animate={{ opacity: 1, letterSpacing: '-0.04em' }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="display-text text-[clamp(3.25rem,15.5vw,13.5rem)] text-ink lg:text-ink/[0.82] leading-none uppercase whitespace-nowrap"
            >
              PEGASUS
            </motion.h2>
          </div>

          {/* Editorial copy blocks — above the comb layer */}
          <div className="relative z-30 flex-1 flex flex-col justify-end">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end w-full max-w-[1600px] mx-auto">
              {/* Bottom-left: campaign statement */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-3 space-y-4 max-w-xs"
              >
                <h3 className="display-text text-2xl md:text-3xl tracking-[0.06em] text-ink uppercase">
                  Our Craft
                </h3>
                <p className="text-sm text-silver leading-relaxed">
                  Styling has been around for a thousand years. It is what makes
                  an individual unique and remembered. We craft hair tools that
                  offer infinite styling possibilities.
                </p>
              </motion.div>

              {/* Centre: campaign banner slider (desktop only) — hover ~1s to
                  expand into the full filmstrip */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="hidden lg:block lg:col-span-6"
              >
                <div className="relative h-[270px] xl:h-[310px] w-full">
                  <BannerSlider expandable />
                </div>
              </motion.div>

              {/* Right: seasonal block, accent heading */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-3 space-y-4 max-w-xs lg:ml-auto lg:mb-24"
              >
                <h3 className="display-text text-2xl md:text-3xl tracking-[0.04em] uppercase" style={{ color: '#00adbb' }}>
                  Since 1961
                </h3>
                <p className="text-sm text-silver leading-relaxed">
                  From Presto Industries&rsquo; first workshop to combs trusted by
                  hairdressers across the world — precision, quality and
                  sustainability in every tooth.
                </p>
                <button
                  onClick={() => navigateToSection('product-collections')}
                  className="group flex items-center gap-2 mono-tag text-[11px] text-ink pt-2 cursor-pointer"
                >
                  Explore Collections
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </div>
          </div>

          {/* Bottom Bar facts */}
          <div className="relative z-30 border-t border-black/5 pt-6 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 max-w-[1600px] mx-auto w-full">
            <span className="mono-tag text-[11px] text-silver">
              Handcrafted by Presto Industries — Trusted globally
            </span>
            <div className="hidden md:flex gap-8 text-[11px] mono-tag text-silver">
              <span>EST. 1961</span>
              <span className="text-accent">•</span>
              <span>80+ AUTHORIZED COUNTRIES</span>
              <span className="text-accent">•</span>
              <span>AA ACCESSIBILITY</span>
            </div>
          </div>
        </section>


        {/* SECTION 1.25: FULL-WIDTH CINEMATIC VIDEO BANNER */}
        <VideoBanner />


        {/* SECTION 1.5: CAMPAIGN BANNERS — standalone slider on mobile/tablet */}
        <section
          id="campaign-banners"
          className="lg:hidden relative py-16 px-6 md:px-12 border-t border-black/5"
        >
          <div className="text-center mb-8">
            <span className="mono-tag text-xs text-accent border-b border-accent/30 pb-2 mb-3 inline-block">
              THE CAMPAIGN
            </span>
            <h2 className="editorial-text text-3xl md:text-4xl text-ink">
              Season Highlights
            </h2>
          </div>
          <BannerSlider className="h-[280px] md:h-[360px] w-full max-w-2xl mx-auto" />
        </section>


        {/* SECTION 2: ABOUT HISTORY TIMELINE */}
        <section
          id="about-timeline"
          onMouseEnter={() => setActiveSection('about-timeline')}
          className="relative min-h-screen bg-mist border-y border-black/5 py-20 px-6 md:px-12 lg:px-24 flex flex-col justify-between overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-1">
            {/* Left: General statement */}
            <motion.div {...reveal} className="lg:col-span-5 text-left space-y-6 relative z-30">
              <span className="mono-tag text-xs text-accent border-b border-accent/30 pb-2 inline-block">
                THE PRESTO INDUSTRIES LEGACY
              </span>
              <h3 className="editorial-text text-4xl md:text-5xl text-ink leading-tight">
                65 Years of Engineering Salon Precision
              </h3>
              <p className="text-sm text-silver leading-relaxed">
                Pegasus was not designed overnight. Founded by Lookman Qadir in 1961, Presto Industries began manufacturing combs in 1977 — and after extensive research examining global hair textures and climate conditions, launched Pegasus in 2012 as its hard rubber comb brand featuring Flexinite Technology.
              </p>

              {/* Horizontal Year Selector Buttons */}
              <div className="flex flex-wrap gap-2 pt-4">
                {timelineData.map((t) => (
                  <button
                    key={t.year}
                    onClick={() => setActiveTimelineYear(t.year)}
                    className={`px-4 py-2.5 rounded-full text-xs mono-tag transition-all cursor-pointer ${
                      activeTimelineYear === t.year
                        ? 'bg-ink text-white'
                        : 'bg-white border border-black/10 text-silver hover:text-ink hover:border-ink/30'
                    }`}
                  >
                    {t.year}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Middle: open stage — the floating comb docks here */}
            <div className="hidden lg:block lg:col-span-3 h-[300px] md:h-[400px] relative">
              <div className="absolute inset-x-4 bottom-16 h-10 rounded-[100%] bg-ink/5 blur-2xl" />
            </div>

            {/* Right: Dynamic description card for timeline */}
            <div className="lg:col-span-4 text-left relative z-30">
              <AnimatePresence mode="wait">
                {timelineData.map((t) => {
                  if (t.year !== activeTimelineYear) return null;
                  return (
                    <motion.div
                      key={t.year}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      className="lux-card p-8 rounded-2xl space-y-4"
                    >
                      <span className="editorial-text text-5xl md:text-6xl font-light tracking-tight block" style={{ color: '#00adbb' }}>
                        {t.year}
                      </span>
                      <h4 className="text-lg text-ink font-medium">
                        {t.title}
                      </h4>
                      <p className="text-xs text-silver leading-relaxed">
                        {t.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </section>


        {/* SECTION 3: COLLECTIONS (Immersive Material Selector) */}
        <section
          id="product-collections"
          onMouseEnter={() => setActiveSection('product-collections')}
          className="relative min-h-screen py-24 px-6 md:px-12 lg:px-24 flex flex-col justify-between overflow-hidden"
        >
          <motion.div {...reveal} className="text-center mb-16 relative z-30">
            <span className="mono-tag text-xs text-accent border-b border-accent/30 pb-2 mb-4 inline-block">
              MATERIAL TAXONOMY
            </span>
            <h2 className="editorial-text text-4xl md:text-5xl lg:text-6xl text-ink mb-4">
              The Three Professional Pillars
            </h2>
            <p className="text-silver max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              Each collection represents a bespoke material philosophy, sculpted individually to match specific chemical and styling dynamics.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 my-auto">
            {/* Left: Material choices with description */}
            <div className="lg:col-span-5 space-y-6 text-left relative z-30">
              <div className="flex gap-2 border-b border-black/5 pb-4">
                {Object.keys(collectionsData).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveCollection(key as 'rubber' | 'cellulose' | 'wood')}
                    className={`flex-1 py-3 text-center text-[11px] mono-tag border-b-2 transition-all cursor-pointer ${
                      activeCollection === key
                        ? 'border-accent text-ink'
                        : 'border-transparent text-silver hover:text-ink'
                    }`}
                  >
                    {key === 'rubber' ? 'Hard Rubber' : key === 'cellulose' ? 'Cellulose' : 'Ecowood'}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {Object.entries(collectionsData).map(([key, col]) => {
                  if (key !== activeCollection) return null;
                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="space-y-4"
                    >
                      <span className="mono-tag text-[11px] text-accent block">Featured Composition</span>
                      <h3 className="editorial-text text-3xl md:text-4xl text-ink">
                        {col.title}
                      </h3>
                      <span className="text-xs text-silver block italic border-l-2 border-accent pl-3 py-1 bg-mist">
                        Material: {col.materials}
                      </span>
                      <p className="text-xs md:text-sm text-silver leading-relaxed">
                        {col.description}
                      </p>

                      <div className="pt-4 space-y-2">
                        <span className="mono-tag text-[11px] text-accent block">Technical Parameters</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {col.specifications.map((spec, idx) => (
                            <div key={idx} className="flex items-center gap-2 bg-white border border-black/8 px-3 py-2 rounded-lg text-xs text-silver">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                              {spec}
                            </div>
                          ))}
                        </div>
                      </div>

                      <Link
                        href={col.href}
                        className="group inline-flex items-center gap-2 bg-ink text-white hover:bg-accent px-6 py-3.5 mono-tag text-xs transition-colors cursor-pointer mt-2"
                      >
                        Explore The Collection
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Middle: open stage for the travelling comb */}
            <div className="hidden lg:block lg:col-span-4 h-[350px] md:h-[450px] relative">
              <div className="absolute inset-x-8 bottom-20 h-12 rounded-[100%] bg-ink/5 blur-2xl" />
            </div>

            {/* Right: Immersive Product Image Spotlight Card */}
            <div className="lg:col-span-3 text-left relative z-30">
              <div className="lux-card rounded-2xl overflow-hidden relative">
                <div className="h-48 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500">
                  <img
                    src={
                      activeCollection === 'rubber'
                        ? '/images/pegasus_hard_rubber.jpg'
                        : activeCollection === 'cellulose'
                        ? '/images/pegasus_cellulose.jpg'
                        : '/images/pegasus_ecowood.jpg'
                    }
                    alt={`${activeCollection} comb detail`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded mono-tag text-[10px] text-accent">
                    high-res detail
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h4 className="text-xs text-ink font-medium uppercase tracking-[0.15em]">
                    Bespoke Salon Profile
                  </h4>
                  <p className="text-xs text-silver leading-normal">
                    Designed for heavy chemical processing resistance and frictionless dry detangling. Trusted by luxury salon academies globally.
                  </p>
                  <Link
                    href={collectionsData[activeCollection].href}
                    className="flex items-center gap-1.5 mono-tag text-[11px] text-accent pt-2 hover:underline cursor-pointer"
                  >
                    View The Full Range <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* SECTION 4: CORE TECHNOLOGIES */}
        <section
          id="core-technologies"
          onMouseEnter={() => setActiveSection('core-technologies')}
          className="relative min-h-screen bg-mist border-y border-black/5 py-24 px-6 md:px-12 lg:px-24 flex flex-col justify-between overflow-hidden"
        >
          <motion.div {...reveal} className="text-center mb-16 relative z-30">
            <span className="mono-tag text-xs text-accent border-b border-accent/30 pb-2 mb-4 inline-block">
              ENGINEERING EXCELLENCE
            </span>
            <h2 className="editorial-text text-4xl md:text-5xl lg:text-6xl text-ink mb-4">
              Proprietary Technologies
            </h2>
            <p className="text-silver max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              We do not copy; we pioneer. Pegasus represents a unified trilogy of structural materials patents designed specifically for premium salons.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 my-auto">
            {/* Left: open stage — the comb glides here for inspection */}
            <div className="hidden lg:block lg:col-span-4 h-[350px] md:h-[450px] relative">
              <div className="absolute inset-x-8 bottom-20 h-12 rounded-[100%] bg-ink/5 blur-2xl" />
              {/* Scan line, now a thin accent thread */}
              <div className="absolute left-[10%] right-[10%] h-[1px] bg-accent/50 shadow-[0_0_10px_#00adbb] animate-[bounce_4s_infinite_ease-in-out] pointer-events-none" />
            </div>

            {/* Middle: Technology Switch buttons & deep description */}
            <div className="lg:col-span-5 text-left space-y-6 relative z-30">
              <div className="flex gap-2">
                {Object.keys(techData).map((techKey) => (
                  <button
                    key={techKey}
                    onClick={() => setSelectedTech(techKey as 'glamlock' | 'flexinite' | 'staticblock')}
                    className={`flex-1 py-3 text-center text-[11px] mono-tag border-b-2 transition-all cursor-pointer ${
                      selectedTech === techKey
                        ? 'border-accent text-ink'
                        : 'border-transparent text-silver hover:text-ink'
                    }`}
                  >
                    {techKey.toUpperCase()}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {Object.entries(techData).map(([key, tech]) => {
                  if (key !== selectedTech) return null;
                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <span className="mono-tag text-[11px] text-accent block">Patented System</span>
                      <h3 className="editorial-text text-3xl md:text-4xl text-ink">
                        {tech.title}
                      </h3>
                      <span className="text-xs block uppercase tracking-[0.15em] italic" style={{ color: '#00adbb' }}>
                        {tech.subtitle}
                      </span>
                      <p className="text-xs md:text-sm text-silver leading-relaxed">
                        {tech.details}
                      </p>

                      <div className="pt-4 border-t border-black/5">
                        <span className="mono-tag text-[11px] text-accent block mb-3">Core Efficacy Hotspots</span>
                        <div className="space-y-3">
                          {tech.hotspots.map((h, i) => (
                            <div key={i} className="bg-white border border-black/8 p-4 rounded-xl flex gap-4 items-start">
                              <span className="mono-tag text-xs text-accent">0{i+1}</span>
                              <div>
                                <h5 className="text-xs text-ink font-medium">{h.title}</h5>
                                <p className="text-xs text-silver mt-1">{h.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Right: Interactive Scanning Status Data Card */}
            <div className="lg:col-span-3 text-left lg:pl-6 border-l border-black/5 space-y-6 relative z-30">
              <span className="mono-tag text-[11px] text-accent block">System Diagnostics</span>

              <div className="space-y-4 text-xs text-silver tracking-[0.08em]">
                <div>
                  <span className="text-ink block uppercase mb-1 font-medium">SCANNING UNIT</span>
                  <span>PEGASUS PRO-48</span>
                </div>
                <div>
                  <span className="text-ink block uppercase mb-1 font-medium">MATERIAL MATRIX</span>
                  <span>VULCANITE CARBON INFUSED</span>
                </div>
                <div>
                  <span className="text-ink block uppercase mb-1 font-medium">HEAT THRESHOLD</span>
                  <span>230°C / 446°F CONSTANT</span>
                </div>
                <div>
                  <span className="text-ink block uppercase mb-1 font-medium">FRICTION REGIME</span>
                  <span>SEAMLESS ROUNDED 0.02μm</span>
                </div>
              </div>

              <div className="border border-accent/25 bg-accent/5 p-4 rounded-xl text-xs text-silver space-y-2">
                <div className="flex justify-between items-center text-ink font-medium text-xs">
                  <span>GLAMLOCK METRICS</span>
                  <span className="text-accent">100% SECURE</span>
                </div>
                <p className="text-[11px] text-silver leading-normal">
                  All Pegasus comb teeth are clinically evaluated under micro-laser matrices to guarantee zero raw seams.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* SECTION 5: AI CONSULTANT */}
        <section
          id="ai-styling-assistant"
          onMouseEnter={() => setActiveSection('ai-styling-assistant')}
          className="relative min-h-screen py-24 px-6 md:px-12 lg:px-24 flex flex-col justify-center overflow-hidden"
        >
          {/* Ambient glowing circles */}
          <div className="absolute top-[20%] left-[10%] w-72 h-72 rounded-full bg-accent/5 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

          <div className="relative z-30">
            <AiAssistant />
          </div>
        </section>


        {/* SECTION 6: WHO WE SERVE */}
        <section
          id="professional-markets"
          onMouseEnter={() => setActiveSection('professional-markets')}
          className="relative min-h-screen bg-mist border-t border-black/5 py-24 px-6 md:px-12 lg:px-24 flex flex-col justify-between overflow-hidden"
        >
          <motion.div {...reveal} className="text-center mb-16 relative z-30">
            <span className="mono-tag text-xs text-accent border-b border-accent/30 pb-2 mb-4 inline-block">
              GLOBAL ALIGNMENT
            </span>
            <h2 className="editorial-text text-4xl md:text-5xl lg:text-6xl text-ink mb-4">
              Professional Markets
            </h2>
            <p className="text-silver max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              Serving the global echelon of hairdressing, from individual creative artists to elite high-volume salon networks.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch flex-1 my-auto relative z-30">
            {whoWeServeData.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="lux-card p-8 rounded-2xl hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-6">
                    <div className="w-12 h-12 bg-mist border border-black/8 rounded-full flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="space-y-1">
                      <span className="mono-tag text-[11px] text-accent block">{item.role}</span>
                      <h4 className="editorial-text text-2xl text-ink">{item.title}</h4>
                    </div>

                    <p className="text-xs text-silver leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="border-t border-black/5 pt-6 mt-8 space-y-3">
                    <span className="mono-tag text-[11px] text-silver block">Key Parameters</span>
                    <ul className="space-y-1.5">
                      {item.features.map((feat, fIdx) => (
                        <li key={fIdx} className="text-xs text-ink/80 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-accent" /> {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>


        {/* SECTION 7: EDITORIAL CHRONICLES BLOG */}
        <section
          id="editorial-blog"
          onMouseEnter={() => setActiveSection('editorial-blog')}
          className="relative min-h-screen py-24 px-6 md:px-12 lg:px-24 flex flex-col justify-center overflow-hidden"
        >
          <div className="relative z-30">
            <Blog />
          </div>
        </section>


        {/* SECTION 8: REQUEST BROCHURE */}
        <section
          id="request-brochure"
          onMouseEnter={() => setActiveSection('request-brochure')}
          className="relative min-h-screen bg-mist border-y border-black/5 py-24 px-6 md:px-12 lg:px-24 flex flex-col justify-center overflow-hidden"
        >
          <div className="relative z-30">
            <BrochureForm />
          </div>
        </section>


        {/* SECTION 9: CONTACT & WORLD OFFICES MAP */}
        <section
          id="global-contact"
          onMouseEnter={() => setActiveSection('global-contact')}
          className="relative min-h-screen py-24 px-6 md:px-12 lg:px-24 flex flex-col justify-center overflow-hidden"
        >
          <div className="relative z-30">
            <InteractiveMap />
          </div>
        </section>

      </main>

    </div>
  );
}
