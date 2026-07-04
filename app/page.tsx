'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  ArrowRight,
  ChevronRight,
  Globe,
  User,
  Scissors,
  ExternalLink
} from 'lucide-react';

// Luxury components
import FloatingComb from '@/components/FloatingComb';
import BannerSlider from '@/components/BannerSlider';
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
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
    setMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Timeline specifications
  const timelineData = [
    {
      year: '1961',
      title: 'Presto Industries Founded',
      desc: 'Established with a singular mission: engineering highly robust toolmaking equipment. Introduces organic hot-press hard rubber vulcanization to the European hair market, replacing raw metal styling teeth with safe organic compounds.',
    },
    {
      year: '1977',
      title: 'Diamond saw-cut expansion',
      desc: 'Perfects precision hand-finished comb manufacturing. Implements diamond-ground saw wheels carving individual comb teeth. Standardized seamless teeth rounding to protect sensitive hair cuticles globally.',
    },
    {
      year: '1995',
      title: 'Molecular Elastomer R&D',
      desc: 'Inaugurates a state-of-the-art material laboratory. Collaborates with leading Munich polymers institute to draft custom thermo-adaptable compounds. Laying structural foundations for what would eventually become Flexinite.',
    },
    {
      year: '2012',
      title: 'The Pinnacle Pegasus Launch',
      desc: 'Launches Pegasus Professional line. Infuses advanced material science directly into salon culture. Becomes an instantaneous cult-classic amongst session stylists in Paris, Milan, and New York runway backstages.',
    },
    {
      year: 'Today',
      title: 'Infinite Styling Standard',
      desc: 'Distributed in over 80 countries. A multi-generational engineering icon representing global salon trust, zero cuticle breakage, and frictionless structural control.',
    }
  ];

  const collectionsData = {
    rubber: {
      title: 'Hard Rubber (Vulcanite)',
      materials: '100% Organic Vulcanite Rubber with Flexinite',
      description: 'Manufactured by baking organic natural rubber sheets in high-pressure steam ovens. Features high chemical resistance, rigid backbone posture, and micro-flexible tooth ends that mimic hair elasticity.',
      specifications: ['100% Organic natural rubber base', 'Infused with smart FLEXINITE elastomer', 'Virtually impervious to bleach and peroxide', 'Hand-cut diamond teeth edges'],
    },
    cellulose: {
      title: 'Cellulose Acetate',
      materials: 'Plant-based Wood Pulp & Cotton Fibers',
      description: 'Handcrafted from premium natural raw blocks. Highly tactile material that adapts instantly to body temperature. Features translucent, elegant tortoiseshell aesthetics, with glass-smooth seamless tips.',
      specifications: ['Handcrafted plant-derived sheets', 'Zero-seam organic construction', 'Static-free high density fibers', 'Luxurious tortoiseshell polish'],
    },
    wood: {
      title: 'Ecowood Composite',
      materials: 'Organic Wood Fiber & Bio-polymers',
      description: 'An eco-responsible premium composite combining natural beechwood fibers with high-grade organic binders. Delivers an elegant wood-grain aesthetic with exceptional water and high salon temperature resistance.',
      specifications: ['Upcycled FSC beechwood fiber composite', 'High-heat thermal threshold (230°C)', 'Lightweight ergonomic body', 'Rich biological wood grain texturing'],
    }
  };

  const techData = {
    flexinite: {
      title: 'FLEXINITE TECHNOLOGY',
      subtitle: 'Responsive Thermal Elasticity',
      highlights: 'Flexible. Adapts dynamically under heat to protect the hair cuticle.',
      details: 'A revolutionary material configuration where comb teeth dynamically soften slightly during heat styling (under hair dryers and straighteners), responding with a flexible glide to prevent mechanical snagging or cuticle scale stripping. Returns to rigid alignment immediately upon cooling.',
      hotspots: [
        { title: 'Responsive Elastomer', desc: 'Slightly yields under pressure to mimic natural hair elasticity.' },
        { title: 'Thermal Adaptability', desc: 'Optimizes glide friction under high-velocity hair dryer heat.' },
      ]
    },
    glamlock: {
      title: 'GLAMLOCK TECHNOLOGY',
      subtitle: 'Seamless Cuticle Mirror Polish',
      highlights: 'Flawlessly rounded tips. Completely eliminates friction and scraping.',
      details: 'A specialized hand-finishing sawing process where each individual tooth is hand-cut and polished with natural volcanic clays. Eliminates microscopic molding seams, creating perfectly round tips that massage the scalp and align cuticle scales to maximize natural light reflection.',
      hotspots: [
        { title: 'Organic Rounded Tips', desc: 'Gentle scalp stimulation without scraping or follicular irritation.' },
        { title: 'Sartorial Polish', desc: 'Launches cuticle scales flat to reflect maximum salon light.' },
      ]
    },
    staticblock: {
      title: 'STATICBLOCK TECHNOLOGY',
      subtitle: 'Carbon-Fiber Neutralizing Matrix',
      highlights: 'Conductive carbon blend. Dissipates flyaway charges instantly.',
      details: 'Features a microscopic carbon-fiber grid dispersed evenly inside the polymer matrix. This grid functions as a structural ground, instantly capturing electrostatic charge build-up from mechanical comb friction and grounding it safely, eradicating static frizz and flyaways.',
      hotspots: [
        { title: 'Conductive Grounding', desc: 'Neutralizes electrical charges build-up from dry styling.' },
        { title: 'Zero flyaway stability', desc: 'Perfect alignment of hair fibers in runway backstages.' },
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
              <span className="mono-tag text-[11px] text-accent tracking-[0.3em] block mb-2">
                PRESTO INDUSTRIES — EST. 1961
              </span>
              <h1 className="display-text text-xl text-ink font-semibold tracking-widest">PEGASUS</h1>
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
                  Engineering professional salon instruments through material innovation and six decades of German craftsmanship.
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

      {/* 2. Premium Luxury Navigation Header — JUUN.J editorial style */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white/70 backdrop-blur-md border-b border-black/5 py-5 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-baseline gap-1.5 cursor-pointer" onClick={() => navigateToSection('hero')}>
          <h1 className="display-text text-lg md:text-xl text-ink font-semibold tracking-[0.18em]">
            PEGASUS
          </h1>
          <span className="mono-tag text-[10px] text-accent uppercase">
            pro
          </span>
        </div>

        {/* Centered Desktop Links */}
        <nav className="hidden lg:flex items-center gap-10 text-[13px] mono-tag text-ink/60 absolute left-1/2 -translate-x-1/2">
          <button onClick={() => navigateToSection('about-timeline')} className="hover:text-ink transition-all cursor-pointer whitespace-nowrap">About</button>
          <button onClick={() => navigateToSection('product-collections')} className="hover:text-ink transition-all cursor-pointer whitespace-nowrap">Collections</button>
          <button onClick={() => navigateToSection('core-technologies')} className="hover:text-ink transition-all cursor-pointer whitespace-nowrap">Technology</button>
          <button onClick={() => navigateToSection('ai-styling-assistant')} className="hover:text-ink transition-all cursor-pointer text-accent whitespace-nowrap">Rituals</button>
          <button onClick={() => navigateToSection('editorial-blog')} className="hover:text-ink transition-all cursor-pointer whitespace-nowrap">Chronicles</button>
        </nav>

        {/* Right CTA — quiet, editorial */}
        <div className="hidden lg:flex items-center gap-6">
          <button
            onClick={() => navigateToSection('request-brochure')}
            className="mono-tag text-[13px] text-ink/60 hover:text-ink transition-all cursor-pointer"
          >
            Brochure
          </button>
          <button
            onClick={() => navigateToSection('global-contact')}
            className="group flex items-center gap-2 mono-tag text-[13px] text-ink transition-all cursor-pointer"
          >
            Contact Us
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
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
            className="fixed inset-0 top-[72px] bg-white z-[45] flex flex-col justify-between p-8 overflow-y-auto"
          >
            <div className="space-y-6 text-center pt-8">
              {['about-timeline', 'product-collections', 'core-technologies', 'ai-styling-assistant', 'professional-markets', 'editorial-blog', 'request-brochure', 'global-contact'].map((sec) => (
                <button
                  key={sec}
                  onClick={() => navigateToSection(sec)}
                  className="block w-full text-lg text-silver hover:text-ink py-2 uppercase tracking-[0.2em]"
                >
                  {sec.replace(/-/g, ' ')}
                </button>
              ))}
            </div>

            <div className="border-t border-black/5 pt-6 text-center space-y-4">
              <span className="mono-tag text-[11px] text-accent uppercase">
                PRESTO INDUSTRIES DEUTSCHLAND
              </span>
              <p className="text-xs text-silver">
                sixty years of precision engineering salon tools.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Navigation Dots (Sticky Right) */}
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
          <div className="absolute inset-0 z-10 lg:z-[25] flex items-start lg:items-center justify-center select-none pointer-events-none pt-[16vh] lg:pt-0 lg:pb-[32vh]">
            <motion.h2
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              animate={{ opacity: 1, letterSpacing: '-0.04em' }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="display-text text-[16.5vw] text-ink lg:text-ink/[0.82] leading-none uppercase whitespace-nowrap"
            >
              PEGASUS
            </motion.h2>
          </div>

          {/* Editorial copy blocks — above the comb layer */}
          <div className="relative z-30 flex-1 flex flex-col justify-end">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end w-full">
              {/* Bottom-left: campaign statement */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-4 space-y-4 max-w-xs"
              >
                <h3 className="display-text text-2xl md:text-3xl tracking-[0.06em] text-ink uppercase">
                  Our Craft
                </h3>
                <p className="text-sm text-silver leading-relaxed">
                  At PEGASUS, every comb unfolds a new story — a journey through
                  diamond saw-cut teeth, hand-beveled edges, and six decades of
                  cutting-edge German toolmaking.
                </p>
              </motion.div>

              {/* Centre: campaign banner slider (desktop only) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="hidden lg:block lg:col-span-4"
              >
                <BannerSlider className="h-[260px] xl:h-[300px] w-full" />
              </motion.div>

              {/* Right: seasonal block, accent heading */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-4 space-y-4 max-w-xs lg:ml-auto lg:mb-24"
              >
                <h3 className="display-text text-2xl md:text-3xl tracking-[0.04em] uppercase" style={{ color: '#00adbb' }}>
                  Since 1961
                </h3>
                <p className="text-sm text-silver leading-relaxed">
                  Redefines the essence of grooming, taking inspiration from its
                  Munich roots and evolving it into an expression of sculptural,
                  frictionless styling.
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
          <div className="relative z-30 border-t border-black/5 pt-6 mt-12 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="mono-tag text-[11px] text-silver">
              Designed in Munich — Handcrafted globally
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
                Pegasus was not designed overnight. We represent more than six decades of technical toolmaking under Presto Industries. Since 1961, we have built physical structures designed specifically for hair alignment, combining natural organic materials with premium mechanical saw-cutting systems.
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
                  <button
                    onClick={() => navigateToSection('request-brochure')}
                    className="flex items-center gap-1.5 mono-tag text-[11px] text-accent pt-2 hover:underline cursor-pointer"
                  >
                    View Catalog Spec Sheets <ChevronRight className="w-3 h-3" />
                  </button>
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

      {/* 10. LUXURY PREMIUM FOOTER */}
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
          {/* Col 1: Newsletter */}
          <div className="space-y-4">
            <span className="mono-tag text-[11px] text-accent block">Join The Academy Chronology</span>
            <p className="text-xs text-silver leading-relaxed">
              Receive periodic briefs on material science breakthroughs, professional tool launches, and exclusive salon masterclass guides.
            </p>

            {newsletterSubscribed ? (
              <div className="bg-accent/10 border border-accent p-3 text-center text-xs text-ink rounded-lg">
                Verified. You are on the registry.
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Corporate email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="p-3 custom-input rounded-lg text-xs flex-1"
                />
                <button
                  onClick={() => {
                    if (newsletterEmail.includes('@')) {
                      setNewsletterSubscribed(true);
                    }
                  }}
                  className="px-4 py-3 bg-ink text-white hover:bg-accent transition-colors mono-tag text-xs rounded-lg cursor-pointer"
                >
                  Join
                </button>
              </div>
            )}
          </div>

          {/* Col 2: Navigation links */}
          <div className="space-y-4 lg:pl-12">
            <span className="mono-tag text-[11px] text-accent block">Atelier</span>
            <ul className="space-y-2 text-xs text-silver">
              <li><button onClick={() => navigateToSection('hero')} className="hover:text-ink transition-all cursor-pointer">The Campaign</button></li>
              <li><button onClick={() => navigateToSection('about-timeline')} className="hover:text-ink transition-all cursor-pointer">Presto Chronicles</button></li>
              <li><button onClick={() => navigateToSection('product-collections')} className="hover:text-ink transition-all cursor-pointer">Material Classifications</button></li>
              <li><button onClick={() => navigateToSection('core-technologies')} className="hover:text-ink transition-all cursor-pointer">Patented Technologies</button></li>
              <li><button onClick={() => navigateToSection('ai-styling-assistant')} className="hover:text-ink transition-all text-accent cursor-pointer">Custom Regimens</button></li>
            </ul>
          </div>

          {/* Col 3: Industry links */}
          <div className="space-y-4 lg:pl-12">
            <span className="mono-tag text-[11px] text-accent block">Corporate Affiliations</span>
            <ul className="space-y-2 text-xs text-silver">
              <li><button onClick={() => navigateToSection('professional-markets')} className="hover:text-ink transition-all cursor-pointer">Salon Procurement</button></li>
              <li><button onClick={() => navigateToSection('request-brochure')} className="hover:text-ink transition-all cursor-pointer">Tactile Catalog Portfolio</button></li>
              <li><button onClick={() => navigateToSection('global-contact')} className="hover:text-ink transition-all cursor-pointer">General Agency Relations</button></li>
              <li><a href="https://www.presto-industries.de" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-all flex items-center gap-1">Presto Industries DE <ExternalLink className="w-3 h-3 text-accent" /></a></li>
            </ul>
          </div>

          {/* Col 4: Address / Legal */}
          <div className="space-y-4 text-xs text-silver">
            <span className="mono-tag text-[11px] text-accent block">Munich Headquarters</span>
            <p>
              Presto Industries GmbH & Co. KG<br />
              Schleissheimer Str. 102<br />
              80797 Munich, Germany
            </p>
            <p className="text-[11px] text-silver/70">
              USt-IdNr. DE 129 444 821<br />
              Registered District Court Munich HRA 48211
            </p>
          </div>
        </div>

        {/* Copyright / Legal Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[11px] mono-tag text-silver/70 gap-4 relative z-30">
          <span>
            © {new Date().getFullYear()} PEGASUS HAIR TOOLS. UNDER LICENSE OF PRESTO INDUSTRIES GMBH.
          </span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-ink transition-colors">PRIVACY REGISTRY</a>
            <a href="#" className="hover:text-ink transition-colors">TRADEMARKS</a>
            <a href="#" className="hover:text-ink transition-colors">REGULATORY METRICS</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
