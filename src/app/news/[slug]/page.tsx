"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { GlassCard } from "@/components/ui";
import { articles as staticArticles } from "@/lib/data";
import { getArticles } from "@/lib/article-store";
import type { Article } from "@/types";
import { Calendar, Clock, ArrowLeft, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [article, setArticle] = useState<Article | null>(() => {
    if (!slug) return null;
    return staticArticles.find((a) => a.slug === slug) || null;
  });

  useEffect(() => {
    if (!slug) return;
    const found = getArticles().find((a) => a.slug === slug);
    if (found) setArticle(found);
    function syncFromStorage(e: StorageEvent) {
      if (e.key === "3wbw_articles") {
        const synced = getArticles().find((a) => a.slug === slug);
        if (synced) setArticle(synced);
      }
    }
    function sync() {
      if (document.visibilityState !== "visible") return;
      const synced = getArticles().find((a) => a.slug === slug);
      if (synced) setArticle(synced);
    }
    window.addEventListener("storage", syncFromStorage);
    window.addEventListener("focus", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      window.removeEventListener("storage", syncFromStorage);
      window.removeEventListener("focus", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <Link href="/news" className="text-forest font-semibold hover:underline">
            ← Back to News
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article>
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${article.coverImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/60 to-graphite/30" />
        </div>
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-ivory/60 hover:text-ivory transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to News
            </Link>
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-4"
              style={{ backgroundColor: article.category.color }}
            >
              {article.category.name}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center gap-6 text-ivory/50 text-sm">
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-white font-medium">{article.author.name}</p>
                  <p className="text-xs">{article.author.role}</p>
                </div>
              </div>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(article.publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.readTime} min read
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-5xl">
          <div className="flex items-center gap-2 mb-8">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium bg-surface-alt text-text-secondary"
              >
                #{tag}
              </span>
            ))}
            <button className="ml-auto p-2 rounded-xl hover:bg-surface-alt transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-text-secondary leading-relaxed mb-8">{article.excerpt}</p>
            {article.content ? (
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            ) : (
              <div className="h-64 rounded-2xl bg-surface-alt flex items-center justify-center text-muted">
                No content yet
              </div>
            )}
          </div>

          {(() => {
            const all = getArticles();
            const idx = all.findIndex((a) => a.id === article.id);
            const prev = idx > 0 ? all[idx - 1] : null;
            const next = idx < all.length - 1 ? all[idx + 1] : null;
            return (
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
            <div>
              {prev && (
                <Link
                  href={`/news/${prev.slug}`}
                  className="group flex items-center gap-2 text-muted hover:text-text transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                  <div className="text-right">
                    <p className="text-xs text-muted">Previous</p>
                    <p className="text-sm font-semibold">{prev.title}</p>
                  </div>
                </Link>
              )}
            </div>
            <div>
              {next && (
                <Link
                  href={`/news/${next.slug}`}
                  className="group flex items-center gap-2 text-muted hover:text-text transition-colors"
                >
                  <div className="text-left">
                    <p className="text-xs text-muted">Next</p>
                    <p className="text-sm font-semibold">{next.title}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              )}
            </div>
          </div>
            );
          })()}

          <div className="mt-8 pt-8 border-t border-border">
            <GlassCard className="flex items-center gap-4">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-16 h-16 rounded-2xl object-cover"
              />
              <div>
                <p className="font-semibold">{article.author.name}</p>
                <p className="text-sm text-muted">{article.author.role}</p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>
    </article>
  );
}
