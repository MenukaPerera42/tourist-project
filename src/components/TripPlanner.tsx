"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Check, Compass, Moon, Sun, Users2, Map } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function TripPlanner({ isOpen, onClose }: Props) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    vibe: "",
    pace: "",
    groupSize: 1,
    startMonth: "",
  });

  const nextStep = () => setStep((s) => s + 1);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex justify-end bg-black/20 backdrop-blur-sm"
        >
          {/* Dismiss overlay area */}
          <div className="hidden md:block flex-1" onClick={onClose} />

          {/* Right Journal Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full max-w-xl bg-[#0b2a2a] h-full shadow-2xl p-8 md:p-16 flex flex-col justify-between text-white border-l border-white/10"
          >
            <div className="relative">
              <button onClick={onClose} className="absolute -left-4 top-0 opacity-40 hover:opacity-100">
                <X size={24} />
              </button>

              {/* Step Indicator (Map Trail Style) */}
              <div className="flex gap-2 mb-12 ml-6">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= i ? "bg-white" : "bg-white/10"}`} 
                  />
                ))}
              </div>

              <div className="min-h-[500px]">
                {/* --- STEP 1: ATMOSPHERIC VIBE --- */}
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Compass className="mb-6 opacity-30" size={32} />
                    <h2 className="text-5xl font-black tracking-tighter leading-none mb-4">How should the<br/>journey feel?</h2>
                    <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] mb-12 font-bold">Define your atmosphere</p>
                    
                    <div className="space-y-3">
                      {[
                        { id: "mystic", label: "Mystic & Ancient", icon: "🛕", sub: "Hidden temples & spiritual ruins" },
                        { id: "lush", label: "Lush & Infinite", icon: "🍃", sub: "Tea estates & emerald mountains" },
                        { id: "raw", label: "Raw & Coastal", icon: "🐋", sub: "Untamed beaches & surf life" }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => { setFormData({...formData, vibe: item.id}); nextStep(); }}
                          className="w-full group flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all text-left"
                        >
                          <div>
                            <p className="text-xs font-black uppercase tracking-widest mb-1">{item.label}</p>
                            <p className="text-[10px] text-white/30">{item.sub}</p>
                          </div>
                          <span className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity">{item.icon}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* --- STEP 2: THE PACE --- */}
                {step === 2 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Sun className="mb-6 opacity-30" size={32} />
                    <h2 className="text-5xl font-black tracking-tighter leading-none mb-12">Set the rhythm.</h2>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <button onClick={() => { setFormData({...formData, pace: "slow"}); nextStep(); }} className="p-8 rounded-3xl bg-white/5 border border-white/10 text-left hover:bg-white hover:text-[#0b2a2a] transition-all">
                        <p className="text-lg font-black uppercase tracking-tighter">Slow & Deep</p>
                        <p className="text-[10px] opacity-60 mt-1 uppercase font-bold tracking-widest">3 Cities in 10 Days</p>
                      </button>
                      <button onClick={() => { setFormData({...formData, pace: "fast"}); nextStep(); }} className="p-8 rounded-3xl bg-white/5 border border-white/10 text-left hover:bg-white hover:text-[#0b2a2a] transition-all">
                        <p className="text-lg font-black uppercase tracking-tighter">The Grand Tour</p>
                        <p className="text-[10px] opacity-60 mt-1 uppercase font-bold tracking-widest">7 Cities in 10 Days</p>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* --- STEP 3: COMPANIONS --- */}
                {step === 3 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Users2 className="mb-6 opacity-30" size={32} />
                    <h2 className="text-5xl font-black tracking-tighter leading-none mb-12">Who shares<br/>this story?</h2>
                    
                    <div className="flex flex-wrap gap-3">
                      {[1, 2, 3, 4, 5, "6+"].map((num) => (
                        <button
                          key={num}
                          onClick={() => { setFormData({...formData, groupSize: Number(num) || 6}); nextStep(); }}
                          className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center font-black text-xl hover:bg-white hover:text-[#0b2a2a] transition-all"
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* --- STEP 4: RESULT REVEAL --- */}
                {step === 4 && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <div className="bg-white text-[#0b2a2a] w-12 h-12 rounded-full flex items-center justify-center mb-8">
                      <Map size={24} />
                    </div>
                    <h2 className="text-6xl font-black tracking-tighter leading-[0.9] mb-6">Your Map is Drawn.</h2>
                    <p className="text-white/40 text-[11px] font-bold uppercase tracking-[0.2em] leading-relaxed mb-12">
                      An artisanal {formData.vibe} journey curated for {formData.groupSize} explorers.
                    </p>
                    
                    <div className="space-y-4">
                      <button className="w-full bg-white text-[#0b2a2a] py-6 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-2xl">Download Private Itinerary</button>
                      <button onClick={() => setStep(1)} className="w-full border border-white/20 py-6 rounded-2xl font-black uppercase text-[11px] tracking-widest opacity-40">Start Over</button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Footer Brand */}
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.4em] opacity-20">
              <span>Ceylon Concierge</span>
              <span>v.2026</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}