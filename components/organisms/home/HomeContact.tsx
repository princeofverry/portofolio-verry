"use client";

import { Mail, Linkedin, Github, Instagram } from "lucide-react";
import { socialLinks, marqueeTexts } from "@/data/data";
import Link from "next/link";

const HomeContact = () => {
  const iconMap = {
    Instagram,
    Linkedin,
    Github,
    Mail,
  };

  return (
    <div id="contact" className="relative w-full max-w-4xl mx-auto px-4 pb-4">
      {/* Background Gradient Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Main Content */}
      <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header with Marquee */}
        <div className="space-y-4">
          <div className="relative overflow-hidden py-4">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...marqueeTexts, ...marqueeTexts].map((text, index) => (
                <h2 key={index} className="text-5xl md:text-6xl font-bold mx-8">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                    {text}
                  </span>
                </h2>
              ))}
            </div>
          </div>
          <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            I'm always interested in new opportunities in software engineering,
            data science, and machine learning. Whether it's an internship,
            research collaboration, or project work, I'd love to connect.
          </p>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center gap-4 py-8">
          {socialLinks.map((social, index) => {
            const IconComponent = iconMap[social.icon as keyof typeof iconMap];
            return (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="group relative flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:scale-110 active:scale-95 animate-in fade-in zoom-in-50"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationDuration: "500ms",
                }}
              >
                <IconComponent className="h-6 w-6 text-slate-400 transition-colors duration-300 group-hover:text-cyan-400 relative z-10" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 to-purple-600/0 opacity-0 transition-all duration-300 group-hover:from-cyan-500/20 group-hover:to-purple-600/20 group-hover:opacity-100" />
              </a>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href={socialLinks.find((link) => link.icon === "Mail")?.href || "#"}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            <span className="relative z-10">Get in Touch</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>

          <Link
            href={
              socialLinks.find((link) => link.icon === "Linkedin")?.href || "#"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:border-white/20 hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            <span className="relative z-10">Connect LinkedIn</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-purple-600/0 opacity-0 transition-all duration-300 group-hover:from-cyan-500/10 group-hover:to-purple-600/10 group-hover:opacity-100" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeContact;
