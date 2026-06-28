"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui";
import { getAlerts, addAlert as storeAdd, toggleAlert as storeToggle, deleteAlert as storeDelete } from "@/lib/alert-store";
import { alerts as staticAlerts } from "@/lib/data";
import type { Alert } from "@/types";
import { Plus, Search, Trash2, Power, PowerOff, AlertTriangle, Info, AlertCircle, Bell } from "lucide-react";

const typeIcons: Record<Alert["type"], typeof Bell> = {
  emergency: AlertTriangle,
  warning: AlertCircle,
  info: Info,
  update: Bell,
};

const typeColors: Record<Alert["type"], string> = {
  emergency: "bg-red-100 text-red-600",
  warning: "bg-orange-100 text-orange-600",
  info: "bg-blue-100 text-blue-600",
  update: "bg-purple-100 text-purple-600",
};

const priorityColors: Record<Alert["priority"], string> = {
  critical: "bg-red-50 text-red-600",
  high: "bg-orange-50 text-orange-600",
  medium: "bg-blue-50 text-blue-600",
  low: "bg-gray-50 text-gray-500",
};

export default function AdminAlerts() {
  const [search, setSearch] = useState("");
  const [alertList, setAlertList] = useState(staticAlerts);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: "info" as Alert["type"],
    title: "",
    message: "",
    priority: "medium" as Alert["priority"],
  });

  useEffect(() => { setAlertList(getAlerts()); }, []);

  const filtered = alertList.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete alert "${title}"? This cannot be undone.`)) {
      storeDelete(id);
      setAlertList(getAlerts());
    }
  };

  const handleToggle = (id: string) => {
    storeToggle(id);
    setAlertList(getAlerts());
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newAlert: Alert = {
      id: `alert-${Date.now()}`,
      ...formData,
      createdAt: new Date().toISOString().split("T")[0],
      active: true,
    };
    storeAdd(newAlert);
    setAlertList(getAlerts());
    setShowForm(false);
    setFormData({ type: "info", title: "", message: "", priority: "medium" });
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
              <h1 className="text-3xl font-bold">Alerts</h1>
              <p className="text-text-secondary mt-1">Manage community alerts and notifications.</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest text-ivory rounded-xl text-sm font-semibold hover:bg-forest-light transition-all"
            >
              <Plus className="w-4 h-4" />
              New Alert
            </button>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search alerts..."
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
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as Alert["type"] })}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm"
                    >
                      <option value="info">Info</option>
                      <option value="warning">Warning</option>
                      <option value="emergency">Emergency</option>
                      <option value="update">Update</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value as Alert["priority"] })}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Alert title"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Message</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Alert message"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm resize-none"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={!formData.title || !formData.message}
                    className="px-5 py-2.5 bg-forest text-ivory rounded-xl text-sm font-semibold hover:bg-forest-light disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Create Alert
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
                  <th className="text-left p-4 text-xs font-semibold uppercase text-muted tracking-wider">Priority</th>
                  <th className="text-left p-4 text-xs font-semibold uppercase text-muted tracking-wider">Created</th>
                  <th className="text-left p-4 text-xs font-semibold uppercase text-muted tracking-wider">Status</th>
                  <th className="text-right p-4 text-xs font-semibold uppercase text-muted tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((alert, i) => {
                  const TypeIcon = typeIcons[alert.type];
                  return (
                    <motion.tr
                      key={alert.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-border/50 last:border-0 hover:bg-black/[0.02] transition-colors"
                    >
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold ${typeColors[alert.type]}`}>
                          <TypeIcon className="w-3 h-3" />
                          {alert.type}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="min-w-0 max-w-[300px]">
                          <p className="font-medium text-sm truncate">{alert.title}</p>
                          <p className="text-xs text-muted truncate">{alert.message}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${priorityColors[alert.priority]}`}>
                          {alert.priority}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-muted">{alert.createdAt}</td>
                      <td className="p-4">
                        <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                          alert.active
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        }`}>
                          {alert.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            className={`p-2 rounded-lg transition-colors ${
                              alert.active
                                ? "hover:bg-orange-50 text-orange-500"
                                : "hover:bg-green-50 text-green-500"
                            }`}
                            onClick={() => handleToggle(alert.id)}
                            title={alert.active ? "Deactivate" : "Activate"}
                          >
                            {alert.active ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
                          </button>
                          <button
                            className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                            onClick={() => handleDelete(alert.id, alert.title)}
                            title="Delete alert"
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
