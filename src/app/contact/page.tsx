"use client";

import { motion } from "framer-motion";
import { SectionReveal, GlassCard } from "@/components/ui";
import { Button } from "@/components/ui";
import { PageHeader } from "@/components/layout/PageHeader";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function Contact() {
  return (
    <>
      <PageHeader
        label="Contact"
        title="Get in Touch"
        description="Have a question, suggestion, or need assistance? We're here to help."
      />

      <SectionReveal className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <GlassCard className="text-center">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-bold mb-2">Address</h3>
              <p className="text-sm text-text-secondary">
                Threeways Birdwatch<br />
                Bounded by Plover Street,<br />
                Jacana Street &amp; Kestrel Avenue<br />
                Fourways, Sandton
              </p>
            </GlassCard>

            <GlassCard className="text-center">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-bold mb-2">Phone</h3>
              <p className="text-sm text-text-secondary">
                Office: +27 11 465 7890<br />
                CoJ Emergency: 011 375 591<br />
                Security: 086 111 4021<br />
                Emergency: 10111
              </p>
            </GlassCard>

            <GlassCard className="text-center">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-bold mb-2">Email</h3>
              <p className="text-sm text-text-secondary space-y-1">
                <a href="mailto:billing@threewaysbirdwatch.org.za" className="block hover:text-forest transition-colors">billing@threewaysbirdwatch.org.za</a>
                <a href="mailto:chairperson@threewaysbirdwatch.org.za" className="block hover:text-forest transition-colors">chairperson@threewaysbirdwatch.org.za</a>
                <a href="mailto:compliance@threewaysbirdwatch.org.za" className="block hover:text-forest transition-colors">compliance@threewaysbirdwatch.org.za</a>
                <a href="mailto:secretary@threewaysbirdwatch.org.za" className="block hover:text-forest transition-colors">secretary@threewaysbirdwatch.org.za</a>
                <a href="mailto:support@threewaysbirdwatch.org.za" className="block hover:text-forest transition-colors">support@threewaysbirdwatch.org.za</a>
              </p>
            </GlassCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Send Us a Message</h2>
              <p className="text-text-secondary mb-8">
                We typically respond within 24 hours during business days.
              </p>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm"
                  />
                </div>
                <select className="w-full px-4 py-3 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm appearance-none">
                  <option>General Inquiry</option>
                  <option>Security Concern</option>
                  <option>Maintenance Request</option>
                  <option>Community Event</option>
                  <option>Business Directory</option>
                  <option>Media Request</option>
                  <option>Other</option>
                </select>
                <textarea
                  rows={5}
                  placeholder="Your Message"
                  className="w-full px-4 py-3 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm resize-none"
                />
                <Button variant="primary" size="lg" className="w-full">
                  <Send className="mr-2 w-4 h-4" />
                  Send Message
                </Button>
              </form>
            </div>

            <div>
              <div className="rounded-3xl overflow-hidden h-[400px] bg-surface-alt mb-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3584.5!2d28.001969!3d-26.032488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDAwJzAwLjAiUyAyOMKwMDAnMDAuMCJF!5e0!3m2!1sen!2sza!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Map of Fourways, Sandton"
                />
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>
    </>
  );
}
