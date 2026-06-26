"use client";

import { motion } from "framer-motion";
import { SectionReveal, GlassCard } from "@/components/ui";
import { Button } from "@/components/ui";
import { Shield, Phone, AlertTriangle, Clock, MapPin, FileText } from "lucide-react";
import { incidents, alerts } from "@/lib/data";

const emergencyContacts = [
  { name: "SAPS Emergency", number: "10111", icon: Phone },
  { name: "City of Joburg Emergency", number: "086 00 10111", icon: Phone },
  { name: "Enclosure Security", number: "082 555 0199", icon: Shield },
  { name: "Netcare 911", number: "082 911", icon: Phone },
  { name: "Joburg Water", number: "086 056 2874", icon: Phone },
  { name: "Eskom (Load Shedding)", number: "086 003 7566", icon: AlertTriangle },
];

export default function Safety() {
  const activeAlerts = alerts.filter((a) => a.active);

  return (
    <>
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-graphite to-surface" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Safety</span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mt-4 mb-6 text-ivory">
              Security &amp; Safety
            </h1>
            <p className="text-lg text-ivory/60 max-w-xl">
              Your safety is our priority. Access emergency contacts, report incidents, 
              and stay informed about security updates.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionReveal className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Emergency Contacts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {emergencyContacts.map((contact, i) => (
                  <motion.div
                    key={contact.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <GlassCard className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600">
                          <contact.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{contact.name}</p>
                          <p className="text-lg font-bold text-forest">{contact.number}</p>
                        </div>
                      </div>
                      <a
                        href={`tel:${contact.number.replace(/\s/g, "")}`}
                        className="p-2 rounded-lg bg-forest/10 text-forest hover:bg-forest/20 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Active Alerts</h2>
              <div className="flex flex-col gap-4">
                {activeAlerts.map((alert) => (
                  <GlassCard
                    key={alert.id}
                    className={`border-l-4 ${
                      alert.priority === "critical"
                        ? "border-l-red-500"
                        : alert.priority === "high"
                        ? "border-l-orange-500"
                        : "border-l-gold"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle className={`w-5 h-5 flex-shrink-0 ${
                        alert.priority === "critical" ? "text-red-500" : "text-gold"
                      }`} />
                      <div>
                        <h3 className="font-semibold text-sm">{alert.title}</h3>
                        <p className="text-xs text-text-secondary mt-1">{alert.message}</p>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="py-16 bg-surface-alt">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Recent Incidents</h2>
              <p className="text-text-secondary mt-1">Track reported incidents in the enclosure.</p>
            </div>
            <Button variant="ghost" size="sm">
              <FileText className="mr-2 w-4 h-4" />
              Report Incident
            </Button>
          </div>

          <div className="space-y-4">
            {incidents.map((incident, i) => (
              <motion.div
                key={incident.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${
                      incident.type === "security"
                        ? "bg-red-100 dark:bg-red-900/20 text-red-600"
                        : "bg-blue-100 dark:bg-blue-900/20 text-blue-600"
                    }`}>
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{incident.title}</h3>
                      <p className="text-sm text-text-secondary mt-1">{incident.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {incident.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(incident.reportedAt).toLocaleDateString()}
                        </span>
                        <span>{incident.reportedBy}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-semibold uppercase px-2 py-1 rounded-full ${
                    incident.status === "investigating"
                      ? "bg-orange-100 dark:bg-orange-900/20 text-orange-600"
                      : incident.status === "open"
                      ? "bg-blue-100 dark:bg-blue-900/20 text-blue-600"
                      : "bg-green-100 dark:bg-green-900/20 text-green-600"
                  }`}>
                    {incident.status}
                  </span>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="py-16">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest to-forest-light p-8 md:p-12">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold/10 rounded-full blur-3xl" />
            <div className="relative text-center max-w-lg mx-auto">
              <Shield className="w-12 h-12 text-gold mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">See Something? Say Something</h2>
              <p className="text-ivory/70 mb-6">
                Report suspicious activity, maintenance issues, or safety concerns. 
                Your vigilance keeps our community safe.
              </p>
              <Button variant="gold" size="lg">
                <AlertTriangle className="mr-2 w-5 h-5" />
                Report an Incident
              </Button>
            </div>
          </div>
        </div>
      </SectionReveal>
    </>
  );
}
