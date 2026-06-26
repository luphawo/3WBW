"use client";

import { SectionReveal, GlassCard } from "@/components/ui";
import { Sun, Zap, Truck, Phone, Clock } from "lucide-react";

export function SmartWidgets() {
  return (
    <SectionReveal className="py-24 bg-surface-alt">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">Live</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-2">Smart Dashboard</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <GlassCard>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-gold/10 text-gold">
                <Sun className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold uppercase text-muted tracking-wide truncate">Weather</span>
            </div>
            <p className="text-2xl font-bold">24°C</p>
            <p className="text-sm text-text-secondary">Partly Cloudy</p>
            <div className="mt-2 flex gap-2 text-xs text-muted">
              <span>H: 28°</span>
              <span>L: 18°</span>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/20 text-orange-600">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold uppercase text-muted tracking-wide truncate">Load Shedding</span>
            </div>
            <p className="text-2xl font-bold text-green-600">Stage 0</p>
            <p className="text-sm text-text-secondary">No loadshedding</p>
            <div className="mt-2 text-xs text-muted">
              <span>Next update: 16:00</span>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20 text-blue-600">
                <Truck className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold uppercase text-muted tracking-wide truncate">Traffic</span>
            </div>
            <p className="text-2xl font-bold">Moderate</p>
            <p className="text-sm text-text-secondary">N1 William Nicol</p>
            <div className="mt-2 text-xs text-muted">
              <span>25 min to Sandton CBD</span>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold uppercase text-muted tracking-wide truncate">Emergency</span>
            </div>
            <p className="text-lg font-bold">10111</p>
            <p className="text-sm text-text-secondary">SAPS Emergency</p>
            <div className="mt-2 text-xs text-muted">
              <span>Security: 082 555 0199</span>
            </div>
          </GlassCard>
        </div>
      </div>
    </SectionReveal>
  );
}
