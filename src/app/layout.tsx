import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Threeways Birdwatch Community Enclosure",
    template: "%s — Threeways Birdwatch Community Enclosure",
  },
  description:
    "A premium residential enclosure in Fourways, Sandton. Community news, security updates, local directory, and neighbourhood engagement for the enclosure bounded by Plover Street, Jacana Street, and Kestrel Avenue.",
  keywords: [
    "Threeways Birdwatch",
    "Fourways",
    "Sandton",
    "Johannesburg",
    "community",
    "residential estate",
    "security",
    "neighbourhood",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} min-h-screen flex flex-col antialiased font-sans`}>
        <Navbar />
        <main id="main-content" className="flex-1 pt-[120px]" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
