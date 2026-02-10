"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Quote } from "lucide-react";

const reviews = [
    {
        id: 1,
        text: "I WAS OVERWHELMED TRYING TO COORDINATE TRAINS, DRIVERS, AND HOTELS SEPARATELY. THIS PLATFORM MADE IT EFFORTLESS. WE BOOKED OUR ENTIRE 10-DAY ITINERARY—FROM THE CULTURAL TRIANGLE TO THE BEACHES IN MIRISSA—IN ONE GO. THE DRIVER THEY ASSIGNED, ROSHAN, WAS AN ABSOLUTE GEM!",
        author: "SARAH & TOM, UNITED KINGDOM",
        time: "1 Week Ago",
        rating: 5,
    },
    {
        id: 2,
        text: "TRAVELING WITH TWO YOUNG KIDS TO A NEW COUNTRY CAN BE STRESSFUL, BUT EVERYTHING HERE WAS SEAMLESS. THE 'FAMILY FRIENDLY' FILTER HELPED US FIND VILLAS THAT ACTUALLY HAD COTS AND POOLS SAFE FOR TODDLERS. WE FELT SAFE AND WELL-TAKEN CARE OF THE ENTIRE TIME. HIGHLY RECOMMENDED FOR FAMILIES.",
        author: "THE MUELLER FAMILY, GERMANY",
        time: "2 Weeks Ago",
        rating: 5,
    },
    {
        id: 3,
        text: "THE BEST DECISION WE MADE FOR OUR HONEYMOON. THE CURATED EXPERIENCES WERE EXACTLY WHAT WE WERE LOOKING FOR—OFF THE BEATEN PATH BUT STILL LUXURIOUS. THE LOCAL GUIDES WERE KNOWLEDGEABLE AND FRIENDLY. CAN'T WAIT TO COME BACK!",
        author: "JESSICA & MARK, USA",
        time: "3 Weeks Ago",
        rating: 5,
    },
];

export default function Reviews() {
    return (
        <section className="relative w-full bg-[#4a5d45]">

            {/* --- TOP SECTION: Call to Action (Dark) --- */}
            <div className="relative bg-[#0F2826] pt-32 pb-40 md:pb-80 px-6 text-center z-10">
                <div className="max-w-4xl mx-auto flex flex-col items-center">
                    <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-white/60 uppercase mb-6">
                        Travel Made Simple, Stories Made Unforgettable.
                    </p>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-[0.9] mb-12">
                        We Make Planning <br />
                        Effortless So You Can Focus <br />
                        On What Really Matters
                    </h2>
                    <button className="px-8 py-4 rounded-full border border-white/20 text-white text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-[#0F2826] transition-all">
                        Start Planning Your Trip
                    </button>
                </div>
            </div>

            {/* --- CLOUD DIVIDER --- */}
            <div className="relative z-20 -mt-32 md:-mt-56 h-[250px] md:h-[500px] w-full pointer-events-none overflow-hidden">
                <Image
                    src="/images/Clouds.png"
                    alt="Cloud Divider"
                    fill
                    className="object-cover object-center scale-110"
                />
            </div>

            {/* --- BOTTOM SECTION: Reviews (Green) --- */}
            <div className="relative bg-[#4a5d45] pt-32 md:pt-80 pb-32 px-6 z-10 -mt-24 md:-mt-64">
                <div className="container mx-auto max-w-7xl">

                    {/* Section Heading */}
                    <div className="text-center mb-24">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-none">
                            Read Reviews,<br />
                            Travel with Confidence
                        </h2>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

                        {/* Left Column: Quote & Title */}
                        <div className="lg:w-1/4 shrink-0 top-12 lg:sticky">
                            <Quote className="w-16 h-16 text-white mb-6" fill="white" />
                            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white leading-[0.9]">
                                What Our<br />
                                Customers<br />
                                Are<br />
                                Saying
                            </h3>
                        </div>

                        {/* Right Column: Cards */}
                        <div className="lg:w-3/4 w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {reviews.map((review, i) => (
                                    <motion.div
                                        key={review.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex flex-col p-8 rounded-2xl border border-white/20 bg-transparent hover:bg-white/5 transition-colors h-full"
                                    >
                                        <div className="flex gap-1 mb-8">
                                            {[...Array(review.rating)].map((_, idx) => (
                                                <Star key={idx} className="w-4 h-4 text-[#00d29d]" fill="#00d29d" />
                                            ))}
                                        </div>

                                        <p className="text-[10px] font-bold leading-relaxed tracking-wider text-white/90 mb-8 uppercase grow">
                                            "{review.text}"
                                        </p>

                                        <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/10">
                                            <div className="w-8 h-8 rounded-full bg-white/20" />
                                            <div className="flex flex-col text-left">
                                                <span className="text-[9px] font-black uppercase tracking-wider text-white">
                                                    {review.author}
                                                </span>
                                                <span className="text-[8px] font-bold uppercase tracking-wider text-white/50">
                                                    {review.time}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
