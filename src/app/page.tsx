import { CTASection } from "@/app/_home/cta-section";
import { HeroSection } from "@/app/_home/hero-section";

export default function Home() {
  return (
    <div className="h-full">
      <HeroSection />
      <CTASection />
    </div>
  );
}
