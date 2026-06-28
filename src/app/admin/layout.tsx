"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Image,
  Users,
  Settings,
  Bell,
  ChevronLeft,
  LogOut,
  ExternalLink,
  Store,
  AlertTriangle,
  Megaphone,
  DollarSign,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/articles", label: "Articles", icon: FileText },
  { href: "/admin/alerts", label: "Alerts", icon: Bell },
  { href: "/admin/incidents", label: "Incidents", icon: AlertTriangle },
  { href: "/admin/notices", label: "Notices", icon: Megaphone },
  { href: "/admin/levies", label: "Levies", icon: DollarSign },
  { href: "/admin/media", label: "Media", icon: Image },
  { href: "/admin/businesses", label: "Businesses", icon: Store },
  { href: "/admin/residents", label: "Residents", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex">
      <aside
        className={cn(
          "fixed left-0 top-0 bottom-0 z-40 flex flex-col bg-graphite text-ivory transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          {!collapsed && (
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
                <span className="text-graphite font-bold text-xs">3W</span>
              </div>
              <span className="font-bold text-sm">Admin Panel</span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
          </button>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  collapsed && "justify-center px-2",
                  isActive
                    ? "bg-gold/20 text-gold"
                    : "text-ivory/60 hover:text-ivory hover:bg-white/5"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-2 border-t border-white/10 space-y-1">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-ivory/60 hover:text-ivory hover:bg-white/5 transition-all",
              collapsed && "justify-center px-2"
            )}
          >
            <ExternalLink className="w-5 h-5" />
            {!collapsed && <span>View Site</span>}
          </Link>
          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-ivory/60 hover:text-red-400 hover:bg-red-500/10 transition-all w-full",
              collapsed && "justify-center px-2"
            )}
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <div className={cn("flex-1 transition-all duration-300", collapsed ? "ml-16" : "ml-64")}>
        {children}
      </div>
    </div>
  );
}
