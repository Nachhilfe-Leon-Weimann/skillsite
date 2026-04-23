import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Muted } from "@/components/ui/typography";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

type ContactActionProps = {
  align?: "center" | "left" | "right";
  label?: string;
  note?: string;
};

const alignment = {
  center: "items-center text-center",
  left: "items-start text-left",
  right: "items-end text-right",
};

export function ContactAction({
  align = "center",
  label = "Jetzt durchstarten",
  note = "Sichere dir dein unverbindliches Kennenlerngespräch",
}: ContactActionProps) {
  return (
    <div className={cn("flex flex-col gap-4", alignment[align])}>
      <Button size="lg" asChild>
        <Link href={routes.contact}>{label}</Link>
      </Button>

      {note && <Muted>{note}</Muted>}
    </div>
  );
}
