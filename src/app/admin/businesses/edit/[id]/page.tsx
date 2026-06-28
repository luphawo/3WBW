"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui";
import { GlassCard } from "@/components/ui";
import { businesses } from "@/lib/data";
import { Save, Image as ImageIcon, Star } from "lucide-react";

export default function EditBusiness() {
  const params = useParams();
  const biz = businesses.find((b) => b.id === params.id);

  const [name, setName] = useState(biz?.name ?? "");
  const [category, setCategory] = useState(biz?.category ?? "");
  const [description, setDescription] = useState(biz?.description ?? "");
  const [phone, setPhone] = useState(biz?.phone ?? "");
  const [email, setEmail] = useState(biz?.email ?? "");
  const [website, setWebsite] = useState(biz?.website ?? "");
  const [address, setAddress] = useState(biz?.address ?? "");
  const [hours, setHours] = useState(biz?.hours ?? "");
  const [rating, setRating] = useState(String(biz?.rating ?? "5.0"));
  const [featured, setFeatured] = useState(biz?.featured ?? false);

  if (!biz) {
    return (
      <div className="min-h-screen bg-surface-alt p-6 lg:p-10">
        <div className="max-w-4xl mx-auto text-center py-20">
          <p className="text-lg text-muted">Business not found.</p>
          <Link href="/admin/businesses" className="text-forest font-semibold hover:underline mt-4 inline-block">
            ← Back to Businesses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-alt p-6 lg:p-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link href="/admin/businesses" className="text-sm text-forest font-semibold hover:underline mb-2 block">
                ← Businesses
              </Link>
              <h1 className="text-3xl font-bold">Edit Business</h1>
              <p className="text-text-secondary mt-1">{biz.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="primary" size="sm">
                <Save className="mr-2 w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <GlassCard>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-2">Business Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-lg font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm appearance-none"
                    >
                      <option value="Electrical">Electrical</option>
                      <option value="Gardening">Gardening</option>
                      <option value="Plumbing">Plumbing</option>
                      <option value="Restaurants">Restaurants</option>
                      <option value="Security">Security</option>
                      <option value="Cleaning">Cleaning</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Construction">Construction</option>
                      <option value="Retail">Retail</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Rating (out of 5)</label>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-gold fill-gold" />
                      <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="w-24 px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Description</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm resize-none"
                  />
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <h2 className="text-sm font-semibold mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Website</label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm"
                  />
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-2">Business Hours</label>
                  <input
                    type="text"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Business Image</label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 px-4 py-2.5 rounded-xl bg-surface-alt border border-border text-sm text-muted truncate">
                      {biz.image}
                    </div>
                    <button className="p-2.5 rounded-xl bg-surface-alt border border-border hover:bg-surface transition-colors">
                      <ImageIcon className="w-5 h-5 text-muted" />
                    </button>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="rounded border-border text-forest focus:ring-gold"
                  />
                  Featured business
                </label>
                <span className="text-xs text-muted">Featured businesses appear on the home page</span>
              </div>
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
