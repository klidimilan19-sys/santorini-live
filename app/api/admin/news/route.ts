import { NextRequest, NextResponse } from "next/server";
import { newsRepository } from "@/lib/news-repository";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(newsRepository.list(), { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { title?: string; sourceText?: string };
  if (!body.title?.trim() || !body.sourceText?.trim()) {
    return NextResponse.json({ error: "Title and source text are required." }, { status: 400 });
  }

  const post = newsRepository.createAiDraft({
    title: body.title.trim(),
    sourceText: body.sourceText.trim(),
  });

  return NextResponse.json(post, { status: 201 });
}
