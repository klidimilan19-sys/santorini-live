import { NextRequest, NextResponse } from "next/server";
import { requestRepository } from "@/lib/request-repository";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { requestId?: string };
  const updated = requestRepository.markPaid(body.requestId ?? "");
  if (!updated) return NextResponse.json({ error: "Request not found." }, { status: 404 });
  return NextResponse.json(updated);
}
