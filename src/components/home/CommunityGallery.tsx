"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionReveal, GlassCard } from "@/components/ui";
import { getGalleryItems } from "@/lib/media-store";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryDisplayItem {
  id: string;
  src: string;
  category: string;
  caption: string;
  width: number;
  height: number;
}

export function CommunityGallery() {
  const [galleryItems, setGalleryItems] = useState<GalleryDisplayItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryDisplayItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const allItems = getGalleryItems().map((item) => ({
      id: item.id,
      src: item.src,
      category: item.category,
      caption: item.caption,
      width: item.width || 800,
      height: item.height || 600,
    }));

    const required = ["community", "event", "lifestyle", "security"] as const;
    const picked: GalleryDisplayItem[] = [];
    const remaining: GalleryDisplayItem[] = [];
    const used = new Set<string>();

    for (const cat of required) {
      const found = allItems.find((item) => item.category === cat);
      if (found) {
        picked.push(found);
        used.add(found.id);
      }
    }

    for (const item of allItems) {
      if (!used.has(item.id)) {
        remaining.push(item);
      }
    }

    const rest = remaining.slice(0, 6 - picked.length);
    setGalleryItems([...picked, ...rest]);
  }, []);

  const categories = ["all", "community", "event", "lifestyle", "security"];
  const filtered = filter === "all" ? galleryItems : galleryItems.filter((img) => img.category === filter);

  const openImage = (image: GalleryDisplayItem, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
  };

  const navigate = (direction: "prev" | "next") => {
    const newIndex =
      direction === "prev"
        ? (selectedIndex - 1 + filtered.length) % filtered.length
        : (selectedIndex + 1) % filtered.length;
    setSelectedImage(filtered[newIndex]);
    setSelectedIndex(newIndex);
  };

  return (
    <SectionReveal className="py-24">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">Gallery</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-2">Community Album</h2>
          <p className="text-text-secondary mt-4 max-w-lg mx-auto">
            Moments that make our community special.
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                filter === cat
                  ? "bg-forest text-ivory"
                  : "bg-surface-alt text-text-secondary hover:text-text"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((image, index) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="break-inside-avoid cursor-pointer group"
              onClick={() => openImage(image, index)}
            >
              <GlassCard className="p-1 overflow-hidden" hover={false}>
                <div
                  className="relative overflow-hidden rounded-xl"
                  style={{ paddingBottom: `${(image.height / image.width) * 100}%` }}
                >
                  <img
                    src={image.src}
                    alt={image.caption || "Community gallery photo"}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true">
                    <p className="text-white text-sm font-medium">{image.caption}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              aria-label="Close gallery"
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate("prev"); }}
              aria-label="Previous photo"
              className="absolute left-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" aria-hidden="true" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate("next"); }}
              aria-label="Next photo"
              className="absolute right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6" aria-hidden="true" />
            </button>
            <motion.div
              key={selectedImage.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-4xl max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.caption || "Gallery photo"}
                className="w-full h-[70vh] object-cover rounded-2xl shadow-2xl"
              />
              {selectedImage.caption && (
                <p className="text-white text-center mt-4 text-sm">{selectedImage.caption}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionReveal>
  );
}
