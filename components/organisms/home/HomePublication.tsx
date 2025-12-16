"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const publications = [
  {
    title:
      "UAV-Based Surveillance for Fire Detection Using YOLOv4-Tiny on Raspberry Pi 4",
    venue: "IEEE Xplore",
    year: "2025",
    url: "https://ieeexplore.ieee.org/document/11232848",
  },
];

export default function HomePublication() {
  return (
    <section className="pad-x py-16 text-white">
      {/* Header */}
      <div className="mb-8 sm:mb-10 max-w-2xl space-y-2">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Publications
        </h2>
        <p className="text-sm sm:text-base text-white/80">
          Selected academic publications and research contributions.
        </p>
      </div>

      {/* List */}
      <div className="grid gap-4 w-full">
        {publications.map((pub, index) => (
          <div
            key={index}
            className="group rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur transition hover:border-white/20 hover:bg-white/10"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              {/* Left */}
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-medium leading-snug">
                  {pub.title}
                </h3>

                <p className="text-xs sm:text-sm text-white/60">
                  {pub.venue} · {pub.year}
                </p>
              </div>

              {/* Right (CTA) */}
              <Link
                href={pub.url}
                target="_blank"
                className="
                  inline-flex items-center gap-1
                  text-sm text-white/70
                  transition
                  group-hover:text-white
                  sm:mt-1
                "
              >
                See details
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
