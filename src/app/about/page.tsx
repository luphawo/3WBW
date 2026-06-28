"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "@/components/ui";
import { PageHeader } from "@/components/layout/PageHeader";
import { Shield, Users, Trees, Home, ScrollText, Gauge, Key, PawPrint, Volume2, Trash2, TreePine, Fence, Banknote } from "lucide-react";

const stats = [
  { label: "Homes", value: "71", icon: Home },
  { label: "Years Established", value: "27", icon: ScrollText },
  { label: "Security", value: "24/7", icon: Shield },
];

const rules = [
  {
    title: "Speed Limit — 40 km/h",
    description: "A strict 40 km/h speed limit applies on all streets within the enclosure. Speed bumps are installed on Plover, Jacana, and Kestrel Streets to enforce compliance.",
    icon: Gauge,
  },
  {
    title: "Access Control",
    description: "All vehicles must enter and exit via the designated boom gates. Remote controls are issued to residents — lost remotes must be reported immediately for security reprogramming.",
    icon: Key,
  },
  {
    title: "Pet Control",
    description: "Dogs must be leashed when outside your property. Owners are responsible for cleaning up after their pets. No aggressive breeds are permitted in common areas without a muzzle.",
    icon: PawPrint,
  },
  {
    title: "Noise & Nuisance",
    description: "Quiet hours are observed between 22:00 and 07:00. Power tools and loud music should be confined to daytime hours. Persistent noise complaints are referred to the Compliance Officer.",
    icon: Volume2,
  },
  {
    title: "Refuse & Recycling Removal",
    description: "Refuse and Recycling are collected on Monday and Tuesday mornings, respectively. Empty refuse bins must be collected as soon as possible.",
    icon: Trash2,
  },
  {
    title: "Verge Maintenance",
    description: "Residents are responsible for maintaining the verge (pavement) in front of their properties, including grass cutting, weeding, and keeping it free of litter.",
    icon: Trees,
  },
  {
    title: "Street Trees",
    description: "Street trees are managed by City Parks. Residents may request pruning or report damaged trees via the Jhb Roads Agency. Do not remove or trim trees without approval.",
    icon: TreePine,
  },
  {
    title: "Pedestrian Gate",
    description: "The pedestrian gates are open 06:00–18:00 daily.",
    icon: Fence,
  },
  {
    title: "Levies",
    description: "The monthly levy is R1,150 per household, payable by debit order or EFT.",
    icon: Banknote,
  },
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
      <PageHeader
        label="About"
        title="Our Enclosure"
        description="Tranquil Living in the Heart of Fourways. Threeways Birdwatch security enclosure (encompassing Plover Street, Jacana Street, and Kestrel Avenue) is a residential community nestled in the heart of Fourways, Sandton — where security, tranquillity, and community spirit define everyday life."
      />

      <section className="py-20 bg-surface-alt">
        <div className="px-6 sm:px-10 max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-12 sm:gap-20">
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
              <span className="text-gold text-sm font-semibold tracking-widest uppercase">Community</span>
              <h2 className="text-4xl font-bold mt-2 mb-6">Ref: 1 — A Landmark Enclosure</h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Bounded by Plover Street, Jacana Street, and Kestrel Avenue, the enclosure has been in operation since 1998 and was officially issued with Ref No. 1 — the first registered enclosure of its kind under the City of Johannesburg&apos;s enclosure policy.
                </p>
                <p>
                  Our enclosure has been registered as an NPC with duly appointed directors, who ensure that governance is upheld e.g., annual general meetings.
                </p>
                <p>
                  Today, 71 homes across three interconnected streets form a vibrant, secure, and close-knit community that embodies the best of suburban Sandton living.
                </p>
                <p>
                  We have an automated boom system, and are privileged to have a permanent vehicle, with armed guard, patrolling our three streets, 24/7, together with 14 cameras, which are linked to an off-site surveillance team. This level of security comes at a huge cost, hence the monthly levies that residents contribute.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: "url(/hero/gate-entrance.webp)",
                  }}
                />
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

      <SectionReveal className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Our Rules</span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-2">Enclosure Guidelines</h2>
            <p className="text-text-secondary text-lg mt-4 max-w-2xl mx-auto">
              Rules, by-laws, and guidelines that keep our enclosure safe, clean, and harmonious for all residents.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rules.map((rule, i) => (
              <motion.div
                key={rule.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 mt-1">
                    <rule.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">{rule.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{rule.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionReveal>
    </>
  );
}
