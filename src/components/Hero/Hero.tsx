"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MapPin, Calendar, CalendarCheck, UserPlus } from "lucide-react";
import TripPlanner from "../TripPlanner";


export default function Hero() {
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rockRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects
  const yRock = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityRock = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    // Entrance animations
    const tl = gsap.timeline();

    tl.fromTo(".hero-text",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.2 }
    )
      .fromTo(rockRef.current,
        { y: 200, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(".search-bar",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=1"
      );

    // Continuous cloud movement
    gsap.to(".cloud-float", {
      xPercent: 5,
      duration: 20,
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
    <div ref={containerRef} className="relative w-full font-sans bg-[#4a5d45]">
      <TripPlanner isOpen={isPlannerOpen} onClose={() => setIsPlannerOpen(false)} />

      <div className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 select-none">
          <Image
            src="/images/hero-bg.png"
            alt="Sri Lanka Background"
            fill
            className="object-cover object-bottom"
            priority
            unoptimized
          />
        </div>

        {/* Navbar */}
        <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6">
          <div className="text-3xl font-bold text-[#0F2826] tracking-tight cursor-pointer">LOGO</div>
          <div className="hidden md:flex gap-8 text-xs font-bold text-[#0F2826] tracking-widest uppercase">
            {["HOME", "DESTINATIONS", "EXPERIENCES", "ABOUT", "CONTACT"].map((link) => (
              <button
                key={link}
                onClick={() => link === 'DESTINATIONS' ? scrollToSection('destinations') : null}
                className="hover:text-emerald-700 transition-colors"
              >
                {link}
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-start h-full pt-32 px-4 text-center">

          {/* Hero Text */}
          <motion.div style={{ y: textY }} className="hero-text z-20 flex flex-col items-center">
            <h1 className="text-5xl md:text-7xl lg:text-[90px] font-black text-[#0F2826] leading-[0.9] tracking-tight uppercase">
              PLAN YOUR PERFECT<br />
              SRI LANKA TRIP IN MINUTES
            </h1>
            <p className="mt-6 max-w-2xl text-[10px] md:text-xs font-bold tracking-[0.15em] text-[#0F2826]/70 uppercase leading-relaxed">
              Choose destinations, hotels, and transport — we handle all bookings automatically.<br className="hidden md:block" />
              Build your entire journey across Sri Lanka in one place.
            </p>
          </motion.div>

          {/* Sigiriya Rock */}
          <motion.div
            ref={rockRef}
            style={{ y: yRock, opacity: opacityRock }}
            className="absolute bottom-0 z-10 w-full max-w-[1400px] flex justify-center items-end"
          >
            <div className="relative w-[800px] md:w-[1000px] lg:w-[1200px] aspect-[4/3]">
              <Image
                src="/images/sigiriya-rock.png" // Ensure this image exists, or use a placeholder if needed
                alt="Sigiriya Rock"
                fill
                className="object-contain object-bottom drop-shadow-2xl"
                priority
                unoptimized
              />
            </div>
          </motion.div>

          {/* Search Bar - Floating over the rock/clouds */}
          <div className="search-bar absolute bottom-[10%] z-40 w-full flex justify-center px-4">
            <div className="bg-[#0F2826]/40 backdrop-blur-2xl border border-white/5 rounded-full p-2 pl-4 md:pl-8 flex flex-row items-center shadow-2xl max-w-7xl w-full">

              <div className="flex-1 grid grid-cols-4 gap-2 md:gap-8 w-full py-3">
                <SearchField
                  icon={<MapPin size={28} className="text-white" strokeWidth={1.5} />}
                  label="Destinations"
                  placeholder="Add Locations"
                />
                <SearchField
                  icon={<Calendar size={28} className="text-white" strokeWidth={1.5} />}
                  label="Check-In"
                  placeholder="Add Date"
                />
                <SearchField
                  icon={<CalendarCheck size={28} className="text-white" strokeWidth={1.5} />}
                  label="Check-Out"
                  placeholder="Add Date"
                />
                <SearchField
                  icon={<UserPlus size={28} className="text-white" strokeWidth={1.5} />}
                  label="Travelers"
                  placeholder="Add Guests"
                />
              </div>

              <button
                onClick={() => setIsPlannerOpen(true)}
                className="bg-white text-[#0F2826] font-bold text-sm md:text-lg px-6 md:px-12 py-4 md:py-5 rounded-full hover:bg-emerald-50 transition-colors shadow-xl whitespace-nowrap ml-4 md:ml-6 shrink-0"
              >
                Find My Trip
              </button>
            </div>
          </div>

        </div>


      </div>

      {/* Cloud Overlay - Moved to be visible between sections */}
      <div className="cloud-float relative z-20 -mt-[25%] md:-mt-[22%] pointer-events-none w-full overflow-hidden">
        <Image
          src="/images/Clouds.png"
          alt="Clouds"
          width={2600}
          height={800}
          className="w-full h-auto object-cover scale-110 opacity-100"
          priority
        />
      </div>


    </div>
  );
}

function SearchField({ icon, label, placeholder }: { icon: React.ReactNode, label: string, placeholder: string }) {
  return (
    <div className="flex items-center gap-4 md:justify-center text-left">
      <div className="flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="text-white text-sm font-bold tracking-wide">{label}</div>
        <div className="text-white/60 text-xs font-medium tracking-wide">{placeholder}</div>
      </div>
    </div>
  );
}