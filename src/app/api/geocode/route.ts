import { NextResponse } from "next/server";
import type { GeocodeResult } from "@/lib/venue-geography";

type NominatimResult = {
  lat: string;
  lon: string;
  display_name: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();
  if (!q) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", `${q}, UK`);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  url.searchParams.set("countrycodes", "gb");

  try {
    const response = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        "User-Agent": "AccessStampVenueFinder/1.0 (access-stamp.co.uk)",
      },
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Geocoding failed" }, { status: 502 });
    }

    const data = (await response.json()) as NominatimResult[];
    const hit = data[0];
    if (!hit) {
      return NextResponse.json({ error: "Location not found" }, { status: 404 });
    }

    const result: GeocodeResult = {
      lat: Number(hit.lat),
      lng: Number(hit.lon),
      label: hit.display_name.split(",").slice(0, 3).join(", "),
    };

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Geocoding unavailable" }, { status: 502 });
  }
}
