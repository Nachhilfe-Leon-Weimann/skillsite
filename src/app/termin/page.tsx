import { Booker } from "@/components/cal/booker";
import { Container } from "@/components/container";
import { GradientBackground } from "@/components/ui/gradient-background";
import { getBookingDetails } from "@/lib/booking-details";

export default function Termin() {
  const bookerProps = getBookingDetails("nachhilfe");

  return (
    <GradientBackground className="h-full" show="bottom">
      <Container className="h-full mt-8">
        <Booker
          calUsername={bookerProps.calUsername}
          eventSlug={bookerProps.eventSlug}
        />
      </Container>
    </GradientBackground>
  );
}
