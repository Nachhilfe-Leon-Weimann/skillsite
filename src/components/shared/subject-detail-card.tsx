import { Magnetic } from "@/components/effects/magnetic";
import { Card } from "@/components/ui/card";
import { Muted, Small } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { ImageIcon, LucideIcon } from "lucide-react";
import Image from "next/image";

type SubjectDetailCardProps = {
  className?: string;
  title: string;
  description?: string;
  image?: string;
  alt?: string;
  icon?: LucideIcon;
};

export function SubjectDetailCard({
  className,
  title,
  description,
  image,
  alt,
  icon: Icon,
}: SubjectDetailCardProps) {
  return (
    <Card variant="interactive" className={cn("h-full p-0 gap-0", className)}>
      <Magnetic className="p-1">
        <div className="relative aspect-3/4 overflow-hidden rounded-lg bg-muted">
          {image ? (
            <>
              <Image
                src={image}
                alt={alt ?? title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </>
          ) : (
            <div className="flex h-full w-full items-end bg-[radial-gradient(circle_at_top,var(--color-card)_0%,var(--color-muted)_70%)] p-5">
              <Magnetic
                intensity={1}
                className="flex size-12 items-center justify-center rounded-2xl border border-border/60 bg-background/80 backdrop-blur-sm"
              >
                {Icon ? (
                  <Icon size={24} className="text-foreground/80" />
                ) : (
                  <ImageIcon size={24} className="text-muted-foreground/60" />
                )}
              </Magnetic>
            </div>
          )}
        </div>
      </Magnetic>

      <div className="space-y-1 px-4 py-3">
        <Small className="line-clamp-1 text-foreground">{title}</Small>
        {description ? (
          <Muted className="line-clamp-3 leading-5">{description}</Muted>
        ) : null}
      </div>
    </Card>
  );
}
