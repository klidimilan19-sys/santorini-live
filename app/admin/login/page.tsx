import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin-login-form";

export const metadata: Metadata = { title: "Admin Login" };

export default function AdminLoginPage() {
  return (
    <section className="min-h-[75vh] bg-sand py-14 sm:py-20">
      <div className="mx-auto w-full max-w-md px-5">
        <Suspense><AdminLoginForm /></Suspense>
      </div>
    </section>
  );
}
