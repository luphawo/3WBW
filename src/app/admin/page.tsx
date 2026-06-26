"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui";
import { FileText, Users, Bell, MessageSquare, TrendingUp, Eye, ThumbsUp, Activity } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Articles", value: "24", icon: FileText, change: "+12%", href: "/admin/articles", color: "text-blue-600 bg-blue-100 dark:bg-blue-900/20" },
  { label: "Residents", value: "128", icon: Users, change: "+3", href: "/admin/residents", color: "text-green-600 bg-green-100 dark:bg-green-900/20" },
  { label: "Active Alerts", value: "2", icon: Bell, change: "-1", href: "#", color: "text-orange-600 bg-orange-100 dark:bg-orange-900/20" },
  { label: "Comments", value: "47", icon: MessageSquare, change: "+8", href: "#", color: "text-purple-600 bg-purple-100 dark:bg-purple-900/20" },
];

const chartData = [
  { day: "Mon", visitors: 45, views: 120 },
  { day: "Tue", visitors: 52, views: 145 },
  { day: "Wed", visitors: 38, views: 98 },
  { day: "Thu", visitors: 61, views: 178 },
  { day: "Fri", visitors: 55, views: 156 },
  { day: "Sat", visitors: 42, views: 112 },
  { day: "Sun", visitors: 48, views: 134 },
];

const recentActivity = [
  { action: "New article published", user: "Sarah Moolman", time: "2 hours ago", type: "article" },
  { action: "Security alert updated", user: "James Ndlovu", time: "5 hours ago", type: "alert" },
  { action: "New resident registered", user: "System", time: "1 day ago", type: "user" },
  { action: "Comment moderated", user: "Admin", time: "1 day ago", type: "comment" },
  { action: "Business listing approved", user: "Admin", time: "2 days ago", type: "business" },
];

export default function AdminDashboard() {
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
                View Site →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={stat.href}>
                  <GlassCard className="hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2.5 rounded-xl ${stat.color}`}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                      <span className={`text-xs font-semibold ${
                        stat.change.startsWith("+") ? "text-green-600" : "text-red-600"
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted">{stat.label}</p>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <GlassCard>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-lg">Weekly Traffic</h2>
                  <div className="flex items-center gap-4 text-xs text-muted">
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-forest" />
                      Visitors
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-gold" />
                      Page Views
                    </span>
                  </div>
                </div>
                <div className="flex items-end justify-between h-40 gap-2">
                  {chartData.map((day) => {
                    const maxVal = Math.max(...chartData.map(d => Math.max(d.visitors, d.views)));
                    return (
                      <div key={day.day} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                        <div
                          className="w-full bg-gold/20 rounded-t-md transition-all duration-500"
                          style={{ height: `${(day.views / maxVal) * 100}%` }}
                        />
                        <div
                          className="w-full bg-forest/30 rounded-t-md transition-all duration-500"
                          style={{ height: `${(day.visitors / maxVal) * 100}%` }}
                        />
                        <span className="text-[10px] text-muted mt-1">{day.day}</span>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>
            </div>

            <div>
              <GlassCard>
                <h2 className="font-bold text-lg mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {recentActivity.map((activity, i) => (
                    <div key={i} className="flex items-start gap-3 pb-3 border-b border-border/50 last:border-0">
                      <div className={`p-1.5 rounded-lg ${
                        activity.type === "article" ? "bg-blue-100 dark:bg-blue-900/20 text-blue-600" :
                        activity.type === "alert" ? "bg-orange-100 dark:bg-orange-900/20 text-orange-600" :
                        activity.type === "user" ? "bg-green-100 dark:bg-green-900/20 text-green-600" :
                        "bg-purple-100 dark:bg-purple-900/20 text-purple-600"
                      }`}>
                        <Activity className="w-3 h-3" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{activity.action}</p>
                        <div className="flex items-center gap-2 text-xs text-muted">
                          <span>{activity.user}</span>
                          <span>·</span>
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                <Link href="#" className="p-4 rounded-xl bg-gold/5 border border-gold/10 hover:bg-gold/10 transition-colors text-center">
                  <Bell className="w-5 h-5 text-gold mx-auto mb-2" />
                  <span className="text-sm font-medium">Send Alert</span>
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
              <h2 className="font-bold text-lg mb-4">Engagement Overview</h2>
              <div className="space-y-4">
                {[
                  { label: "Page Views", value: "1,247", icon: Eye, change: "+18%", color: "text-blue-600" },
                  { label: "Active Residents", value: "89", icon: Users, change: "+5", color: "text-green-600" },
                  { label: "Engagement Rate", value: "64%", icon: ThumbsUp, change: "+7%", color: "text-purple-600" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold">{item.value}</span>
                      <span className="text-xs text-green-600">{item.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
