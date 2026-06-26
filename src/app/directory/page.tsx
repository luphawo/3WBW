"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionReveal, GlassCard } from "@/components/ui";
import { businesses } from "@/lib/data";
import { Star, Phone, MapPin, Clock, Search } from "lucide-react";

const categories = ["all", "electrical", "plumbing", "gardening", "restaurants", "domestic", "pet services"];

export default function Directory() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortFeatured, setSortFeatured] = useState(false);

  let filtered = businesses.filter((b) => {
    const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.description.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "all" || b.category.toLowerCase() === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (sortFeatured) {
    filtered = [...filtered].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

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
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Directory</span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mt-4 mb-6 text-ivory">
              Local Business Directory
            </h1>
            <p className="text-lg text-ivory/60 max-w-xl">
              Trusted services and businesses recommended by your neighbours.
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
                  {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={sortFeatured}
                  onChange={() => setSortFeatured(!sortFeatured)}
                  className="rounded border-border text-forest focus:ring-gold"
                />
                Featured first
              </label>
              <div className="relative flex-1 sm:w-56">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionReveal className="py-16">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted text-lg">No businesses found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((biz, i) => (
                <motion.div
                  key={biz.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <GlassCard className="p-0 overflow-hidden h-full group">
                    <div
                      className="h-40 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 relative"
                      style={{ backgroundImage: `url(${biz.image})` }}
                    >
                      {biz.featured && (
                        <span className="absolute top-3 left-3 px-2 py-1 rounded-lg text-[10px] font-semibold bg-gold text-graphite">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <span className="text-[10px] font-semibold uppercase text-gold tracking-wider">
                        {biz.category}
                      </span>
                      <h3 className="font-bold text-lg mt-1">{biz.name}</h3>
                      <p className="text-sm text-text-secondary line-clamp-2 mt-2 mb-3">{biz.description}</p>
                      <div className="flex items-center gap-1 mb-3">
                        <Star className="w-4 h-4 text-gold fill-gold" />
                        <span className="text-sm font-semibold">{biz.rating}</span>
                        <span className="text-xs text-muted">({biz.reviewCount} reviews)</span>
                      </div>
                      <div className="space-y-2 text-xs text-text-secondary">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3" />
                          {biz.address}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          {biz.hours}
                        </div>
                      </div>
                      <a
                        href={`tel:${biz.phone}`}
                        className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-forest text-ivory text-sm font-semibold hover:bg-forest-light transition-all"
                      >
                        <Phone className="w-4 h-4" />
                        {biz.phone}
                      </a>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </SectionReveal>
    </>
  );
}
