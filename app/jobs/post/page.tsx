import { redirect } from "next/navigation";

export default function LegacyPostJobPage() {
  redirect("/submit-request?package=job-basic");
}
