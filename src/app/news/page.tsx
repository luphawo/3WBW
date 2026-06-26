"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { GlassCard, SectionReveal } from "@/components/ui";
import { articles } from "@/lib/data";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function News() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["all", "community", "security", "utilities", "events"];
  const filtered = articles.filter((a) => {
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "all" || a.category.slug === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-graphite to-surface" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">News</span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mt-4 mb-6 text-ivory">
              Community News
            </h1>
            <p className="text-lg text-ivory/60 max-w-xl">
              Stay informed with the latest updates from around the enclosure.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 border-b border-border">
        <div className="container">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-forest text-ivory"
                      : "bg-surface-alt text-text-secondary hover:text-text"
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <SectionReveal className="py-16">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted text-lg">No articles found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={`/news/${article.slug}`}>
                    <GlassCard className="p-0 overflow-hidden group h-full">
                      <div
                        className="h-48 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${article.coverImage})` }}
                      />
                      <div className="p-6">
                        <span
                          className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-3"
                          style={{ backgroundColor: article.category.color }}
                        >
                          {article.category.name}
                        </span>
                        <h3 className="font-bold text-lg mb-2 leading-snug group-hover:text-forest transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-sm text-text-secondary line-clamp-2 mb-4">{article.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs text-muted">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(article.publishedAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {article.readTime} min
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted group-hover:text-forest transition-colors" />
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </SectionReveal>
    </>
  );
}
