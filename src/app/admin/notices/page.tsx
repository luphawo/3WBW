"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui";
import { getNotices, addNotice as storeAdd, togglePinNotice as storeTogglePin, deleteNotice as storeDelete } from "@/lib/notice-store";
import { notices as staticNotices } from "@/lib/data";
import type { Notice } from "@/types";
import { Plus, Search, Trash2, Pin, PinOff, Bell, AlertTriangle, Megaphone } from "lucide-react";

const typeIcons: Record<Notice["type"], typeof Bell> = {
  notice: Bell,
  announcement: Megaphone,
  warning: AlertTriangle,
};

const typeColors: Record<Notice["type"], string> = {
  notice: "bg-blue-100 text-blue-600",
  announcement: "bg-purple-100 text-purple-600",
  warning: "bg-orange-100 text-orange-600",
};

export default function AdminNotices() {
  const [search, setSearch] = useState("");
  const [noticeList, setNoticeList] = useState(staticNotices);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "notice" as Notice["type"],
    author: "",
    pinned: false,
    expiresAt: "",
  });

  useEffect(() => { setNoticeList(getNotices()); }, []);

  const filtered = noticeList.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete notice "${title}"? This cannot be undone.`)) {
      storeDelete(id);
      setNoticeList(getNotices());
    }
  };

  const handleTogglePin = (id: string) => {
    storeTogglePin(id);
    setNoticeList(getNotices());
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newNotice: Notice = {
      id: `notice-${Date.now()}`,
      ...formData,
      createdAt: new Date().toISOString().split("T")[0],
      expiresAt: formData.expiresAt || undefined,
    };
    storeAdd(newNotice);
    setNoticeList(getNotices());
    setShowForm(false);
    setFormData({ title: "", content: "", type: "notice", author: "", pinned: false, expiresAt: "" });
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
              <h1 className="text-3xl font-bold">Notices</h1>
              <p className="text-text-secondary mt-1">Manage community notices and announcements.</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest text-ivory rounded-xl text-sm font-semibold hover:bg-forest-light transition-all"
            >
              <Plus className="w-4 h-4" />
              New Notice
            </button>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search notices..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-border focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm"
            />
          </div>
        </motion.div>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6"
          >
            <GlassCard>
              <form onSubmit={handleAdd} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as Notice["type"] })}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm"
                    >
                      <option value="notice">Notice</option>
                      <option value="announcement">Announcement</option>
                      <option value="warning">Warning</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Author</label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      placeholder="Author name"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Notice title"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Content</label>
                  <textarea
                    rows={3}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Notice content"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm resize-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Expires At (optional)</label>
                    <input
                      type="date"
                      value={formData.expiresAt}
                      onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm"
                    />
                  </div>
                  <div className="flex items-end pb-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.pinned}
                        onChange={(e) => setFormData({ ...formData, pinned: e.target.checked })}
                        className="w-4 h-4 rounded border-border text-forest focus:ring-forest/30"
                      />
                      <span className="text-sm font-semibold">Pin this notice</span>
                    </label>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={!formData.title || !formData.content || !formData.author}
                    className="px-5 py-2.5 bg-forest text-ivory rounded-xl text-sm font-semibold hover:bg-forest-light disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Create Notice
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-muted hover:text-text border border-border hover:bg-surface transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </GlassCard>
          </motion.div>
        )}

        <GlassCard className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-xs font-semibold uppercase text-muted tracking-wider">Type</th>
                  <th className="text-left p-4 text-xs font-semibold uppercase text-muted tracking-wider">Title</th>
                  <th className="text-left p-4 text-xs font-semibold uppercase text-muted tracking-wider">Author</th>
                  <th className="text-left p-4 text-xs font-semibold uppercase text-muted tracking-wider">Created</th>
                  <th className="text-left p-4 text-xs font-semibold uppercase text-muted tracking-wider">Pinned</th>
                  <th className="text-right p-4 text-xs font-semibold uppercase text-muted tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((notice, i) => {
                  const TypeIcon = typeIcons[notice.type];
                  return (
                    <motion.tr
                      key={notice.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-border/50 last:border-0 hover:bg-black/[0.02] transition-colors"
                    >
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold ${typeColors[notice.type]}`}>
                          <TypeIcon className="w-3 h-3" />
                          {notice.type}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="min-w-0 max-w-[300px]">
                          <p className="font-medium text-sm truncate">{notice.title}</p>
                          <p className="text-xs text-muted truncate">{notice.content}</p>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-muted">{notice.author}</td>
                      <td className="p-4 text-sm text-muted">{notice.createdAt}</td>
                      <td className="p-4">
                        <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                          notice.pinned
                            ? "bg-gold/10 text-gold"
                            : "bg-gray-100 text-gray-400"
                        }`}>
                          {notice.pinned ? "Pinned" : "No"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            className={`p-2 rounded-lg transition-colors ${
                              notice.pinned
                                ? "hover:bg-gold/10 text-gold"
                                : "hover:bg-gray-100 text-gray-400"
                            }`}
                            onClick={() => handleTogglePin(notice.id)}
                            title={notice.pinned ? "Unpin" : "Pin"}
                          >
                            {notice.pinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                          </button>
                          <button
                            className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                            onClick={() => handleDelete(notice.id, notice.title)}
                            title="Delete notice"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
