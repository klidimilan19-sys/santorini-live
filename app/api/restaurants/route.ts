import { NextResponse } from "next/server";
import { restaurants } from "@/data/mock-data";

export const revalidate = 1800;

export async function GET() {
  return NextResponse.json(restaurants, {
    headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=300" },
  });
}
