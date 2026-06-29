"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, Bell } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/news", label: "News" },
  { href: "/safety", label: "Safety" },
  { href: "/directory", label: "Directory" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (isAdmin) return null;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-forest focus:text-ivory focus:rounded-lg focus:text-sm focus:font-semibold focus:shadow-lg"
      >
        Skip to main content
      </a>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        aria-label="Main navigation"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white",
          scrolled && "shadow-sm"
        )}
      >
        <div className="container flex items-center justify-between h-[120px]">
          <Link href="/" className="flex items-center gap-3 group" aria-label="3WBW Threeways Birdwatch — home">
            <div className="w-[90px] h-[90px] sm:w-[115px] sm:h-[115px] flex items-center justify-center overflow-hidden">
              <img
                src="/3wbw-logo.png"
                alt="3WBW Threeways Birdwatch"
                width={115}
                height={115}
                className="w-[90px] h-[90px] sm:w-[115px] sm:h-[115px] object-contain"
              />
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={cn(
                  "relative px-4 py-2 text-[18px] font-medium rounded-lg transition-colors duration-300",
                  pathname === link.href
                    ? "text-forest"
                    : "text-black hover:text-forest"
                )}
              >
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 bg-forest/10 rounded-lg"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              aria-label="Notifications"
              className="relative p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <Bell className="w-5 h-5" aria-hidden="true" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold rounded-full" aria-hidden="true" />
            </button>
            <Link
              href="/admin"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-forest text-ivory rounded-xl text-sm font-semibold hover:bg-forest-light transition-all duration-300 shadow-lg shadow-forest/20"
            >
              Admin Portal
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              className="lg:hidden p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <div className="absolute right-0 top-0 bottom-0 w-[300px] bg-surface dark:bg-graphite p-8 pt-[132px] shadow-2xl">
              <nav aria-label="Mobile navigation">
                <ul className="flex flex-col gap-2">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        aria-current={pathname === link.href ? "page" : undefined}
                        className={cn(
                          "block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300",
                          pathname === link.href
                            ? "bg-forest/10 text-forest"
                            : "text-text-secondary hover:text-text hover:bg-black/5 dark:hover:bg-white/5"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                  <li className="mt-4 pt-4 border-t border-border">
                    <Link
                      href="/admin"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-forest text-ivory font-semibold"
                    >
                      Admin Portal
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
