'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  Compass,
  ArrowRight,
  Shield,
  Clock,
  Sparkles,
  Layers,
  ChevronRight,
  ChevronDown,
  Globe,
  User,
  Scissors,
  ExternalLink
} from 'lucide-react';

// Import our luxury components
import PegasusComb from '@/components/PegasusComb';
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
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

  // Handle Mouse Coordinates for Specluar Lighting and Parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Simulating Scroll Parallax within view components
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      color: 'text-silver',
    },
    cellulose: {
      title: 'Cellulose Acetate',
      materials: 'Plant-based Wood Pulp & Cotton Fibers',
      description: 'Handcrafted from premium natural raw blocks. Highly tactile material that adapts instantly to body temperature. Features translucent, elegant tortoiseshell aesthetics, with glass-smooth seamless tips.',
      specifications: ['Handcrafted plant-derived sheets', 'Zero-seam organic construction', 'Static-free high density fibers', 'Luxurious tortoiseshell polish'],
      color: 'text-amber-500',
    },
    wood: {
      title: 'Ecowood Composite',
      materials: 'Organic Wood Fiber & Bio-polymers',
      description: 'An eco-responsible premium composite combining natural beechwood fibers with high-grade organic binders. Delivers an elegant wood-grain aesthetic with exceptional water and high salon temperature resistance.',
      specifications: ['Upcycled FSC beechwood fiber composite', 'High-heat thermal threshold (230°C)', 'Lightweight ergonomic body', 'Rich biological wood grain texturing'],
      color: 'text-gold',
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

  return (
    <div className="relative min-h-screen bg-black text-white select-none selection:bg-gold selection:text-black">
      {/* Cinematic grid line overlays */}
      <div className="grid-overlay">
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
        <div className="grid-line"></div>
      </div>

      {/* Luxury noise filter overlay */}
      <div className="noise-overlay" />

      {/* 1. Cinematic Preloader Experience */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-black z-50 flex flex-col justify-between p-12 overflow-hidden"
          >
            <div>
              <span className="mono-tag text-[9px] text-gold tracking-[0.3em] block mb-2">
                PRESTO INDUSTRIES — EST. 1961
              </span>
              <h1 className="editorial-text text-xl text-white font-medium">PEGASUS</h1>
            </div>

            {/* Rotating Comb in darkness */}
            <div className="w-full h-80 max-w-lg mx-auto flex items-center justify-center relative">
              <PegasusComb activeSection="preloader" scrollProgress={0} mousePos={mousePos} />
              
              {/* Reflected ambient light highlight simulation */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none animate-pulse" />
            </div>

            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div>
                <span className="font-mono text-xs text-gold block mb-1">INFINITE STYLING</span>
                <span className="font-sans text-[11px] text-silver block max-w-xs leading-relaxed">
                  Engineering professional salon instruments through material innovation and six decades of German craftsmanship.
                </span>
              </div>

              {/* Progress counter */}
              <div className="text-right">
                <span className="font-sans text-[11px] text-silver block mb-1">Establishing reality terminals</span>
                <div className="flex items-baseline justify-end gap-2">
                  <span className="editorial-text text-5xl md:text-6xl text-white font-light tracking-tighter">
                    {loadPercent}
                  </span>
                  <span className="font-mono text-xs text-gold">%</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Premium Luxury Navigation Header */}
      <header className="fixed top-0 left-0 w-full z-40 bg-black/40 backdrop-blur-md border-b border-white/5 py-5 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-baseline gap-1.5 cursor-pointer" onClick={() => navigateToSection('hero')}>
          <h1 className="editorial-text text-xl md:text-2xl text-white font-medium tracking-tight">
            PEGASUS
          </h1>
          <span className="font-mono text-[8px] text-gold uppercase tracking-wider">
            pro
          </span>
        </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[10px] font-mono uppercase tracking-widest text-silver">
          <button onClick={() => navigateToSection('about-timeline')} className="hover:text-white transition-all cursor-pointer">About</button>
          <button onClick={() => navigateToSection('product-collections')} className="hover:text-white transition-all cursor-pointer">Collections</button>
          <button onClick={() => navigateToSection('core-technologies')} className="hover:text-white transition-all cursor-pointer">Technology</button>
          <button onClick={() => navigateToSection('ai-styling-assistant')} className="hover:text-white transition-all cursor-pointer text-gold">Bespoke Rituals</button>
          <button onClick={() => navigateToSection('professional-markets')} className="hover:text-white transition-all cursor-pointer">Markets</button>
          <button onClick={() => navigateToSection('editorial-blog')} className="hover:text-white transition-all cursor-pointer">Chronicles</button>
        </nav>

        {/* Right CTAs */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={() => navigateToSection('request-brochure')}
            className="border border-white/10 hover:border-gold/30 px-5 py-2.5 rounded text-[9px] font-mono uppercase tracking-widest text-silver hover:text-white transition-all bg-black/40 cursor-pointer"
          >
            Request Brochure
          </button>
          <button
            onClick={() => navigateToSection('global-contact')}
            className="bg-white hover:bg-gold text-black px-5 py-2.5 rounded text-[9px] font-mono uppercase tracking-widest transition-all cursor-pointer font-medium"
          >
            Contact
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 text-white hover:text-gold transition-all"
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
            className="fixed inset-0 top-[72px] bg-black/95 z-30 flex flex-col justify-between p-8 overflow-y-auto"
          >
            <div className="space-y-6 text-center pt-8">
              {['about-timeline', 'product-collections', 'core-technologies', 'ai-styling-assistant', 'professional-markets', 'editorial-blog', 'request-brochure', 'global-contact'].map((sec) => (
                <button
                  key={sec}
                  onClick={() => navigateToSection(sec)}
                  className="block w-full text-lg font-sans text-silver hover:text-white py-2 uppercase tracking-wider border-b border-white/5"
                >
                  {sec.replace('-', ' ')}
                </button>
              ))}
            </div>

            <div className="border-t border-white/5 pt-6 text-center space-y-4">
              <span className="font-mono text-[9px] text-gold uppercase tracking-widest">
                PRESTO INDUSTRIES DEUTSCHLAND
              </span>
              <p className="font-sans text-[11px] text-silver">
                sixty years of precision engineering salon tools.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Infinite Scroll/Snap Navigation Dots (Sticky Right) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">
        {['hero', 'about-timeline', 'product-collections', 'core-technologies', 'ai-styling-assistant', 'professional-markets', 'editorial-blog', 'request-brochure', 'global-contact'].map((sec) => (
          <button
            key={sec}
            onClick={() => navigateToSection(sec)}
            className="group flex items-center justify-end gap-3 focus:outline-none"
          >
            <span className="font-mono text-[8px] text-gold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {sec.replace('-', ' ')}
            </span>
            <span
              className={`w-2 h-2 rounded-full border transition-all duration-300 ${
                activeSection === sec
                  ? 'bg-gold border-gold scale-125 pulse-gold'
                  : 'bg-transparent border-white/20 group-hover:border-white'
              }`}
            />
          </button>
        ))}
      </div>

      {/* MAIN VIEW SCROLLER */}
      <main className="relative">

        {/* SECTION 1: HERO VIEW (Immersive Editorial Juun.J / Dyson look) */}
        <section
          id="hero"
          onMouseEnter={() => setActiveSection('hero')}
          className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 lg:px-24 overflow-hidden"
        >
          {/* Layer One: Parallax Background Text */}
          <div className="absolute inset-0 z-0 flex items-center justify-center select-none pointer-events-none">
            <h2 className="editorial-text text-[15vw] text-white/5 font-extrabold tracking-tighter leading-none uppercase">
              PEGASUS
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 relative z-10 my-auto">
            {/* Left Col: Creative Title block */}
            <div className="lg:col-span-5 text-left space-y-6">
              <span className="mono-tag text-xs text-gold border-b border-gold/30 pb-2 inline-block">
                THE ICONIC VULCANITE COMBS
              </span>
              <h2 className="editorial-text text-5xl md:text-6xl lg:text-7xl text-white font-medium leading-none">
                INFINITE<br />STYLING.
              </h2>
              <p className="font-sans text-sm md:text-base text-silver leading-relaxed max-w-md">
                We design professional styling tools through materials innovation. Every tooth is diamond-cut, hand-beveled, and clay-polished to preserve salon cuticle health.
              </p>
              
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => navigateToSection('ai-styling-assistant')}
                  className="bg-white hover:bg-gold text-black px-6 py-3.5 rounded text-xs font-mono uppercase tracking-widest transition-all cursor-pointer font-medium"
                >
                  Custom Consultation
                </button>
                <button
                  onClick={() => navigateToSection('product-collections')}
                  className="border border-white/10 hover:border-white px-6 py-3.5 rounded text-xs font-mono uppercase tracking-widest text-silver hover:text-white transition-all cursor-pointer"
                >
                  Explore Collections
                </button>
              </div>
            </div>

            {/* Middle Col: Floating projected 3D comb inside canvas */}
            <div className="lg:col-span-4 h-[350px] md:h-[450px] relative flex items-center justify-center">
              <PegasusComb
                activeSection="hero"
                scrollProgress={scrollProgress}
                mousePos={mousePos}
                materialOverride={activeCollection}
              />
            </div>

            {/* Right Col: Specific technical facts cards */}
            <div className="lg:col-span-3 text-left space-y-6 lg:pl-6 border-l border-white/5">
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-gold uppercase tracking-wider block">Material science</span>
                <h4 className="font-sans text-sm text-white font-medium">Flexinite Integration</h4>
                <p className="font-sans text-xs text-silver leading-relaxed">
                  Thermo-sensitive elastomer that softens under hair dryers, reducing styling tension by up to 43%.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[9px] text-gold uppercase tracking-wider block">Scalp protection</span>
                <h4 className="font-sans text-sm text-white font-medium">Hand-Beveled Rounding</h4>
                <p className="font-sans text-xs text-silver leading-relaxed">
                  Clay-polished teeth entirely free from micro-seams, stimulating scalp flow and glossing cuticles.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[9px] text-gold uppercase tracking-wider block">Global trust</span>
                <h4 className="font-sans text-sm text-white font-medium">German Manufacture</h4>
                <p className="font-sans text-xs text-silver leading-relaxed">
                  sixty years of Presto Industries heritage built for leading fashion runaways and daily salon workflows.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar facts */}
          <div className="relative z-10 border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="font-mono text-[9px] text-silver tracking-widest uppercase">
              Designed in Munich — Handcrafted globally
            </span>
            <div className="flex gap-8 text-[10px] font-mono text-silver">
              <span>EST. 1961</span>
              <span>•</span>
              <span>80+ AUTHORIZED COUNTRIES</span>
              <span>•</span>
              <span>AA ACCESSIBILITY</span>
            </div>
          </div>
        </section>


        {/* SECTION 2: ABOUT HISTORY TIMELINE (Cinematic scrolling timeline) */}
        <section
          id="about-timeline"
          onMouseEnter={() => setActiveSection('about')}
          className="relative min-h-screen bg-charcoal/30 border-y border-white/5 py-20 px-6 md:px-12 lg:px-24 flex flex-col justify-between overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-1">
            {/* Left: General statement */}
            <div className="lg:col-span-5 text-left space-y-6">
              <span className="mono-tag text-xs text-gold border-b border-gold/30 pb-2 inline-block">
                THE PRESTO INDUSTRIES LEGACY
              </span>
              <h3 className="editorial-text text-4xl md:text-5xl text-white font-medium leading-tight">
                65 Years of Engineering Salon Precision
              </h3>
              <p className="font-sans text-sm text-silver leading-relaxed">
                Pegasus was not designed overnight. We represent more than six decades of technical toolmaking under Presto Industries. Since 1961, we have built physical structures designed specifically for hair alignment, combining natural organic materials with premium mechanical saw-cutting systems.
              </p>

              {/* Horizontal Year Selector Buttons */}
              <div className="flex flex-wrap gap-2 pt-4">
                {timelineData.map((t) => (
                  <button
                    key={t.year}
                    onClick={() => setActiveTimelineYear(t.year)}
                    className={`px-4 py-2.5 rounded text-xs font-mono transition-all ${
                      activeTimelineYear === t.year
                        ? 'bg-gold text-black font-medium'
                        : 'bg-white/5 hover:bg-white/10 text-silver hover:text-white'
                    }`}
                  >
                    {t.year}
                  </button>
                ))}
              </div>
            </div>

            {/* Middle: Live projected 3D comb as vertical axis indicator */}
            <div className="lg:col-span-3 h-[300px] md:h-[400px] relative flex items-center justify-center">
              <PegasusComb activeSection="about" scrollProgress={scrollProgress} mousePos={mousePos} />
            </div>

            {/* Right: Dynamic description card for timeline */}
            <div className="lg:col-span-4 text-left">
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
                      className="bg-black/40 border border-white/5 p-8 rounded-lg space-y-4"
                    >
                      <span className="editorial-text text-5xl md:text-6xl text-gold font-light tracking-tight block">
                        {t.year}
                      </span>
                      <h4 className="font-sans text-lg text-white font-medium">
                        {t.title}
                      </h4>
                      <p className="font-sans text-xs text-silver leading-relaxed">
                        {t.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </section>


        {/* SECTION 3: WHAT WE OFFER / COLLECTIONS (Immersive Material Selector) */}
        <section
          id="product-collections"
          onMouseEnter={() => setActiveSection(`collections-${activeCollection}`)}
          className="relative min-h-screen py-24 px-6 md:px-12 lg:px-24 flex flex-col justify-between overflow-hidden"
        >
          <div className="text-center mb-16">
            <span className="mono-tag text-xs text-gold border-b border-gold/30 pb-2 mb-4 inline-block">
              MATERIAL TAXONOMY
            </span>
            <h2 className="editorial-text text-4xl md:text-5xl lg:text-6xl text-white font-medium mb-4">
              The Three Professional Pillars
            </h2>
            <p className="text-silver max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              Each collection represents a bespoke material philosophy, sculpted individually to match specific chemical and styling dynamics.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 my-auto">
            {/* Left: Material choices with description */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="flex gap-2 border-b border-white/5 pb-4">
                {Object.keys(collectionsData).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveCollection(key as any);
                      setActiveSection(`collections-${key}`);
                    }}
                    className={`flex-1 py-3 text-center text-[10px] font-mono uppercase tracking-widest border transition-all ${
                      activeCollection === key
                        ? 'border-gold text-white bg-white/5'
                        : 'border-transparent text-silver hover:text-white'
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
                      <span className="mono-tag text-[10px] text-gold tracking-widest block">Featured Composition</span>
                      <h3 className="font-sans text-2xl md:text-3xl text-white font-medium">
                        {col.title}
                      </h3>
                      <span className="font-mono text-xs text-silver block italic border-l-2 border-gold pl-3 py-1 bg-white/[0.02]">
                        Material: {col.materials}
                      </span>
                      <p className="font-sans text-xs md:text-sm text-silver leading-relaxed">
                        {col.description}
                      </p>

                      <div className="pt-4 space-y-2">
                        <span className="font-mono text-[9px] text-gold uppercase tracking-wider block">Technical Parameters</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {col.specifications.map((spec, idx) => (
                            <div key={idx} className="flex items-center gap-2 bg-black/40 border border-white/5 px-3 py-2 rounded text-xs text-silver">
                              <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
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

            {/* Middle: Large material-switching comb render */}
            <div className="lg:col-span-4 h-[350px] md:h-[450px] relative flex items-center justify-center">
              <PegasusComb
                activeSection={`collections-${activeCollection}`}
                scrollProgress={scrollProgress}
                mousePos={mousePos}
                materialOverride={activeCollection}
              />
            </div>

            {/* Right: Immersive Product Image Spotlight Card */}
            <div className="lg:col-span-3 text-left">
              <div className="bg-charcoal border border-white/5 rounded-lg overflow-hidden relative shadow-2xl">
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
                  <div className="absolute top-3 left-3 bg-black/80 px-2 py-1 rounded font-mono text-[8px] text-gold tracking-widest uppercase">
                    high-res detail
                  </div>
                </div>

                <div className="p-5 space-y-3 bg-black/30">
                  <h4 className="font-sans text-xs text-white font-medium uppercase tracking-wider">
                    Bespoke Salon Profile
                  </h4>
                  <p className="font-sans text-[11px] text-silver leading-normal">
                    Designed for heavy chemical processing resistance and frictionless dry detangling. Trusted by luxury salon academies globally.
                  </p>
                  <button
                    onClick={() => navigateToSection('request-brochure')}
                    className="flex items-center gap-1.5 font-mono text-[9px] text-gold uppercase tracking-widest pt-2 hover:underline cursor-pointer"
                  >
                    View Catalog Spec Sheets <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* SECTION 4: CORE TECHNOLOGIES (Hotspots Exploded View) */}
        <section
          id="core-technologies"
          onMouseEnter={() => setActiveSection(`technology-${selectedTech}`)}
          className="relative min-h-screen bg-charcoal/30 border-y border-white/5 py-24 px-6 md:px-12 lg:px-24 flex flex-col justify-between overflow-hidden"
        >
          <div className="text-center mb-16">
            <span className="mono-tag text-xs text-gold border-b border-gold/30 pb-2 mb-4 inline-block">
              ENGINEERING EXCELLENCE
            </span>
            <h2 className="editorial-text text-4xl md:text-5xl lg:text-6xl text-white font-medium mb-4">
              Proprietary Technologies
            </h2>
            <p className="text-silver max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              We do not copy; we pioneer. Pegasus represents a unified trilogy of structural materials patents designed specifically for premium salons.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 my-auto">
            {/* Left Col: Exploded/Scanning Active Comb Canvas */}
            <div className="lg:col-span-4 h-[350px] md:h-[450px] relative flex items-center justify-center">
              <PegasusComb
                activeSection={`technology-${selectedTech}`}
                scrollProgress={scrollProgress}
                mousePos={mousePos}
                materialOverride={activeCollection}
              />
              {/* Pulsing Scan Line Overlay simulating technical measurement */}
              <div className="absolute left-[10%] right-[10%] h-[1px] bg-gold/50 shadow-[0_0_10px_#c5a880] animate-[bounce_4s_infinite_ease-in-out] pointer-events-none" />
            </div>

            {/* Middle Col: Technology Switch buttons & deep description */}
            <div className="lg:col-span-5 text-left space-y-6">
              <div className="flex gap-2">
                {Object.keys(techData).map((techKey) => (
                  <button
                    key={techKey}
                    onClick={() => {
                      setSelectedTech(techKey as any);
                      setActiveSection(`technology-${techKey}`);
                    }}
                    className={`flex-1 py-3 text-center text-[10px] font-mono uppercase tracking-widest border transition-all ${
                      selectedTech === techKey
                        ? 'border-gold text-white bg-white/5'
                        : 'border-transparent text-silver hover:text-white'
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
                      <span className="mono-tag text-[9px] text-gold tracking-widest block">Patented System</span>
                      <h3 className="font-sans text-2xl md:text-3xl text-white font-medium">
                        {tech.title}
                      </h3>
                      <span className="font-sans text-xs text-white block uppercase tracking-wider italic">
                        {tech.subtitle}
                      </span>
                      <p className="font-sans text-xs md:text-sm text-silver leading-relaxed">
                        {tech.details}
                      </p>

                      <div className="pt-4 border-t border-white/5">
                        <span className="font-mono text-[9px] text-gold uppercase tracking-wider block mb-3">Core Efficacy Hotspots</span>
                        <div className="space-y-3">
                          {tech.hotspots.map((h, i) => (
                            <div key={i} className="bg-black/30 border border-white/5 p-4 rounded flex gap-4 items-start">
                              <span className="font-mono text-xs text-gold">0{i+1}</span>
                              <div>
                                <h5 className="font-sans text-xs text-white font-medium">{h.title}</h5>
                                <p className="font-sans text-[11px] text-silver mt-1">{h.desc}</p>
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

            {/* Right Col: Interactive Scanning Status Data Card */}
            <div className="lg:col-span-3 text-left lg:pl-6 border-l border-white/5 space-y-6">
              <span className="mono-tag text-[10px] text-gold tracking-widest block">System Diagnostics</span>
              
              <div className="space-y-4 font-mono text-[11px] text-silver">
                <div>
                  <span className="text-white block uppercase mb-1">SCANNING UNIT</span>
                  <span>PEGASUS PRO-48</span>
                </div>
                <div>
                  <span className="text-white block uppercase mb-1">MATERIAL MATRIX</span>
                  <span>VULCANITE CARBON INFUSED</span>
                </div>
                <div>
                  <span className="text-white block uppercase mb-1">HEAT THRESHOLD</span>
                  <span>230°C / 446°F CONSTANT</span>
                </div>
                <div>
                  <span className="text-white block uppercase mb-1">FRICTION REGIME</span>
                  <span>SEAMLESS ROUNDED 0.02μm</span>
                </div>
              </div>

              {/* Glowing highlight indicating active scanning state */}
              <div className="border border-gold/20 bg-gold/5 p-4 rounded text-xs text-silver space-y-2">
                <div className="flex justify-between items-center text-white font-medium text-xs">
                  <span>GLAMLOCK METRICS</span>
                  <span className="text-gold">100% SECURE</span>
                </div>
                <p className="font-sans text-[10px] text-silver leading-normal">
                  All Pegasus comb teeth are clinically evaluated under micro-laser matrices to guarantee zero raw seams.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* SECTION 5: AI CONSULTANT (Bespoke Formulation Protocol Component) */}
        <section
          id="ai-styling-assistant"
          onMouseEnter={() => setActiveSection('ai-consultant')}
          className="relative min-h-screen py-24 px-6 md:px-12 lg:px-24 flex flex-col justify-center overflow-hidden"
        >
          {/* Ambient glowing circles */}
          <div className="absolute top-[20%] left-[10%] w-72 h-72 rounded-full bg-gold/5 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

          {/* Render the core AiAssistant element */}
          <AiAssistant />
        </section>


        {/* SECTION 6: WHO WE SERVE (Premium Visual Cards) */}
        <section
          id="professional-markets"
          onMouseEnter={() => setActiveSection('whoweserve')}
          className="relative min-h-screen bg-charcoal/30 border-t border-white/5 py-24 px-6 md:px-12 lg:px-24 flex flex-col justify-between overflow-hidden"
        >
          <div className="text-center mb-16">
            <span className="mono-tag text-xs text-gold border-b border-gold/30 pb-2 mb-4 inline-block">
              GLOBAL ALIGNMENT
            </span>
            <h2 className="editorial-text text-4xl md:text-5xl lg:text-6xl text-white font-medium mb-4">
              Professional Markets
            </h2>
            <p className="text-silver max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              Serving the global echelon of hairdressing, from individual creative artists to elite high-volume salon networks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch flex-1 my-auto">
            {whoWeServeData.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-charcoal border border-white/5 p-8 rounded-lg hover:border-gold/30 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-6">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] text-gold uppercase tracking-wider block">{item.role}</span>
                      <h4 className="font-sans text-xl text-white font-medium">{item.title}</h4>
                    </div>

                    <p className="font-sans text-xs text-silver leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-6 mt-8 space-y-3">
                    <span className="font-mono text-[9px] text-silver uppercase tracking-wider block">Key Parameters</span>
                    <ul className="space-y-1.5">
                      {item.features.map((feat, fIdx) => (
                        <li key={fIdx} className="font-sans text-xs text-white/80 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-gold" /> {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>


        {/* SECTION 7: EDITORIAL CHRONICLES BLOG (Magazine Filter, Search & Reading View) */}
        <section
          id="editorial-blog"
          onMouseEnter={() => setActiveSection('blog')}
          className="relative min-h-screen py-24 px-6 md:px-12 lg:px-24 flex flex-col justify-center overflow-hidden"
        >
          <Blog />
        </section>


        {/* SECTION 8: REQUEST BROCHURE (Multi-step Form Component) */}
        <section
          id="request-brochure"
          onMouseEnter={() => setActiveSection('brochure')}
          className="relative min-h-screen bg-charcoal/30 border-y border-white/5 py-24 px-6 md:px-12 lg:px-24 flex flex-col justify-center overflow-hidden"
        >
          <BrochureForm />
        </section>


        {/* SECTION 9: CONTACT & WORLD OFFICES MAP (Interactive Map Component) */}
        <section
          id="global-contact"
          onMouseEnter={() => setActiveSection('contact')}
          className="relative min-h-screen py-24 px-6 md:px-12 lg:px-24 flex flex-col justify-center overflow-hidden"
        >
          <InteractiveMap />
        </section>

      </main>

      {/* 10. LUXURY PREMIUM FOOTER */}
      <footer className="bg-black border-t border-white/5 pt-20 pb-10 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        
        {/* Animated massive PEGASUS logo */}
        <div className="text-center mb-16 select-none pointer-events-none">
          <h2 className="editorial-text text-[12vw] text-white/5 font-extrabold tracking-widest leading-none uppercase animate-pulse">
            PEGASUS
          </h2>
          <span className="mono-tag text-xs text-gold/60 tracking-[0.3em] block -mt-4">
            INFINITE STYLING
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 mb-12 border-b border-white/5">
          {/* Col 1: Newsletter */}
          <div className="space-y-4">
            <span className="font-mono text-[9px] text-gold uppercase tracking-widest block">Join The Academy Chronology</span>
            <p className="font-sans text-xs text-silver leading-relaxed">
              Receive periodic briefs on material science breakthroughs, professional tool launches, and exclusive salon masterclass guides.
            </p>
            
            {newsletterSubscribed ? (
              <div className="bg-gold/10 border border-gold p-3 text-center text-xs text-white rounded">
                Verified. You are on the registry.
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Corporate email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="p-3 custom-input rounded text-xs flex-1"
                />
                <button
                  onClick={() => {
                    if (newsletterEmail.includes('@')) {
                      setNewsletterSubscribed(true);
                    }
                  }}
                  className="px-4 py-3 bg-white text-black hover:bg-gold hover:text-black transition-colors font-mono text-xs uppercase tracking-widest rounded"
                >
                  Join
                </button>
              </div>
            )}
          </div>

          {/* Col 2: Navigation links */}
          <div className="space-y-4 lg:pl-12">
            <span className="font-mono text-[9px] text-gold uppercase tracking-widest block">System Terminal</span>
            <ul className="space-y-2 text-xs text-silver">
              <li><button onClick={() => navigateToSection('hero')} className="hover:text-white transition-all">Backbone Terminal</button></li>
              <li><button onClick={() => navigateToSection('about-timeline')} className="hover:text-white transition-all">Presto Chronicles</button></li>
              <li><button onClick={() => navigateToSection('product-collections')} className="hover:text-white transition-all">Material Classifications</button></li>
              <li><button onClick={() => navigateToSection('core-technologies')} className="hover:text-white transition-all">Patented Technologies</button></li>
              <li><button onClick={() => navigateToSection('ai-styling-assistant')} className="hover:text-white transition-all text-gold">Custom Regimens</button></li>
            </ul>
          </div>

          {/* Col 3: Industry links */}
          <div className="space-y-4 lg:pl-12">
            <span className="font-mono text-[9px] text-gold uppercase tracking-widest block">Corporate Affiliations</span>
            <ul className="space-y-2 text-xs text-silver">
              <li><button onClick={() => navigateToSection('professional-markets')} className="hover:text-white transition-all">Salon Procurement</button></li>
              <li><button onClick={() => navigateToSection('request-brochure')} className="hover:text-white transition-all">Tactile Catalog Portfolio</button></li>
              <li><button onClick={() => navigateToSection('global-contact')} className="hover:text-white transition-all">General Agency Relations</button></li>
              <li><a href="https://www.presto-industries.de" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all flex items-center gap-1">Presto Industries DE <ExternalLink className="w-3 h-3 text-gold" /></a></li>
            </ul>
          </div>

          {/* Col 4: Address / Legal */}
          <div className="space-y-4 font-sans text-xs text-silver">
            <span className="font-mono text-[9px] text-gold uppercase tracking-widest block">Munich Headquarters</span>
            <p>
              Presto Industries GmbH & Co. KG<br />
              Schleissheimer Str. 102<br />
              80797 Munich, Germany
            </p>
            <p className="text-[10px] text-silver/60">
              USt-IdNr. DE 129 444 821<br />
              Registered District Court Munich HRA 48211
            </p>
          </div>
        </div>

        {/* Copywrite / Legal Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-silver/60 gap-4">
          <span>
            © {new Date().getFullYear()} PEGASUS HAIR TOOLS. UNDER LICENSE OF PRESTO INDUSTRIES GMBH. ALL RIGHTS RESERVED.
          </span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">PRIVACY REGISTRY</a>
            <a href="#" className="hover:text-white transition-colors">TRADEMARKS</a>
            <a href="#" className="hover:text-white transition-colors">REGULATORY METRICS</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
