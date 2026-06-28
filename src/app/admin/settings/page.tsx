"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui";
import { Button } from "@/components/ui";
import { Save, Key, Eye, Check, AlertCircle, Bell, Users, Palette, Globe } from "lucide-react";

export default function AdminSettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [changingPassword, setChangingPassword] = useState(false);

  async function handleChangePassword(e: FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match" });
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.error });
        return;
      }

      setMessage({ type: "success", text: "Password changed successfully" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setMessage({ type: "error", text: "An error occurred" });
    } finally {
      setSaving(false);
    }
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
                      defaultValue="Threeways Birdwatch Community Enclosure"
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

            <GlassCard>
              <div className="flex items-center gap-3 mb-6">
                <Key className="w-5 h-5 text-gold" />
                <h2 className="font-bold text-lg">Change Password</h2>
              </div>
              {message && (
                <div className={cn("flex items-center gap-2 text-sm mb-4 px-4 py-2.5 rounded-xl", message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600")}>
                  {message.type === "success" ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  {message.text}
                </div>
              )}
              <form onSubmit={handleChangePassword} className="space-y-4 max-w-sm">
                <div>
                  <label className="block text-sm font-semibold mb-2">Current Password</label>
                  <input
                    type={showPasswords ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">New Password</label>
                  <input
                    type={showPasswords ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Confirm New Password</label>
                  <input
                    type={showPasswords ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm"
                  />
                </div>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPasswords}
                    onChange={() => setShowPasswords(!showPasswords)}
                    className="rounded border-border text-forest focus:ring-forest"
                  />
                  <Eye className="w-4 h-4 text-muted" />
                  Show passwords
                </label>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={saving || !currentPassword || !newPassword || !confirmPassword}
                >
                  {saving ? "Changing..." : "Change Password"}
                </Button>
              </form>
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
