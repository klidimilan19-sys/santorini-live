import { redirect } from "next/navigation";

export default function LegacyMarketplacePostPage() {
  redirect("/submit-request?package=basic-listing");
}
