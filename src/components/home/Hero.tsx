"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Shield, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui";
import Link from "next/link";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, 200]);
  const textY = useTransform(scrollYProgress, [0, 0.8], [0, 100]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX - window.innerWidth / 2) * 0.02);
      mouseY.set((e.clientY - window.innerHeight / 2) * 0.02);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div style={{ opacity, scale }} className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/hero/gate-entrance.webp)",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl animate-glow"
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-forest/10 rounded-full blur-3xl animate-glow"
        style={{ animationDelay: "1.5s" } as React.CSSProperties}
      />

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-30 container h-full flex flex-col justify-center"
      >
        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight text-ivory mb-6"
          >
            Connected Living
            <br />
            <span className="text-gradient">in the Heart</span>
            <br />
            of Fourways
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl text-ivory/70 max-w-xl mb-10 leading-relaxed"
          >
            The Threeways Birdwatch security enclosure (encompassing Plover Street, Jacana Street,
            and Kestrel Avenue) operates under the formal authority of the City of Johannesburg,
            under Chapter 7 of the rationalisation Framework.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/news">
              <Button variant="gold" size="lg" className="group">
                Latest Updates
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="text-ivory border-ivory/30 hover:bg-ivory/10">
                Contact Us
              </Button>
            </Link>
            <Link href="/safety?report=true">
              <Button variant="ghost" size="lg" className="text-ivory/70 hover:text-ivory">
                <Shield className="mr-2 w-5 h-5" />
                Report an Issue
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex items-center gap-8 mt-16"
          >
            <div className="flex items-center gap-3 text-ivory/60">
              <Users className="w-5 h-5 text-gold" />
              <span className="text-sm">72 Homes</span>
            </div>
            <div className="flex items-center gap-3 text-ivory/60">
              <Shield className="w-5 h-5 text-gold" />
              <span className="text-sm">24/7 Security</span>
            </div>
            <div className="flex items-center gap-3 text-ivory/60">
              <MapPin className="w-5 h-5 text-gold" />
              <span className="text-sm">Fourways, Sandton</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-ivory/30 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-3 rounded-full bg-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
