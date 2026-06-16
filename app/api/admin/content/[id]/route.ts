import { NextRequest, NextResponse } from "next/server";
import { contentRepository } from "@/lib/content-repository";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const patch = await request.json();
  const updated = contentRepository.update(id, patch);
  if (!updated) return NextResponse.json({ error: "Content item not found." }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return contentRepository.delete(id)
    ? NextResponse.json({ ok: true })
    : NextResponse.json({ error: "Content item not found." }, { status: 404 });
}
