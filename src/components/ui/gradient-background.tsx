type GradientBackgroundProps = React.ComponentProps<"div"> & {
  show?: "top" | "bottom";
};

export function GradientBackground({
  className,
  children,
  show = "top",
  ...props
}: GradientBackgroundProps) {
  const gradients: string[] = [];

  if (show === "top") {
    gradients.push(`
      radial-gradient(
        150% 65% at 50% 0%,
        oklch(from var(--background) l c h / 0) 20%,
        oklch(from var(--background) l c h / 0.6) 55%,
        oklch(from var(--background) l c h / 1) 85%
      )
    `);
  }

  if (show === "bottom") {
    gradients.push(`
      radial-gradient(
        150% 65% at 50% 100%,
        oklch(from var(--background) l c h / 0) 20%,
        oklch(from var(--background) l c h / 0.6) 55%,
        oklch(from var(--background) l c h / 1) 85%
      )
    `);
  }

  gradients.push(`
    linear-gradient(
      120deg,
      var(--gradient-from) 0%,
      var(--gradient-to) 100%
    )
  `);

  return (
    <div
      className={className}
      style={{ background: gradients.join(",") }}
      {...props}
    >
      {children}
    </div>
  );
}
