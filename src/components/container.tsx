import { cn } from "@/lib/utils";

export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("max-w-7xl mx-auto w-full px-6", className)}
      {...props}
    />
  );
}
