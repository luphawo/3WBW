"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui";
import { GlassCard } from "@/components/ui";
import { Upload, Search, Grid, List, X, Link2 } from "lucide-react";
import { getMediaItems, addMediaItem, updateMediaItem, deleteMediaItem } from "@/lib/media-store";
import type { MediaItem } from "@/lib/media-store";

const categories = ["all", "hero", "branding", "community", "event", "lifestyle", "security"];
const uploadCategories = categories.filter((c) => c !== "all");

export default function AdminMedia() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [editing, setEditing] = useState<MediaItem | null>(null);
  const [editForm, setEditForm] = useState({ caption: "", category: "" });
  const [showUpload, setShowUpload] = useState(false);
  const [uploadForm, setUploadForm] = useState({ src: "", caption: "", category: "community" });

  const refresh = useCallback(() => setMediaList(getMediaItems()), []);

  useEffect(() => { refresh(); }, [refresh]);

  const filtered = mediaList.filter((item) => {
    const matchesSearch = item.caption.toLowerCase().includes(search.toLowerCase()) || item.src.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || item.category === filter;
    return matchesSearch && matchesFilter;
  });

  const handleEdit = (item: MediaItem) => {
    setEditing(item);
    setEditForm({ caption: item.caption, category: item.category });
  };

  const handleSaveEdit = () => {
    if (!editing) return;
    updateMediaItem(editing.id, { caption: editForm.caption, category: editForm.category });
    refresh();
    setEditing(null);
  };

  const handleDelete = (item: MediaItem) => {
    if (window.confirm(`Delete "${item.caption || item.src.split("/").pop()}"? It will be hidden from the gallery.`)) {
      deleteMediaItem(item.id);
      refresh();
    }
  };

  return (
    <div className="min-h-screen bg-surface-alt p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link href="/admin" className="text-sm text-forest font-semibold hover:underline mb-2 block">
                ← Dashboard
              </Link>
              <h1 className="text-3xl font-bold">Media Library</h1>
              <p className="text-text-secondary mt-1">Browse all media assets used across the site.</p>
            </div>
            <Button variant="primary" size="sm" onClick={() => setShowUpload(!showUpload)}>
              <Upload className="mr-2 w-4 h-4" />
              {showUpload ? "Cancel" : "Upload Media"}
            </Button>
          </div>

          <AnimatePresence>
            {showUpload && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 overflow-hidden"
              >
                <GlassCard>
                  <h3 className="font-bold text-lg mb-4">Add Media</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Image URL</label>
                      <input
                        type="text"
                        value={uploadForm.src}
                        onChange={(e) => setUploadForm({ ...uploadForm, src: e.target.value })}
                        placeholder="/gallery/your-image.webp"
                        className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Caption</label>
                        <input
                          type="text"
                          value={uploadForm.caption}
                          onChange={(e) => setUploadForm({ ...uploadForm, caption: e.target.value })}
                          placeholder="Brief description"
                          className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Category</label>
                        <select
                          value={uploadForm.category}
                          onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm"
                        >
                          {uploadCategories.map((cat) => (
                            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          if (!uploadForm.src.trim()) return;
                          addMediaItem({
                            id: `media-${Date.now()}`,
                            src: uploadForm.src.trim(),
                            caption: uploadForm.caption.trim(),
                            category: uploadForm.category,
                          });
                          refresh();
                          setShowUpload(false);
                          setUploadForm({ src: "", caption: "", category: "community" });
                        }}
                      >
                        <Link2 className="mr-2 w-4 h-4" />
                        Add Media
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => { setShowUpload(false); setUploadForm({ src: "", caption: "", category: "community" }); }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>

          <GlassCard className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="text"
                  placeholder="Search media..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 flex-wrap">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        filter === cat
                          ? "bg-forest text-ivory"
                          : "bg-surface text-text-secondary hover:text-text"
                      }`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 border-l border-border pl-3">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-forest/10 text-forest" : "text-muted hover:text-text"}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-forest/10 text-forest" : "text-muted hover:text-text"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>

          <p className="text-sm text-muted mb-4">{filtered.length} media item{filtered.length !== 1 ? "s" : ""}</p>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filtered.map((item) => (
                <GlassCard key={item.id} className="p-1 overflow-hidden group cursor-pointer" hover={false}>
                  <div className="aspect-square rounded-xl bg-surface-alt overflow-hidden relative">
                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${item.src})` }} />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="px-2 py-1 rounded-lg bg-white/20 text-white backdrop-blur-sm text-xs hover:bg-white/40"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="px-2 py-1 rounded-lg bg-red-500/80 text-white text-xs hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <p className="text-[11px] font-medium truncate">{item.caption || item.src.split("/").pop()}</p>
                    <p className="text-[10px] text-muted truncate">{item.src}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          ) : (
            <GlassCard className="overflow-hidden p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 text-xs font-semibold uppercase text-muted tracking-wider">Preview</th>
                      <th className="text-left p-4 text-xs font-semibold uppercase text-muted tracking-wider">File</th>
                      <th className="text-left p-4 text-xs font-semibold uppercase text-muted tracking-wider">Category</th>
                      <th className="text-left p-4 text-xs font-semibold uppercase text-muted tracking-wider">Caption</th>
                      <th className="text-right p-4 text-xs font-semibold uppercase text-muted tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((item, i) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.03 }}
                        className="border-b border-border/50 last:border-0 hover:bg-black/[0.02] transition-colors"
                      >
                        <td className="p-4">
                          <div className="w-12 h-12 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${item.src})` }} />
                        </td>
                        <td className="p-4">
                          <span className="text-sm font-mono text-muted">{item.src.split("/").pop()}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-forest/10 text-forest">
                            {item.category}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-muted max-w-[200px] truncate">{item.caption || "—"}</td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleEdit(item)}
                              className="px-2 py-1 rounded-lg text-xs font-medium bg-forest/10 text-forest hover:bg-forest/20 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(item)}
                              className="px-2 py-1 rounded-lg text-xs font-medium bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => setEditing(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-surface rounded-2xl p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Edit Media</h2>
                <button
                  onClick={() => setEditing(null)}
                  className="p-2 rounded-lg hover:bg-black/5 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="aspect-video rounded-xl bg-surface-alt overflow-hidden mb-6">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${editing.src})` }} />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Caption</label>
                  <input
                    type="text"
                    value={editForm.caption}
                    onChange={(e) => setEditForm({ ...editForm, caption: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Category</label>
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm"
                  >
                    {categories.filter((c) => c !== "all").map((cat) => (
                      <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleSaveEdit}
                    className="px-5 py-2.5 bg-forest text-ivory rounded-xl text-sm font-semibold hover:bg-forest-light transition-all"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-muted hover:text-text border border-border hover:bg-surface transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
