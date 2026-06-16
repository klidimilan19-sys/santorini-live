import { NextRequest, NextResponse } from "next/server";
import { generateTripPlan, type TripPlannerInput } from "@/lib/trip-planner";

const budgets = ["Budget", "Moderate", "Luxury"];
const styles = ["Relaxed", "Balanced", "Active", "Romantic", "Family"];
const transportation = ["Public transport", "Rental car", "ATV / Scooter", "Private transfers"];

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Partial<TripPlannerInput>;
  const days = Number(body.days);
  if (
    !Number.isInteger(days) ||
    days < 1 ||
    days > 14 ||
    !body.budget ||
    !budgets.includes(body.budget) ||
    !body.travelStyle ||
    !styles.includes(body.travelStyle) ||
    !body.transportation ||
    !transportation.includes(body.transportation)
  ) {
    return NextResponse.json({ error: "Valid trip preferences are required." }, { status: 400 });
  }

  const plan = await generateTripPlan(body as TripPlannerInput);
  return NextResponse.json(plan);
}
