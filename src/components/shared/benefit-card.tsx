import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

const ICON_SIZE = 24;
const SPACING_X = 12;

type BenefitsCardProps = {
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
  icon: LucideIcon;
  className?: string;
};

export function BenefitCard({
  title,
  description,
  href,
  linkLabel,
  icon,
  className,
}: BenefitsCardProps) {
  const Icon = icon;
  const contentOffset = ICON_SIZE + SPACING_X;

  return (
    <Card
      className={cn("justify-between", "hover:ring-foreground/20", className)}
    >
      <CardHeader>
        <CardTitle
          className="flex flex-row items-center"
          style={{ gap: SPACING_X }}
        >
          <div
            className="flex shrink-0 items-center justify-center"
            style={{ width: ICON_SIZE, height: ICON_SIZE }}
          >
            <Icon size={ICON_SIZE} />
          </div>
          {title}
        </CardTitle>
        <CardDescription style={{ marginLeft: contentOffset }}>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent style={{ marginLeft: contentOffset }}>
        {href ? (
          <Button variant="link" className="p-0" asChild>
            <Link href={href}>{linkLabel ?? "Mehr erfahren"}</Link>
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
}
