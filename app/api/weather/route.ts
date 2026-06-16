import { NextResponse } from "next/server";
import { islandStatus, weatherUpdates } from "@/data/mock-data";
import { getSantoriniWeather } from "@/lib/weather";

export const revalidate = 1800;

export async function GET() {
  try {
    const weather = await getSantoriniWeather();
    return NextResponse.json(weather, {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=300",
      },
    });
  } catch {
    return NextResponse.json(
      {
        current: {
          temperature: islandStatus.temperature,
          condition: islandStatus.condition,
          feelsLike: islandStatus.feelsLike,
          windSpeed: islandStatus.windSpeed,
          windDirection: islandStatus.windDirection,
          uvIndex: islandStatus.uvIndex,
          uvLevel: islandStatus.uvLevel,
        },
        forecast: weatherUpdates,
        lastUpdated: islandStatus.lastUpdated,
        source: "Fallback mock data",
      },
      { status: 200, headers: { "Cache-Control": "public, s-maxage=300" } },
    );
  }
}
