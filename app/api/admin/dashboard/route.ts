import { NextRequest, NextResponse } from "next/server";
import { adminContentTypes, contentRepository, type AdminContentType } from "@/lib/content-repository";
import { requestRepository } from "@/lib/request-repository";
import { workerProfileRepository } from "@/lib/worker-profile-repository";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    requests: requestRepository.list(),
    workerProfiles: workerProfileRepository.list(),
    content: contentRepository.list(),
    contentTypes: adminContentTypes,
  }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { type?: AdminContentType; title?: string; description?: string };
  if (!body.type || !adminContentTypes.includes(body.type) || !body.title?.trim() || !body.description?.trim()) {
    return NextResponse.json({ error: "Type, title and description are required." }, { status: 400 });
  }
  return NextResponse.json(contentRepository.create({
    type: body.type,
    title: body.title.trim(),
    description: body.description.trim(),
  }), { status: 201 });
}
