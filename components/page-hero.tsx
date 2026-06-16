import { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-sand py-16 sm:py-20">
      <div className="dot-grid absolute inset-y-0 right-0 w-1/2 opacity-60" />
      <div className="absolute -right-20 -top-32 size-80 rounded-full bg-aegean-100/70 blur-3xl" />
      <div className="section-shell relative">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="page-title mt-5 max-w-3xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-aegean-950/60 sm:text-lg">
          {description}
        </p>
        {children}
      </div>
    </section>
  );
}
