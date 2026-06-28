"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui";
import { GlassCard } from "@/components/ui";
import { RichEditor } from "@/components/ui/RichEditor";
import { getArticles, updateArticle as storeUpdate } from "@/lib/article-store";
import { Save, Eye, ArrowLeft, Tag, Plus, X } from "lucide-react";

export default function EditArticle() {
  const router = useRouter();
  const params = useParams();
  const article = getArticles().find((a) => a.id === params.id);

  const [tags, setTags] = useState<string[]>(article?.tags ?? []);
  const [tagInput, setTagInput] = useState("");
  const [coverImage, setCoverImage] = useState(article?.coverImage ?? "");
  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? "");
  const [content, setContent] = useState(article?.content ?? "");
  const [featured, setFeatured] = useState(article?.featured ?? false);
  const [categoryName, setCategoryName] = useState(article?.category.name ?? "Community");

  const categoryMap: Record<string, { id: string; name: string; slug: string; color: string }> = {
    Community: { id: "c1", name: "Community", slug: "community", color: "#2D5A3F" },
    Security: { id: "c2", name: "Security", slug: "security", color: "#C9A84C" },
    Utilities: { id: "c3", name: "Utilities", slug: "utilities", color: "#8E8E93" },
    Events: { id: "c4", name: "Events", slug: "events", color: "#C4952A" },
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!article) return;
    storeUpdate(article.id, {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      tags,
      featured,
      category: categoryMap[categoryName] ?? categoryMap.Community,
    });
    router.push("/admin/articles");
    router.refresh();
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-surface-alt p-6 lg:p-10">
        <div className="max-w-4xl mx-auto text-center py-20">
          <p className="text-lg text-muted">Article not found.</p>
          <Link href="/admin/articles" className="text-forest font-semibold hover:underline mt-4 inline-block">
            ← Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-alt p-6 lg:p-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link href="/admin/articles" className="text-sm text-forest font-semibold hover:underline mb-2 block">
                ← Articles
              </Link>
              <h1 className="text-3xl font-bold">Edit Article</h1>
              <p className="text-text-secondary mt-1">{article.title}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/admin/articles">
                <Button type="button" variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back
                </Button>
              </Link>
              <Button type="submit" form="edit-article" variant="primary" size="sm">
                <Save className="mr-2 w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </div>

          <form id="edit-article" onSubmit={handleSave}>
          <div className="space-y-6">
            <GlassCard>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-2">Article Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-lg font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Slug</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm text-muted"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Excerpt</label>
                  <textarea
                    rows={3}
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm resize-none"
                  />
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <label className="block text-sm font-semibold mb-3">Content</label>
              <RichEditor content={content} onChange={setContent} />
            </GlassCard>

            <GlassCard>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Category</label>
                  <select
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm appearance-none"
                  >
                    <option>Community</option>
                    <option>Security</option>
                    <option>Utilities</option>
                    <option>Events</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Featured Image URL</label>
                  <input
                    type="text"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm"
                  />
                  {coverImage && (
                    <div className="mt-3 rounded-xl overflow-hidden h-40 bg-surface-alt border border-border">
                      <img
                        src={coverImage}
                        alt="Featured image preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <label className="block text-sm font-semibold mb-3">Tags</label>
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  placeholder="Add a tag..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm"
                />
                <button
                  onClick={addTag}
                  className="p-2.5 rounded-xl bg-forest/10 text-forest hover:bg-forest/20 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-surface-alt text-sm"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                    <button onClick={() => removeTag(tag)} className="hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="rounded border-border text-forest focus:ring-gold" />
                    Featured article
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-border text-forest focus:ring-gold" />
                    Enable comments
                  </label>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <span>Status:</span>
                  <span className="font-semibold text-forest">{article.featured ? "Published" : "Draft"}</span>
                </div>
              </div>
            </GlassCard>
          </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
