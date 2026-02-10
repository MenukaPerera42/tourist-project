"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const items = [
  {
    name: "ELLA",
    sub: "The Hill Country",
    img: "/images/ella.jpg",
  },
  {
    name: "SIGIRIYA",
    sub: "Ancient Fortress",
    img: "/images/sigiriya-card.jpg",
  },
  {
    name: "KANDY",
    sub: "Cultural Heart",
    img: "/images/kandy.jpg",
  },
];

export default function Destinations() {
  return (
    <section className="bg-[#4a5d45] pb-40 px-6 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <header className="mb-24 flex flex-col items-center text-center">
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase mb-4">
            POPULAR DESTINATIONS
          </h2>
          <p className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-white/60 uppercase">
            HAND PICKED PLACES TRAVELERS LOVE THE MOST
          </p>
        </header>

        {/* Grid - No Stagger */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
          {items.map((item, idx) => (
            <DestinationCard key={idx} item={item} index={idx} />
          ))}
        </div>

        {/* Pagination Dots (Visual Only as per design) */}
        <div className="mt-16 flex justify-center gap-3 opacity-50">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`h-2 w-2 rounded-full ${i === 2 ? 'bg-white' : 'bg-white/30'}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DestinationCard({ item, index }: { item: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-white/5 shadow-2xl transition-transform hover:-translate-y-2 duration-500"
    >
      {/* Card Header */}
      <div className="relative z-10 flex items-center justify-between bg-white px-8 py-6">
        <h3 className="text-3xl font-black tracking-tighter text-[#0F2826]">{item.name}</h3>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E5E9E5] text-[#0F2826] transition-colors group-hover:bg-[#4a5d45] group-hover:text-white">
          <ArrowUpRight size={20} strokeWidth={2.5} />
        </button>
      </div>

      {/* Image Section */}
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={item.img}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay Text (optional subtitle) */}
        <div className="absolute bottom-6 left-6 max-w-[80%]">
          <p className="text-[10px] font-bold tracking-widest text-white/80 uppercase backdrop-blur-sm bg-black/20 p-2 rounded-lg inline-block">
            {item.sub}
          </p>
        </div>
      </div>
    </motion.div>
  );
}