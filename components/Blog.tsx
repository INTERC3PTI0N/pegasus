'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, BookOpen, Clock, X, ArrowUpRight } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: 'technology' | 'history' | 'trichology';
  readTime: string;
  date: string;
  summary: string;
  content: string;
  image: string;
  author: string;
  authorRole: string;
}

export default function Blog() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const articles: Article[] = [
    {
      id: '1',
      title: 'The Chemistry of Flexinite: Responsive Material Science in Salon Heat',
      category: 'technology',
      readTime: '6 min read',
      date: 'June 28, 2026',
      author: 'Dr. Evelyn Brand',
      authorRole: 'Director of Material Research, Presto Labs',
      summary: 'An inside look at how Flexinite responds intelligently to high blow dryer heat by optimizing its atomic flex, delivering professional cuticle polish without snagging.',
      image: '/images/pegasus_luxury_salon.jpg',
      content: `Friction is the ultimate enemy of the hair cuticle. Standard mass-market plastic combs are made via injection molding, leaving raw, micro-sharp seams on every tooth. When combined with hair dryer heat exceeding 120°C, these cheap polymers soften awkwardly, snagging individual hairs, scraping off the cuticle scales, and creating irreversible split ends.

Pegasus engineers set out to solve this with FLEXINITE — a proprietary bio-rubber polymer blend. Unlike standard materials, Flexinite is responsive. When subjected to blow-dryer heat, the teeth of a Flexinite comb dynamically adapt their atomic elasticity. They mimic natural hair fiber resilience.

#### Seamless Perfection
Every tooth is hand-sawn and hand-polished. When thermal energy transfers from the dryer to the comb, Flexinite achieves a glass-like glide, distributing heat evenly across the hair shaft and locking in natural moisture. The result is a high-gloss, mirror-like finish that professionals call 'The GlamLock Effect.' This is not just styling; it is active molecular care.`
    },
    {
      id: '2',
      title: 'Uncompromising Precision: Sixty Years of Presto Industries Craftsmanship',
      category: 'history',
      readTime: '8 min read',
      date: 'May 14, 2026',
      author: 'Jean-Laurent Presto',
      authorRole: 'Managing Director, Presto Industries',
      summary: 'Tracing our legacy from a small, family-owned toolmaking facility in 1961 to a worldwide leader in professional hairdressing innovations.',
      image: '/images/pegasus_ecowood.jpg',
      content: `In 1961, the global hairdressing market was undergoing a silent crisis. The rise of synthetic polymers led to cheap, mass-manufactured grooming tools that stripped scalp health. Presto Industries was founded with a singular conviction: salon-quality hair tools must be manufactured like precision instruments, not disposable novelties.

#### The Art of Vulcanized Rubber
By 1977, Presto had perfected the vulcanization of natural organic rubber (Vulcanite). Hard rubber combs are crafted through intensive vulcanization, baking natural tree sap rubber in steel ovens under immense steam pressure. This creates an extremely dense, chemically resistant material that can be sawn, cut, and polished by hand.

Our craftsmen spend years mastering the saw-cutting process. Each tooth is carved one-by-one with dedicated diamond wheels. The comb is then hand-beveled and polished with pumice and clay to ensure a flawless seamless glide. In 2012, this premium technology culminated in the launch of our pinnacle brand: PEGASUS. Today, sixty years later, we remain committed to engineering tools that honor the professional hairdresser.`
    },
    {
      id: '3',
      title: 'The Trichological Impact: Why Seamless Cellulose Acetate Prevents Split Ends',
      category: 'trichology',
      readTime: '5 min read',
      date: 'April 03, 2026',
      author: 'Marcus Vance',
      authorRole: 'Senior Trichological Consultant, London',
      summary: 'Why plant-based, tactile cellulose acetate and handcrafted rounded tips are crucial for protecting sensitive hair follicles and maintaining scalp health.',
      image: '/images/pegasus_cellulose.jpg',
      content: `Under an electron microscope, a damaged hair shaft resembles a frayed rope. The cuticle scales, which should lay flat like shingles on a roof, are blown outwards, refracting light poorly and causing a dull, coarse appearance. The most common culprit is mechanical damage from combing.

#### The Plant-Based Cellulose Advantage
Cellulose acetate is a 100% natural material derived from organic wood pulp and cotton fibers. It is naturally tactile, meaning it matches the biological temperature of the human scalp almost instantly, avoiding thermal shock.

Because cellulose is hand-crafted from raw sheet material rather than poured into cheap injection molds, it does not possess a molding line. This seamless construction is vital. When a stylist combs through wet, vulnerable hair, the rounded tips of a Pegasus Cellulose comb massage the scalp, stimulating micro-circulation, while the polished tooth edges lay cuticle scales perfectly flat. For client scalp protection and lasting shine, cellulose acetate is the undisputed gold standard.`
    },
    {
      id: '4',
      title: 'Dissipating Friction: The Physics of StaticBlock Carbon Technology',
      category: 'technology',
      readTime: '7 min read',
      date: 'March 11, 2026',
      author: 'Dr. Helen Cho',
      authorRole: 'Electro-Static Specialist, Munich Tech',
      summary: 'How our proprietary carbon-infused polymer matrix actively neutralizes static charge during high-velocity combing and dry environments.',
      image: '/images/pegasus_hard_rubber.jpg',
      content: `Every single stroke of a hair comb creates mechanical friction. This friction transfers electrons from the hair fibers to the comb, resulting in a positive electrical charge on the hair shaft. Because like-charges repel, the hair fibers literally push away from each other, leading to flyaways, wild frizz, and unmanageable styling.

#### Neutralizing the Charge
Pegasus STATICBLOCK technology solves this by infusing a highly conductive, microscopic carbon-fiber matrix into our hard rubber formula. This carbon matrix acts as a ground. 

During combing, as friction builds, the carbon fibers immediately capture the free electrons and dissipate the electric potential through the comb body rather than leaving it on the hair shaft. This active grounding results in instantly calm, perfectly aligned hair fibers. Stylists working in low-humidity fashion-week environments find StaticBlock to be indispensable for achieving glass-like editorial sleekness.`
    }
  ];

  const filteredArticles = articles.filter((art) => {
    const matchesSearch = art.title.toLowerCase().includes(search.toLowerCase()) || 
                          art.summary.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'all' || art.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16" id="editorial-blog">
      <div className="text-center mb-12">
        <span className="mono-tag text-xs text-gold border-b border-gold/30 pb-2 mb-4 inline-block">
          MAGAZINE & PERSPECTIVES
        </span>
        <h2 className="editorial-text text-4xl md:text-5xl lg:text-6xl text-white font-medium mb-4">
          The Pegasus Chronicle
        </h2>
        <p className="text-silver max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Explore technical insights, material science breakthroughs, and historical analyses from our engineering teams and leading trichologists.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center border-b border-white/5 pb-8 mb-10">
        {/* Categories */}
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {['all', 'technology', 'history', 'trichology'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded text-[11px] font-mono uppercase tracking-widest transition-all ${
                activeCategory === cat
                  ? 'bg-white text-black font-medium'
                  : 'bg-white/5 border border-white/5 text-silver hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search chronicles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 custom-input rounded text-xs"
          />
          <Search className="w-4 h-4 text-white/30 absolute left-3 top-3" />
        </div>
      </div>

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredArticles.map((art) => (
          <motion.article
            key={art.id}
            layoutId={`article-${art.id}`}
            onClick={() => setSelectedArticle(art)}
            className="bg-charcoal border border-white/5 rounded-lg overflow-hidden group cursor-pointer hover:border-gold/30 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Image Header */}
              <div className="h-60 overflow-hidden relative">
                <img
                  src={art.image}
                  alt={art.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute top-4 left-4 bg-black/80 border border-white/10 px-3 py-1 rounded text-[9px] font-mono text-gold uppercase tracking-widest">
                  {art.category}
                </div>
              </div>

              {/* Text content */}
              <div className="p-6 md:p-8">
                <div className="flex gap-4 items-center text-[10px] font-mono text-silver mb-3">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-gold" /> {art.readTime}</span>
                  <span>•</span>
                  <span>{art.date}</span>
                </div>
                
                <h3 className="font-sans text-lg md:text-xl text-white font-medium mb-3 group-hover:text-gold transition-colors leading-snug">
                  {art.title}
                </h3>
                
                <p className="font-sans text-xs text-silver leading-relaxed line-clamp-3">
                  {art.summary}
                </p>
              </div>
            </div>

            {/* Read more footer link */}
            <div className="px-6 md:px-8 pb-6 border-t border-white/5 pt-4 flex justify-between items-center">
              <span className="font-mono text-[9px] text-white uppercase tracking-widest">
                By {art.author}
              </span>
              <span className="flex items-center gap-1 text-[10px] font-mono text-gold group-hover:underline">
                Read Chronicle <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.article>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-16 font-mono text-xs text-silver">
          No chronicles found matching your search.
        </div>
      )}

      {/* Reading Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              layoutId={`article-${selectedArticle.id}`}
              className="bg-charcoal border border-white/10 max-w-4xl w-full rounded-lg overflow-hidden my-8 max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/30">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-gold uppercase tracking-widest border border-gold/30 px-2.5 py-1 rounded">
                    {selectedArticle.category}
                  </span>
                  <span className="font-mono text-xs text-silver">{selectedArticle.date}</span>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto p-8 md:p-12 space-y-8">
                {/* Author Info */}
                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                  <div>
                    <h5 className="font-sans text-sm text-white font-medium">{selectedArticle.author}</h5>
                    <p className="font-sans text-xs text-silver">{selectedArticle.authorRole}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 text-xs font-mono text-gold">
                    <Clock className="w-4 h-4" /> {selectedArticle.readTime}
                  </div>
                </div>

                <h1 className="editorial-text text-3xl md:text-4xl lg:text-5xl text-white font-medium leading-tight">
                  {selectedArticle.title}
                </h1>

                {/* Article body markdown-like formatting */}
                <div className="font-sans text-sm md:text-base text-silver leading-relaxed space-y-6 max-w-3xl">
                  {selectedArticle.content.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('####')) {
                      return (
                        <h4 key={index} className="editorial-text text-xl md:text-2xl text-white font-medium pt-4">
                          {paragraph.replace('####', '').trim()}
                        </h4>
                      );
                    }
                    return <p key={index}>{paragraph}</p>;
                  })}
                </div>
              </div>

              {/* Close Footer */}
              <div className="p-6 border-t border-white/5 flex justify-end bg-black/20">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-2.5 bg-white text-black hover:bg-gold transition-colors text-xs font-mono uppercase tracking-widest rounded"
                >
                  Close Chronicle
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
