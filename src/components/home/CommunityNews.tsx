"use client";

import { motion } from "framer-motion";
import { SectionReveal, GlassCard } from "@/components/ui";
import { Article } from "@/types";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface CommunityNewsProps {
  articles: Article[];
}

export function CommunityNews({ articles }: CommunityNewsProps) {
  const featured = articles.find((a) => a.featured);
  const rest = articles.filter((a) => !a.featured).slice(0, 3);

  return (
    <SectionReveal className="py-24 bg-surface-alt">
      <div className="container">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Community</span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-2">Latest News</h2>
          </div>
          <Link
            href="/news"
            className="flex items-center gap-2 text-forest font-semibold hover:gap-3 transition-all text-sm"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featured && (
            <Link href={`/news/${featured.slug}`} className="lg:col-span-2 group">
              <GlassCard className="relative overflow-hidden p-0 h-full" hover={false}>
                <div className="aspect-[16/9] lg:aspect-auto lg:h-full relative">
                  <div
                    role="img"
                    aria-label={featured.title}
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${featured.coverImage})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite/90 via-graphite/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-3"
                      style={{ backgroundColor: featured.category.color }}
                    >
                      {featured.category.name}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
                      {featured.title}
                    </h3>
                    <p className="text-white/70 text-sm line-clamp-2 mb-4">{featured.excerpt}</p>
                    <div className="flex items-center gap-4 text-white/50 text-xs">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(featured.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {featured.readTime} min read
                      </span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Link>
          )}

          <div className="flex flex-col gap-4">
            {rest.map((article, i) => (
              <Link key={article.id} href={`/news/${article.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <GlassCard className="flex gap-4">
                    <div
                      role="img"
                      aria-label={article.title}
                      className="w-20 h-20 rounded-xl bg-cover bg-center flex-shrink-0"
                      style={{ backgroundImage: `url(${article.coverImage})` }}
                    />
                    <div className="min-w-0">
                      <span
                        className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold text-white mb-1"
                        style={{ backgroundColor: article.category.color }}
                      >
                        {article.category.name}
                      </span>
                      <h4 className="font-semibold text-sm leading-snug line-clamp-2">{article.title}</h4>
                      <span className="text-xs text-muted mt-1 block">{formatDate(article.publishedAt)}</span>
                    </div>
                  </GlassCard>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
