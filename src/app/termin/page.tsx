import { CTA, CTAContent, CTAHeader } from "@/components/blocks/cta";
import { Booker } from "@/components/cal/booker";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { H1, Lead } from "@/components/ui/typography";
import { getBookingDetails } from "@/lib/booking-details";
import { routes } from "@/lib/routes";
import Link from "next/link";

export default function Termin() {
  const bookerProps = getBookingDetails("nachhilfe");

  return (
    <Section
      gradient="bottom"
      containerClassName="mb-0 text-center"
      offsetFooter
    >
      <CTA className="max-w-full text-left sm:text-center">
        <CTAHeader>
          <H1>Buche deinen persönlichen Nachhilfetermin</H1>

          <div className="flex flex-row gap-6 mt-4 lg:mt-0 justify-center items-center">
            <Lead>
              Wir kennen uns noch nicht? Dann ist ein Kennenlernen vermutlich
              eher, was du suchst
            </Lead>

            <Button variant="outline" asChild>
              <Link href={routes.first_meeting}>Mehr</Link>
            </Button>
          </div>
        </CTAHeader>
        <CTAContent>
          <Booker
            calUsername={bookerProps.calUsername}
            eventSlug={bookerProps.eventSlug}
          />
        </CTAContent>
      </CTA>
    </Section>
  );
}
