"use client";

import { motion } from "framer-motion";
import { SectionReveal, GlassCard } from "@/components/ui";
import { Resident } from "@/types";
import { Quote } from "lucide-react";

interface MeetNeighboursProps {
  residents: Resident[];
}

export function MeetNeighbours({ residents }: MeetNeighboursProps) {
  return (
    <SectionReveal className="py-24">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">Community</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-2">Meet Your Neighbours</h2>
          <p className="text-text-secondary mt-4 max-w-lg mx-auto">
            The people who make our enclosure a wonderful place to call home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {residents.map((resident, i) => (
            <motion.div
              key={resident.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <GlassCard className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-graphite">
                    {resident.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </span>
                </div>
                <h3 className="font-bold text-lg">{resident.name}</h3>
                <p className="text-sm text-muted">
                  {resident.street}
                </p>
                <span
                  className={`inline-block mt-2 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                    resident.role === "admin"
                      ? "bg-forest/10 text-forest"
                      : resident.role === "trustee"
                      ? "bg-gold/10 text-gold"
                      : "bg-blue-100 dark:bg-blue-900/20 text-blue-600"
                  }`}
                >
                  {resident.role}
                </span>
                {resident.bio && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <Quote className="w-4 h-4 text-gold/50 mx-auto mb-2" />
                    <p className="text-sm text-text-secondary italic">&ldquo;{resident.bio}&rdquo;</p>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
