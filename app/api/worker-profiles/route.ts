import { NextRequest, NextResponse } from "next/server";
import { jobs } from "@/data/mock-data";
import {
  workerProfileRepository,
  type WorkerWorkType,
} from "@/lib/worker-profile-repository";

const workTypes: WorkerWorkType[] = ["Seasonal", "Full-time", "Part-time", "Any"];

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    fullName?: string;
    desiredPosition?: string;
    experienceYears?: number;
    currentVillage?: string;
    availableFrom?: string;
    workType?: WorkerWorkType;
    languages?: string;
    accommodationNeeded?: boolean;
    about?: string;
    phone?: string;
    email?: string;
    whatsapp?: string;
    cvFileName?: string;
    appliedJobId?: number;
    consent?: boolean;
  };

  if (
    !body.fullName?.trim() ||
    !body.desiredPosition?.trim() ||
    !body.currentVillage?.trim() ||
    !body.availableFrom?.trim() ||
    !body.workType ||
    !workTypes.includes(body.workType) ||
    !body.languages?.trim() ||
    !body.about?.trim() ||
    !body.phone?.trim() ||
    !body.email?.trim() ||
    !body.consent
  ) {
    return NextResponse.json({ error: "Required worker profile fields are missing." }, { status: 400 });
  }

  const appliedJob = jobs.find((job) => job.id === Number(body.appliedJobId));
  const profile = workerProfileRepository.create({
    fullName: body.fullName.trim(),
    desiredPosition: body.desiredPosition.trim(),
    experienceYears: Math.max(0, Number(body.experienceYears) || 0),
    currentVillage: body.currentVillage.trim(),
    availableFrom: body.availableFrom.trim(),
    workType: body.workType,
    languages: body.languages.split(",").map((language) => language.trim()).filter(Boolean),
    accommodationNeeded: Boolean(body.accommodationNeeded),
    about: body.about.trim(),
    phone: body.phone.trim(),
    email: body.email.trim(),
    whatsapp: body.whatsapp?.trim() ?? "",
    cvFileName: body.cvFileName?.trim() || undefined,
    appliedJobId: appliedJob?.id,
    appliedJobTitle: appliedJob ? `${appliedJob.title} at ${appliedJob.company}` : undefined,
  });

  return NextResponse.json(profile, { status: 201 });
}
