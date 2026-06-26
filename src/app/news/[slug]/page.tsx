"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { GlassCard } from "@/components/ui";
import { articles } from "@/lib/data";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function ArticlePage() {
  const params = useParams();
  const article = articles.find((a) => a.slug === params.slug);

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
        <div className="container max-w-3xl">
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
            <div className="h-64 rounded-2xl bg-surface-alt flex items-center justify-center text-muted">
              Rich article content area — CMS integration coming soon
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
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
