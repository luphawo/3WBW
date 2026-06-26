"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GlassCard } from "@/components/ui";
import { residents } from "@/lib/data";
import { Search, Shield, Mail, Home, MoreHorizontal } from "lucide-react";

export default function AdminResidents() {
  return (
    <div className="min-h-screen bg-surface-alt p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link href="/admin" className="text-sm text-forest font-semibold hover:underline mb-2 block">
                ← Dashboard
              </Link>
              <h1 className="text-3xl font-bold">Residents</h1>
              <p className="text-text-secondary mt-1">128 households · 450+ residents</p>
            </div>
            <div className="relative max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search residents..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-graphite border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm"
              />
            </div>
          </div>

          <GlassCard className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-xs font-semibold uppercase text-muted tracking-wider">Resident</th>
                    <th className="text-left p-4 text-xs font-semibold uppercase text-muted tracking-wider">Unit</th>
                    <th className="text-left p-4 text-xs font-semibold uppercase text-muted tracking-wider">Street</th>
                    <th className="text-left p-4 text-xs font-semibold uppercase text-muted tracking-wider">Role</th>
                    <th className="text-left p-4 text-xs font-semibold uppercase text-muted tracking-wider">Joined</th>
                    <th className="text-left p-4 text-xs font-semibold uppercase text-muted tracking-wider">Verified</th>
                    <th className="text-right p-4 text-xs font-semibold uppercase text-muted tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {residents.map((resident, i) => (
                    <motion.tr
                      key={resident.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-border/50 last:border-0 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-graphite font-bold text-sm">
                            {resident.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{resident.name}</p>
                            {resident.bio && (
                              <p className="text-xs text-muted truncate max-w-[200px]">{resident.bio}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm">Unit {resident.unit}</td>
                      <td className="p-4 text-sm">{resident.street}</td>
                      <td className="p-4">
                        <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                          resident.role === "admin" ? "bg-forest/10 text-forest" :
                          resident.role === "trustee" ? "bg-gold/10 text-gold" :
                          "bg-blue-100 dark:bg-blue-900/20 text-blue-600"
                        }`}>
                          {resident.role}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-muted">{resident.joinedAt}</td>
                      <td className="p-4">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          resident.verified
                            ? "bg-green-100 dark:bg-green-900/20 text-green-600"
                            : "bg-surface-alt text-muted"
                        }`}>
                          {resident.verified ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-2 rounded-lg hover:bg-surface-alt transition-colors">
                            <Mail className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-surface-alt transition-colors">
                            <Shield className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-surface-alt transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
