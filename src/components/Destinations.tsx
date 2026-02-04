"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const items = [
  {
    name: "ELLA",
    sub: "The Hill Country",
    img: "/images/ella.jpg",
    flex: "md:col-span-4",
    y: 0,
  },
  {
    name: "SIGIRIYA",
    sub: "Ancient Fortress",
    img: "/images/sigiriya-card.jpg",
    flex: "md:col-span-4",
    y: -60, // Staggered upward
  },
  {
    name: "KANDY",
    sub: "Cultural Heart",
    img: "/images/kandy.jpg",
    flex: "md:col-span-4",
    y: 40, // Staggered downward
  },
];

export default function Destinations() {
  return (
    <section className="bg-[#4a5d45] pb-40 px-6 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <header className="mb-24 flex flex-col items-center md:items-start">
          <span className="text-[10px] font-black tracking-[0.5em] text-white/30 uppercase mb-4">
            Inspiration
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
            POPULAR <br /> <span className="italic opacity-50">DESTINATIONS</span>
          </h2>
        </header>

        {/* Asymmetric Staggered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {items.map((item, idx) => (
            <DestinationCard key={idx} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DestinationCard({ item }: { item: any }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Subtle parallax for the image inside the card
  const yImage = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      ref={cardRef}
      className={`${item.flex} relative group cursor-pointer`}
      style={{ y: item.y }} // Applies the staggered vertical alignment
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: item.y }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-[#0b2a2a]">
        <motion.div style={{ scale: 1.2, y: yImage }} className="absolute inset-0">
          <Image
            src={item.img}
            alt={item.name}
            fill
            className="object-cover opacity-80 transition-opacity group-hover:opacity-100"
          />
        </motion.div>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Card Content */}
        <div className="absolute bottom-10 left-10 text-white">
          <p className="text-[10px] font-black tracking-widest opacity-50 mb-1">
            {item.sub}
          </p>
          <h3 className="text-3xl font-black tracking-tighter">{item.name}</h3>
        </div>

        {/* Arrow Icon */}
        <div className="absolute top-8 right-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
          <span className="text-white text-xl">↗</span>
        </div>
      </div>
    </motion.div>
  );
}