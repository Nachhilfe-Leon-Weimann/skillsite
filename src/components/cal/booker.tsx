"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

type BookerProps = {
  calUsername: string;
  eventSlug: string;
};

export function Booker({ calUsername, eventSlug }: BookerProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: eventSlug });
      cal("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#5046BC" },
          dark: { "cal-brand": "#5046BC" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, [eventSlug]);

  return (
    <Cal
      namespace={eventSlug}
      calLink={`${calUsername}/${eventSlug}`}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
    />
  );
}
