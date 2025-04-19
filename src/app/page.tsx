// "use client";
// import React from "react";
// // import { WavyBackground } from "@/app/components/ui/wavy-background";
// // import Image from "next/image";
// import Navbar from "./components/Navbar";
// import { MacbookScroll } from "@/app/components/ui/macbook-scroll";
// // import Link from "next/link";
// import Footer from "./components/Footer";
// import FeaturesSection from "./components/FeaturesSection";
// import { AnimatedTestimonialsDemo } from "@/app/components/Testimonials";
// import { WavyBackground } from "./components/ui/wavy-background";
// export default function Home() {
//   return (
//     <main className="min-h-screen">
//       <Navbar />
//       <section className="homepage-section min-h-[90vh] relative overflow-hidden ">
//         <div className="block md:hidden">
//         <WavyBackground className="w-[100%] h-[100%] flex flex-col items-center justify-center gap-4">
//           <p className="text-3xl md:text-5xl lg:text-7xl text-white font-bold inter-var text-center">
//             Explore.Learn.Transform
//           </p>
//           <p className=" text-xl md:text-xl lg:text-2xl font-bold w-1/2 mx-auto text-center">
//             Discover InSights, 
//           </p>
//           <p className=" text-lg md:text-xl lg:text-md w-1/2 mx-auto text-center sm:leading-snug">
//           where every idea sparks a journey of understanding. In this space, we transform complex ideas into clear perspectives, inviting you to explore the intersection of knowledge and innovation. Your curiosity finds its home here, where meaningful insights become powerful catalysts for growth and discovery.
//           </p>
//         </WavyBackground>
//         </div>
        

//         <div className="hidden md:block">
//         <MacbookScroll
//           title={
//             // <span className="text-4xl">
//             //   This Macbook is built with Tailwindcss. <br /> No kidding.
//             // </span>
//             <>
//               <p className="text-3xl md:text-5xl lg:text-7xl dark:text-white text-black font-bold inter-var text-center mb-4">
//             Explore.Learn.Transform
//             </p>
//             {/* <p className=" text-xl md:text-xl lg:text-2xl font-bold w-1/2 mx-auto text-center">
//             Discover InSights, 
//             </p> */}
//           <p className=" text-lg md:text-xl lg:text-md w-1/2 mx-auto text-center sm:leading-snug font-thin">
//           Discover InSights,where every idea sparks a journey of understanding. In this space, we transform complex ideas into clear perspectives, inviting you to explore the intersection of knowledge and innovation. Your curiosity finds its home here, where meaningful insights become powerful catalysts for growth and discovery.
//           </p>
//             </>
//           }
//           // badge={
//           //   <Link href="https://peerlist.io/manuarora">
//           //     <Badge className="h-10 w-10 transform -rotate-12" />
//           //   </Link>
//           // }
//           src={`/linear.webp`}
//           showGradient={false}
//         />
//         </div>
//       </section>
//       <FeaturesSection/>
//       <section>
//         <h2 className="text-3xl md:text-5xl lg:text-6xl text-white font-bold tracking-tight text-center">
//           Testimonials
//         </h2>
//       <AnimatedTestimonialsDemo/>
//       </section>
//       <Footer/>
//     </main>
//   );
// }


"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { MacbookScroll } from "@/app/components/ui/macbook-scroll";
import Footer from "./components/Footer";
import FeaturesSection from "./components/FeaturesSection";
import { AnimatedTestimonialsDemo } from "@/app/components/Testimonials";
import { WavyBackground } from "./components/ui/wavy-background";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    checkScreenSize();

    // Update on resize
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="homepage-section min-h-[90vh] relative overflow-hidden px-4 sm:px-6 md:px-8">
        {/* Mobile Version */}
        {/* <div className="block md:hidden">
          <WavyBackground className="w-full h-full flex flex-col items-center justify-center gap-4 py-12">
            <p className="text-2xl sm:text-3xl font-bold text-white text-center leading-snug">
              Explore. Learn. Transform
            </p>
            <p className="text-base sm:text-lg font-semibold text-white text-center max-w-md">
              Discover InSights,
            </p>
            <p className="text-sm sm:text-base text-white text-center max-w-md font-light leading-relaxed">
              where every idea sparks a journey of understanding. In this space,
              we transform complex ideas into clear perspectives, inviting you
              to explore the intersection of knowledge and innovation. Your
              curiosity finds its home here, where meaningful insights become
              powerful catalysts for growth and discovery.
            </p>
          </WavyBackground>
        </div> */}

        {/* Mobile Version */}
        {isMobile && (
          <div className="w-full h-screen flex items-center justify-center">
            <WavyBackground className="w-full h-full flex flex-col items-center gap-6 py-12 px-4">
              <div className="text-white text-center mt-20">
                <h1 className="text-6xl sm:text-6xl font-extrabold leading-tighter">
                  Explore<br />
                  Learn<br />
                  Transform
                </h1>
              </div>
              <p className="text-2xl sm:text-2xl text-white text-center max-w-md font-normal leading-tighter mt-4 sm:leading-tighter">
                Discover InSights, where every idea sparks a journey of
                understanding. In this space, we transform complex ideas into
                clear perspectives, inviting you to explore the intersection of
                knowledge and innovation.
              </p>
            </WavyBackground>
          </div>
        )}

        {/* Desktop Version */}
        {!isMobile && (
          <div>
            <MacbookScroll
              title={
                <>
                  <p className="text-3xl md:text-5xl lg:text-6xl font-bold inter-var text-center mb-4 dark:text-white text-black">
                    Explore. Learn. Transform
                  </p>
                  <p className="text-base md:text-lg lg:text-xl text-center font-light max-w-xl mx-auto leading-relaxed text-gray-700 dark:text-gray-300">
                    Discover InSights, where every idea sparks a journey of
                    understanding. In this space, we transform complex ideas
                    into clear perspectives, inviting you to explore the
                    intersection of knowledge and innovation. Your curiosity
                    finds its home here, where meaningful insights become
                    powerful catalysts for growth and discovery.
                  </p>
                </>
              }
              src={`/linear.webp`}
              showGradient={false}
            />
          </div>
        )}
      </section>

        <section id="features">

      <FeaturesSection />
        </section>

      <section id="testimonials" className="py-16 px-4 sm:px-6 md:px-8 bg-black overflow-hidden">
        <h2 className="text-3xl md:text-5xl lg:text-6xl text-white font-bold tracking-tight text-center mb-8">
          Testimonials
        </h2>
        <AnimatedTestimonialsDemo />
      </section>

        <section id="footer" > 

      <Footer />
        </section>
    </main>
  );
}

