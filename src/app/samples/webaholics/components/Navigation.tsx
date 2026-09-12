"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/samples/webaholics#journey-leads", label: "Websites & Leads" },
  { href: "/samples/webaholics#journey-ecommerce", label: "Ecommerce" },
  { href: "/samples/webaholics#journey-applications", label: "Custom Applications" },
  { href: "https://www.webaholics.ai/portfolio", label: "Our Work" },
  { href: "https://www.webaholics.ai/about", label: "Our Team" },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/samples/webaholics" className="flex items-center gap-2">
          <Image
            src="/Webaholics_text-web-white.png"
            alt="Webaholics"
            width={160}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </Link>

        <div className="hidden xl:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm transition-colors text-neutral-400 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://staging.oneapp.today"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full font-medium text-sm transition-colors border border-white/20 text-white hover:bg-white/10"
          >
            Login
          </a>
          <a
            href="/samples/webaholics#contact"
            className="px-5 py-2.5 rounded-full font-medium text-sm transition-colors bg-white text-[#0a0a0f] hover:bg-neutral-200"
          >
            Let's Talk Growth
          </a>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 text-white"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden border-t border-white/5 bg-[#0a0a0f]"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-neutral-300"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://staging.oneapp.today"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 px-6 rounded-full border border-white/20 text-white font-medium text-center"
              >
                Login
              </a>
              <a
                href="/samples/webaholics#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 px-6 rounded-full bg-white text-[#0a0a0f] font-medium text-center"
              >
                Let's Talk Growth
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

