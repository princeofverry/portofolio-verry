"use client";

import { useState, type MouseEvent, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NAVIGATION_LINKS } from "@/data/data";
import Link from "next/link";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveSection(href);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offset = -85;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY + offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 pad-x pt-6">
      {/* Desktop Menu */}
      <div
        className={`mx-auto hidden max-w-4xl items-center justify-between rounded-2xl border border-white/10 bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-slate-900/80 px-6 shadow-2xl backdrop-blur-xl lg:flex
          ${
            mounted
              ? "animate-in fade-in slide-in-from-top-4 duration-700"
              : "opacity-0"
          }
          ${
            scrolled
              ? "py-3 shadow-slate-900/50 scale-[0.98] border-white/20"
              : "py-4 scale-100"
          }
          transition-all duration-500 ease-out`}
      >
        <a
          href="#"
          className="group relative text-2xl font-bold"
          onClick={(e) => handleLinkClick(e, "#home")}
        >
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-purple-600 group-hover:via-blue-500 group-hover:to-cyan-400">
            Verry
          </span>
          <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-cyan-400 to-purple-600 transition-all duration-300 group-hover:w-full"></div>
        </a>

        <ul className="flex items-center gap-2">
          {NAVIGATION_LINKS.map((item, index) => (
            <li key={index}>
              <a
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  activeSection === item.href
                    ? "text-cyan-400"
                    : "text-slate-300 hover:text-white"
                }`}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
              >
                <span className="relative z-10">{item.label}</span>
                {activeSection === item.href && (
                  <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-600/20 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-300"></span>
                )}
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/0 to-purple-600/0 opacity-0 transition-all duration-300 hover:from-cyan-500/10 hover:to-purple-600/10 hover:opacity-100"></span>
              </a>
            </li>
          ))}
        </ul>

        <button className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-105 active:scale-95">
          <Link
            href={
              "https://drive.google.com/file/d/15dRcYrE5MS761QplxvjjLEnVN9reinnC/view?usp=sharing"
            }
          >
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          </Link>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 shadow-2xl backdrop-blur-xl lg:hidden
          ${
            mounted
              ? "animate-in fade-in slide-in-from-top-4 duration-700"
              : "opacity-0"
          }
          ${
            scrolled
              ? "shadow-slate-900/50 scale-[0.98] border-white/20"
              : "scale-100"
          }
          transition-all duration-500 ease-out`}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <a
            href="#"
            className="group relative text-xl font-bold"
            onClick={(e) => handleLinkClick(e, "#home")}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Verry
            </span>
          </a>
          <button
            className="relative rounded-lg p-2 text-white transition-all duration-300 hover:bg-white/10 focus:outline-none active:scale-90"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 animate-in spin-in-90 duration-300" />
            ) : (
              <Menu className="h-6 w-6 animate-in spin-in-90 duration-300" />
            )}
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-1 px-3 pb-4">
            {NAVIGATION_LINKS.map((item, index) => (
              <li
                key={index}
                className={`${
                  isMobileMenuOpen
                    ? "animate-in slide-in-from-left-4 fade-in"
                    : ""
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animationDuration: "400ms",
                }}
              >
                <a
                  className={`block rounded-lg px-4 py-3 text-base font-medium transition-all duration-300 ${
                    activeSection === item.href
                      ? "bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-cyan-400"
                      : "text-slate-300 hover:bg-white/5 hover:text-white active:scale-95"
                  }`}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li
              className={`mt-2 px-4 ${
                isMobileMenuOpen
                  ? "animate-in slide-in-from-left-4 fade-in"
                  : ""
              }`}
              style={{
                animationDelay: `${NAVIGATION_LINKS.length * 50}ms`,
                animationDuration: "400ms",
              }}
            >
              <button className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/40 active:scale-95">
                Get Started
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
