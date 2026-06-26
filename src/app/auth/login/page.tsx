"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { GlassCard } from "@/components/ui";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-surface via-surface-alt to-surface p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-forest/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
              <span className="text-graphite font-bold text-lg">3W</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-text-secondary mt-2">Sign in to the admin portal</p>
        </div>

        <GlassCard>
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="email"
                  placeholder="admin@3waysenclosure.co.za"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" className="rounded border-border text-forest focus:ring-gold" />
                Remember me
              </label>
              <a href="#" className="text-sm text-forest font-semibold hover:underline">
                Forgot password?
              </a>
            </div>

            <Button variant="primary" size="lg" className="w-full group">
              Sign In
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
        </GlassCard>

        <p className="text-center mt-6 text-sm text-muted">
          Secure admin access. Authorised personnel only.
        </p>
      </motion.div>
    </div>
  );
}
