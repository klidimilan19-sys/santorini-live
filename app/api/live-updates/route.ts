import { NextResponse } from "next/server";
import { liveUpdates } from "@/data/mock-data";
import { newsRepository } from "@/lib/news-repository";

export const dynamic = "force-dynamic";

export async function GET() {
  const publishedNews = newsRepository.listPublished().map((post) => ({
    id: post.id,
    title: post.title,
    summary: post.summary,
    category: "Local news" as const,
    severity: "info" as const,
    status: "published" as const,
    lastUpdated: post.lastUpdated,
  }));

  return NextResponse.json(
    [...publishedNews, ...liveUpdates].sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated)),
    { headers: { "Cache-Control": "no-store" } },
  );
}
