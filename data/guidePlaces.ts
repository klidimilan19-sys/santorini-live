import { santoriniVillages } from "@/data/villages";

const village = Object.fromEntries(santoriniVillages.map((item) => [item.slug, item]));

export type GuidePlaceImage = {
  time: "morning" | "afternoon" | "sunset" | "night";
  imageUrl: string;
  alt: string;
  credit: string;
};

export type GuidePlace = {
  id: number;
  slug: string;
  name: string;
  category: string;
  village: string;
  heroImage: string;
  heroImageAlt: string;
  galleryImages: GuidePlaceImage[];
  imageCredit: string;
  overview: string;
  history: string;
  famousPoints: string[];
  photoSpots: string[];
  bestTime: string;
  nearbyPlaces: string[];
};

const redBeachImage =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Red_Beach_-_Panorama_-_Santorini_-_Grecia_-_agosto_2018.jpg/500px-Red_Beach_-_Panorama_-_Santorini_-_Grecia_-_agosto_2018.jpg";

const sunsetImage = "https://commons.wikimedia.org/wiki/Special:FilePath/Oia%20Santorini%20sunset.jpg";

function timeGallery(place: {
  morning: string;
  afternoon: string;
  sunset: string;
  night: string;
  altBase: string;
  credit: string;
}): GuidePlaceImage[] {
  return [
    { time: "morning", imageUrl: place.morning, alt: `${place.altBase} in the morning`, credit: place.credit },
    { time: "afternoon", imageUrl: place.afternoon, alt: `${place.altBase} in the afternoon`, credit: place.credit },
    { time: "sunset", imageUrl: place.sunset, alt: `${place.altBase} at sunset`, credit: place.credit },
    { time: "night", imageUrl: place.night, alt: `${place.altBase} at night`, credit: place.credit },
  ];
}

export const guidePlaces: GuidePlace[] = [
  {
    id: 1,
    slug: "oia",
    name: "Oia",
    category: "Village",
    village: "Oia",
    heroImage: village.oia.imageUrl,
    heroImageAlt: village.oia.imageAlt,
    imageCredit: village.oia.imageCredit,
    overview: "Oia is Santorini's most iconic cliff village, known for white cave houses, blue domes, caldera views and golden sunset light.",
    history: "Oia grew as a maritime settlement with captains' houses, cave homes and narrow lanes shaped by the volcanic cliff. Today it preserves much of its Cycladic character while serving as one of the island's signature viewpoints.",
    famousPoints: ["Oia Castle", "Blue dome church lanes", "Ammoudi Bay steps", "Maritime Museum", "Caldera path toward Fira"],
    photoSpots: ["Oia Castle viewpoint", "Blue domes above the caldera", "Windmill lane", "Ammoudi Bay from above"],
    bestTime: "Early morning for quiet streets, then 90 minutes before sunset for the famous caldera light.",
    nearbyPlaces: ["Ammoudi Bay", "Finikia", "Baxedes Beach", "Thirassia viewpoints"],
    galleryImages: timeGallery({
      morning: village.oia.imageUrl,
      afternoon: village.oia.imageUrl,
      sunset: sunsetImage,
      night: sunsetImage,
      altBase: "Oia white houses and caldera view",
      credit: village.oia.imageCredit,
    }),
  },
  {
    id: 2,
    slug: "fira",
    name: "Fira",
    category: "Village",
    village: "Fira",
    heroImage: village.fira.imageUrl,
    heroImageAlt: village.fira.imageAlt,
    imageCredit: village.fira.imageCredit,
    overview: "Fira is the island capital and the easiest place to combine caldera views, museums, shopping, nightlife and bus connections.",
    history: "Fira became Santorini's administrative center after older settlements were damaged by earthquakes. Its cliff edge grew around the old port, cable car and commercial lanes.",
    famousPoints: ["Three Bells of Fira", "Old Port cable car", "Museum of Prehistoric Thira", "Caldera promenade", "Firostefani walk"],
    photoSpots: ["Three Bells viewpoint", "Cable car area", "Fira-Firostefani path", "Cliffside terraces"],
    bestTime: "Morning for museums and photos, golden hour for the caldera path, evening for restaurants and nightlife.",
    nearbyPlaces: ["Firostefani", "Imerovigli", "Old Port", "Kontochori"],
    galleryImages: timeGallery({
      morning: village.fira.imageUrl,
      afternoon: village.fira.imageUrl,
      sunset: sunsetImage,
      night: village.fira.imageUrl,
      altBase: "Fira caldera cliff town",
      credit: village.fira.imageCredit,
    }),
  },
  {
    id: 3,
    slug: "imerovigli",
    name: "Imerovigli",
    category: "Village",
    village: "Imerovigli",
    heroImage: village.imerovigli.imageUrl,
    heroImageAlt: village.imerovigli.imageAlt,
    imageCredit: village.imerovigli.imageCredit,
    overview: "Imerovigli sits high above the caldera with peaceful paths, luxury stays and a dramatic view of Skaros Rock.",
    history: "The village developed around Skaros, once one of Santorini's strongest medieval fortress sites. Its elevated position made it a strategic lookout over the caldera.",
    famousPoints: ["Skaros Rock", "Theoskepasti Chapel", "Anastasi Church", "Fira to Oia hiking path", "Caldera terraces"],
    photoSpots: ["Skaros trail", "Anastasi Church dome", "Caldera hotel terraces", "Path toward Firostefani"],
    bestTime: "Sunrise for quiet paths or late afternoon for soft light on Skaros and the caldera.",
    nearbyPlaces: ["Firostefani", "Fira", "Vourvoulos", "Skaros Rock"],
    galleryImages: timeGallery({
      morning: village.imerovigli.imageUrl,
      afternoon: village.imerovigli.imageUrl,
      sunset: sunsetImage,
      night: village.imerovigli.imageUrl,
      altBase: "Imerovigli and Skaros Rock",
      credit: village.imerovigli.imageCredit,
    }),
  },
  {
    id: 4,
    slug: "kamari",
    name: "Kamari",
    category: "Beach",
    village: "Kamari",
    heroImage: village.kamari.imageUrl,
    heroImageAlt: village.kamari.imageAlt,
    imageCredit: village.kamari.imageCredit,
    overview: "Kamari is a relaxed black-sand beach town with an easy promenade, organized sunbeds, restaurants and family-friendly facilities.",
    history: "The east coast developed as a beach resort area after tourism expanded across Santorini. Mesa Vouno mountain and Ancient Thera give Kamari a strong historic backdrop.",
    famousPoints: ["Kamari Black Beach", "Waterfront promenade", "Mesa Vouno", "Open Air Cinema", "Ancient Thera route"],
    photoSpots: ["Beach umbrellas with Mesa Vouno", "Promenade at blue hour", "Black sand shoreline", "Mountain backdrop"],
    bestTime: "Morning for swimming before the sand gets hot, or evening for a gentle promenade walk.",
    nearbyPlaces: ["Ancient Thera", "Mesa Vouno", "Monolithos Beach", "Wine Museum"],
    galleryImages: timeGallery({
      morning: village.kamari.imageUrl,
      afternoon: village.kamari.imageUrl,
      sunset: village.kamari.imageUrl,
      night: village.kamari.imageUrl,
      altBase: "Kamari black sand beach",
      credit: village.kamari.imageCredit,
    }),
  },
  {
    id: 5,
    slug: "perissa",
    name: "Perissa",
    category: "Beach",
    village: "Perissa",
    heroImage: village.perissa.imageUrl,
    heroImageAlt: village.perissa.imageAlt,
    imageCredit: village.perissa.imageCredit,
    overview: "Perissa offers a long black-sand beach, beach bars, water sports and views toward Mesa Vouno mountain.",
    history: "Perissa's shoreline became one of the island's best-known beach areas, with its volcanic sand and connection to Ancient Thera trails above Mesa Vouno.",
    famousPoints: ["Perissa Beach", "Perivolos Beach", "Panagia Katefiani", "Mesa Vouno", "Ancient Thera trail"],
    photoSpots: ["Mesa Vouno mountain view", "Black sand shoreline", "Beach bar rows", "Sunset colors over the water"],
    bestTime: "Late morning to afternoon for beach facilities, or sunset for softer light and cooler sand.",
    nearbyPlaces: ["Perivolos", "Emporio", "Ancient Thera", "Kamari"],
    galleryImages: timeGallery({
      morning: village.perissa.imageUrl,
      afternoon: village.perissa.imageUrl,
      sunset: village.perissa.imageUrl,
      night: village.perissa.imageUrl,
      altBase: "Perissa Beach with Mesa Vouno mountain",
      credit: village.perissa.imageCredit,
    }),
  },
  {
    id: 6,
    slug: "akrotiri-red-beach",
    name: "Red Beach / Akrotiri",
    category: "Beach and History",
    village: "Akrotiri",
    heroImage: redBeachImage,
    heroImageAlt: "Red Beach volcanic cliffs and shoreline near Akrotiri in Santorini",
    imageCredit: "Wikimedia Commons: Red Beach - Panorama - Santorini - Grecia - agosto 2018.jpg",
    overview: "Red Beach is one of Santorini's most recognizable volcanic landscapes, best viewed from the safe designated viewpoint near Akrotiri.",
    history: "The red cliffs reveal Santorini's volcanic geology. Nearby Akrotiri is one of the Aegean's most important Bronze Age archaeological sites.",
    famousPoints: ["Red Beach viewpoint", "Akrotiri Archaeological Site", "Akrotiri Lighthouse", "White Beach boat route", "Mesa Pigadia"],
    photoSpots: ["Viewpoint above Red Beach", "Cliff color contrast", "Akrotiri coastal road", "Lighthouse sunset area"],
    bestTime: "Morning for safer, cooler viewing from the designated viewpoint. Follow local safety signs near cliffs.",
    nearbyPlaces: ["Akrotiri Archaeological Site", "White Beach", "Akrotiri Lighthouse", "Mesa Pigadia"],
    galleryImages: timeGallery({
      morning: redBeachImage,
      afternoon: redBeachImage,
      sunset: redBeachImage,
      night: redBeachImage,
      altBase: "Red Beach volcanic cliffs near Akrotiri",
      credit: "Wikimedia Commons: Red Beach - Panorama - Santorini - Grecia - agosto 2018.jpg",
    }),
  },
  {
    id: 7,
    slug: "pyrgos",
    name: "Pyrgos",
    category: "Village",
    village: "Pyrgos",
    heroImage: village.pyrgos.imageUrl,
    heroImageAlt: village.pyrgos.imageAlt,
    imageCredit: village.pyrgos.imageCredit,
    overview: "Pyrgos is a traditional hill village with old lanes, castle remains, churches, wine stops and panoramic island views.",
    history: "Once an important fortified settlement, Pyrgos still keeps a medieval village layout around its kasteli and offers a calmer rhythm than the caldera towns.",
    famousPoints: ["Pyrgos Kasteli", "Old village lanes", "Prophet Elias views", "Art Space Winery", "Traditional chapels"],
    photoSpots: ["Castle steps", "Bell towers", "Whitewashed lanes", "Village rooftops at sunset"],
    bestTime: "Late afternoon for cooler walking and sunset views from the upper lanes.",
    nearbyPlaces: ["Prophet Elias Monastery", "Megalochori", "Exo Gonia", "Art Space Winery"],
    galleryImages: timeGallery({
      morning: village.pyrgos.imageUrl,
      afternoon: village.pyrgos.imageUrl,
      sunset: sunsetImage,
      night: village.pyrgos.imageUrl,
      altBase: "Traditional Pyrgos village streets",
      credit: village.pyrgos.imageCredit,
    }),
  },
  {
    id: 8,
    slug: "sunset-spots",
    name: "Sunset spots",
    category: "Viewpoints",
    village: "Oia, Imerovigli, Pyrgos and Akrotiri",
    heroImage: sunsetImage,
    heroImageAlt: "Sunset over Oia and the Santorini caldera",
    imageCredit: "Wikimedia Commons: Oia Santorini sunset.jpg",
    overview: "Santorini sunsets are not only in Oia. The island has classic, quiet and panoramic options depending on your style.",
    history: "The caldera's west-facing cliffs and volcanic sea basin create the dramatic light that made Santorini famous for sunset travel.",
    famousPoints: ["Oia Castle", "Imerovigli caldera path", "Pyrgos Kasteli", "Akrotiri Lighthouse", "Fira-Firostefani path"],
    photoSpots: ["Oia Castle windmills", "Skaros Rock silhouette", "Pyrgos rooftops", "Akrotiri Lighthouse horizon"],
    bestTime: "Arrive 60-90 minutes before sunset, then stay after the sun drops for softer colors and fewer crowds.",
    nearbyPlaces: ["Oia", "Imerovigli", "Pyrgos", "Akrotiri Lighthouse"],
    galleryImages: timeGallery({
      morning: village.imerovigli.imageUrl,
      afternoon: village.pyrgos.imageUrl,
      sunset: sunsetImage,
      night: sunsetImage,
      altBase: "Santorini caldera sunset viewpoint",
      credit: "Wikimedia Commons: Oia Santorini sunset.jpg",
    }),
  },
];

export function getGuidePlace(slug: string) {
  return guidePlaces.find((place) => place.slug === slug);
}
