export type SantoriniVillage = {
  name: string;
  slug: string;
  imageUrl: string;
  imageAlt: string;
  imageCredit: string;
  description: string;
};

export const santoriniVillages: SantoriniVillage[] = [
  {
    name: "Oia",
    slug: "oia",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Oia_Santorini_%281335757985%29.jpg",
    imageAlt: "White and blue Cycladic houses in Oia, Santorini overlooking the caldera",
    imageCredit: "Wikimedia Commons: Oia Santorini (1335757985).jpg",
    description: "Blue domes, white cave houses and caldera views on Santorini's northern cliff edge.",
  },
  {
    name: "Fira",
    slug: "fira",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/64/FIRA-SANTORIN.JPG",
    imageAlt: "Fira town with white buildings on the Santorini caldera cliffs above the sea",
    imageCredit: "Wikimedia Commons: FIRA-SANTORIN.JPG",
    description: "Santorini's capital, built high on the caldera cliffs near the old port and cable car.",
  },
  {
    name: "Imerovigli",
    slug: "imerovigli",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Imerovigli_Skaros_Santorini.JPG",
    imageAlt: "Imerovigli and Skaros Rock on the Santorini caldera",
    imageCredit: "Wikimedia Commons: Imerovigli Skaros Santorini.JPG",
    description: "A quiet luxury caldera village beside Skaros Rock with elevated sunset views.",
  },
  {
    name: "Kamari",
    slug: "kamari",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Black_beach_in_Kamari_Santorini.jpg",
    imageAlt: "Kamari black sand beach and seaside promenade in Santorini",
    imageCredit: "Wikimedia Commons: Black beach in Kamari Santorini.jpg",
    description: "A black-sand beach village with a long promenade below Mesa Vouno.",
  },
  {
    name: "Perissa",
    slug: "perissa",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Perissa_Beach_and_M%C3%A9sa_Voun%C3%B3_at_sunset%2C_May_2024.jpg",
    imageAlt: "Perissa Beach with Mesa Vouno mountain at sunset in Santorini",
    imageCredit: "Wikimedia Commons: Perissa Beach and Mesa Vouno at sunset, May 2024.jpg",
    description: "Black sand, beach life and views toward Mesa Vouno mountain.",
  },
  {
    name: "Pyrgos",
    slug: "pyrgos",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a4/A-street-in-old-Pyrgos%2C-Santorini.jpg",
    imageAlt: "Narrow old street in Pyrgos village, Santorini",
    imageCredit: "Wikimedia Commons: A-street-in-old-Pyrgos, Santorini.jpg",
    description: "A traditional hill village with old streets, castle remains and panoramic views.",
  },
  {
    name: "Akrotiri",
    slug: "akrotiri",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/75/Stegastro001.jpg",
    imageAlt: "Covered archaeological remains at the Akrotiri Minoan settlement in Santorini",
    imageCredit: "Wikimedia Commons: Stegastro001.jpg",
    description: "A historic southwest village near the Akrotiri archaeological site and Red Beach.",
  },
  {
    name: "Megalochori",
    slug: "megalochori",
    // TODO: Replace with a verified free image of Megalochori's village square, bell tower or old houses.
    imageUrl: "",
    imageAlt: "Placeholder for Megalochori village square, bell tower and traditional old houses in Santorini",
    imageCredit: "TODO: verified free Megalochori image needed",
    description: "A traditional wine village known for its square, bell tower and preserved old houses.",
  },
];

export function getSantoriniVillage(slug: string) {
  return santoriniVillages.find((village) => village.slug === slug);
}
