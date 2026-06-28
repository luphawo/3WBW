"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui";
import { businesses as initialBusinesses } from "@/lib/data";
import { Plus, Search, Edit, Eye, Trash2, Star } from "lucide-react";

export default function AdminBusinesses() {
  const [search, setSearch] = useState("");
  const [businessList, setBusinessList] = useState(initialBusinesses);

  const filtered = businessList.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete "${name}"? This cannot be undone.`)) {
      setBusinessList((prev) => prev.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-surface-alt p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <Link href="/admin" className="text-sm text-forest font-semibold hover:underline mb-2 block">
                ← Dashboard
              </Link>
              <h1 className="text-3xl font-bold">Businesses</h1>
              <p className="text-text-secondary mt-1">Manage local directory businesses.</p>
            </div>
            <Link
              href="/admin/businesses/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest text-ivory rounded-xl text-sm font-semibold hover:bg-forest-light transition-all"
            >
              <Plus className="w-4 h-4" />
              New Business
            </Link>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search businesses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-graphite border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm"
            />
          </div>
        </motion.div>

        <GlassCard className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-xs font-semibold uppercase text-muted tracking-wider">Business</th>
                  <th className="text-left p-4 text-xs font-semibold uppercase text-muted tracking-wider">Category</th>
                  <th className="text-left p-4 text-xs font-semibold uppercase text-muted tracking-wider">Rating</th>
                  <th className="text-left p-4 text-xs font-semibold uppercase text-muted tracking-wider">Phone</th>
                  <th className="text-left p-4 text-xs font-semibold uppercase text-muted tracking-wider">Featured</th>
                  <th className="text-right p-4 text-xs font-semibold uppercase text-muted tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((biz, i) => (
                  <motion.tr
                    key={biz.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-border/50 last:border-0 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg bg-cover bg-center flex-shrink-0"
                          style={{ backgroundImage: `url(${biz.image})` }}
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate max-w-[200px]">{biz.name}</p>
                          <span className="text-xs text-muted">{biz.address}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-forest/10 text-forest text-[10px] font-semibold">
                        {biz.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-gold fill-gold" />
                        <span className="text-sm">{biz.rating}</span>
                        <span className="text-xs text-muted">({biz.reviewCount})</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted">{biz.phone}</td>
                    <td className="p-4">
                      <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                        biz.featured
                          ? "bg-green-100 dark:bg-green-900/20 text-green-600"
                          : "bg-surface-alt text-muted"
                      }`}>
                        {biz.featured ? "Featured" : "Standard"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/businesses/edit/${biz.id}`}
                          className="p-2 rounded-lg hover:bg-surface-alt transition-colors inline-flex"
                          title="View business"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/businesses/edit/${biz.id}`}
                          className="p-2 rounded-lg hover:bg-surface-alt transition-colors inline-flex"
                          title="Edit business"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors"
                          onClick={() => handleDelete(biz.id, biz.name)}
                          title="Delete business"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
