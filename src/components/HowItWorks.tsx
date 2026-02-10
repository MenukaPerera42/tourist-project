"use client";

import { motion } from "framer-motion";

const steps = [
  {
    id: "01",
    title: "TELL US YOUR PREFERENCES",
    desc: "Answer a few quick questions about your travel dates, interests, and budget.",
  },
  {
    id: "02",
    title: "CHOOSE YOUR DESTINATIONS & STAYS",
    desc: "Browse recommended places, hotels, and experiences across Sri Lanka — fully customizable.",
  },
  {
    id: "03",
    title: "WE BOOK EVERYTHING FOR YOU",
    desc: "Once you confirm, we automatically arrange hotels and transportation — all in one booking.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative bg-[#4a5d45] py-24 px-6 text-white">
      <div className="mx-auto max-w-4xl text-center">
        {/* Decorative Vertical Bar */}
        <div className="mx-auto mb-8 h-12 w-1.5 bg-[#8FBC8F]/50"></div>

        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-4xl md:text-5xl font-black uppercase tracking-tighter text-white"
        >
          HOW IT WORKS
        </motion.h2>

        {/* Steps List */}
        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative flex flex-col items-start border-b border-white/10 pb-10 text-left md:flex-row md:items-center"
            >
              {/* Step Number */}
              <div className="mb-4 flex items-center gap-4 md:mb-0 md:w-48">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                  STEP
                </span>
                <span className="text-2xl font-black tracking-tighter">
                  {step.id}
                </span>
              </div>

              {/* Step Content */}
              <div className="flex-1">
                <h3 className="mb-2 text-sm font-black uppercase tracking-widest text-white">
                  {step.title}
                </h3>
                <p className="max-w-xl text-[13px] font-medium leading-relaxed text-white/60">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative Divider Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-20 h-[1px] w-32 bg-white/20"
        />
      </div>
    </section>
  );
}