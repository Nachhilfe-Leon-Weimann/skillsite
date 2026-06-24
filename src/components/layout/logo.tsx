import Image from "next/image";

import { cn } from "@/lib/utils";
import { brand } from "@/content/site";

type LogoProps = {
  showText?: boolean;
  onDark?: boolean;
  className?: string;
};

export function Logo({
  showText = true,
  onDark = false,
  className,
}: LogoProps) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <Image
        src={brand.logo}
        alt={brand.name}
        width={42}
        height={42}
        priority
        className="rounded-xl shadow-[0_5px_14px_-5px_rgba(16,29,45,0.5)]"
      />
      {showText ? (
        <span className="flex flex-col leading-[1.08]">
          <span
            className={cn(
              "font-heading text-[1.04rem] font-bold tracking-[-0.01em]",
              onDark ? "text-white" : "text-ink",
            )}
          >
            {brand.name}
          </span>
          <span
            className={cn(
              "text-[0.71rem] tracking-[0.03em]",
              onDark ? "text-on-navy-soft" : "text-ink-soft",
            )}
          >
            {brand.tagline}
          </span>
        </span>
      ) : null}
    </span>
  );
}
