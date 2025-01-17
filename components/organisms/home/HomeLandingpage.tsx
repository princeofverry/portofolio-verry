"use client";

import { Button } from "@/components/ui/button";
import background from "/public/background/background-primary.svg";
import Link from "next/link";

export default function HomeLandingpage() {
  return (
    <>
      <section className="relative w-screen h-screen overflow-hidden">
        <div id="home"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${background.src})` }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/95"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <div className="flex flex-row items-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold ">
              Hello
            </h1>
            <h1 className="md:text-8xl text-4xl animate-rotate-infinity">👋</h1>
          </div>
          <p className="mt-6 text-base lg:text-xl text-gray-300 max-w-2xl">
            I’m <span className="font-bold">Verry Kurniawan.</span> I specialize
            in <span className="font-bold">front-end</span> development,{" "}
            <span className="font-bold">IoT, </span>
            and <span className="font-bold">Machine Learning,</span> with a
            focus on computer vision.
          </p>
          <Link href="https://www.linkedin.com/in/verry-kurniawan/">
            <Button
              variant={"rgb"}
              className="mt-10 text-lg rounded-full shadow-lg transform hover:scale-110  transition-transform text-black"
            >
              Hire me
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
