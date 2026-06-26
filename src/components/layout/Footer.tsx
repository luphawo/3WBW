"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail } from "lucide-react";

const footerLinks = {
  Community: [
    { href: "/news", label: "News" },
    { href: "/safety", label: "Safety & Security" },
    { href: "/directory", label: "Local Directory" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/gallery", label: "Gallery" },
  ],
  Resources: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/safety#emergency", label: "Emergency Contacts" },
    { href: "/safety#incidents", label: "Report Incident" },
  ],
  Administration: [
    { href: "/admin", label: "Admin Portal" },
    { href: "/about#governance", label: "Governance" },
    { href: "/about#documents", label: "Documents" },
  ],
};

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="relative bg-graphite text-ivory overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-forest/5" aria-hidden="true" />
      <div className="container relative py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6" aria-label="3WBW Threeways Birdwatch — home">
              <div className="w-16 h-16 flex items-center justify-center overflow-hidden">
                <img
                  src="/3wbw-logo.png"
                  alt="3WBW Threeways Birdwatch"
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain invert"
                />
              </div>
            </Link>
            <p className="text-ivory/70 text-sm leading-relaxed max-w-sm mb-6">
              The Threeways Birdwatch security enclosure (encompassing Plover Street, Jacana Street,
              and Kestrel Avenue) operates under the formal authority of the City of Johannesburg,
              under Chapter 7 of the rationalisation Framework.
            </p>
            <address className="not-italic flex flex-col gap-3 text-sm text-ivory/70">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" aria-hidden="true" />
                <span>Bounded by Plover Street, Jacana Street &amp; Kestrel Avenue, Fourways, Sandton</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
                <a href="tel:+27114657890" className="hover:text-gold transition-colors duration-300">
                  +27 11 465 7890
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
                <a href="mailto:info@3waysenclosure.co.za" className="hover:text-gold transition-colors duration-300">
                  info@3waysenclosure.co.za
                </a>
              </div>
            </address>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-bold text-gold mb-4 text-sm uppercase tracking-wider">{title}</h3>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ivory/60 hover:text-gold transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm text-ivory/40">
            © {new Date().getFullYear()} 3 Ways Enclosure. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-ivory/40 hover:text-ivory/70 transition-colors duration-300">
              Privacy Policy
            </Link>
            <div className="flex items-center gap-3">
              {(["Facebook", "Twitter", "Instagram"] as const).map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-gold/20 hover:text-gold transition-all duration-300 text-ivory/60"
                >
                  <span className="text-xs font-bold" aria-hidden="true">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
