import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    stage: 0,
    current: false,
    area: "Fourways, Sandton",
    nextSlots: [
      { start: "2026-05-27T14:00:00", end: "2026-05-27T16:30:00" },
      { start: "2026-05-28T06:00:00", end: "2026-05-28T08:30:00" },
    ],
  });
}
