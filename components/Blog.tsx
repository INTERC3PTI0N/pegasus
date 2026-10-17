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

export default function Blog({ articles: articleData }: { articles: (Omit<Article, 'id' | 'category'> & { category: string })[] }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const articles: Article[] = articleData.map((a, i) => ({ ...a, id: String(i) }) as Article);

  const filteredArticles = articles.filter((art) => {
    const matchesSearch = art.title.toLowerCase().includes(search.toLowerCase()) || 
                          art.summary.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'all' || art.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-4" id="editorial-blog">
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
