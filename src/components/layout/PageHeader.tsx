"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  label: string;
  title: string;
  description: string;
}

export function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/gallery/DSC05482.webp)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/60 to-graphite/30" />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">{label}</span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mt-4 mb-6 text-ivory">{title}</h1>
          <p className="text-lg sm:text-xl text-ivory/60 max-w-2xl leading-relaxed">{description}</p>
        </motion.div>
      </div>
    </section>
  );
}
