"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "@/components/ui";
import { Shield, Users, Trees, Home, MapPin, ScrollText } from "lucide-react";

const stats = [
  { label: "Homes", value: "128", icon: Home },
  { label: "Years Established", value: "15+", icon: ScrollText },
  { label: "Residents", value: "450+", icon: Users },
  { label: "Security", value: "24/7", icon: Shield },
];

const values = [
  {
    title: "Community First",
    description: "We believe in the power of neighbourly connection. Our community thrives on mutual respect, active participation, and shared responsibility.",
    icon: Users,
  },
  {
    title: "Safety & Security",
    description: "Round-the-clock security measures, controlled access points, and a vigilant neighbourhood watch ensure peace of mind for every resident.",
    icon: Shield,
  },
  {
    title: "Green Living",
    description: "Beautiful gardens, tree-lined streets, and communal green spaces create a tranquil suburban oasis within the vibrant Fourways area.",
    icon: Trees,
  },
];

export default function About() {
  return (
    <>
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-graphite to-surface" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">About</span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mt-4 mb-6 text-ivory">
              Our Enclosure
            </h1>
            <p className="text-lg sm:text-xl text-ivory/60 max-w-2xl leading-relaxed">
              A premier residential community nestled in the heart of Fourways, Sandton — 
              where security, tranquillity, and community spirit define everyday life.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-surface-alt">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7 text-gold" />
                </div>
                <p className="text-3xl sm:text-4xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionReveal className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-gold text-sm font-semibold tracking-widest uppercase">History</span>
              <h2 className="text-4xl font-bold mt-2 mb-6">Ref: 1 — A Landmark Enclosure</h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Bounded by Plover Street, Jacana Street, and Kestrel Avenue, the 3 Ways Enclosure 
                  stands as Ref: 1 — the first registered enclosure of its kind under the City of 
                  Johannesburg&apos;s enclosure policy.
                </p>
                <p>
                  Established to enhance security, improve traffic management, and foster a stronger 
                  sense of community, our enclosure has grown to become one of Fourways&apos; most 
                  desirable residential addresses.
                </p>
                <p>
                  Today, 128 homes across three interconnected streets form a vibrant, secure, and 
                  close-knit community that embodies the best of suburban Sandton living.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: "url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop)",
                  }}
                />
              </div>
              <div className="absolute -bottom-6 -left-6 glass-card rounded-2xl p-6 max-w-[200px]">
                <MapPin className="w-5 h-5 text-gold mb-2" />
                <p className="text-sm font-semibold">Fourways, Sandton</p>
                <p className="text-xs text-muted">City of Johannesburg</p>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="py-24 bg-surface-alt">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Our Values</span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-2">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card rounded-2xl p-8"
              >
                <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-text-secondary leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionReveal>
    </>
  );
}
