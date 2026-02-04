"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, ArrowRight, Navigation, Clock, MapPin, Hotel, 
  Car, Sparkles, ChevronLeft, ChevronRight, 
  Calendar as CalendarIcon, PlaneLanding, PlaneTakeoff, CreditCard
} from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

// --- DATA ARCHITECTURE ---
const FULL_ITINERARIES = {
  mystic: {
    title: "Ancient Echoes",
    totalKm: "480km",
    duration: "5 Days",
    baseCost: 1850,
    budget: { stays: "40%", transit: "25%", entry: "20%", dining: "15%" },
    days: [
      { 
        day: "01", 
        place: "Sigiriya", 
        transit: "Start — 160km (4h)", 
        activity: "Sunset Fortress Hike", 
        night: "Jetwing Vil Uyana", 
        time: "6 Hours" 
      },
      { 
        day: "02", 
        place: "Kandy", 
        transit: "90km from Sigiriya (2.5h)", 
        activity: "Temple Ceremony", 
        night: "Santani Wellness", 
        time: "5 Hours" 
      }
    ]
  },
  lush: {
    title: "Emerald Highlands",
    totalKm: "320km",
    duration: "7 Days",
    baseCost: 2100,
    budget: { stays: "50%", transit: "20%", entry: "10%", dining: "20%" },
    days: [
      { 
        day: "01", 
        place: "Nuwara Eliya", 
        transit: "Start — 175km (5h)", 
        activity: "Tea Estate Plucking", 
        night: "Grand Hotel", 
        time: "4 Hours" 
      },
      { 
        day: "02", 
        place: "Ella", 
        transit: "55km from N.Eliya (2h)", 
        activity: "Nine Arch Bridge Walk", 
        night: "98 Acres Resort", 
        time: "7 Hours" 
      }
    ]
  }
};

export default function TripPlanner({ isOpen, onClose }: Props) {
  const [step, setStep] = useState(1);
  const [showRefinement, setShowRefinement] = useState(false);
  const [formData, setFormData] = useState({ 
    vibe: "Mystic", 
    arrival: "", 
    departure: "", 
    group: 2, 
    purpose: "Relax",
    swappedDays: [] as number[] 
  });

  const next = () => setStep((s) => s + 1);
  const back = () => showRefinement ? setShowRefinement(false) : setStep((s) => Math.max(1, s - 1));

  const plan = FULL_ITINERARIES[formData.vibe.toLowerCase() as keyof typeof FULL_ITINERARIES] || FULL_ITINERARIES.mystic;
  
  // Total cost calculation based on group size
  const totalPrice = (plan.baseCost * formData.group).toLocaleString();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex justify-end bg-black/60 backdrop-blur-xl">
          <div className="flex-1 hidden md:block" onClick={onClose} />
          
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 35, stiffness: 250 }} className="w-full max-w-xl bg-[#0b2a2a] h-full shadow-2xl flex flex-col text-white relative overflow-hidden">
            
            <header className="p-8 border-b border-white/5 flex justify-between items-center z-10 bg-[#0b2a2a]">
              <div className="flex items-center gap-4">
                {(step > 1 || showRefinement) && (
                  <button onClick={back} className="p-2 hover:bg-white/5 rounded-full text-white/40 hover:text-white transition-colors">
                    <ChevronLeft size={20} />
                  </button>
                )}
                <span className="text-[9px] font-black tracking-[0.6em] opacity-30 uppercase">Master Atelier.v26</span>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors"><X size={18} /></button>
            </header>

            <div className="flex-1 overflow-y-auto no-scrollbar p-8 pb-32">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: DISCOVERY & CALENDAR */}
                {step === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                    <h2 className="text-4xl font-black tracking-tighter mb-4 italic leading-tight">The Discovery.</h2>
                    
                    <div className="space-y-4">
                      <p className="text-[10px] font-black tracking-widest opacity-20 uppercase">Fav Category</p>
                      <div className="grid grid-cols-2 gap-2">
                        {["Mystic", "Lush", "Raw", "Coastal"].map((cat) => (
                          <button key={cat} onClick={() => setFormData({...formData, vibe: cat})} className={`py-5 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest ${formData.vibe === cat ? 'bg-white text-[#0b2a2a] border-white' : 'border-white/10 opacity-40'}`}>
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <BoutiqueDateInput icon={<PlaneLanding size={14}/>} label="Arrival" value={formData.arrival} onChange={(v: string) => setFormData({...formData, arrival: v})} />
                      <BoutiqueDateInput icon={<PlaneTakeoff size={14}/>} label="Departure" value={formData.departure} onChange={(v: string) => setFormData({...formData, departure: v})} />
                    </div>

                    <button onClick={next} disabled={!formData.vibe || !formData.arrival} className="w-full py-6 bg-white text-[#0b2a2a] rounded-full font-black text-[10px] tracking-[0.4em] disabled:opacity-20 transition-all shadow-2xl">NEXT PHASE</button>
                  </motion.div>
                )}

                {/* STEP 2: EXPLORERS & PURPOSE */}
                {step === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
                    <div className="space-y-6">
                      <h2 className="text-4xl font-black tracking-tighter">The <span className="italic font-serif opacity-50">Explorers</span>.</h2>
                      <div className="flex flex-wrap gap-3">
                        {[1, 2, 3, 4, 5, "6+"].map((n) => (
                          <button key={n} onClick={() => setFormData({...formData, group: parseInt(n as string) || 6})} className={`w-12 h-12 rounded-full border flex items-center justify-center text-[10px] font-black transition-all ${formData.group === (parseInt(n as string) || 6) ? 'bg-white text-[#0b2a2a] border-white shadow-xl scale-110' : 'border-white/10 opacity-40'}`}>
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <p className="text-[10px] font-black tracking-widest opacity-20 uppercase">Trip Purpose</p>
                      <div className="grid grid-cols-2 gap-2">
                        {["Relax", "Adventure", "Culture", "Surprise"].map((p) => (
                          <button key={p} onClick={() => setFormData({...formData, purpose: p})} className={`py-5 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest ${formData.purpose === p ? 'bg-white text-[#0b2a2a] border-white' : 'border-white/10 opacity-40'}`}>
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button onClick={next} className="w-full py-6 bg-white text-[#0b2a2a] rounded-full font-black text-[10px] tracking-[0.4em]">GENERATE MANIFEST</button>
                  </motion.div>
                )}

                {/* STEP 3: MASTER MANIFEST */}
                {step === 3 && !showRefinement && (
                  <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 pb-20">
                    <header>
                      <h2 className="text-5xl font-black tracking-tighter leading-none italic mb-6 uppercase">{plan.title}</h2>
                      <div className="flex gap-6 border-y border-white/5 py-6">
                         <StatItem icon={<Clock size={12}/>} label="Duration" val={plan.duration} />
                         <StatItem icon={<Car size={12}/>} label="Distance" val={plan.totalKm} />
                         <StatItem icon={<CreditCard size={12}/>} label="Total Cost" val={`$${totalPrice}`} />
                         <StatItem icon={<Navigation size={12}/>} label="Expedition" val="Guided" />
                      </div>
                    </header>

                    {/* Timeline */}
                    <section className="space-y-10">
                      <p className="text-[10px] font-black tracking-[0.4em] opacity-20 uppercase">The Timeline</p>
                      {plan.days.map((d, i) => (
                        <div key={i} className="relative pl-10 border-l border-white/10">
                          <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-white shadow-[0_0_15px_white]" />
                          <div className="mb-4">
                             <span className="text-[10px] font-black text-white/30 tracking-widest">DAY {d.day}</span>
                             <h3 className="text-2xl font-bold tracking-tight">{d.place}</h3>
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                            <DetailItem icon={<MapPin size={12}/>} label="Transit" val={d.transit} />
                            <DetailItem icon={<Clock size={12}/>} label="Time" val={d.time} />
                            <DetailItem icon={<Sparkles size={12}/>} label="Activity" val={d.activity} />
                            <DetailItem icon={<Hotel size={12}/>} label="Night At" val={d.night} />
                          </div>
                        </div>
                      ))}
                    </section>

                    {/* BUDGET ALLOCATION */}
                    <section>
                      <p className="text-[10px] font-black tracking-[0.4em] opacity-20 uppercase mb-6">Budget Allocation</p>
                      <div className="flex h-3 w-full rounded-full overflow-hidden bg-white/5 mb-6">
                        <div className="h-full bg-white" style={{ width: plan.budget.stays }} />
                        <div className="h-full bg-white/40" style={{ width: plan.budget.transit }} />
                        <div className="h-full bg-white/20" style={{ width: plan.budget.entry }} />
                        <div className="h-full bg-white/10" style={{ width: plan.budget.dining }} />
                      </div>
                      <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                         {Object.entries(plan.budget).map(([key, val]) => (
                           <div key={key} className="flex justify-between text-[10px] font-bold border-b border-white/5 pb-2">
                             <span className="capitalize opacity-40">{key}</span>
                             <span>{val}</span>
                           </div>
                         ))}
                      </div>
                    </section>

                    {/* Refinement Prompt */}
                    <button onClick={() => setShowRefinement(true)} className="w-full p-8 bg-white/5 rounded-[2.5rem] border border-white/10 text-left relative overflow-hidden group">
                      <div className="z-10 relative">
                        <h4 className="text-lg font-black tracking-tight mb-2">Want a more precise route?</h4>
                        <p className="text-[11px] opacity-40 leading-relaxed mb-6">Answer specific optional questions to unlock <br/>deeply tailored hidden gems.</p>
                        <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#c5ff4a]">Personalize further <ArrowRight size={14}/></span>
                      </div>
                      <Sparkles className="absolute right-[-20px] bottom-[-20px] opacity-5 text-white" size={120} />
                    </button>
                  </motion.div>
                )}

                {/* STEP 4: REFINEMENT */}
                {showRefinement && (
                  <motion.div key="s4" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                    <h2 className="text-4xl font-black tracking-tighter leading-tight italic">Expert Refinement.</h2>
                    <div className="space-y-10">
                      <RefinementQuestion label="Accommodation Style" options={["Eco-Lodge", "Boutique", "Colonial", "Modern"]} />
                      <RefinementQuestion label="Daily Intensity" options={["Relaxed", "Balanced", "High Energy"]} />
                    </div>
                    <button onClick={() => setShowRefinement(false)} className="w-full py-6 bg-[#c5ff4a] text-[#0b2a2a] rounded-full font-black text-[10px] tracking-[0.4em]">RE-ARCHITECT PLAN</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sticky Action Footer */}
            {step === 3 && !showRefinement && (
              <div className="p-8 border-t border-white/5 bg-[#0b2a2a]/95 backdrop-blur-md absolute bottom-0 left-0 right-0">
                <button className="w-full h-16 bg-white text-[#0b2a2a] rounded-full font-black text-[10px] tracking-[0.4em] hover:scale-[1.02] transition-all">
                  CONFIRM THIS MANIFEST
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- SUB-COMPONENTS ---

function StatItem({ icon, label, val }: any) {
  return (
    <div className="flex-1">
      <div className="flex items-center gap-2 opacity-30 mb-1">
        {icon}
        <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-xl font-black tracking-tight text-white">{val}</p>
    </div>
  );
}

function BoutiqueDateInput({ label, value, onChange, icon }: any) {
  const [showPicker, setShowPicker] = useState(false);
  const displayDate = value ? new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }).toUpperCase() : "SELECT";

  return (
    <div className="space-y-3 relative">
      <div className="flex items-center gap-2 opacity-20">
        {icon}
        <span className="text-[8px] font-black tracking-widest uppercase">{label}</span>
      </div>
      <button onClick={() => setShowPicker(!showPicker)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between group hover:border-white/30 transition-all">
        <span className="text-[10px] font-black tracking-widest uppercase">{displayDate}</span>
        <CalendarIcon size={14} className="opacity-20" />
      </button>

      <AnimatePresence>
        {showPicker && (
          <>
            <div className="fixed inset-0 z-[60]" onClick={() => setShowPicker(false)} />
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full mt-2 left-0 w-[280px] bg-[#0b2a2a] border border-white/10 rounded-3xl p-6 z-[70] shadow-2xl backdrop-blur-xl">
              <BoutiqueCalendar onSelect={(d: string) => { onChange(d); setShowPicker(false); }} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function BoutiqueCalendar({ onSelect }: any) {
  const [nav, setNav] = useState(new Date());
  const month = nav.getMonth();
  const year = nav.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const monthName = nav.toLocaleDateString('en-GB', { month: 'long' }).toUpperCase();

  return (
    <div className="space-y-4 text-center">
      <div className="flex justify-between items-center px-1">
        <button onClick={() => setNav(new Date(year, month - 1))}><ChevronLeft size={14}/></button>
        <span className="text-[9px] font-black tracking-widest">{monthName} {year}</span>
        <button onClick={() => setNav(new Date(year, month + 1))}><ChevronRight size={14}/></button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {["M","T","W","T","F","S","S"].map(d => <div key={d} className="text-[7px] font-black opacity-20">{d}</div>)}
        {Array.from({ length: firstDay === 0 ? 6 : firstDay - 1 }).map((_, i) => <div key={i} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const d = i + 1;
          const ds = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
          return (
            <button key={i} onClick={() => onSelect(ds)} className="aspect-square flex items-center justify-center text-[9px] font-black rounded-full hover:bg-white hover:text-[#0b2a2a] transition-all">{d}</button>
          );
        })}
      </div>
    </div>
  );
}

function DetailItem({ icon, label, val }: any) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 opacity-20">
        {icon}
        <span className="text-[7px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-[11px] font-medium leading-tight opacity-80">{val}</p>
    </div>
  );
}

function RefinementQuestion({ label, options }: any) {
  return (
    <div className="space-y-4">
      <p className="text-[10px] font-black tracking-widest opacity-20 uppercase">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt: string) => (
          <button key={opt} className="px-4 py-2 rounded-full border border-white/10 text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-[#0b2a2a] transition-all">
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}