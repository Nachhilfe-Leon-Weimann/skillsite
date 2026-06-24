import { NextResponse } from "next/server";

import { getAvailability } from "@/lib/booking/availability";
import { bookingEvents, type BookingEventKey } from "@/lib/booking/config";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const event = params.get("event") as BookingEventKey | null;

  if (!event || !(event in bookingEvents)) {
    return NextResponse.json({ error: "Unknown event" }, { status: 400 });
  }

  const now = new Date();
  const year = Number(params.get("year")) || now.getFullYear();
  const month = Number(params.get("month")) || now.getMonth() + 1;
  const durationMinutes =
    Number(params.get("duration")) || bookingEvents[event].defaultDuration;

  if (month < 1 || month > 12 || year < 2000 || year > 2100) {
    return NextResponse.json({ error: "Invalid month" }, { status: 400 });
  }

  const data = await getAvailability({ event, year, month, durationMinutes });
  return NextResponse.json(data);
}
