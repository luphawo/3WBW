"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui";
import { getLevyMonths, addLevyMonth, updateLevyMonth, deleteLevyMonth } from "@/lib/levy-store";
import { levyMonths as staticLevyMonths } from "@/lib/data";
import { Plus, Search, Trash2, Edit3, Check, X, Calendar, Users } from "lucide-react";

const STREETS = [
  { name: "Jacana Street", total: 31 },
  { name: "Kestrel Street", total: 19 },
  { name: "Plover Street", total: 21 },
];

export default function AdminLevies() {
  const [search, setSearch] = useState("");
  const [monthList, setMonthList] = useState(staticLevyMonths);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => { setMonthList(getLevyMonths()); }, []);

  const filtered = monthList.filter((m) =>
    m.monthLabel.toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () => {
    const data: Record<string, string> = { monthLabel: "" };
    for (const s of STREETS) {
      data[s.name] = "";
    }
    setFormData(data);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const streetCounts = STREETS.map((s) => ({
      street: s.name,
      count: Math.min(Number(formData[s.name]) || 0, s.total),
      total: s.total,
    }));
    const newMonth = {
      id: `levy-${Date.now()}`,
      monthLabel: formData.monthLabel,
      streetCounts,
    };
    addLevyMonth(newMonth);
    setMonthList(getLevyMonths());
    setShowForm(false);
    resetForm();
  };

  const startEdit = (month: typeof staticLevyMonths[number]) => {
    setEditingId(month.id);
    const data: Record<string, string> = { monthLabel: month.monthLabel };
    for (const sc of month.streetCounts) {
      data[sc.street] = String(sc.count);
    }
    setFormData(data);
  };

  const handleUpdate = (id: string) => {
    const streetCounts = STREETS.map((s) => ({
      street: s.name,
      count: Math.min(Number(formData[s.name]) || 0, s.total),
      total: s.total,
    }));
    updateLevyMonth(id, { monthLabel: formData.monthLabel, streetCounts });
    setMonthList(getLevyMonths());
    setEditingId(null);
    resetForm();
  };

  const handleDelete = (id: string, label: string) => {
    if (window.confirm(`Delete levy data for "${label}"? This cannot be undone.`)) {
      deleteLevyMonth(id);
      setMonthList(getLevyMonths());
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    resetForm();
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
              <h1 className="text-3xl font-bold">Levies</h1>
              <p className="text-text-secondary mt-1">
                Manage monthly levy contributions per street.
              </p>
            </div>
            <button
              onClick={() => { setShowForm(!showForm); resetForm(); }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest text-ivory rounded-xl text-sm font-semibold hover:bg-forest-light transition-all"
            >
              <Plus className="w-4 h-4" />
              New Month
            </button>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search months..."
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
                <div>
                  <label className="block text-sm font-semibold mb-2">Month</label>
                  <input
                    type="text"
                    value={formData.monthLabel}
                    onChange={(e) => setFormData({ ...formData, monthLabel: e.target.value })}
                    placeholder="e.g. July 2026"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {STREETS.map((s) => (
                    <div key={s.name}>
                      <label className="block text-sm font-semibold mb-2">
                        {s.name} <span className="text-muted font-normal">(max {s.total})</span>
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={s.total}
                        value={formData[s.name] ?? ""}
                        onChange={(e) => setFormData({ ...formData, [s.name]: e.target.value })}
                        placeholder={`0–${s.total}`}
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-forest/30 text-sm"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={!formData.monthLabel || STREETS.some((s) => !formData[s.name])}
                    className="px-5 py-2.5 bg-forest text-ivory rounded-xl text-sm font-semibold hover:bg-forest-light disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Create Month
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
                  <th className="text-left p-4 text-xs font-semibold uppercase text-muted tracking-wider">Month</th>
                  {STREETS.map((s) => (
                    <th key={s.name} className="text-left p-4 text-xs font-semibold uppercase text-muted tracking-wider">
                      {s.name.replace(" Street", "")}
                    </th>
                  ))}
                  <th className="text-left p-4 text-xs font-semibold uppercase text-muted tracking-wider">Total</th>
                  <th className="text-right p-4 text-xs font-semibold uppercase text-muted tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((month, i) => {
                  const isEditing = editingId === month.id;
                  const totalPaid = month.streetCounts.reduce((s, c) => s + c.count, 0);
                  const totalMax = month.streetCounts.reduce((s, c) => s + c.total, 0);

                  return (
                    <motion.tr
                      key={month.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-border/50 last:border-0 hover:bg-black/[0.02] transition-colors"
                    >
                      <td className="p-4">
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.monthLabel}
                            onChange={(e) => setFormData({ ...formData, monthLabel: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-lg bg-surface-alt border border-border text-sm focus:outline-none focus:ring-2 focus:ring-forest/30"
                          />
                        ) : (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-forest" />
                            <span className="font-medium text-sm">{month.monthLabel}</span>
                          </div>
                        )}
                      </td>
                      {STREETS.map((s) => {
                        const sc = month.streetCounts.find((c) => c.street === s.name);
                        return (
                          <td key={s.name} className="p-4">
                            {isEditing ? (
                              <input
                                type="number"
                                min={0}
                                max={s.total}
                                value={formData[s.name] ?? ""}
                                onChange={(e) => setFormData({ ...formData, [s.name]: e.target.value })}
                                className="w-20 px-3 py-1.5 rounded-lg bg-surface-alt border border-border text-sm focus:outline-none focus:ring-2 focus:ring-forest/30"
                              />
                            ) : (
                              <span className="text-sm tabular-nums">
                                {sc?.count ?? "—"} <span className="text-muted">/ {s.total}</span>
                              </span>
                            )}
                          </td>
                        );
                      })}
                      <td className="p-4">
                        {isEditing ? (
                          <span className="text-sm text-muted">—</span>
                        ) : (
                          <div className="flex items-center gap-1 text-sm">
                            <Users className="w-3.5 h-3.5 text-muted" />
                            <span className="tabular-nums">{totalPaid}</span>
                            <span className="text-muted">/{totalMax}</span>
                          </div>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {isEditing ? (
                            <>
                              <button
                                className="p-2 rounded-lg hover:bg-green-50 text-green-500 transition-colors"
                                onClick={() => handleUpdate(month.id)}
                                title="Save"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                                onClick={cancelEdit}
                                title="Cancel"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="p-2 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                                onClick={() => startEdit(month)}
                                title="Edit"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                                onClick={() => handleDelete(month.id, month.monthLabel)}
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
