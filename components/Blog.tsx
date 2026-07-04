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

  // Editorial from the Pegasus Académie — pegasushairtools.com/blog
  const articles: Article[] = [
    {
      id: '1',
      title: 'No More Frizz!',
      category: 'trichology',
      readTime: '4 min read',
      date: 'Pegasus Académie',
      author: 'Pegasus Académie',
      authorRole: 'Editorial Team, Pegasus Hair Tools',
      summary: 'Dry, frizzy hair complicates styling and makes every morning harder than it needs to be. Here is how the right comb calms the chaos for better-looking hair daily.',
      image: '/images/pegasus_luxury_salon.jpg',
      content: `Dry and frizzy hair is the most common styling complaint we hear from hairdressers and their clients. Frizz makes hair difficult to manage, styles refuse to hold, and the finished look loses its polish within hours.

Much of that frizz is self-inflicted — created by friction from the wrong combing tools. Ordinary injection-moulded combs carry microscopic seams along every tooth that roughen the hair surface with every pass, lifting the cuticle and inviting static.

#### Calm Hair Starts With the Right Comb
Pegasus combs are saw-cut and hand polished so every tooth is seamless and rounded. Combined with StaticBlock Technology in our Ecowood range — naturally anti-static and anti-bacterial — fly-aways are prevented and frizz is visibly reduced. Smooth, polished teeth glide gently through the hair, so you can style without the struggle, every single day.`
    },
    {
      id: '2',
      title: 'Give Your Hair the Soft Touch of Protection',
      category: 'trichology',
      readTime: '5 min read',
      date: 'Pegasus Académie',
      author: 'Pegasus Académie',
      authorRole: 'Editorial Team, Pegasus Hair Tools',
      summary: 'Understanding the hair cuticle — and why the wrong comb quietly damages your hair, especially when it is wet or undergoing chemical treatments.',
      image: '/images/pegasus_cellulose.jpg',
      content: `Every strand of hair is wrapped in a protective layer called the cuticle — overlapping scales that, when healthy, lay flat and reflect light for natural shine. Damage that layer and hair turns dull, coarse and prone to split ends.

The wrong comb is one of the most common culprits. Sharp, seamed teeth scrape the cuticle with every stroke, and the risk multiplies when hair is at its most vulnerable: wet after a wash, or mid-way through colouring and chemical treatments.

#### Protection by Design
Pegasus GlamLock combs are crafted with seamless, hand-polished teeth that detangle easily without scraping. The smooth rounded tips massage the scalp, stimulate healthy blood circulation and spread the hair's natural oils evenly from roots to tips — protection and shine in a single stroke.`
    },
    {
      id: '3',
      title: 'Handmade Combs by Pegasus to Show Care Towards Your Mane',
      category: 'history',
      readTime: '5 min read',
      date: 'Pegasus Académie',
      author: 'Pegasus Académie',
      authorRole: 'Editorial Team, Pegasus Hair Tools',
      summary: 'Why hand-sawn combs with rounded, hand-polished edges stimulate natural oils and distribute them effectively — craftsmanship your hair can feel.',
      image: '/images/pegasus_ecowood.jpg',
      content: `Since Presto Industries began manufacturing combs in 1977, one principle has never changed: a comb worth using must be made by hand.

Each Pegasus comb is hand sawn — every tooth individually cut, then rounded and hand-polished until no seam or sharp edge remains. It is slow, deliberate work that mass-produced moulded combs simply cannot replicate.

#### Craftsmanship Your Scalp Can Feel
Those rounded, polished edges do more than feel luxurious. They stimulate the scalp's natural oils and distribute them effectively along the full length of the hair, nourishing every strand from root to tip. The result is hair that looks healthier because it genuinely is — cared for by a tool that was itself made with care.`
    },
    {
      id: '4',
      title: 'FLEXINITE Technology Infused Hair Combs by Pegasus',
      category: 'technology',
      readTime: '6 min read',
      date: 'Pegasus Académie',
      author: 'Pegasus Académie',
      authorRole: 'Editorial Team, Pegasus Hair Tools',
      summary: '100% hard rubber + FLEXINITE technology — developed after extensive research into global hair textures and climate conditions.',
      image: '/images/pegasus_hard_rubber.jpg',
      content: `Pegasus hard rubber combs are made of 100% hard rubber (Ebonite) infused with our proprietary FLEXINITE technology — the result of extensive research examining hair textures and climate conditions across the world.

FLEXINITE makes the comb respond to temperature changes. Under dryers and irons the material stays high-heat resistant while remaining flexible, strong and durable — a truly versatile experience for cutting, colouring and styling.

#### Built for Professionals
That is why professional hairdressers across the world trust the Pegasus hard rubber range for precision cutting and styling. Chemical resistant against daily salon colour work, gentle on every hair type, and built to last years of session use — this is infinite styling, engineered.`
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
        <span className="mono-tag text-xs text-accent border-b border-accent/30 pb-2 mb-4 inline-block">
          MAGAZINE & PERSPECTIVES
        </span>
        <h2 className="editorial-text text-4xl md:text-5xl lg:text-6xl text-ink font-medium mb-4">
          The Pegasus Chronicle
        </h2>
        <p className="text-silver max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Explore technical insights, material science breakthroughs, and historical analyses from our engineering teams and leading trichologists.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center border-b border-black/5 pb-8 mb-10">
        {/* Categories */}
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {['all', 'technology', 'history', 'trichology'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded text-xs font-mono uppercase tracking-widest transition-all ${
                activeCategory === cat
                  ? 'bg-ink text-paper font-medium'
                  : 'bg-black/[0.04] border border-black/5 text-silver hover:text-ink'
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
          <Search className="w-4 h-4 text-ink/30 absolute left-3 top-3" />
        </div>
      </div>

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredArticles.map((art) => (
          <motion.article
            key={art.id}
            layoutId={`article-${art.id}`}
            onClick={() => setSelectedArticle(art)}
            className="bg-white border border-black/5 rounded-lg overflow-hidden group cursor-pointer hover:border-accent/30 transition-all duration-300 flex flex-col justify-between"
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
                <div className="absolute top-4 left-4 bg-ink/90 border border-black/10 px-3 py-1 rounded text-[11px] font-mono text-accent uppercase tracking-widest">
                  {art.category}
                </div>
              </div>

              {/* Text content */}
              <div className="p-6 md:p-8">
                <div className="flex gap-4 items-center text-[11px] font-mono text-silver mb-3">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-accent" /> {art.readTime}</span>
                  <span>•</span>
                  <span>{art.date}</span>
                </div>
                
                <h3 className="font-sans text-lg md:text-xl text-ink font-medium mb-3 group-hover:text-accent transition-colors leading-snug">
                  {art.title}
                </h3>
                
                <p className="font-sans text-xs text-silver leading-relaxed line-clamp-3">
                  {art.summary}
                </p>
              </div>
            </div>

            {/* Read more footer link */}
            <div className="px-6 md:px-8 pb-6 border-t border-black/5 pt-4 flex justify-between items-center">
              <span className="font-mono text-[11px] text-ink uppercase tracking-widest">
                By {art.author}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-mono text-accent group-hover:underline">
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
            className="fixed inset-0 bg-white/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              layoutId={`article-${selectedArticle.id}`}
              className="bg-white border border-black/10 max-w-4xl w-full rounded-lg overflow-hidden my-8 max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-black/5 flex justify-between items-center bg-white/70">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-accent uppercase tracking-widest border border-accent/30 px-2.5 py-1 rounded">
                    {selectedArticle.category}
                  </span>
                  <span className="font-mono text-xs text-silver">{selectedArticle.date}</span>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-1.5 rounded-full bg-black/[0.04] hover:bg-black/5 text-ink transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto p-8 md:p-12 space-y-8">
                {/* Author Info */}
                <div className="flex items-center gap-4 border-b border-black/5 pb-6">
                  <div>
                    <h5 className="font-sans text-sm text-ink font-medium">{selectedArticle.author}</h5>
                    <p className="font-sans text-xs text-silver">{selectedArticle.authorRole}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 text-xs font-mono text-accent">
                    <Clock className="w-4 h-4" /> {selectedArticle.readTime}
                  </div>
                </div>

                <h1 className="editorial-text text-3xl md:text-4xl lg:text-5xl text-ink font-medium leading-tight">
                  {selectedArticle.title}
                </h1>

                {/* Article body markdown-like formatting */}
                <div className="font-sans text-sm md:text-base text-silver leading-relaxed space-y-6 max-w-3xl">
                  {selectedArticle.content.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('####')) {
                      return (
                        <h4 key={index} className="editorial-text text-xl md:text-2xl text-ink font-medium pt-4">
                          {paragraph.replace('####', '').trim()}
                        </h4>
                      );
                    }
                    return <p key={index}>{paragraph}</p>;
                  })}
                </div>
              </div>

              {/* Close Footer */}
              <div className="p-6 border-t border-black/5 flex justify-end bg-white/60">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-2.5 bg-ink text-paper hover:bg-accent hover:text-paper transition-colors text-xs font-mono uppercase tracking-widest rounded"
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
