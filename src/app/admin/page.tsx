"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui";
import {
  FileText, Users, Bell, MessageSquare, Eye, Activity,
  AlertTriangle, Building2, Megaphone, Image as ImageIcon,
  ShieldCheck, Wrench
} from "lucide-react";
import Link from "next/link";
import { getArticles } from "@/lib/article-store";
import { getAlerts } from "@/lib/alert-store";
import { getIncidents } from "@/lib/incident-store";
import { getNotices } from "@/lib/notice-store";
import { getMediaItems } from "@/lib/media-store";
import { residents, businesses } from "@/lib/data";
import type { Incident, Notice } from "@/types";

export default function AdminDashboard() {
  const [articleCount, setArticleCount] = useState(0);
  const [activeAlertCount, setActiveAlertCount] = useState(0);
  const [noticeCount, setNoticeCount] = useState(0);
  const [incidentCount, setIncidentCount] = useState(0);
  const [totalAlertCount, setTotalAlertCount] = useState(0);
  const [mediaCount, setMediaCount] = useState(0);
  const [openIncidents, setOpenIncidents] = useState<Incident[]>([]);
  const [recentNotices, setRecentNotices] = useState<Notice[]>([]);
  const [mediaByCategory, setMediaByCategory] = useState<Record<string, number>>({});

  useEffect(() => {
    setArticleCount(getArticles().length);
    setActiveAlertCount(getAlerts().filter((a) => a.active).length);
    setNoticeCount(getNotices().length);
    const incs = getIncidents();
    setIncidentCount(incs.length);
    setOpenIncidents(incs.filter((i) => i.status === "open" || i.status === "investigating"));
    setTotalAlertCount(getAlerts().length);
    const items = getMediaItems();
    setMediaCount(items.length);
    setMediaByCategory(
      items.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    );
    setRecentNotices(getNotices().slice(0, 5));
  }, []);

  const stats = [
    { label: "Articles", value: articleCount, icon: FileText, href: "/admin/articles", color: "text-blue-600 bg-blue-100 dark:bg-blue-900/20" },
    { label: "Residents", value: residents.length, icon: Users, href: "/admin/residents", color: "text-green-600 bg-green-100 dark:bg-green-900/20" },
    { label: "Active Alerts", value: activeAlertCount, icon: Bell, href: "/admin/alerts", color: "text-orange-600 bg-orange-100 dark:bg-orange-900/20" },
    { label: "Notices", value: noticeCount, icon: MessageSquare, href: "/admin/notices", color: "text-purple-600 bg-purple-100 dark:bg-purple-900/20" },
    { label: "Incidents", value: incidentCount, icon: Activity, href: "/admin/incidents", color: "text-red-600 bg-red-100 dark:bg-red-900/20" },
    { label: "Media", value: mediaCount, icon: Eye, href: "/admin/media", color: "text-sky-600 bg-sky-100 dark:bg-sky-900/20" },
  ];

  const maxCategoryCount = Math.max(...Object.values(mediaByCategory), 1);

  const categoryColors: Record<string, string> = {
    community: "bg-blue-500",
    lifestyle: "bg-green-500",
    security: "bg-orange-500",
    event: "bg-purple-500",
    hero: "bg-rose-500",
    branding: "bg-gray-500",
  };

  const incidentTypeCounts = {
    security: openIncidents.filter((i) => i.type === "security").length,
    maintenance: openIncidents.filter((i) => i.type === "maintenance").length,
    general: openIncidents.filter((i) => i.type === "general").length,
  };

  return (
    <div className="min-h-screen bg-surface-alt p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-text-secondary mt-1">Welcome back, Admin</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted">Last updated: just now</span>
              <Link
                href="/"
                className="text-sm text-forest font-semibold hover:underline"
              >
                View Site &rarr;
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href={stat.href}>
                  <GlassCard className="hover:shadow-md transition-shadow p-4 sm:p-6">
                    <div className={`w-fit p-2 rounded-lg sm:p-2.5 sm:rounded-xl mb-2 sm:mb-3 ${stat.color}`}>
                      <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <p className="text-xl sm:text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted truncate">{stat.label}</p>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <GlassCard>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-lg">Media by Category</h2>
                  <ImageIcon className="w-4 h-4 text-muted" />
                </div>
                {Object.keys(mediaByCategory).length === 0 ? (
                  <p className="text-sm text-muted py-8 text-center">No media items yet</p>
                ) : (
                  <div className="space-y-3">
                    {Object.entries(mediaByCategory)
                      .sort(([, a], [, b]) => b - a)
                      .map(([category, count]) => (
                        <div key={category} className="flex items-center gap-3">
                          <span className="w-24 text-sm capitalize text-muted">{category}</span>
                          <div className="flex-1 h-5 bg-surface-alt rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-700 ${categoryColors[category] || "bg-forest"}`}
                              style={{ width: `${(count / maxCategoryCount) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold w-6 text-right">{count}</span>
                        </div>
                      ))}
                  </div>
                )}
              </GlassCard>
            </div>

            <div>
              <GlassCard>
                <h2 className="font-bold text-lg mb-4">Recent Notices</h2>
                {recentNotices.length === 0 ? (
                  <p className="text-sm text-muted py-8 text-center">No notices yet</p>
                ) : (
                  <div className="space-y-3">
                    {recentNotices.map((notice) => (
                      <div key={notice.id} className="flex items-start gap-3 pb-3 border-b border-border/50 last:border-0">
                        <div className={`p-1.5 rounded-lg ${
                          notice.type === "warning"
                            ? "bg-orange-100 dark:bg-orange-900/20 text-orange-600"
                            : "bg-blue-100 dark:bg-blue-900/20 text-blue-600"
                        }`}>
                          {notice.pinned ? (
                            <Megaphone className="w-3 h-3" />
                          ) : (
                            <MessageSquare className="w-3 h-3" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{notice.title}</p>
                          <p className="text-xs text-muted">{notice.author} &middot; {notice.createdAt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {noticeCount > 5 && (
                  <Link href="/admin/notices" className="block text-sm text-forest font-semibold mt-4 hover:underline text-center">
                    View all {noticeCount} notices &rarr;
                  </Link>
                )}
              </GlassCard>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GlassCard>
              <h2 className="font-bold text-lg mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/admin/articles/new" className="p-4 rounded-xl bg-forest/5 border border-forest/10 hover:bg-forest/10 transition-colors text-center">
                  <FileText className="w-5 h-5 text-forest mx-auto mb-2" />
                  <span className="text-sm font-medium">New Article</span>
                </Link>
                <Link href="/admin/alerts" className="p-4 rounded-xl bg-gold/5 border border-gold/10 hover:bg-gold/10 transition-colors text-center">
                  <Bell className="w-5 h-5 text-gold mx-auto mb-2" />
                  <span className="text-sm font-medium">Manage Alerts</span>
                </Link>
                <Link href="/admin/residents" className="p-4 rounded-xl bg-blue-100/50 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-800/30 hover:bg-blue-100 transition-colors text-center">
                  <Users className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                  <span className="text-sm font-medium">Manage Residents</span>
                </Link>
                <Link href="/admin/media" className="p-4 rounded-xl bg-purple-100/50 dark:bg-purple-900/20 border border-purple-200/50 dark:border-purple-800/30 hover:bg-purple-100 transition-colors text-center">
                  <Eye className="w-5 h-5 text-purple-600 mx-auto mb-2" />
                  <span className="text-sm font-medium">Media Library</span>
                </Link>
              </div>
            </GlassCard>

            <GlassCard>
              <h2 className="font-bold text-lg mb-4">Site Overview</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-4 h-4 text-forest" />
                    <span className="text-sm">Businesses</span>
                  </div>
                  <span className="font-bold">{businesses.length}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    <span className="text-sm">Open Incidents</span>
                  </div>
                  <span className="font-bold">{openIncidents.length}</span>
                </div>
                {incidentTypeCounts.security > 0 && (
                  <div className="flex items-center justify-between py-2 pl-7">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3 h-3 text-red-500" />
                      <span className="text-xs text-muted">Security</span>
                    </div>
                    <span className="text-xs font-semibold">{incidentTypeCounts.security}</span>
                  </div>
                )}
                {incidentTypeCounts.maintenance > 0 && (
                  <div className="flex items-center justify-between py-2 pl-7">
                    <div className="flex items-center gap-2">
                      <Wrench className="w-3 h-3 text-blue-500" />
                      <span className="text-xs text-muted">Maintenance</span>
                    </div>
                    <span className="text-xs font-semibold">{incidentTypeCounts.maintenance}</span>
                  </div>
                )}
                {incidentTypeCounts.general > 0 && (
                  <div className="flex items-center justify-between py-2 pl-7">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-muted">General</span>
                    </div>
                    <span className="text-xs font-semibold">{incidentTypeCounts.general}</span>
                  </div>
                )}
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Bell className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Total Alerts</span>
                  </div>
                  <span className="font-bold">{totalAlertCount}</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
