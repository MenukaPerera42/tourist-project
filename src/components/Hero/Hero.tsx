"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import TripPlanner from "../TripPlanner";
import Destinations from "../Destinations";

export default function Hero() {
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rockRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax: Rock sinks into the clouds as you scroll
  const yRock = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacityRock = useTransform(scrollYProgress, [0, 0.6], [1, 0.7]);
  const textScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  useEffect(() => {
    // Entrance: Rock rises from deep below
    gsap.fromTo(rockRef.current, 
      { y: 800, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 2.2, ease: "expo.out", delay: 0.2 }
    );

    // Floating Clouds
    gsap.to(".cloud-float", {
      xPercent: 5,
      y: -20,
      duration: 25,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="relative bg-[#f4f7f4]">
      <TripPlanner isOpen={isPlannerOpen} onClose={() => setIsPlannerOpen(false)} />

      <section className="relative h-[115vh] w-full overflow-hidden">
        {/* Deep Background */}
        <div className="absolute inset-0 z-0 scale-105">
          <Image
            src="/images/background.png"
            alt="Sri Lanka"
            fill
            className="object-cover object-top brightness-105"
            priority
          />
        </div>

        {/* Minimalist Nav */}
        <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-12">
          <div className="text-2xl font-black tracking-tighter text-[#0b2a2a] cursor-pointer">LOGO</div>
          <div className="hidden gap-12 text-[10px] font-black tracking-[0.4em] text-[#0b2a2a]/60 md:flex">
            {["HOME", "DESTINATIONS", "EXPERIENCES", "ABOUT", "CONTACT"].map((link) => (
              <button 
                key={link} 
                onClick={() => link === 'DESTINATIONS' ? scrollToSection('destinations') : null}
                className="hover:text-black transition-colors"
              >
                {link}
              </button>
            ))}
          </div>
        </nav>

        {/* Creative Editorial Header */}
        <motion.div 
          style={{ scale: textScale }}
          className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-start pt-48 px-12"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "circOut" }}
          >
            <h1 className="text-7xl font-black tracking-tighter text-[#0b2a2a] md:text-[100px] leading-[0.85]">
              PLAN YOUR <br /> 
              <span className="italic opacity-20 font-serif">PERFECT</span> <br />
              SRI LANKA TRIP
            </h1>
            <div className="mt-10 flex items-center gap-6">
               <div className="h-[1px] w-32 bg-[#0b2a2a]/20" />
               <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-[#0b2a2a]/40">
                 IN MINUTES, NOT DAYS.
               </p>
            </div>
          </motion.div>
        </motion.div>

        {/* --- FIXED: Perfectly Centered Sigiriya Rock --- */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-end justify-center">
          <motion.div
            ref={rockRef}
            style={{ y: yRock, opacity: opacityRock }}
            className="relative w-[500px] sm:w-[800px] md:w-[1200px] mb-[10%]"
          >
            <Image
              src="/images/sigiriya-rock.png"
              alt="Sigiriya"
              width={1400}
              height={1100}
              className="h-auto w-full object-contain drop-shadow-[0_45px_70px_rgba(0,0,0,0.4)]"
            />
          </motion.div>
        </div>

        {/* Foreground Cloud Mask */}
        <div className="cloud-float absolute bottom-[-10%] left-[-10%] right-[-10%] z-30 pointer-events-none scale-110">
          <Image
            src="/images/clouds.png"
            alt="Atmosphere"
            width={2600}
            height={800}
            className="h-auto w-full object-contain opacity-95"
          />
        </div>

        {/* Liquid Glass UI */}
        <div className="absolute bottom-[12%] left-0 right-0 z-40 flex justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, type: "spring" }}
            className="flex w-full max-w-4xl items-center rounded-3xl border border-white/40 bg-white/5 p-2 shadow-2xl backdrop-blur-2xl"
          >
            <div className="grid w-full grid-cols-2 md:grid-cols-4 md:px-8">
              <SearchItem label="WHERE" val="Destinations" />
              <SearchItem label="ARRIVE" val="Add Date" />
              <SearchItem label="DEPART" val="Add Date" />
              <SearchItem label="PEOPLE" val="Group Size" />
            </div>
            <button
              onClick={() => setIsPlannerOpen(true)}
              className="rounded-2xl bg-white px-10 py-5 text-[10px] font-black uppercase tracking-widest text-[#0b2a2a] hover:bg-[#0b2a2a] hover:text-white transition-all shadow-xl"
            >
              FIND MY TRIP
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- Smooth Transitions to Content --- */}
      <div id="destinations" className="relative z-10">
         <Destinations />
      </div>
    </div>
  );
}

function SearchItem({ label, val }: { label: string; val: string }) {
  return (
    <div className="flex flex-col px-4 py-2 border-r border-white/10 last:border-0">
      <span className="text-[8px] font-black uppercase text-white/30 tracking-widest mb-1">{label}</span>
      <span className="text-[12px] font-bold text-white tracking-tight">{val}</span>
    </div>
  );
}