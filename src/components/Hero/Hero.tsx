"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X, ArrowRight, Check } from "lucide-react";


// --- Sub-Component: Interactive Trip Planner ---
function TripPlanner({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: "",
    arrival: "",
    departure: "",
    groupSize: 1,
  });

  const categories = [
    { id: "nature", title: "Nature & Hiking", icon: "🌿" },
    { id: "cultural", title: "Ancient Cities", icon: "🛕" },
    { id: "adventure", title: "Surf & Coast", icon: "🏄‍♂️" },
    { id: "luxury", title: "Luxury Wellness", icon: "💎" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0b2a2a]/60 backdrop-blur-3xl p-6"
        >
          <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-[40px] bg-white/10 border border-white/20 shadow-2xl p-12 text-white"
          >
            <button onClick={onClose} className="absolute right-8 top-8 opacity-40 hover:opacity-100 transition-opacity">
              <X size={24} />
            </button>

            <div className="min-h-[350px] flex flex-col justify-center">
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Step 01</span>
                  <h2 className="text-4xl font-black tracking-tighter mt-2 mb-8 text-white">Choose your vibe</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => { setFormData({ ...formData, category: cat.id }); setStep(2); }}
                        className="flex flex-col items-center justify-center p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/20 transition-all text-center"
                      >
                        <span className="text-3xl mb-2">{cat.icon}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest">{cat.title}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Step 02</span>
                  <h2 className="text-4xl font-black tracking-tighter mt-2 mb-8 text-white">Travel Dates</h2>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold uppercase opacity-50 ml-2">Arrival</label>
                      <input type="date" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-white/40" onChange={(e) => setFormData({...formData, arrival: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold uppercase opacity-50 ml-2">Departure</label>
                      <input type="date" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-white/40" onChange={(e) => setFormData({...formData, departure: e.target.value})} />
                    </div>
                  </div>
                  <button onClick={() => setStep(3)} className="mt-8 flex items-center gap-3 bg-white text-[#0b2a2a] px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest transition-transform hover:scale-105">
                    Continue <ArrowRight size={14} />
                  </button>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={32} />
                  </div>
                  <h2 className="text-4xl font-black tracking-tighter mb-4 text-white">Itinerary Ready!</h2>
                  <p className="text-white/60 text-sm mb-8 leading-relaxed">
                    Based on your {formData.category} interest, we've crafted a custom route for your group.
                  </p>
                  <div className="flex justify-center gap-4">
                    <button className="bg-white text-[#0b2a2a] px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg">View My Journey</button>
                    <button onClick={onClose} className="border border-white/20 px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest">Done</button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- Main Component ---
export default function Hero() {
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rockRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yRock = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);

  useEffect(() => {
    gsap.fromTo(rockRef.current, 
      { y: 500, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 2, ease: "power4.out" }
    );

    gsap.to(".cloud-float", {
      xPercent: 4,
      duration: 18,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <TripPlanner isOpen={isPlannerOpen} onClose={() => setIsPlannerOpen(false)} />

      <section className="relative h-[110vh] w-full overflow-hidden bg-[#f4f7f4]">
        {/* BG */}
        <div className="absolute inset-0 z-0">
          <Image src="/images/background.png" alt="Sri Lanka" fill priority className="object-cover object-top" />
        </div>

        {/* Nav */}
        <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-10">
          <div className="text-xl font-black tracking-tighter text-[#0b2a2a]">LOGO</div>
          <div className="hidden gap-10 text-[10px] font-bold tracking-[0.2em] text-[#0b2a2a]/60 md:flex">
            {["HOME", "DESTINATIONS", "EXPERIENCES", "ABOUT", "CONTACT"].map(l => (
              <a key={l} className="hover:opacity-50 transition-opacity" href="#">{l}</a>
            ))}
          </div>
        </nav>

        {/* Title */}
        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center pt-32 px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black tracking-tighter text-[#0b2a2a] sm:text-6xl md:text-7xl lg:text-[80px] leading-[0.9]"
          >
            PLAN YOUR PERFECT<br />
            SRI LANKA TRIP IN MINUTES
          </motion.h1>
          <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.3em] text-[#0b2a2a]/40">
            DESTINATIONS, HOTELS, AND TRANSPORT — ALL IN ONE PLACE.
          </p>
        </div>

        {/* Rock */}
        <motion.div
          ref={rockRef}
          style={{ y: yRock }}
          className="absolute bottom-[12%] left-1/2 z-20 w-[450px] -translate-x-1/2 sm:w-[700px] md:w-[1000px]"
        >
          <Image src="/images/sigiriya-rock.png" alt="Sigiriya" width={1200} height={1000} className="h-auto w-full object-contain drop-shadow-2xl" priority />
        </motion.div>

        {/* Cloud Mask */}
        <div className="cloud-float absolute bottom-[-5%] left-[-5%] right-[-5%] z-30 pointer-events-none">
          <Image src="/images/clouds.png" alt="Mask" width={2400} height={600} className="h-auto w-full object-contain opacity-95 scale-110" />
        </div>

        {/* Bottom Search Bar */}
        <div className="absolute bottom-[10%] left-0 right-0 z-40 flex justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex w-full max-w-3xl items-center rounded-2xl border border-white/20 bg-white/10 p-1.5 shadow-2xl backdrop-blur-xl"
          >
            <div className="grid w-full grid-cols-2 gap-0 md:grid-cols-4 md:px-2">
              <SearchItem label="Destinations" val="Add Locations" />
              <SearchItem label="Check-in" val="Add Date" />
              <SearchItem label="Check-out" val="Add Date" />
              <SearchItem label="Travelers" val="Add Guests" />
            </div>
            <button 
              onClick={() => setIsPlannerOpen(true)}
              className="rounded-xl bg-white px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-[#0b2a2a] shadow-lg transition-transform hover:scale-105"
            >
              Find My Trip
            </button>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 bg-[#4a5d45] py-24 px-6 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-20 text-[10px] font-black uppercase tracking-[0.5em] text-white/40">HOW IT WORKS</h2>
          <div className="space-y-16">
            <Step number="01" title="Tell us your preferences" desc="Quick questions about dates and budget." />
            <Step number="02" title="Choose destinations" desc="Browse recommended hotels and cities." />
            <Step number="03" title="We book everything" desc="We handle logistics while you enjoy." />
          </div>
        </div>
      </section>
    </div>
  );
}

function SearchItem({ label, val }: { label: string; val: string }) {
  return (
    <div className="flex flex-col px-3 py-1 border-r border-white/10 last:border-0 text-left">
      <span className="text-[7px] font-black uppercase text-white/40 tracking-tight">{label}</span>
      <span className="text-[10px] font-bold text-white tracking-tight">{val}</span>
    </div>
  );
}

function Step({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-start border-b border-white/10 pb-12 text-left md:flex-row md:items-center">
      <div className="mb-4 flex items-center gap-4 md:mb-0 md:w-48">
        <span className="text-[9px] font-bold text-white/30 tracking-widest uppercase">Step</span>
        <span className="text-2xl font-black tracking-tighter">{number}</span>
      </div>
      <div className="flex-1">
        <h3 className="mb-1 text-[13px] font-black uppercase tracking-widest">{title}</h3>
        <p className="text-[11px] font-medium leading-relaxed text-white/50">{desc}</p>
      </div>
    </div>
  );
}