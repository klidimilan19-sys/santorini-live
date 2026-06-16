import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="mt-4 font-display text-3xl font-extrabold tracking-[-0.04em] text-aegean-950 sm:text-4xl">
          {title}
        </h2>
        {description && <p className="mt-3 max-w-xl text-aegean-950/55">{description}</p>}
      </div>
      {href && linkLabel && (
        <Link href={href} className="flex shrink-0 items-center gap-2 text-sm font-bold text-aegean-700 hover:text-aegean-950">
          {linkLabel} <ArrowRight size={17} />
        </Link>
      )}
    </div>
  );
}
