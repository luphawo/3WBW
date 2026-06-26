"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GlassCard } from "@/components/ui";
import { Button } from "@/components/ui";
import { Save, Shield, Bell, Users, Palette, Globe, Key } from "lucide-react";

export default function AdminSettings() {
  return (
    <div className="min-h-screen bg-surface-alt p-6 lg:p-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link href="/admin" className="text-sm text-forest font-semibold hover:underline mb-2 block">
                ← Dashboard
              </Link>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-text-secondary mt-1">Configure your community platform.</p>
            </div>
            <Button variant="primary" size="sm">
              <Save className="mr-2 w-4 h-4" />
              Save Changes
            </Button>
          </div>

          <div className="space-y-6">
            <GlassCard>
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-5 h-5 text-gold" />
                <h2 className="font-bold text-lg">General Settings</h2>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Community Name</label>
                    <input
                      type="text"
                      defaultValue="3 Ways Enclosure"
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Enclosure Reference</label>
                    <input
                      type="text"
                      defaultValue="Ref: 1 — City of Johannesburg"
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Tagline</label>
                  <input
                    type="text"
                    defaultValue="Connected Living in the Heart of Fourways"
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm"
                  />
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center gap-3 mb-6">
                <Palette className="w-5 h-5 text-gold" />
                <h2 className="font-bold text-lg">Appearance</h2>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Primary Color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        defaultValue="#2D5A3F"
                        className="w-10 h-10 rounded-xl border border-border cursor-pointer"
                      />
                      <span className="text-sm text-muted">#2D5A3F — Forest Green</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Accent Color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        defaultValue="#C9A84C"
                        className="w-10 h-10 rounded-xl border border-border cursor-pointer"
                      />
                      <span className="text-sm text-muted">#C9A84C — Champagne Gold</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-border text-forest focus:ring-gold" />
                    Enable dark mode toggle
                  </label>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-5 h-5 text-gold" />
                <h2 className="font-bold text-lg">Notifications</h2>
              </div>
              <div className="space-y-3">
                {[
                  "Email notifications for new article comments",
                  "Push notifications for emergency alerts",
                  "Daily digest email for community updates",
                  "SMS alerts for high-priority security incidents",
                ].map((item) => (
                  <label key={item} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-border text-forest focus:ring-gold" />
                    {item}
                  </label>
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-5 h-5 text-gold" />
                <h2 className="font-bold text-lg">Permissions</h2>
              </div>
              <div className="space-y-3">
                {[
                  { role: "Administrators", perms: "Full access to all features" },
                  { role: "Trustees", perms: "Content management, alerts, resident management" },
                  { role: "Residents", perms: "Comment on articles, access directory, marketplace" },
                ].map((item) => (
                  <div key={item.role} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div>
                      <p className="font-medium text-sm">{item.role}</p>
                      <p className="text-xs text-muted">{item.perms}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
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
