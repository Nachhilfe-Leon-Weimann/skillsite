import Image from "next/image";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  iconOnly?: boolean;
};

export function Logo({ size = "md", iconOnly = false }: LogoProps) {
  const sizeMap = {
    sm: { icon: 24, textSize: "text-sm" },
    md: { icon: 36, textSize: "text-base" },
    lg: { icon: 48, textSize: "text-lg" },
  };

  const { icon, textSize } = sizeMap[size];

  if (iconOnly) {
    return (
      <Image
        src="/logo-icon.png"
        alt="Logo"
        width={icon}
        height={icon}
        className="rounded-md"
      />
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Image
        src="/logo-icon.png"
        alt="Logo"
        width={icon}
        height={icon}
        className="rounded-md"
      />

      <div className="flex flex-col leading-tight">
        <span className={`font-semibold dark:font-bold ${textSize}`}>
          Nachhilfe Leon Weimann
        </span>
        <span className="text-xs text-muted-foreground">
          Deine Ziele – Unser Weg
        </span>
      </div>
    </div>
  );
}
