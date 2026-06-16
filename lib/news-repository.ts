import type { NewsPost } from "@/data/mock-data";

declare global {
  // eslint-disable-next-line no-var
  var santoriniNewsStore: NewsPost[] | undefined;
}

const seed: NewsPost[] = [
  {
    id: "draft-wind-advisory",
    title: "Afternoon wind advisory",
    sourceText: "Local operators expect stronger north-westerly winds after 15:00. Small boat excursions may adjust departure times.",
    summary: "Stronger afternoon winds may lead small boat operators to adjust departure times.",
    status: "draft",
    generatedByAi: true,
    createdAt: "2026-06-15T10:30:00.000Z",
    lastUpdated: "2026-06-15T10:30:00.000Z",
  },
];

const store = globalThis.santoriniNewsStore ?? seed.map((post) => ({ ...post }));
globalThis.santoriniNewsStore = store;

export const newsRepository = {
  list() {
    return [...store].sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));
  },
  listPublished() {
    return store.filter((post) => post.status === "published").sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));
  },
  createAiDraft(input: { title: string; sourceText: string }) {
    const now = new Date().toISOString();
    const post: NewsPost = {
      id: crypto.randomUUID(),
      title: input.title,
      sourceText: input.sourceText,
      summary: generateDraftSummary(input.sourceText),
      status: "draft",
      generatedByAi: true,
      createdAt: now,
      lastUpdated: now,
    };
    store.unshift(post);
    return post;
  },
  approve(id: string) {
    const post = store.find((item) => item.id === id);
    if (!post) return undefined;
    const now = new Date().toISOString();
    post.status = "published";
    post.publishedAt = now;
    post.lastUpdated = now;
    return { ...post };
  },
};

function generateDraftSummary(sourceText: string) {
  const clean = sourceText.replace(/\s+/g, " ").trim();
  const firstSentence = clean.match(/^.*?[.!?](?:\s|$)/)?.[0]?.trim();
  return (firstSentence ?? clean).slice(0, 240);
}
