"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionReveal, GlassCard } from "@/components/ui";
import { Button } from "@/components/ui";
import { PageHeader } from "@/components/layout/PageHeader";
import { Shield, Phone, AlertTriangle, Clock, MapPin, FileText, X, Send } from "lucide-react";
import { getIncidents, addIncident } from "@/lib/incident-store";
import { getAlerts } from "@/lib/alert-store";
import { incidents as staticIncidents, alerts as staticAlerts } from "@/lib/data";

const emergencyContacts = [
  {
    name: "TRSS Security Services Control Room",
    number: "086 111 4021 / 011 708 1895",
    icon: Shield,
  },
  {
    name: "Free Medical Services (TRSS clients only)",
    number: "086 111 4021",
    icon: Phone,
  },
  { name: "Cell Emergency", number: "112", icon: Phone },
  { name: "Police", number: "10111", icon: Phone },
  {
    name: "City of Joburg Emergency Services",
    number: "011 375 591",
    icon: Phone,
  },
  {
    name: "Douglasdale CPF",
    number: "071 675 7156 / 071 675 7157",
    icon: Phone,
  },
  { name: "Netcare 911", number: "082 911", icon: Phone },
  { name: "Pikitup", number: "011 712 5200", icon: Phone },
  {
    name: "Jhb Roads Agency",
    number: "011 298 5000",
    icon: Phone,
  },
  {
    name: "Jhb Water",
    number: "011 375 5555",
    email: "customerserviceemails@jwater.co.za",
    icon: Phone,
  },
];

export default function Safety() {
  const [alertList, setAlertList] = useState(staticAlerts);
  const activeAlerts = alertList.filter((a) => a.active);
  const [showForm, setShowForm] = useState(false);
  const [incidentList, setIncidentList] = useState(staticIncidents);
  const [formData, setFormData] = useState({
    type: "general",
    title: "",
    description: "",
    location: "",
  });

  useEffect(() => {
    setIncidentList(getIncidents());
    setAlertList(getAlerts());
    if (window.location.search.includes("report=true")) {
      setShowForm(true);
    }
  }, []);

  useEffect(() => {
    function syncFromStorage(e: StorageEvent) {
      if (e.key === "3wbw_incidents") {
        setIncidentList(getIncidents());
      }
      if (e.key === "3wbw_alerts") {
        setAlertList(getAlerts());
      }
    }
    function sync() {
      setIncidentList(getIncidents());
      setAlertList(getAlerts());
    }
    window.addEventListener("storage", syncFromStorage);
    window.addEventListener("focus", sync);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") sync();
    });
    return () => {
      window.removeEventListener("storage", syncFromStorage);
      window.removeEventListener("focus", sync);
    };
  }, []);

  return (
    <>
      <PageHeader
        label="Safety"
        title="Security &amp; Safety"
        description="Your safety is our priority. Access emergency contacts, report incidents, and stay informed about security updates."
      />

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
                          {contact.email && (
                            <p className="text-xs text-gold mt-0.5">{contact.email}</p>
                          )}
                        </div>
                      </div>
                      {contact.email ? (
                        <a
                          href={`mailto:${contact.email}`}
                          className="p-2 rounded-lg bg-forest/10 text-forest hover:bg-forest/20 transition-colors"
                        >
                          <Send className="w-4 h-4" />
                        </a>
                      ) : (
                        <a
                          href={`tel:${contact.number.split("/")[0].replace(/[^+\d]/g, "")}`}
                          className="p-2 rounded-lg bg-forest/10 text-forest hover:bg-forest/20 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                      )}
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
            <Button variant="ghost" size="sm" onClick={() => setShowForm(!showForm)}>
              <FileText className="mr-2 w-4 h-4" />
              {showForm ? "Cancel" : "Report Incident"}
            </Button>
          </div>

          {showForm && (
            <motion.div
              id="incident-form"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Report an Incident</h3>
                  <button onClick={() => setShowForm(false)} className="p-1 rounded-lg hover:bg-surface-alt transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Incident Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm appearance-none"
                    >
                      <option value="general">General</option>
                      <option value="security">Security</option>
                      <option value="safety">Safety</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Brief title for the incident"
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Description</label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe what happened..."
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Plover Street"
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <Button variant="ghost" size="sm" onClick={() => { setShowForm(false); setFormData({ type: "general", title: "", description: "", location: "" }); }}>
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        if (!formData.title.trim() || !formData.description.trim()) return;
                        const newIncident = {
                          id: `inc-${Date.now()}`,
                          type: formData.type as "security" | "safety" | "maintenance" | "general",
                          title: formData.title,
                          description: formData.description,
                          status: "open" as const,
                          reportedAt: new Date().toISOString(),
                          updatedAt: new Date().toISOString(),
                          reportedBy: "Resident",
                          location: formData.location || "Unspecified",
                          priority: "medium" as const,
                        };
                        addIncident(newIncident);
                        setIncidentList(getIncidents());
                        setShowForm(false);
                        setFormData({ type: "general", title: "", description: "", location: "" });
                      }}
                    >
                      <Send className="mr-2 w-4 h-4" />
                      Submit Report
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}

          <div className="space-y-4">
            {incidentList.map((incident, i) => (
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
                          {new Date(incident.reportedAt).toLocaleDateString('en-US')}
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
            <div className="relative text-center max-w-xl mx-auto">
              <Shield className="w-12 h-12 text-ivory/60 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">See Something? Say Something</h2>
              <p className="text-ivory/70 mb-6">
                Report suspicious activity, maintenance issues, or safety concerns. 
                Your vigilance keeps our community safe.
              </p>
              <Button variant="gold" size="lg" onClick={() => { setShowForm(true); document.getElementById('incident-form')?.scrollIntoView({ behavior: 'smooth' }); }}>
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
