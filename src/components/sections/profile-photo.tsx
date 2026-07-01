import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Swap-ready portrait. Drop a file in /public and set PROFILE_PHOTO to its path
 * to replace the placeholder — no other change needed.
 */
const PROFILE_PHOTO: string | null = null;

type ProfilePhotoProps = {
  /** CSS aspect-ratio, e.g. "4/5" (hero) or "5/4" (about). */
  aspect?: string;
  className?: string;
};

export function ProfilePhoto({ aspect = "4/5", className }: ProfilePhotoProps) {
  return (
    <div
      style={{ aspectRatio: aspect }}
      className={cn(
        "relative overflow-hidden rounded-3xl shadow-card",
        PROFILE_PHOTO
          ? "border border-line"
          : "border border-dashed border-line",
        className,
      )}
    >
      {PROFILE_PHOTO ? (
        <Image
          src={PROFILE_PHOTO}
          alt="Leon Weimann"
          fill
          sizes="(max-width: 880px) 100vw, 40vw"
          className="object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-surface bg-[repeating-linear-gradient(135deg,var(--surface-2),var(--surface-2)_12px,transparent_12px,transparent_24px)]">
          <span className="rounded-full border border-line bg-surface px-3.5 py-2 font-mono text-[0.82rem] text-ink-soft">
            Foto: Leon
          </span>
        </div>
      )}
    </div>
  );
}
