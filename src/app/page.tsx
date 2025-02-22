"use client";
import React from "react";
import { WavyBackground } from "@/app/components/ui/wavy-background";
import Image from "next/image";
import Navbar from "./components/Navbar";
import { MacbookScroll } from "@/app/components/ui/macbook-scroll";
import Link from "next/link";
import Footer from "./components/Footer";
import FeaturesSection from "./components/FeaturesSection";
export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="homepage-section min-h-[90vh] relative overflow-hidden ">
        {/* <WavyBackground className="w-[100%] h-[100%] flex flex-col items-center justify-center gap-4">
          <p className="text-3xl md:text-5xl lg:text-7xl text-white font-bold inter-var text-center">
            Explore.Learn.Transform
          </p>
          <p className=" text-xl md:text-xl lg:text-2xl font-bold w-1/2 mx-auto text-center">
            Discover InSights, 
          </p>
          <p className=" text-lg md:text-xl lg:text-md w-1/2 mx-auto text-center sm:leading-snug">
          where every idea sparks a journey of understanding. In this space, we transform complex ideas into clear perspectives, inviting you to explore the intersection of knowledge and innovation. Your curiosity finds its home here, where meaningful insights become powerful catalysts for growth and discovery.
          </p>
        </WavyBackground> */}

        <MacbookScroll
          title={
            // <span className="text-4xl">
            //   This Macbook is built with Tailwindcss. <br /> No kidding.
            // </span>
            <>
              <p className="text-3xl md:text-5xl lg:text-7xl text-white font-bold inter-var text-center mb-4">
            Explore.Learn.Transform
            </p>
            {/* <p className=" text-xl md:text-xl lg:text-2xl font-bold w-1/2 mx-auto text-center">
            Discover InSights, 
            </p> */}
          <p className=" text-lg md:text-xl lg:text-md w-1/2 mx-auto text-center sm:leading-snug font-thin">
          Discover InSights,where every idea sparks a journey of understanding. In this space, we transform complex ideas into clear perspectives, inviting you to explore the intersection of knowledge and innovation. Your curiosity finds its home here, where meaningful insights become powerful catalysts for growth and discovery.
          </p>
            </>
          }
          // badge={
          //   <Link href="https://peerlist.io/manuarora">
          //     <Badge className="h-10 w-10 transform -rotate-12" />
          //   </Link>
          // }
          src={`/linear.webp`}
          showGradient={false}
        />
      </section>
      <FeaturesSection/>
      <Footer/>
    </main>
  );
}
