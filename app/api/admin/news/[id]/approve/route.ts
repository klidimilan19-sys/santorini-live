import { NextResponse } from "next/server";
import { newsRepository } from "@/lib/news-repository";

export const dynamic = "force-dynamic";

export async function PATCH(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = newsRepository.approve(id);
  if (!post) {
    return NextResponse.json({ error: "News post not found." }, { status: 404 });
  }
  return NextResponse.json(post);
}
