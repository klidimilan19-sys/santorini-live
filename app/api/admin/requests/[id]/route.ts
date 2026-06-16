import { NextRequest, NextResponse } from "next/server";
import { requestRepository, type RequestStatus } from "@/lib/request-repository";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = (await request.json()) as { status?: RequestStatus };
  if (!body.status) return NextResponse.json({ error: "Status is required." }, { status: 400 });
  const updated = requestRepository.updateStatus(id, body.status);
  if (!updated) return NextResponse.json({ error: "Request not found." }, { status: 404 });
  return NextResponse.json(updated);
}
