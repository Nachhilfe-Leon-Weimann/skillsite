import { Booker } from "@/components/cal/booker";
import { Section } from "@/components/layout/section";
import { getBookingDetails } from "@/lib/booking-details";

export default function Termin() {
  const bookerProps = getBookingDetails("nachhilfe");

  return (
    <Section gradient="bottom" containerClassName="mb-0" offsetFooter>
      <Booker
        calUsername={bookerProps.calUsername}
        eventSlug={bookerProps.eventSlug}
      />
    </Section>
  );
}
