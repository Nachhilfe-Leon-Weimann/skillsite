import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Heading, Lead } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  size?: "display" | "h1";
  titleClassName?: string;
  /** Buttons / actions rendered below the lead. */
  children?: React.ReactNode;
};

/** The top-of-page intro pattern: eyebrow + H1 + lead (+ optional actions). */
export function PageHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  size = "h1",
  titleClassName,
  children,
}: PageHeaderProps) {
  const centered = align === "center";

  return (
    <Container
      className={cn(
        "pt-[clamp(2.5rem,6vw,4.5rem)] pb-[clamp(1.25rem,3vw,2rem)]",
        centered && "text-center",
      )}
    >
      {eyebrow ? (
        centered ? (
          <div className="flex justify-center">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
        ) : (
          <Eyebrow>{eyebrow}</Eyebrow>
        )
      ) : null}
      <Heading
        as="h1"
        size={size}
        className={cn(eyebrow && "mt-4", centered && "mx-auto", titleClassName)}
      >
        {title}
      </Heading>
      {lead ? (
        <Lead className={cn("mt-5 max-w-[34em]", centered && "mx-auto")}>
          {lead}
        </Lead>
      ) : null}
      {children ? (
        <div
          className={cn(
            "mt-7 flex flex-wrap gap-3.5",
            centered && "justify-center",
          )}
        >
          {children}
        </div>
      ) : null}
    </Container>
  );
}
