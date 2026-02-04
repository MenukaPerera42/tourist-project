import Hero from "@/components/Hero/Hero";
import HowItWorks from "@/components/HowItWorks";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative bg-[#f4f7f4]">
      {/* Hero Section */}
      <Hero />
      
      {/* THE CLOUD BRIDGE: Positioned to overlap the junction */}
      <div className="relative z-30 -mt-[180px] md:-mt-[220px] pointer-events-none">
        <div className="w-full">
          <Image
            src="/images/clouds.png"
            alt="Cloud Divider"
            width={2600}
            height={800}
            className="h-auto w-full object-contain scale-110"
            priority
          />
        </div>
      </div>

      {/* How It Works Section */}
      <div className="relative z-10 -mt-1">
        <HowItWorks />
      </div>
    </main>
  );
}