"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui";
import { getNotices, subscribe } from "@/lib/notice-store";
import { notices as staticNotices } from "@/lib/data";
import { Pin, Bell, AlertTriangle } from "lucide-react";

const iconMap: Record<string, typeof Bell> = {
  announcement: Bell,
  warning: AlertTriangle,
  notice: Bell,
};

export function CommunityNotices() {
  const [noticeList, setNoticeList] = useState(staticNotices);

  useEffect(() => {
    setNoticeList(getNotices());
    const unsub = subscribe(() => setNoticeList(getNotices()));
    return unsub;
  }, []);

  return (
    <section className="py-24 bg-surface-alt">
      <div className="container">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Notices</span>
            <h2 className="text-4xl sm:text-5xl font-bold mt-2">Announcements</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {noticeList.map((notice, i) => {
            const Icon = iconMap[notice.type] || Bell;
            return (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="relative overflow-hidden">
                  {notice.pinned && (
                    <div className="absolute top-4 right-4">
                      <Pin className="w-4 h-4 text-gold" />
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gold/10 text-gold flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold">{notice.title}</h3>
                        {notice.pinned && (
                          <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-gold/10 text-gold">
                            Pinned
                          </span>
                        )}
                      </div>
                      <p className="text-text-secondary text-sm leading-relaxed">{notice.content}</p>
                      <div className="flex items-center gap-3 mt-3 text-xs text-muted">
                        <span>{notice.author}</span>
                        <span>·</span>
                        <span>{notice.createdAt}</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
