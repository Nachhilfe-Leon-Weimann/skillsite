import { cn } from "@/lib/utils";

export function Section({
  className,
  children,
}: React.ComponentProps<"section">) {
  return (
    <section className={cn("section-full", className)}>{children}</section>
  );
}
