import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Heading, type HeadingSize, Lead } from "@/components/ui/typography";

type SectionHeaderProps = {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  size?: Extract<HeadingSize, "h2" | "h3">;
  className?: string;
  titleClassName?: string;
  leadClassName?: string;
};

/** Eyebrow + heading (+ optional lead) — the recurring section intro pattern. */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  size = "h2",
  className,
  titleClassName,
  leadClassName,
}: SectionHeaderProps) {
  const centered = align === "center";
  // Sequential stagger index across whichever elements are present.
  let step = 0;

  return (
    <div className={cn(centered && "text-center", className)}>
      {eyebrow ? (
        <Reveal
          variant="rise-soft"
          index={step++}
          className={cn(centered && "flex justify-center")}
        >
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}
      <Reveal
        variant="rise-soft"
        index={step++}
        className={cn(eyebrow && "mt-4")}
      >
        <Heading size={size} className={titleClassName}>
          {title}
        </Heading>
      </Reveal>
      {lead ? (
        <Reveal variant="rise-soft" index={step++} className="mt-4">
          <Lead
            className={cn("max-w-[34em]", centered && "mx-auto", leadClassName)}
          >
            {lead}
          </Lead>
        </Reveal>
      ) : null}
    </div>
  );
}
