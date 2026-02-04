"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, Sparkles, Map, Mountain, Waves, Landmark } from "lucide-react";

type Props = { isOpen: boolean; onClose: () => void; };

export default function TripPlanner({ isOpen, onClose }: Props) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ vibe: "", arrival: "", group: 1 });

  const vibes = [
    { id: "spirit", title: "SPIRITUAL", icon: <Landmark size={32} />, desc: "Ancient temples & sacred peaks" },
    { id: "wild", title: "UNTAINTED", icon: <Mountain size={32} />, desc: "Deep jungles & safari trails" },
    { id: "azure", title: "AZURE", icon: <Waves size={32} />, desc: "Hidden bays & surf culture" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex bg-[#0b2a2a] text-white overflow-hidden"
        >
          {/* --- LEFT SIDE: Vertical Progress Storyline --- */}
          <div className="hidden md:flex w-24 flex-col items-center justify-center border-r border-white/5 bg-black/20 py-12">
            <div className="flex flex-col items-center gap-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center gap-4">
                  <div className={`h-2 w-2 rounded-full transition-all duration-500 ${step >= i ? "bg-white scale-125 shadow-[0_0_10px_white]" : "bg-white/10"}`} />
                  <span className="vertical-text text-[8px] font-black tracking-[0.4em] opacity-20 uppercase">Stage 0{i}</span>
                </div>
              ))}
            </div>
          </div>

          {/* --- RIGHT SIDE: Main Content --- */}
          <div className="relative flex-1 flex flex-col items-center justify-center px-12">
            <button onClick={onClose} className="absolute top-12 right-12 p-2 hover:rotate-90 transition-transform opacity-40 hover:opacity-100">
              <X size={32} strokeWidth={1} />
            </button>

            <div className="w-full max-w-5xl">
              {/* STEP 1: ATMOSPHERIC VIBE */}
              {step === 1 && (
                <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                  <div className="mb-12">
                    <span className="text-[10px] font-black tracking-[0.5em] text-white/30 uppercase italic flex items-center gap-3">
                      <Sparkles size={14} /> The Soul of the Trip
                    </span>
                    <h2 className="text-7xl md:text-[110px] font-black tracking-tighter leading-[0.85] mt-4">CHOOSE YOUR<br/><span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white/40 to-white">ATMOSPHERE.</span></h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {vibes.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => { setFormData({ ...formData, vibe: v.title }); setStep(2); }}
                        className="group relative p-10 rounded-[3rem] bg-white/5 border border-white/10 text-left transition-all hover:bg-white/10 hover:-translate-y-2"
                      >
                        <div className="mb-8 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all">{v.icon}</div>
                        <p className="text-[10px] font-black tracking-widest opacity-40 mb-2 uppercase">{v.title}</p>
                        <p className="text-xs text-white/40 leading-relaxed font-medium">{v.desc}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: LOGISTICS */}
              {step === 2 && (
                <motion.div initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex flex-col items-center text-center">
                  <h2 className="text-6xl md:text-9xl font-black tracking-tighter mb-20 italic">The details.</h2>
                  
                  <div className="flex flex-col md:flex-row gap-24 items-center">
                    <div className="space-y-6">
                      <p className="text-[10px] font-black tracking-widest opacity-20 uppercase">Who travels?</p>
                      <div className="flex items-center gap-10">
                        <button onClick={() => setFormData({...formData, group: Math.max(1, formData.group - 1)})} className="text-4xl opacity-20 hover:opacity-100 transition-opacity">−</button>
                        <span className="text-[120px] font-black leading-none">{formData.group}</span>
                        <button onClick={() => setFormData({...formData, group: formData.group + 1})} className="text-4xl opacity-20 hover:opacity-100 transition-opacity">+</button>
                      </div>
                    </div>

                    <div className="h-40 w-[1px] bg-white/10 hidden md:block" />

                    <div className="space-y-8">
                      <p className="text-[10px] font-black tracking-widest opacity-20 uppercase">When do you arrive?</p>
                      <input 
                        type="date" 
                        className="bg-transparent text-4xl md:text-5xl font-black outline-none border-b-2 border-white/10 pb-4 focus:border-white transition-colors"
                        onChange={(e) => setFormData({...formData, arrival: e.target.value})}
                      />
                    </div>
                  </div>

                  <button 
                    onClick={() => setStep(3)} 
                    className="mt-24 group bg-white text-[#0b2a2a] px-14 py-7 rounded-full font-black text-xs uppercase tracking-[0.3em] flex items-center gap-4 hover:scale-105 transition-transform"
                  >
                    Generate Journey <ChevronRight size={18} />
                  </button>
                </motion.div>
              )}

              {/* STEP 3: RESULT */}
              {step === 3 && (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
                  <div className="bg-white/10 p-6 rounded-full inline-block mb-12">
                    <Map size={48} className="animate-pulse" />
                  </div>
                  <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] italic mb-10">Your Route<br/>is Defined.</h2>
                  <p className="max-w-xl mx-auto text-white/40 text-sm leading-loose tracking-widest uppercase mb-16">
                    An artisanal {formData.vibe} odyssey. Designed specifically for {formData.group} people, commencing on {formData.arrival}.
                  </p>
                  <div className="flex justify-center gap-6">
                    <button className="bg-white text-[#0b2a2a] px-12 py-6 rounded-full font-black text-xs uppercase tracking-widest">Download Full Plan</button>
                    <button onClick={() => setStep(1)} className="border border-white/20 px-12 py-6 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all">Start Over</button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}