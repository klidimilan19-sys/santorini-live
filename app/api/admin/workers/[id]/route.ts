import { NextRequest, NextResponse } from "next/server";
import {
  workerProfileRepository,
  type WorkerProfileStatus,
} from "@/lib/worker-profile-repository";

const statuses: WorkerProfileStatus[] = ["Pending Admin Review", "Published", "Rejected"];

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = (await request.json()) as { status?: WorkerProfileStatus };
  if (!body.status || !statuses.includes(body.status)) {
    return NextResponse.json({ error: "A valid status is required." }, { status: 400 });
  }
  const updated = workerProfileRepository.updateStatus(id, body.status);
  return updated
    ? NextResponse.json(updated)
    : NextResponse.json({ error: "Worker profile not found." }, { status: 404 });
}

export async function DELETE(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  return workerProfileRepository.delete(id)
    ? NextResponse.json({ deleted: true })
    : NextResponse.json({ error: "Worker profile not found." }, { status: 404 });
}
