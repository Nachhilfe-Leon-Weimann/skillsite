import { Magnetic } from "@/components/effects/magnetic";
import { Card } from "@/components/ui/card";
import { Small } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";
import Image from "next/image";

type SubjectDetailCardProps = {
  className?: string;
  title: string;
  image?: string;
  alt?: string;
};

export function SubjectDetailCard({
  className,
  title,
  image,
  alt,
}: SubjectDetailCardProps) {
  return (
    <Card variant="interactive" className={cn("p-0 gap-0", className)}>
      <Magnetic className="p-1">
        <div className="relative aspect-3/4 overflow-hidden rounded-lg bg-muted">
          {image ? (
            <Image
              src={image}
              alt={alt ?? title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ImageIcon size={128} className="text-muted-foreground/40" />
            </div>
          )}
        </div>
      </Magnetic>

      <div className="px-4 py-2">
        <Small className="line-clamp-1 text-foreground">{title}</Small>
      </div>
    </Card>
  );
}
