import Hero from "@/components/Hero/Hero";
import HowItWorks from "@/components/HowItWorks";
import Destinations from "@/components/Destinations";
import Reviews from "@/components/Reviews";

export default function Home() {
  return (
    <main className="relative bg-[#f4f7f4]">
      {/* Hero Section */}
      <Hero />

      {/* How It Works Section - Pulled up to blend with Hero Clouds */}
      <div className="relative z-10 -mt-24 md:-mt-48">
        <HowItWorks />
      </div>

      {/* Destinations Section */}
      <div id="destinations" className="relative z-10">
        <Destinations />
      </div>

      {/* Reviews Section */}
      <Reviews />
    </main>
  );
}