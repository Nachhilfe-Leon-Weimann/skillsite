import { Magnetic } from "@/components/effects/magnetic";
import { Card, CardContent } from "@/components/ui/card";
import { Muted } from "@/components/ui/typography";
import type { LucideIcon } from "lucide-react";

export type IconInfoCardProps = React.ComponentProps<typeof Magnetic> & {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function IconInfoCard({
  title,
  description,
  icon: Icon,
  className,
  ...props
}: IconInfoCardProps) {
  return (
    <Magnetic className={className} {...props}>
      <Card size="sm" variant="interactive" className="h-full">
        <CardContent className="flex items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
            <Icon aria-hidden="true" size={18} />
          </span>
          <div>
            <p className="font-medium">{title}</p>
            <Muted>{description}</Muted>
          </div>
        </CardContent>
      </Card>
    </Magnetic>
  );
}
