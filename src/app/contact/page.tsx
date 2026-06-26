"use client";

import { motion } from "framer-motion";
import { SectionReveal, GlassCard } from "@/components/ui";
import { Button } from "@/components/ui";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";

export default function Contact() {
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
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Contact</span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mt-4 mb-6 text-ivory">
              Get in Touch
            </h1>
            <p className="text-lg text-ivory/60 max-w-xl">
              Have a question, suggestion, or need assistance? We&apos;re here to help.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionReveal className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <GlassCard className="text-center">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-bold mb-2">Address</h3>
              <p className="text-sm text-text-secondary">
                3 Ways Enclosure<br />
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
                Security: 082 555 0199<br />
                Emergency: 10111
              </p>
            </GlassCard>

            <GlassCard className="text-center">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-bold mb-2">Email</h3>
              <p className="text-sm text-text-secondary">
                info@3waysenclosure.co.za<br />
                security@3waysenclosure.co.za<br />
                admin@3waysenclosure.co.za
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3584.5!2d28.0!3d-26.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDAwJzAwLjAiUyAyOMKwMDAnMDAuMCJF!5e0!3m2!1sen!2sza!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Map of Fourways, Sandton"
                />
              </div>

              <GlassCard>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/20 text-green-600">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Join Our WhatsApp Group</h3>
                    <p className="text-sm text-text-secondary mb-4">
                      Get real-time updates, security alerts, and connect with neighbours.
                    </p>
                    <Button variant="primary" size="sm">
                      <MessageCircle className="mr-2 w-4 h-4" />
                      Join Community Chat
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </SectionReveal>
    </>
  );
}
