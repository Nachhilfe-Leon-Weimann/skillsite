import { BriefBenefitsSection } from "@/app/_home/brief-benefits-section";
import { CTASection } from "@/app/_home/cta-section";
import { HeroSection } from "@/app/_home/hero-section";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="h-full">
      <HeroSection />
      <Separator />
      <BriefBenefitsSection />
      <Separator />
      <CTASection />
    </div>
  );
}
