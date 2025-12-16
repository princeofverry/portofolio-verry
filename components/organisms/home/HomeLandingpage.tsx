"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Aurora from "../aurora/Aurora";

export default function Page() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          amplitude={1.0}
          blend={0.6}
          speed={0.5}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between min-h-screen max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-28 md:pt-32 pb-20">
        {/* Left Content */}
        <div className="flex flex-col items-start lg:max-w-2xl mb-12 lg:mb-0">
          <p className="text-muted-foreground text-sm md:text-base mb-4 animate-fade-in-up">
            Welcome to my portfolio
          </p>

          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-3 animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
                Hello
              </h1>
              <span className="text-4xl md:text-6xl animate-wave inline-block">
                👋
              </span>
            </div>

            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold">
              <span className="text-white">I'm </span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Verry Kurniawan
              </span>
            </h2>
          </div>

          <p className="text-base md:text-lg lg:text-xl text-slate-300 mb-4">
            A{" "}
            <span className="text-white font-semibold">
              front-end developer
            </span>{" "}
            specializing in{" "}
            <span className="text-cyan-400 font-semibold">IoT</span> and{" "}
            <span className="text-blue-400 font-semibold">
              Machine Learning
            </span>
            , with a focus on computer vision.
          </p>

          <p className="text-sm md:text-base text-muted-foreground mb-10">
            I craft pixel-perfect interfaces and build intelligent systems that
            bridge the physical and digital worlds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto">
            <Link
              href="https://www.linkedin.com/in/verry-kurniawan/"
              target="_blank"
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 rounded-full hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/50 w-full sm:w-auto"
              >
                Hire me
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="#projects" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-slate-600 hover:border-cyan-400 hover:bg-transparent bg-black/50 backdrop-blur-sm text-white hover:text-cyan-400 px-8 rounded-full hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                View my work
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="https://linkedin.com"
              className="text-slate-400 hover:text-cyan-400"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="https://github.com"
              className="text-slate-400 hover:text-cyan-400"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="mailto:vexykrwn@gmail.com"
              className="text-slate-400 hover:text-cyan-400"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative w-full max-w-lg lg:max-w-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-blue-500/30 to-purple-600/30 rounded-3xl lg:rounded-full blur-3xl" />
          <Image
            src="/images/me.JPG"
            alt="Verry Kurniawan"
            width={500}
            height={500}
            className="relative rounded-3xl border-4 border-transparent shadow-2xl object-cover aspect-square"
            priority
          />
        </div>
      </div>
    </main>
  );
}
