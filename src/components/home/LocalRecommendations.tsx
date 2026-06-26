"use client";

import { motion } from "framer-motion";
import { SectionReveal, GlassCard } from "@/components/ui";
import { Business } from "@/types";
import { Star, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";

interface LocalRecommendationsProps {
  businesses: Business[];
}

export function LocalRecommendations({ businesses }: LocalRecommendationsProps) {
  const featured = businesses.filter((b) => b.featured).slice(0, 4);

  return (
    <SectionReveal className="py-24 bg-surface-alt">
      <div className="container">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Local Services</span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-2">Trusted Businesses</h2>
          </div>
          <Link
            href="/directory"
            className="flex items-center gap-2 text-forest font-semibold hover:gap-3 transition-all text-sm"
          >
            View Directory <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((biz, i) => (
            <motion.div
              key={biz.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-0 overflow-hidden group h-full">
                <div
                  role="img"
                  aria-label={biz.name}
                  className="h-40 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${biz.image})` }}
                />
                <div className="p-5">
                  <span className="text-[10px] font-semibold uppercase text-gold tracking-wider">
                    {biz.category}
                  </span>
                  <h3 className="font-bold text-lg mt-1 mb-2">{biz.name}</h3>
                  <p className="text-sm text-text-secondary line-clamp-2 mb-3">{biz.description}</p>
                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center gap-1"
                      aria-label={`Rated ${biz.rating} out of 5 from ${biz.reviewCount} reviews`}
                    >
                      <Star className="w-4 h-4 text-gold fill-gold" aria-hidden="true" />
                      <span className="text-sm font-semibold" aria-hidden="true">{biz.rating}</span>
                      <span className="text-xs text-muted" aria-hidden="true">({biz.reviewCount})</span>
                    </div>
                    <a
                      href={`tel:${biz.phone}`}
                      className="flex items-center gap-1 text-sm text-forest font-semibold hover:underline"
                    >
                      <Phone className="w-3 h-3" />
                      Call
                    </a>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
