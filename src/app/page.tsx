import { BriefBenefitsSection } from "@/app/_home/brief-benefits-section";
import { CTASection } from "@/app/_home/cta-section";
import { FeedbackSection } from "@/app/_home/feedback-section";
import { HeroSection } from "@/app/_home/hero-section";
import { SmartBookingSection } from "@/app/_home/smart-booking-section";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="h-full">
      <HeroSection />
      <Separator />
      <FeedbackSection />
      <Separator />
      <BriefBenefitsSection />
      <Separator />
      <SmartBookingSection />
      <Separator />
      <CTASection />
    </div>
  );
}
