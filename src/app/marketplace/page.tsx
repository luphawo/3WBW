"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionReveal, GlassCard } from "@/components/ui";
import { Button } from "@/components/ui";
import { Tag, MessageCircle, Eye, Plus, Search } from "lucide-react";

const mockItems = [
  {
    id: "m1",
    title: "Garden Tools Set — Like New",
    description: "Quality garden tools, barely used. Includes spade, rake, pruning shears, and watering can.",
    price: 350,
    category: "Garden",
    status: "available",
    seller: "Johan du Toit",
    createdAt: "2026-05-20",
  },
  {
    id: "m2",
    title: "Children's Bicycle — Age 5-8",
    description: "Blue bicycle in excellent condition. Training wheels included.",
    price: 650,
    category: "Kids",
    status: "available",
    seller: "Marietjie du Toit",
    createdAt: "2026-05-22",
  },
  {
    id: "m3",
    title: "Bookshelf — Solid Wood",
    description: "Handcrafted solid wood bookshelf. 6 shelves, 180cm tall.",
    price: 1200,
    category: "Furniture",
    status: "pending",
    seller: "Thabo Molefe",
    createdAt: "2026-05-18",
  },
  {
    id: "m4",
    title: "Samsung Washing Machine",
    description: "Model WW80J. Good working condition. 2 years old. Reason for selling: upgrading.",
    price: 4500,
    category: "Appliances",
    status: "available",
    seller: "Sarah Moolman",
    createdAt: "2026-05-25",
  },
];

const categories = ["all", "furniture", "appliances", "kids", "garden", "electronics", "other"];

export default function Marketplace() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = mockItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "all" || item.category.toLowerCase() === activeCategory;
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
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Marketplace</span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mt-4 mb-6 text-ivory">
              Community Marketplace
            </h1>
            <p className="text-lg text-ivory/60 max-w-xl">
              Buy, sell, or trade with your neighbours. A circular community economy.
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
            <div className="flex items-center gap-3">
              <div className="relative w-full sm:w-56">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm"
                />
              </div>
              <Button variant="primary" size="sm">
                <Plus className="mr-1 w-4 h-4" />
                List Item
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SectionReveal className="py-16">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted text-lg">No items listed yet. Be the first!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <GlassCard className="h-full flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-[10px] font-semibold uppercase text-gold tracking-wider">
                        {item.category}
                      </span>
                      <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                        item.status === "available"
                          ? "bg-green-100 dark:bg-green-900/20 text-green-600"
                          : item.status === "pending"
                          ? "bg-orange-100 dark:bg-orange-900/20 text-orange-600"
                          : "bg-red-100 dark:bg-red-900/20 text-red-600"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-text-secondary flex-1">{item.description}</p>
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl font-bold text-forest">R{item.price.toLocaleString()}</span>
                        <span className="text-xs text-muted">{item.seller}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <MessageCircle className="mr-1 w-4 h-4" />
                          Enquire
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
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
