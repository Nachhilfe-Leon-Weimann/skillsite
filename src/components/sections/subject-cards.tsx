import Link from "next/link";

import { Tag } from "@/components/ui/tag";
import { subjects } from "@/content/subjects";

/** Three subject teaser cards (home + /faecher intro). */
export function SubjectCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {subjects.map((subject) => (
        <Link
          key={subject.key}
          href={subject.href}
          className="group flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-card transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:border-coral"
        >
          <div className="flex items-center justify-between">
            <span className="flex size-[52px] items-center justify-center rounded-xl bg-surface-2 font-heading text-[1.4rem] font-bold text-coral">
              {subject.glyph}
            </span>
            {subject.tag ? <Tag>{subject.tag}</Tag> : null}
          </div>
          <h3 className="mt-5 font-heading text-[1.4rem] font-bold text-ink">
            {subject.name}
          </h3>
          <p className="mt-2 flex-1 text-ink-soft">{subject.claim}</p>
          <span className="mt-4 text-[0.95rem] font-semibold text-ink">
            Mehr erfahren →
          </span>
        </Link>
      ))}
    </div>
  );
}
