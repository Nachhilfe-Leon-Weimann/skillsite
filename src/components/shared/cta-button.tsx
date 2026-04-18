import { Button } from "@/components/ui/button";
import { Muted } from "@/components/ui/typography";
import { routes } from "@/lib/routes";
import Link from "next/link";

export function CTAButton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button asChild>
        <Link href={routes.contact}>Jetzt durchstarten</Link>
      </Button>
      <Muted>Sichere dir dein unverbindliches Kennenlerngespräch</Muted>
    </div>
  );
}
