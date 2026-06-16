export type TripPlannerInput = {
  days: number;
  budget: "Budget" | "Moderate" | "Luxury";
  travelStyle: "Relaxed" | "Balanced" | "Active" | "Romantic" | "Family";
  transportation: "Public transport" | "Rental car" | "ATV / Scooter" | "Private transfers";
};

export type ItineraryDay = {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  tip: string;
};

export type TripPlan = {
  summary: string;
  days: ItineraryDay[];
  generatedBy: "mock-planner";
};

const dayTemplates = [
  {
    title: "Caldera introduction",
    morning: "Start in Fira and walk the caldera path toward Firostefani.",
    afternoon: "Continue to Imerovigli for lunch and views around Skaros Rock.",
    evening: "Watch sunset from a respectful public viewpoint, then dine in Fira.",
  },
  {
    title: "Oia and the north",
    morning: "Explore Oia before the busiest hours and visit the castle lanes.",
    afternoon: "Walk down to Ammoudi Bay or explore nearby Finikia.",
    evening: "Stay for golden hour or return after sunset for a calmer dinner.",
  },
  {
    title: "Volcanic south",
    morning: "Visit the Akrotiri archaeological site.",
    afternoon: "See the Red Beach viewpoint and continue to Megalochori.",
    evening: "Enjoy a village dinner or sunset near Akrotiri Lighthouse.",
  },
  {
    title: "Beach and local life",
    morning: "Choose Kamari for convenience or Perissa for a longer beach day.",
    afternoon: "Swim, relax and enjoy lunch along the waterfront.",
    evening: "Explore Pyrgos as the temperature cools.",
  },
  {
    title: "Caldera experience",
    morning: "Keep the morning slow with breakfast near your accommodation.",
    afternoon: "Join a licensed caldera sailing trip or volcano excursion.",
    evening: "Enjoy sunset from the water and a light dinner afterward.",
  },
  {
    title: "Wine and villages",
    morning: "Explore traditional lanes in Pyrgos.",
    afternoon: "Visit a local winery and continue through Megalochori.",
    evening: "Reserve a relaxed dinner featuring Santorini produce.",
  },
  {
    title: "Choose your favorite",
    morning: "Return to a favorite village or take the Fira-Oia hike.",
    afternoon: "Shop locally, visit a museum or add a final beach stop.",
    evening: "Finish with an unhurried sunset and farewell meal.",
  },
];

export function createMockTripPlan(input: TripPlannerInput): TripPlan {
  const days = Array.from({ length: Math.min(Math.max(input.days, 1), 14) }, (_, index) => {
    const template = dayTemplates[index % dayTemplates.length];
    return {
      day: index + 1,
      ...template,
      tip: buildTip(input, index),
    };
  });

  return {
    summary: `${input.days}-day ${input.travelStyle.toLowerCase()} Santorini plan with a ${input.budget.toLowerCase()} budget, using ${input.transportation.toLowerCase()}.`,
    days,
    generatedBy: "mock-planner",
  };
}

function buildTip(input: TripPlannerInput, index: number) {
  if (input.transportation === "Public transport") return "Group stops by bus route and check the current timetable before leaving.";
  if (input.transportation === "Private transfers") return "Confirm pickup times the previous evening for a smooth day.";
  if (input.travelStyle === "Family") return "Keep shade, water and a flexible rest break in the plan.";
  if (input.travelStyle === "Romantic") return "Reserve one special experience and leave the rest of the evening unhurried.";
  if (input.budget === "Budget") return "Use a bakery or local takeaway for one meal and spend time at free viewpoints.";
  return index % 2 === 0 ? "Start early for cooler temperatures and quieter paths." : "Leave a little flexibility for wind and traffic conditions.";
}

// Replace this implementation with an AI provider call once server-side credentials
// and persistence are configured. The UI and API consume the stable TripPlan shape.
export async function generateTripPlan(input: TripPlannerInput) {
  return createMockTripPlan(input);
}
