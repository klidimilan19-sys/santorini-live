import { santoriniVillages, type SantoriniVillage } from "@/data/villages";

export type GuideTopic = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  intro: string;
  highlights: Array<{
    title: string;
    description: string;
    location: string;
    duration: string;
  }>;
  tips: string[];
};

export type VillageGuide = SantoriniVillage & {
  tagline: string;
  overview: string;
  thingsToDo: string[];
  nearbyAttractions: string[];
  cameraDescription: string;
};

export const villageGuides: VillageGuide[] = [
  {
    ...santoriniVillages[0],
    slug: "oia",
    name: "Oia",
    tagline: "Blue domes, cliff paths and Santorini's famous sunset.",
    overview: "Oia crowns the island's northern cliffs with cave houses, galleries and wide caldera views. Visit early for quiet lanes, then stay for golden hour.",
    thingsToDo: ["Walk to Oia Castle", "Explore the blue-domed church lanes", "Descend to Ammoudi Bay", "Browse local galleries"],
    nearbyAttractions: ["Ammoudi Bay", "Thirassia viewpoints", "Finikia village", "Baxedes Beach"],
    cameraDescription: "Future approved camera source showing general weather and visibility around Oia.",
  },
  {
    ...santoriniVillages[1],
    slug: "fira",
    name: "Fira",
    tagline: "The lively capital for museums, shopping and caldera views.",
    overview: "Fira is Santorini's transport and social hub. Its cliffside paths mix museums, restaurants, nightlife and direct connections across the island.",
    thingsToDo: ["Visit the Museum of Prehistoric Thira", "Walk the caldera promenade", "Ride the cable car", "Explore the evening food scene"],
    nearbyAttractions: ["Firostefani", "Old Port", "Exo Gialos Beach", "Kontochori"],
    cameraDescription: "Future approved camera source showing visibility over Fira and the caldera.",
  },
  {
    ...santoriniVillages[2],
    slug: "imerovigli",
    name: "Imerovigli",
    tagline: "Quiet luxury and some of the island's highest caldera views.",
    overview: "Known as the balcony of the Aegean, Imerovigli offers serene lanes, dramatic hotels and a front-row view of Skaros Rock.",
    thingsToDo: ["Hike to Skaros Rock", "Walk to Fira at sunrise", "Enjoy a caldera breakfast", "Photograph Anastasi Church"],
    nearbyAttractions: ["Skaros Rock", "Firostefani", "Theoskepasti chapel", "Vourvoulos"],
    cameraDescription: "Future approved camera source showing caldera conditions from Imerovigli.",
  },
  {
    ...santoriniVillages[3],
    slug: "kamari",
    name: "Kamari",
    tagline: "A relaxed beach town with an easy waterfront promenade.",
    overview: "Kamari pairs a long black-sand beach with restaurants, family-friendly facilities and convenient access to Ancient Thera.",
    thingsToDo: ["Swim at Kamari Beach", "Walk the promenade", "Hike to Ancient Thera", "Watch an open-air cinema"],
    nearbyAttractions: ["Ancient Thera", "Mesa Vouno", "Monolithos Beach", "Wine Museum"],
    cameraDescription: "Future approved camera source showing beach and waterfront conditions in Kamari.",
  },
  {
    ...santoriniVillages[4],
    slug: "perissa",
    name: "Perissa",
    tagline: "Black sand, water sports and an easy-going beach atmosphere.",
    overview: "Perissa is a practical base for beach days, casual tavernas and active travelers, with a long shoreline stretching toward Perivolos.",
    thingsToDo: ["Relax on Perissa Beach", "Try paddleboarding", "Visit Panagia Katefiani", "Cycle toward Perivolos"],
    nearbyAttractions: ["Perivolos Beach", "Mesa Vouno", "Emporio", "Ancient Thera trail"],
    cameraDescription: "Future approved camera source showing sea and weather conditions in Perissa.",
  },
  {
    ...santoriniVillages[5],
    slug: "pyrgos",
    name: "Pyrgos",
    tagline: "A hilltop maze of traditional lanes and panoramic views.",
    overview: "Pyrgos preserves a slower village rhythm around a Venetian castle. Its elevated position gives broad views in every direction.",
    thingsToDo: ["Climb to the castle", "Explore hidden chapels", "Taste local wine", "Watch sunset from the village rooftops"],
    nearbyAttractions: ["Prophet Elias Monastery", "Megalochori", "Exo Gonia", "Art Space Winery"],
    cameraDescription: "Future approved camera source showing visibility from the Pyrgos hilltop.",
  },
  {
    ...santoriniVillages[6],
    slug: "akrotiri",
    name: "Akrotiri",
    tagline: "Ancient history, red cliffs and the island's quieter southwest.",
    overview: "Akrotiri is best known for its Bronze Age settlement, but the surrounding peninsula also holds coves, a lighthouse and striking volcanic landscapes.",
    thingsToDo: ["Tour Ancient Akrotiri", "See Red Beach from the viewpoint", "Visit Akrotiri Lighthouse", "Take a caldera boat trip"],
    nearbyAttractions: ["Red Beach", "White Beach", "Akrotiri Lighthouse", "Mesa Pigadia"],
    cameraDescription: "Future approved camera source showing southwest coast weather near Akrotiri.",
  },
  {
    ...santoriniVillages[7],
    slug: "megalochori",
    name: "Megalochori",
    tagline: "Wine heritage, peaceful squares and beautifully preserved homes.",
    overview: "Megalochori is a compact traditional village with bell towers, neoclassical houses, underground wine cellars and a welcoming central square.",
    thingsToDo: ["Walk under the bell tower", "Join a wine tasting", "Relax in the village square", "Discover historic cave houses"],
    nearbyAttractions: ["Heart of Santorini viewpoint", "Venetsanos Winery", "Pyrgos", "Thermes Beach"],
    cameraDescription: "Future approved camera source showing general conditions around Megalochori.",
  },
];

export const guideTopics: GuideTopic[] = [
  {
    slug: "what-to-do",
    title: "What To Do",
    eyebrow: "Start exploring",
    description: "The essential Santorini experiences, from caldera walks to volcanic beaches.",
    intro: "Mix famous views with local villages, beach time and one experience that takes you onto the water.",
    highlights: [
      { title: "Fira to Oia hike", description: "Follow the caldera rim through Firostefani and Imerovigli.", location: "Fira to Oia", duration: "3-5 hours" },
      { title: "Volcano boat trip", description: "Sail through the caldera with stops near the volcanic islands.", location: "Old Port", duration: "Half day" },
      { title: "Village wine route", description: "Pair Pyrgos and Megalochori with a local winery visit.", location: "Central Santorini", duration: "Half day" },
    ],
    tips: ["Reserve sunset activities early in high season.", "Keep one flexible block for wind or ferry changes.", "Use buses or a transfer after the Fira-Oia hike."],
  },
  {
    slug: "beaches",
    title: "Beaches",
    eyebrow: "Volcanic coast",
    description: "Black sand, dramatic cliffs and relaxed swimming spots around the island.",
    intro: "Santorini beaches are known for volcanic scenery rather than soft white sand. Water shoes and shade make beach days more comfortable.",
    highlights: [
      { title: "Perissa & Perivolos", description: "Long organized shoreline with tavernas and water sports.", location: "Southeast coast", duration: "Half or full day" },
      { title: "Kamari Beach", description: "Family-friendly waterfront with an easy promenade.", location: "Kamari", duration: "Half day" },
      { title: "Red Beach viewpoint", description: "Admire the red volcanic cliffs from the safe designated viewpoint.", location: "Akrotiri", duration: "45 minutes" },
    ],
    tips: ["Follow local safety signs near cliff-backed beaches.", "Black sand becomes very hot at midday.", "Check wind direction before choosing a coast."],
  },
  {
    slug: "sunset-spots",
    title: "Sunset Spots",
    eyebrow: "Golden hour",
    description: "Classic caldera views and quieter places to watch the sky change.",
    intro: "Oia is iconic, but Pyrgos, Akrotiri Lighthouse and the Fira-Imerovigli path can offer more space and equally memorable light.",
    highlights: [
      { title: "Oia Castle", description: "The famous postcard angle over windmills and white houses.", location: "Oia", duration: "Arrive 90 minutes early" },
      { title: "Pyrgos castle", description: "A panoramic island-wide sunset from the hilltop.", location: "Pyrgos", duration: "1-2 hours" },
      { title: "Akrotiri Lighthouse", description: "Open sea views from the quiet southwest tip.", location: "Akrotiri", duration: "1 hour" },
    ],
    tips: ["Respect rooftops and private property.", "Stay after sunset for softer colors and fewer crowds.", "Bring a light layer when the wind picks up."],
  },
  {
    slug: "experiences",
    title: "Experiences",
    eyebrow: "Make it memorable",
    description: "Sailing, food, wine, history and active ways to experience Santorini.",
    intro: "Choose experiences that reveal how the island was formed and how locals live today.",
    highlights: [
      { title: "Caldera sailing", description: "Cruise volcanic waters with swimming and sunset options.", location: "Vlychada or Ammoudi", duration: "5 hours" },
      { title: "Santorini wine tasting", description: "Discover volcanic vineyards and indigenous grape varieties.", location: "Pyrgos & Megalochori", duration: "3-4 hours" },
      { title: "Akrotiri archaeology", description: "Explore the preserved Bronze Age settlement with a guide.", location: "Akrotiri", duration: "2 hours" },
    ],
    tips: ["Use licensed local operators.", "Confirm pickup details before departure.", "Book smaller groups for a more personal experience."],
  },
  {
    slug: "hidden-gems",
    title: "Hidden Gems",
    eyebrow: "Beyond the postcards",
    description: "Quieter corners, local villages and rewarding stops away from the busiest paths.",
    intro: "The island feels different when you step away from the caldera main streets and explore early or late in the day.",
    highlights: [
      { title: "Emporio kasteli", description: "Narrow medieval lanes within a fortified village core.", location: "Emporio", duration: "1-2 hours" },
      { title: "Finikia lanes", description: "Traditional cave homes and peaceful paths beside Oia.", location: "Finikia", duration: "1 hour" },
      { title: "Heart of Santorini", description: "A small natural opening framing the caldera.", location: "Megalochori", duration: "45 minutes" },
    ],
    tips: ["Keep voices low in residential lanes.", "Avoid geotagging fragile or private locations.", "Support village cafes and independent shops."],
  },
  {
    slug: "1-day-guide",
    title: "1 Day Guide",
    eyebrow: "Santorini essentials",
    description: "A focused first visit with caldera views, a traditional village and sunset.",
    intro: "With one day, keep transfers simple and choose quality over trying to cover the entire island.",
    highlights: [
      { title: "Morning in Fira", description: "Walk the caldera edge before the busiest hours.", location: "Fira", duration: "2 hours" },
      { title: "Lunch and lanes in Pyrgos", description: "Explore the hilltop village and enjoy a relaxed meal.", location: "Pyrgos", duration: "3 hours" },
      { title: "Oia golden hour", description: "Arrive early, wander beyond the main lane and stay for sunset.", location: "Oia", duration: "3 hours" },
    ],
    tips: ["Pre-arrange transfers when arriving by cruise.", "Do not attempt both a beach day and a full caldera itinerary.", "Check your final ferry or flight time carefully."],
  },
  {
    slug: "3-day-guide",
    title: "3 Day Guide",
    eyebrow: "Long weekend",
    description: "Caldera villages, volcanic history and a full day by the sea.",
    intro: "Three days gives enough time for the island's essential contrasts without rushing every stop.",
    highlights: [
      { title: "Day 1: Caldera villages", description: "Fira, Imerovigli and Oia with a sunset finish.", location: "North caldera", duration: "Full day" },
      { title: "Day 2: South island", description: "Akrotiri, a beach stop and Megalochori.", location: "South Santorini", duration: "Full day" },
      { title: "Day 3: Sail or hike", description: "Choose a caldera cruise or the Fira-Oia trail.", location: "Caldera", duration: "Full day" },
    ],
    tips: ["Group nearby locations each day.", "Reserve one special dinner.", "Keep the sailing day flexible if winds are forecast."],
  },
  {
    slug: "7-day-guide",
    title: "7 Day Guide",
    eyebrow: "A full island week",
    description: "A balanced week of villages, beaches, food, history and slow mornings.",
    intro: "A week lets you revisit favorite places and leave room for weather, spontaneous meals and quieter local experiences.",
    highlights: [
      { title: "Days 1-2: Caldera", description: "Explore Fira, Imerovigli and Oia at different times of day.", location: "West coast", duration: "2 days" },
      { title: "Days 3-4: South & beaches", description: "Akrotiri, Megalochori, Kamari and Perissa.", location: "South and east", duration: "2 days" },
      { title: "Days 5-7: Experiences", description: "Sailing, wine, hiking and one completely unplanned day.", location: "Island-wide", duration: "3 days" },
    ],
    tips: ["Change accommodation only if it improves your trip style.", "Include one no-car day.", "Use the final day for favorites rather than a long checklist."],
  },
  {
    slug: "family-guide",
    title: "Family Guide",
    eyebrow: "Easy island days",
    description: "Practical, engaging Santorini ideas for families with children.",
    intro: "Build days around short transfers, shade and swimming, with one main activity rather than a packed schedule.",
    highlights: [
      { title: "Kamari beach day", description: "Organized facilities, restaurants and a flat promenade.", location: "Kamari", duration: "Half day" },
      { title: "Lost Atlantis experience", description: "An interactive introduction to myths and island history.", location: "Megalochori area", duration: "2 hours" },
      { title: "Gentle village evening", description: "Explore Pyrgos before dinner when temperatures cool.", location: "Pyrgos", duration: "2-3 hours" },
    ],
    tips: ["Many caldera lanes include steep steps.", "Carry water, hats and reef-safe sunscreen.", "Ask transport providers for child seats in advance."],
  },
  {
    slug: "honeymoon-guide",
    title: "Honeymoon Guide",
    eyebrow: "Romantic Santorini",
    description: "Slow mornings, private experiences and unforgettable caldera evenings.",
    intro: "Pair one or two signature experiences with generous time to enjoy your hotel and the island's changing light.",
    highlights: [
      { title: "Private sailing", description: "A quieter caldera cruise timed around sunset.", location: "Caldera", duration: "5 hours" },
      { title: "Imerovigli stay", description: "Caldera views with a calmer atmosphere than central Oia.", location: "Imerovigli", duration: "2 nights+" },
      { title: "Winery dinner", description: "Taste local wines before a relaxed dinner in the vineyards.", location: "Pyrgos", duration: "Evening" },
    ],
    tips: ["Book sunset-view restaurants well ahead.", "Leave room for private time at your accommodation.", "Arrange transfers instead of driving after wine tasting."],
  },
  {
    slug: "budget-guide",
    title: "Budget Guide",
    eyebrow: "More island, less spend",
    description: "Enjoy Santorini with buses, local meals and the island's best free views.",
    intro: "Stay near reliable bus routes, make lunch your main restaurant meal and build days around walks, villages and beaches.",
    highlights: [
      { title: "Caldera walk", description: "One of the island's best experiences costs nothing.", location: "Fira to Imerovigli", duration: "2 hours" },
      { title: "Bus beach day", description: "Take the local bus to Kamari or Perissa.", location: "East coast", duration: "Full day" },
      { title: "Pyrgos sunset picnic", description: "Pick up local food and find a respectful public viewpoint.", location: "Pyrgos", duration: "Evening" },
    ],
    tips: ["Check current bus timetables locally.", "Choose accommodation with a kitchenette.", "Avoid relying on taxis for every transfer."],
  },
  {
    slug: "luxury-guide",
    title: "Luxury Guide",
    eyebrow: "Elevated island time",
    description: "Private transfers, tailored experiences and exceptional caldera stays.",
    intro: "Santorini luxury works best when convenience creates more time: fewer queues, thoughtful reservations and experiences shaped around you.",
    highlights: [
      { title: "Caldera suite", description: "Choose privacy, sunset orientation and direct transfer access.", location: "Imerovigli or Oia", duration: "3 nights+" },
      { title: "Private island tour", description: "Visit villages and wineries with a local guide and flexible timing.", location: "Island-wide", duration: "Full day" },
      { title: "Chef-led dining", description: "Reserve a tasting menu or private dinner featuring local produce.", location: "Caldera villages", duration: "Evening" },
    ],
    tips: ["Ask hotels to coordinate arrival logistics.", "Confirm whether suites require many steps.", "Book signature experiences before choosing daily restaurant plans."],
  },
];

export const guideCategories = [
  { title: "What To Do", href: "/guide/what-to-do", description: "Essential sights and activities" },
  { title: "Villages", href: "/guide/villages", description: "Explore eight island communities" },
  { title: "Beaches", href: "/guide/beaches", description: "Volcanic shores and swimming" },
  { title: "Sunset Spots", href: "/guide/sunset-spots", description: "Classic and quieter viewpoints" },
  { title: "Experiences", href: "/guide/experiences", description: "Sailing, wine, food and history" },
  { title: "Hidden Gems", href: "/guide/hidden-gems", description: "Go beyond the postcards" },
];

export const itineraryGuides = [
  { title: "1 Day Guide", href: "/guide/1-day-guide", description: "The essentials without the rush" },
  { title: "3 Day Guide", href: "/guide/3-day-guide", description: "A balanced long weekend" },
  { title: "7 Day Guide", href: "/guide/7-day-guide", description: "A complete island week" },
  { title: "Family Guide", href: "/guide/family-guide", description: "Easy days for all ages" },
  { title: "Honeymoon Guide", href: "/guide/honeymoon-guide", description: "Romantic island moments" },
  { title: "Budget Guide", href: "/guide/budget-guide", description: "See more and spend wisely" },
  { title: "Luxury Guide", href: "/guide/luxury-guide", description: "Private, tailored Santorini" },
];

export function getGuideTopic(slug: string) {
  return guideTopics.find((topic) => topic.slug === slug);
}

export function getVillageGuide(slug: string) {
  return villageGuides.find((village) => village.slug === slug);
}
