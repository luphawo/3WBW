"use client";

import { SectionReveal, GlassCard } from "@/components/ui";
import { Button } from "@/components/ui";
import { MessageCircle, QrCode, ArrowRight } from "lucide-react";

export function WhatsAppAccess() {
  return (
    <SectionReveal className="py-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest to-forest-light p-8 md:p-16">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-gold text-sm font-semibold tracking-widest uppercase">Stay Connected</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
                Join Our WhatsApp Community
              </h2>
              <p className="text-ivory/70 mb-6 leading-relaxed">
                Get real-time updates, security alerts, community news, and connect with your neighbours 
                directly through our dedicated WhatsApp community group.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="gold" size="lg" className="group">
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Join Now
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white border border-white/20 hover:bg-white/10"
                  aria-label="Scan QR code to join the 3 Ways Enclosure WhatsApp community group"
                >
                  <QrCode className="mr-2 w-5 h-5" aria-hidden="true" />
                  Scan QR Code
                </Button>
              </div>
            </div>

            <div className="hidden md:flex items-center justify-center">
              <div className="w-48 h-48 rounded-2xl bg-white p-4">
                <div className="w-full h-full bg-gradient-to-br from-gold to-gold-light rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-16 h-16 text-graphite" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
