"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionReveal, GlassCard } from "@/components/ui";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import { getLevyMonths } from "@/lib/levy-store";
import type { StreetCount } from "@/types";

function Bar({ street, count, total, index }: StreetCount & { index: number }) {
  const percentage = Math.round((count / total) * 100);

  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 }}
    >
      <span className="text-sm text-text-secondary w-32 shrink-0 text-right">{street}</span>
      <div className="flex-1 h-8 bg-surface-alt rounded-full overflow-hidden relative">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-forest to-gold"
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.12 }}
        />
      </div>
      <span className="text-sm font-semibold text-text w-20 text-right tabular-nums">
        {count}/{total}
      </span>
    </motion.div>
  );
}

export function LevyChart() {
  const [levyMonths, setLevyMonths] = useState<ReturnType<typeof getLevyMonths>>([]);
  const [currentMonth, setCurrentMonth] = useState(0);

  useEffect(() => {
    setLevyMonths(getLevyMonths());
  }, []);

  if (levyMonths.length === 0) return null;

  const month = levyMonths[currentMonth] ?? levyMonths[0];
  const totalPaid = month.streetCounts.reduce((sum, s) => sum + s.count, 0);
  const totalHouseholds = month.streetCounts.reduce((sum, s) => sum + s.total, 0);

  return (
    <SectionReveal className="py-24 bg-surface-alt/50">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">
            Levy Contributions
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-2">Contributing Homeowners</h2>
          <p className="text-text-secondary mt-4 max-w-lg mx-auto">
            Number of paying households per street, updated monthly.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-10">
          <button
            onClick={() => setCurrentMonth((p) => Math.max(0, p - 1))}
            disabled={currentMonth === 0}
            className="p-2 rounded-full bg-surface border border-border hover:bg-surface-alt transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-xl font-bold min-w-[140px] text-center">{month.monthLabel}</span>

          <button
            onClick={() => setCurrentMonth((p) => Math.min(levyMonths.length - 1, p + 1))}
            disabled={currentMonth === levyMonths.length - 1}
            className="p-2 rounded-full bg-surface border border-border hover:bg-surface-alt transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <GlassCard className="max-w-2xl mx-auto p-8">
          <div className="flex items-center justify-between text-sm text-text-secondary mb-6">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-forest" />
              <span>{totalPaid}/{totalHouseholds} households</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-muted">
              <span className="inline-block w-3 h-3 rounded bg-gradient-to-r from-forest to-gold align-middle mr-1" />
              Paid up
            </span>
          </div>

          <div className="space-y-3">
            {month.streetCounts.map((s, i) => (
              <Bar key={s.street} {...s} index={i} />
            ))}
          </div>
        </GlassCard>
      </div>
    </SectionReveal>
  );
}
