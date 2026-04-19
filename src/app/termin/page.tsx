import { Booker } from "@/components/cal/booker";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { H1, P } from "@/components/ui/typography";
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
      <div className="mb-8 flex flex-col gap-2">
        <H1>Buche deinen persönlichen Nachhilfetermin</H1>

        <div className="flex flex-row gap-8 justify-center items-center">
          <P>
            Wir kennen uns noch nicht? Dann ist ein Kennenlernen vermutlich eher
            was du suchst
          </P>

          <Button variant="outline" asChild>
            <Link href={routes.contact}>Mehr</Link>
          </Button>
        </div>
      </div>

      <Booker
        calUsername={bookerProps.calUsername}
        eventSlug={bookerProps.eventSlug}
      />
    </Section>
  );
}
