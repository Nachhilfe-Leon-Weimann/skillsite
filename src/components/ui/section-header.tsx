import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/eyebrow";
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

  return (
    <div className={cn(centered && "text-center", className)}>
      {eyebrow ? (
        centered ? (
          <div className="flex justify-center">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
        ) : (
          <Eyebrow>{eyebrow}</Eyebrow>
        )
      ) : null}
      <Heading size={size} className={cn(eyebrow && "mt-4", titleClassName)}>
        {title}
      </Heading>
      {lead ? (
        <Lead
          className={cn(
            "mt-4 max-w-[34em]",
            centered && "mx-auto",
            leadClassName,
          )}
        >
          {lead}
        </Lead>
      ) : null}
    </div>
  );
}
