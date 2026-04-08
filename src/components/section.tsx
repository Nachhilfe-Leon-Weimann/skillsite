import { GradientBackground } from "@/components/ui/gradient-background";
import { cn } from "@/lib/utils";

type SectionProps = React.ComponentProps<"section"> & {
  variant?: "auto" | "content";
  gradient?: "top" | "bottom" | "none";
};

export function Section({
  className,
  children,
  variant = "auto",
  gradient = "none",
  ...props
}: SectionProps) {
  const isAutoVariant = variant === "auto";
  const hasGradient = gradient !== "none";

  const sectionClasses = cn(
    isAutoVariant && ["min-h-[var(--section-height)]", "max-h-[700px]:py-10"],
    "flex flex-col items-start justify-center",
    "py-16 px-6 md:px-20",
    className,
  );

  let content = (
    <section className={sectionClasses} {...props}>
      {children}
    </section>
  );

  if (hasGradient) {
    content = (
      <GradientBackground show={gradient}>{content}</GradientBackground>
    );
  }

  return content;
}
