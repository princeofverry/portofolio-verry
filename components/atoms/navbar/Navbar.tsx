"use client";

import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50
  bg-black
  bg-opacity-0
  backdrop-blur-0
  border-b border-transparent
  transition-[padding,background-color,backdrop-filter] duration-300
  ${scrolled ? "py-3 bg-opacity-60 backdrop-blur-xl border-white/5" : "py-5"}
`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <Link href="#" className="relative z-10 group">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                Verry
              </h1>
            </Link>

            {/* Desktop Navigation - Center Menu Items */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, i) => (
                <Link key={i} href={item.href}>
                  <Button
                    variant="ghost"
                    className="relative px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>

            {/* Desktop Right Side - Language & CTA */}
            <div className="hidden md:flex items-center gap-3">
              {/* Language Selector */}
              <Button
                variant="ghost"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <Globe className="h-4 w-4" />
                <span>English</span>
              </Button>

              {/* CTA Button */}
              <Link href="#contact">
                <Button className="relative px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-cyan-500/25">
                  Let's Connect
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative z-10 p-2 text-white hover:text-cyan-400 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Top gradient overlay - only visible when not scrolled */}
        {!scrolled && (
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 via-black/30 to-transparent pointer-events-none"></div>
        )}
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Menu Content */}
          <div className="relative z-50 flex flex-col items-center justify-center min-h-screen px-8">
            <div className="flex flex-col gap-8 w-full max-w-xs">
              {/* Menu Items */}
              {navItems.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-semibold text-white hover:text-cyan-400 transition-colors text-center py-2 border-b border-white/10 hover:border-cyan-400/50"
                >
                  {item.name}
                </Link>
              ))}

              {/* Language Selector */}
              <button className="flex items-center justify-center gap-3 text-lg font-medium text-slate-300 hover:text-white transition-colors py-2">
                <Globe className="h-5 w-5" />
                <span>English</span>
              </button>

              {/* CTA Button */}
              <Link href="#contact" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full py-6 text-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-cyan-500/25">
                  Let's Connect
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
