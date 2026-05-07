"use client";

import dynamic from "next/dynamic";

import { ConsentGate } from "@/components/consent/consent-gate";
import type { BookerProps } from "@/components/cal/booker-embed";

const BookerEmbed = dynamic(
  () => import("@/components/cal/booker-embed").then((mod) => mod.BookerEmbed),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-225 w-full md:min-h-250 lg:min-h-150"
        aria-hidden="true"
      />
    ),
  },
);

export function Booker(props: BookerProps) {
  return (
    <ConsentGate
      serviceName="Cal.com"
      title="Terminbuchung ist blockiert"
      description="Die Terminbuchung wird über Cal.com geladen. Hierfür ist deine Zustimmung zu externen Diensten erforderlich."
      actionLabel="Terminbuchung erlauben"
    >
      <BookerEmbed {...props} />
    </ConsentGate>
  );
}
