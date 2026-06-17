import { santoriniVillages } from "@/data/villages";

const village = Object.fromEntries(santoriniVillages.map((item) => [item.slug, item]));

export type DiscoveryImage = {
  title: string;
  href: string;
  imageUrl: string;
  imageAlt: string;
  imageCredit: string;
};

export type Checkpoint = DiscoveryImage & {
  name: string;
  location: string;
  description: string;
  bestTime: string;
  guideHref: string;
};

export const santoriniGallery: DiscoveryImage[] = [
  { title: "Oia blue domes", href: "/guide/oia", imageUrl: village.oia.imageUrl, imageAlt: village.oia.imageAlt, imageCredit: village.oia.imageCredit },
  { title: "Fira caldera", href: "/guide/fira", imageUrl: village.fira.imageUrl, imageAlt: village.fira.imageAlt, imageCredit: village.fira.imageCredit },
  { title: "Imerovigli / Skaros Rock", href: "/guide/imerovigli", imageUrl: village.imerovigli.imageUrl, imageAlt: village.imerovigli.imageAlt, imageCredit: village.imerovigli.imageCredit },
  { title: "Kamari beach", href: "/guide/kamari", imageUrl: village.kamari.imageUrl, imageAlt: village.kamari.imageAlt, imageCredit: village.kamari.imageCredit },
  { title: "Perissa beach", href: "/guide/perissa", imageUrl: village.perissa.imageUrl, imageAlt: village.perissa.imageAlt, imageCredit: village.perissa.imageCredit },
  {
    title: "Red Beach",
    href: "/guide/akrotiri-red-beach",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Red_Beach_-_Panorama_-_Santorini_-_Grecia_-_agosto_2018.jpg/500px-Red_Beach_-_Panorama_-_Santorini_-_Grecia_-_agosto_2018.jpg",
    imageAlt: "Red Beach volcanic cliffs and shoreline near Akrotiri in Santorini",
    imageCredit: "Wikimedia Commons: Red Beach - Panorama - Santorini - Grecia - agosto 2018.jpg",
  },
  { title: "Pyrgos village", href: "/guide/pyrgos", imageUrl: village.pyrgos.imageUrl, imageAlt: village.pyrgos.imageAlt, imageCredit: village.pyrgos.imageCredit },
  {
    title: "Sunset view",
    href: "/guide/sunset-spots",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Oia%20Santorini%20sunset.jpg",
    imageAlt: "Sunset over Oia and the Santorini caldera",
    imageCredit: "Wikimedia Commons: Oia Santorini sunset.jpg",
  },
];

export const topCheckpoints: Checkpoint[] = [
  {
    name: "Oia Castle Sunset",
    location: "Oia",
    description: "The classic sunset viewpoint over white houses, windmills and the caldera.",
    bestTime: "Arrive 90 minutes before sunset",
    guideHref: "/guide/villages/oia",
    title: "Oia Castle Sunset",
    href: "/guide/oia",
    imageUrl: village.oia.imageUrl,
    imageAlt: "Oia white houses and caldera view near the castle sunset viewpoint",
    imageCredit: village.oia.imageCredit,
  },
  {
    name: "Three Bells of Fira",
    location: "Fira / Firostefani",
    description: "One of Santorini's most photographed blue-domed churches with caldera views.",
    bestTime: "Morning or golden hour",
    guideHref: "/guide/villages/fira",
    title: "Three Bells of Fira",
    href: "/guide/fira",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Three%20Bells%20of%20Fira%2C%20Santorini.jpg",
    imageAlt: "Three Bells of Fira blue dome church overlooking the Santorini caldera",
    imageCredit: "Wikimedia Commons: Three Bells of Fira, Santorini.jpg",
  },
  {
    name: "Skaros Rock",
    location: "Imerovigli",
    description: "A dramatic volcanic headland and former fortress site beside Imerovigli.",
    bestTime: "Sunrise or late afternoon",
    guideHref: "/guide/villages/imerovigli",
    title: "Skaros Rock",
    href: "/guide/imerovigli",
    imageUrl: village.imerovigli.imageUrl,
    imageAlt: village.imerovigli.imageAlt,
    imageCredit: village.imerovigli.imageCredit,
  },
  {
    name: "Red Beach",
    location: "Akrotiri",
    description: "A striking volcanic coastline known for red cliffs and dark sand.",
    bestTime: "Morning, from the safe viewpoint",
    guideHref: "/guide/villages/akrotiri",
    title: "Red Beach",
    href: "/guide/akrotiri-red-beach",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Red_Beach_-_Panorama_-_Santorini_-_Grecia_-_agosto_2018.jpg/500px-Red_Beach_-_Panorama_-_Santorini_-_Grecia_-_agosto_2018.jpg",
    imageAlt: "Red Beach red volcanic cliffs near Akrotiri Santorini",
    imageCredit: "Wikimedia Commons: Red Beach - Panorama - Santorini - Grecia - agosto 2018.jpg",
  },
  {
    name: "Kamari Black Beach",
    location: "Kamari",
    description: "A long black-sand beach with an easy promenade and beach restaurants.",
    bestTime: "Morning for swimming",
    guideHref: "/guide/villages/kamari",
    title: "Kamari Black Beach",
    href: "/guide/kamari",
    imageUrl: village.kamari.imageUrl,
    imageAlt: village.kamari.imageAlt,
    imageCredit: village.kamari.imageCredit,
  },
  {
    name: "Perissa Beach",
    location: "Perissa",
    description: "Black sand, beach bars and views toward Mesa Vouno mountain.",
    bestTime: "Late morning to afternoon",
    guideHref: "/guide/villages/perissa",
    title: "Perissa Beach",
    href: "/guide/perissa",
    imageUrl: village.perissa.imageUrl,
    imageAlt: village.perissa.imageAlt,
    imageCredit: village.perissa.imageCredit,
  },
  {
    name: "Pyrgos Village",
    location: "Pyrgos",
    description: "Traditional lanes, castle viewpoints and a calmer village rhythm.",
    bestTime: "Late afternoon",
    guideHref: "/guide/villages/pyrgos",
    title: "Pyrgos Village",
    href: "/guide/pyrgos",
    imageUrl: village.pyrgos.imageUrl,
    imageAlt: village.pyrgos.imageAlt,
    imageCredit: village.pyrgos.imageCredit,
  },
  {
    name: "Akrotiri Archaeological Site",
    location: "Akrotiri",
    description: "A preserved Bronze Age settlement and one of Santorini's essential history stops.",
    bestTime: "Morning or midday shade",
    guideHref: "/guide/villages/akrotiri",
    title: "Akrotiri Archaeological Site",
    href: "/guide/akrotiri-red-beach",
    imageUrl: village.akrotiri.imageUrl,
    imageAlt: village.akrotiri.imageAlt,
    imageCredit: village.akrotiri.imageCredit,
  },
  {
    name: "Ammoudi Bay",
    location: "Below Oia",
    description: "A small harbor below the cliffs with seafood tavernas and clear water views.",
    bestTime: "Lunch or sunset",
    guideHref: "/guide/villages/oia",
    title: "Ammoudi Bay",
    href: "/guide/oia",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Ammoudi%20Bay%20Santorini.jpg",
    imageAlt: "Ammoudi Bay harbor below Oia in Santorini",
    imageCredit: "Wikimedia Commons: Ammoudi Bay Santorini.jpg",
  },
  {
    name: "Megalochori Village",
    location: "Megalochori",
    description: "A traditional wine village with old houses, a quiet square and bell-tower lanes.",
    bestTime: "Morning or early evening",
    guideHref: "/guide/villages/megalochori",
    title: "Megalochori Village",
    href: "/guide/villages/megalochori",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Megalochori%20Santorini.jpg",
    imageAlt: "Traditional old houses and village lanes in Megalochori Santorini",
    imageCredit: "Wikimedia Commons: Megalochori Santorini.jpg",
  },
];
