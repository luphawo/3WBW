"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui";
import { GlassCard } from "@/components/ui";
import { Upload, Image, Film, File, Search, Grid, List } from "lucide-react";

export default function AdminMedia() {
  return (
    <div className="min-h-screen bg-surface-alt p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link href="/admin" className="text-sm text-forest font-semibold hover:underline mb-2 block">
                ← Dashboard
              </Link>
              <h1 className="text-3xl font-bold">Media Library</h1>
              <p className="text-text-secondary mt-1">Upload and manage media assets.</p>
            </div>
            <Button variant="primary" size="sm">
              <Upload className="mr-2 w-4 h-4" />
              Upload Media
            </Button>
          </div>

          <GlassCard className="mb-6">
            <div className="flex items-center justify-between">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="text"
                  placeholder="Search media..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg bg-forest/10 text-forest">
                  <Grid className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-surface-alt transition-colors text-muted">
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </GlassCard>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <GlassCard key={i} className="p-1 overflow-hidden group cursor-pointer" hover={false}>
                <div className="aspect-square rounded-xl bg-surface-alt overflow-hidden relative">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://images.unsplash.com/photo-${1600585154340 + i}?w=400&h=400&fit=crop)`,
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <button className="p-1.5 rounded-lg bg-white/20 text-white backdrop-blur-sm">Edit</button>
                      <button className="p-1.5 rounded-lg bg-red-500/80 text-white">Delete</button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
