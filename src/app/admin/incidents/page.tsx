"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui";
import { getIncidents, addIncident, updateIncident as storeUpdate, deleteIncident as storeDelete } from "@/lib/incident-store";
import { incidents as staticIncidents } from "@/lib/data";
import type { Incident } from "@/types";
import { Plus, Search, Trash2, MapPin, User, Clock, Edit3, Check, X } from "lucide-react";

const typeColors: Record<Incident["type"], string> = {
  security: "bg-red-100 text-red-600",
  safety: "bg-orange-100 text-orange-600",
  maintenance: "bg-blue-100 text-blue-600",
  general: "bg-gray-100 text-gray-500",
};

const statusColors: Record<Incident["status"], string> = {
  open: "bg-yellow-100 text-yellow-700",
  investigating: "bg-blue-100 text-blue-600",
  resolved: "bg-green-100 text-green-600",
};

const priorityColors: Record<Incident["priority"], string> = {
  critical: "bg-red-50 text-red-600",
  high: "bg-orange-50 text-orange-600",
  medium: "bg-blue-50 text-blue-600",
  low: "bg-gray-50 text-gray-500",
};

export default function AdminIncidents() {
  const [search, setSearch] = useState("");
  const [incidentList, setIncidentList] = useState(staticIncidents);
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    type: "general" as Incident["type"],
    title: "",
    description: "",
    location: "",
    priority: "medium" as Incident["priority"],
    status: "open" as Incident["status"],
    reportedBy: "",
  });

  useEffect(() => { setIncidentList(getIncidents()); }, []);

  const filtered = incidentList.filter((inc) => {
    const matchesSearch = inc.title.toLowerCase().includes(search.toLowerCase()) ||
      inc.location.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || inc.type === typeFilter;
    const matchesStatus = statusFilter === "all" || inc.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const resetForm = () => {
    setFormData({ type: "general", title: "", description: "", location: "", priority: "medium", status: "open", reportedBy: "" });
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;
    const newIncident: Incident = {
      id: `inc-${Date.now()}`,
      type: formData.type,
      title: formData.title,
      description: formData.description,
      status: formData.status,
      reportedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      reportedBy: formData.reportedBy || "Admin",
      location: formData.location || "Unspecified",
      priority: formData.priority,
    };
    addIncident(newIncident);
    setIncidentList(getIncidents());
    setShowForm(false);
    resetForm();
  };

  const startEdit = (inc: Incident) => {
    setEditingId(inc.id);
    setFormData({
      type: inc.type,
      title: inc.title,
      description: inc.description,
      location: inc.location,
      priority: inc.priority,
      status: inc.status,
      reportedBy: inc.reportedBy,
    });
  };

  const handleUpdate = (id: string) => {
    if (!formData.title.trim() || !formData.description.trim()) return;
    storeUpdate(id, {
      type: formData.type,
      title: formData.title,
      description: formData.description,
      location: formData.location,
      priority: formData.priority,
      status: formData.status,
      reportedBy: formData.reportedBy,
      updatedAt: new Date().toISOString(),
    });
    setIncidentList(getIncidents());
    setEditingId(null);
    resetForm();
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete incident "${title}"? This cannot be undone.`)) {
      storeDelete(id);
      setIncidentList(getIncidents());
    }
  };

  const handleStatusChange = (id: string, status: Incident["status"]) => {
    storeUpdate(id, { status, updatedAt: new Date().toISOString() });
    setIncidentList(getIncidents());
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
              <h1 className="text-3xl font-bold">Incidents</h1>
              <p className="text-text-secondary mt-1">Manage reported incidents and concerns.</p>
            </div>
            <button
              onClick={() => { setShowForm(!showForm); if (!showForm) resetForm(); }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest text-ivory rounded-xl text-sm font-semibold hover:bg-forest-light transition-all"
            >
              <Plus className="w-4 h-4" />
              New Incident
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search incidents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-border focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-white border border-border focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm"
            >
              <option value="all">All Types</option>
              <option value="security">Security</option>
              <option value="safety">Safety</option>
              <option value="maintenance">Maintenance</option>
              <option value="general">General</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-white border border-border focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="open">Open</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </motion.div>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6 overflow-hidden"
          >
            <GlassCard>
              <form onSubmit={handleAdd} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Incident title"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as Incident["type"] })}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm"
                    >
                      <option value="general">General</option>
                      <option value="security">Security</option>
                      <option value="safety">Safety</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the incident"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm resize-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Plover Street"
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value as Incident["priority"] })}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Reported By</label>
                    <input
                      type="text"
                      value={formData.reportedBy}
                      onChange={(e) => setFormData({ ...formData, reportedBy: e.target.value })}
                      placeholder="Reporter name"
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={!formData.title || !formData.description}
                    className="px-5 py-2.5 bg-forest text-ivory rounded-xl text-sm font-semibold hover:bg-forest-light disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Create Incident
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); resetForm(); }}
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
                  <th className="text-left p-4 text-xs font-semibold uppercase text-muted tracking-wider">Incident</th>
                  <th className="text-left p-4 text-xs font-semibold uppercase text-muted tracking-wider">Type</th>
                  <th className="text-left p-4 text-xs font-semibold uppercase text-muted tracking-wider">Priority</th>
                  <th className="text-left p-4 text-xs font-semibold uppercase text-muted tracking-wider">Location</th>
                  <th className="text-left p-4 text-xs font-semibold uppercase text-muted tracking-wider">Status</th>
                  <th className="text-left p-4 text-xs font-semibold uppercase text-muted tracking-wider">Date</th>
                  <th className="text-right p-4 text-xs font-semibold uppercase text-muted tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((incident, i) => {
                  const isEditing = editingId === incident.id;
                  return (
                    <motion.tr
                      key={incident.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-border/50 last:border-0 hover:bg-black/[0.02] transition-colors"
                    >
                      <td className="p-4">
                        {isEditing ? (
                          <div className="min-w-0 max-w-[250px] space-y-1">
                            <input
                              type="text"
                              value={formData.title}
                              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                              className="w-full px-3 py-1.5 rounded-lg bg-surface-alt border border-border text-sm focus:outline-none focus:ring-2 focus:ring-forest/30"
                            />
                            <textarea
                              rows={2}
                              value={formData.description}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                              className="w-full px-3 py-1.5 rounded-lg bg-surface-alt border border-border text-xs focus:outline-none focus:ring-2 focus:ring-forest/30 resize-none"
                            />
                          </div>
                        ) : (
                          <div className="min-w-0 max-w-[250px]">
                            <p className="font-medium text-sm truncate">{incident.title}</p>
                            <p className="text-xs text-muted truncate mt-0.5">{incident.description}</p>
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        {isEditing ? (
                          <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value as Incident["type"] })}
                            className="px-3 py-1.5 rounded-lg bg-surface-alt border border-border text-xs focus:outline-none focus:ring-2 focus:ring-forest/30"
                          >
                            <option value="general">General</option>
                            <option value="security">Security</option>
                            <option value="safety">Safety</option>
                            <option value="maintenance">Maintenance</option>
                          </select>
                        ) : (
                          <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold ${typeColors[incident.type]}`}>
                            {incident.type}
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        {isEditing ? (
                          <select
                            value={formData.priority}
                            onChange={(e) => setFormData({ ...formData, priority: e.target.value as Incident["priority"] })}
                            className="px-3 py-1.5 rounded-lg bg-surface-alt border border-border text-xs focus:outline-none focus:ring-2 focus:ring-forest/30"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="critical">Critical</option>
                          </select>
                        ) : (
                          <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${priorityColors[incident.priority]}`}>
                            {incident.priority}
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-28 px-3 py-1.5 rounded-lg bg-surface-alt border border-border text-sm focus:outline-none focus:ring-2 focus:ring-forest/30"
                          />
                        ) : (
                          <span className="inline-flex items-center gap-1 text-sm text-muted">
                            <MapPin className="w-3 h-3" />
                            {incident.location}
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <select
                          value={incident.status}
                          onChange={(e) => handleStatusChange(incident.id, e.target.value as Incident["status"])}
                          className={`text-[10px] font-semibold uppercase px-2 py-1 rounded-full cursor-pointer ${statusColors[incident.status]}`}
                        >
                          <option value="open">Open</option>
                          <option value="investigating">Investigating</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 text-xs text-muted">
                          <Clock className="w-3 h-3" />
                          {new Date(incident.reportedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {isEditing ? (
                            <>
                              <button
                                className="p-2 rounded-lg hover:bg-green-50 text-green-500 transition-colors"
                                onClick={() => handleUpdate(incident.id)}
                                title="Save"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                                onClick={() => { setEditingId(null); resetForm(); }}
                                title="Cancel"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="p-2 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                                onClick={() => startEdit(incident)}
                                title="Edit"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                                onClick={() => handleDelete(incident.id, incident.title)}
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
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
