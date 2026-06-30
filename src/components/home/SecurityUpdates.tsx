"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui";
import { getAlerts, subscribe as subscribeAlerts } from "@/lib/alert-store";
import { getIncidents, subscribe as subscribeIncidents } from "@/lib/incident-store";
import { AlertTriangle, Shield, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export function SecurityUpdates() {
  const [alerts, setAlerts] = useState(getAlerts());
  const [incidents, setIncidents] = useState(getIncidents());

  useEffect(() => {
    setAlerts(getAlerts());
    setIncidents(getIncidents());
    const unsub1 = subscribeAlerts(() => setAlerts(getAlerts()));
    const unsub2 = subscribeIncidents(() => setIncidents(getIncidents()));
    return () => { unsub1(); unsub2(); };
  }, []);

  const activeAlerts = alerts.filter((a) => a.active);

  return (
    <section className="py-24 bg-surface-alt">
      <div className="container">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Safety & Security</span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-2">Stay Informed</h2>
          </div>
          <Link
            href="/safety"
            className="flex items-center gap-2 text-forest font-semibold hover:gap-3 transition-all text-sm"
          >
            All Updates <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 flex flex-col gap-6">
          {activeAlerts.map((alert, i) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard
                className={`border-l-4 ${
                  alert.priority === "critical"
                    ? "border-l-red-500"
                    : alert.priority === "high"
                    ? "border-l-orange-500"
                    : "border-l-gold"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-xl flex-shrink-0 ${
                      alert.priority === "critical"
                        ? "bg-red-100 dark:bg-red-900/20 text-red-600"
                        : "bg-gold/10 text-gold"
                    }`}
                  >
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-lg">{alert.title}</h3>
                      <span
                        className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                          alert.priority === "critical"
                            ? "bg-red-100 dark:bg-red-900/20 text-red-600"
                            : "bg-gold/10 text-gold"
                        }`}
                      >
                        {alert.priority}
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed">{alert.message}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
          </div>

          <div className="flex flex-col gap-4">
            <GlassCard className="bg-forest/5 border border-forest/10">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-5 h-5 text-forest" />
                <span className="font-semibold text-sm">Recent Incidents</span>
              </div>
              {incidents.slice(0, 2).map((incident) => (
                <div key={incident.id} className="flex items-center justify-between py-2 border-t border-border/50">
                  <div>
                    <p className="text-sm font-medium">{incident.title}</p>
                    <span className="text-xs text-muted">{incident.location}</span>
                  </div>
                  <span
                    className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                      incident.status === "investigating"
                        ? "bg-orange-100 dark:bg-orange-900/20 text-orange-600"
                        : incident.status === "open"
                        ? "bg-blue-100 dark:bg-blue-900/20 text-blue-600"
                        : "bg-green-100 dark:bg-green-900/20 text-green-600"
                    }`}
                  >
                    {incident.status}
                  </span>
                </div>
              ))}
            </GlassCard>

            <div className="flex items-center gap-3 text-sm text-muted">
              <Clock className="w-4 h-4" />
              <span>Last updated: Just now</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
