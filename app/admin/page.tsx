import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin-dashboard";

export const metadata: Metadata = { title: "Admin Dashboard" };

export default function AdminPage() {
  return (
    <section className="min-h-screen bg-sand py-6 sm:py-10">
      <div className="section-shell">
        <AdminDashboard />
      </div>
    </section>
  );
}
