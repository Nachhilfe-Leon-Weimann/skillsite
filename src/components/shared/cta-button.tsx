import { Button } from "@/components/ui/button";
import { Muted } from "@/components/ui/typography";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import Link from "next/link";

type CTAButtonProps = {
  align?: "center" | "left" | "right";
};

const alignmentClasses = {
  center: "items-center",
  left: "items-start",
  right: "items-end",
};

export function CTAButton({ align = "center" }: CTAButtonProps) {
  const alignment = alignmentClasses[align];

  return (
    <div className={cn("flex flex-col gap-4", alignment)}>
      <Button asChild>
        <Link href={routes.contact}>Jetzt durchstarten</Link>
      </Button>
      <Muted>Sichere dir dein unverbindliches Kennenlerngespräch</Muted>
    </div>
  );
}
