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
        <section className="relative pt-64 pb-24 bg-[#4a5d45]">
            {/* Cloud Top Transition - Centered on the boundary */}
            <div className="absolute top-[-200px] left-0 right-0 z-20 pointer-events-none w-full h-[500px] overflow-hidden">
                <Image
                    src="/images/clouds.png"
                    alt="cloud divider"
                    fill
                    className="object-contain object-center scale-110"
                />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-30">

                {/* Main Headline */}
                <div className="text-center mb-20 md:mb-32">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-tight"
                    >
                        Read Reviews,<br />
                        Travel with Confidence
                    </motion.h2>
                </div>

                <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">

                    {/* Left Column: Title & Quote Icon */}
                    <div className="md:w-1/4 shrink-0 top-12 md:sticky">
                        <Quote className="w-16 h-16 text-white mb-6" fill="white" />
                        <h3 className="text-4xl font-black uppercase tracking-tighter text-white leading-none">
                            What Our<br />
                            Customers<br />
                            Are<br />
                            Saying
                        </h3>
                    </div>

                    {/* Right Column: Reviews Grid/Scroll */}
                    <div className="md:w-3/4 w-full">
                        <div className="flex flex-nowrap overflow-x-auto gap-6 pb-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible no-scrollbar">
                            {reviews.map((review, i) => (
                                <motion.div
                                    key={review.id}
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex-shrink-0 w-[85vw] md:w-auto p-8 rounded-3xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
                                >
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(review.rating)].map((_, idx) => (
                                            <Star key={idx} className="w-5 h-5 text-[#00d29d]" fill="#00d29d" />
                                        ))}
                                    </div>

                                    <p className="text-[11px] font-bold leading-relaxed tracking-wide text-white/90 mb-8 uppercase">
                                        "{review.text}"
                                    </p>

                                    <div className="flex items-center gap-4 mt-auto">
                                        <div className="w-10 h-10 rounded-full bg-[#d9d9d9]" />
                                        <div>
                                            <div className="text-[9px] font-black uppercase tracking-wider text-white">
                                                {review.author}
                                            </div>
                                            <div className="text-[9px] font-bold uppercase tracking-wider text-white/50">
                                                {review.time}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
