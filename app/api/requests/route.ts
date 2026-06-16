import { NextRequest, NextResponse } from "next/server";
import { getAdvertisingPackage } from "@/data/advertising";
import { requestRepository, type RequestCategory } from "@/lib/request-repository";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    fullName?: string;
    businessName?: string;
    phone?: string;
    email?: string;
    category?: RequestCategory;
    village?: string;
    description?: string;
    imageName?: string;
    packageId?: string;
  };

  const selectedPackage = getAdvertisingPackage(body.packageId ?? "");
  if (!body.fullName || !body.phone || !body.email || !body.category || !body.village || !body.description || !selectedPackage) {
    return NextResponse.json({ error: "Required request fields are missing." }, { status: 400 });
  }

  const created = requestRepository.create({
    fullName: body.fullName.trim(),
    businessName: body.businessName?.trim() ?? "",
    phone: body.phone.trim(),
    email: body.email.trim(),
    category: body.category,
    village: body.village,
    description: body.description.trim(),
    imageName: body.imageName,
    packageId: selectedPackage.id,
    packageName: selectedPackage.name,
    amount: selectedPackage.price,
  });
  return NextResponse.json(created, { status: 201 });
}
