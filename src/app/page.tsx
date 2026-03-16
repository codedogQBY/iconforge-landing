import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import IconWorkspace from "@/components/IconWorkspace";
import HowItWorks from "@/components/HowItWorks";
import Highlights from "@/components/Highlights";
import { FinalCTA, Footer } from "@/components/FinalCTA";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-white">
      <Navbar />
      <Hero />
      <IconWorkspace />
      <HowItWorks />
      <Highlights />
      <FinalCTA />
      <Footer />
    </div>
  );
}
