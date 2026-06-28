"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui";
import { getIncidents, updateIncident as storeUpdate, deleteIncident as storeDelete } from "@/lib/incident-store";
import { incidents as staticIncidents } from "@/lib/data";
import type { Incident } from "@/types";
import { Search, Trash2, MapPin, User, Clock } from "lucide-react";

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

  useEffect(() => { setIncidentList(getIncidents()); }, []);

  const filtered = incidentList.filter((inc) => {
    const matchesSearch = inc.title.toLowerCase().includes(search.toLowerCase()) ||
      inc.location.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || inc.type === typeFilter;
    const matchesStatus = statusFilter === "all" || inc.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

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
                {filtered.map((incident, i) => (
                  <motion.tr
                    key={incident.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-border/50 last:border-0 hover:bg-black/[0.02] transition-colors"
                  >
                    <td className="p-4">
                      <div className="min-w-0 max-w-[250px]">
                        <p className="font-medium text-sm truncate">{incident.title}</p>
                        <p className="text-xs text-muted truncate mt-0.5">{incident.description}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold ${typeColors[incident.type]}`}>
                        {incident.type}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${priorityColors[incident.priority]}`}>
                        {incident.priority}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 text-sm text-muted">
                        <MapPin className="w-3 h-3" />
                        {incident.location}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="relative">
                        <select
                          value={incident.status}
                          onChange={(e) => handleStatusChange(incident.id, e.target.value as Incident["status"])}
                          className={`text-[10px] font-semibold uppercase px-2 py-1 rounded-full border-0 cursor-pointer appearance-none ${statusColors[incident.status]}`}
                        >
                          <option value="open">Open</option>
                          <option value="investigating">Investigating</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </div>
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
                        <button
                          className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                          onClick={() => handleDelete(incident.id, incident.title)}
                          title="Delete incident"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
