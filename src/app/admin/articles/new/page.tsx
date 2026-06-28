"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui";
import { GlassCard } from "@/components/ui";
import { RichEditor } from "@/components/ui/RichEditor";
import { addArticle } from "@/lib/article-store";
import { Save, Eye, Image as ImageIcon, Tag, Plus, X } from "lucide-react";

export default function NewArticle() {
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [content, setContent] = useState("");

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  function handlePublish(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const article = {
      id: `article-${Date.now()}`,
      title: data.get("title") as string,
      slug: data.get("slug") as string,
      excerpt: (data.get("excerpt") as string) || "",
      content,
      category: { id: "community", name: "Community", slug: "community", color: "#2C5F2E" },
      author: { id: "admin", name: "Admin", avatar: "/avatars/admin.jpg", role: "Administrator" },
      coverImage: (data.get("coverImage") as string) || "/placeholder.jpg",
      publishedAt: new Date().toISOString().split("T")[0],
      featured: false,
      tags,
      readTime: Math.max(1, Math.ceil(((data.get("excerpt") as string) || "").length / 500)),
      comments: [],
    };
    addArticle(article);
    router.push("/admin/articles");
    router.refresh();
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
              <h1 className="text-3xl font-bold">New Article</h1>
              <p className="text-text-secondary mt-1">Create a new community news article.</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                <Eye className="mr-2 w-4 h-4" />
                Preview
              </Button>
              <Button variant="primary" size="sm">
                <Save className="mr-2 w-4 h-4" />
                Save Draft
              </Button>
              <Button variant="gold" size="sm">
                Publish
              </Button>
            </div>
          </div>

          <form onSubmit={handlePublish}>
          <div className="space-y-6">
            <GlassCard>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-2">Article Title</label>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="Enter a compelling title..."
                    className="w-full px-4 py-3 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-lg font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Slug</label>
                  <input
                    type="text"
                    name="slug"
                    required
                    placeholder="article-url-slug"
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm text-muted"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Excerpt</label>
                  <textarea
                    name="excerpt"
                    rows={3}
                    placeholder="Brief summary of the article..."
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
                  <select name="category" className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm appearance-none">
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
                    name="coverImage"
                    placeholder="/articles/my-image.jpg"
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm"
                  />
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
                  type="button"
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
                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500">
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
                    <input type="checkbox" name="featured" className="rounded border-border text-forest focus:ring-gold" />
                    Featured article
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" className="rounded border-border text-forest focus:ring-gold" />
                    Enable comments
                  </label>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <span>Status:</span>
                  <span className="font-semibold text-forest">Draft</span>
                </div>
              </div>
            </GlassCard>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Link href="/admin/articles">
              <Button type="button" variant="ghost" size="sm">Cancel</Button>
            </Link>
            <Button type="submit" variant="gold" size="sm">
              <Save className="mr-2 w-4 h-4" />
              Publish Article
            </Button>
          </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
