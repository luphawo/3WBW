"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { GlassCard } from "@/components/ui";
import { getResident, updateResident } from "@/lib/resident-store";
import { Save, ArrowLeft } from "lucide-react";

export default function EditResident() {
  const params = useParams();
  const router = useRouter();
  const resident = getResident(params.id as string);

  const [name, setName] = useState(resident?.name ?? "");
  const [street, setStreet] = useState(resident?.street ?? "");
  const [role, setRole] = useState<"resident" | "trustee" | "admin">(resident?.role ?? "resident");
  const [bio, setBio] = useState(resident?.bio ?? "");
  const [verified, setVerified] = useState(resident?.verified ?? true);

  const handleSave = () => {
    if (!resident || !name.trim()) return;
    updateResident(resident.id, { name: name.trim(), street, role, bio: bio.trim(), verified });
    router.push("/admin/residents");
  };

  if (!resident) {
    return (
      <div className="min-h-screen bg-surface-alt p-6 lg:p-10">
        <div className="max-w-4xl mx-auto text-center py-20">
          <p className="text-lg text-muted">Resident not found.</p>
          <Link href="/admin/residents" className="text-forest font-semibold hover:underline mt-4 inline-block">
            ← Back to Residents
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
              <Link href="/admin/residents" className="text-sm text-forest font-semibold hover:underline mb-2 block">
                ← Residents
              </Link>
              <h1 className="text-3xl font-bold">Edit Resident</h1>
              <p className="text-text-secondary mt-1">{resident.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="primary" size="sm" onClick={handleSave}>
                <Save className="mr-2 w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <GlassCard>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-2">Family Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-lg font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Street</label>
                    <select
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm appearance-none"
                    >
                      <option value="Plover Street">Plover Street</option>
                      <option value="Jacana Street">Jacana Street</option>
                      <option value="Kestrel Avenue">Kestrel Avenue</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Role</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as "resident" | "trustee" | "admin")}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm appearance-none"
                    >
                      <option value="resident">Resident</option>
                      <option value="trustee">Trustee</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Verified</label>
                    <div className="flex items-center gap-2 h-[42px]">
                      <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={verified}
                          onChange={(e) => setVerified(e.target.checked)}
                          className="rounded border-border text-forest focus:ring-gold"
                        />
                        Mark as verified
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Bio</label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-alt border border-border focus:outline-none focus:ring-2 focus:ring-gold/30 text-sm resize-none"
                  />
                </div>
              </div>
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
