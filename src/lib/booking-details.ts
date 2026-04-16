const calUsername = process.env.NEXT_PUBLIC_BOOKING_CAL_USERNAME || "";
const eventSlugs = {
  kennenlernen: process.env.NEXT_PUBLIC_BOOKING_EVENT_SLUG_KENNENLERNEN || "",
  nachhilfe: process.env.NEXT_PUBLIC_BOOKING_EVENT_SLUG_TERMIN || "",
};

export function getBookingDetails(event: keyof typeof eventSlugs) {
  return {
    calUsername,
    eventSlug: eventSlugs[event],
  };
}
