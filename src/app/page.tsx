// "use client";
import React from "react";
import { WavyBackground } from "@/app/components/ui/wavy-background";
import Image from "next/image";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="homepage-section h-[90vh] relative overflow-hidden ">
        <WavyBackground className="w-[100%] h-[100%] flex flex-col items-center justify-center gap-4">
          <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
            Explore.Learn.Transform
          </p>
          <p className=" text-lg md:text-xl lg:text-md w-1/2 mx-auto text-center">
          Discover InSights, where every idea sparks a journey of understanding. In this space, we transform complex ideas into clear perspectives, inviting you to explore the intersection of knowledge and innovation. Your curiosity finds its home here, where meaningful insights become powerful catalysts for growth and discovery.
          </p>
        </WavyBackground>
      </section>
    </main>
  );
}
