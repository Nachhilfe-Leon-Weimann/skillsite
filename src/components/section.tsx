import { cn } from "@/lib/utils";

type SectionProps = React.ComponentProps<"section"> & {
  variant?: "auto" | "content";
};

export function Section({
  className,
  children,
  variant = "auto",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        variant === "auto" && "section-full",
        "py-6",
        variant === "content" && "py-10",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
