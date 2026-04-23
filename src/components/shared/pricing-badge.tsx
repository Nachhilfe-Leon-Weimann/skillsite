import type { ComponentProps, ReactNode } from "react";
import { ArrowRightIcon, PinIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const ICON_SIZE = 16;

type BadgeProps = ComponentProps<typeof Badge>;

type PricingBadgeProps = Pick<BadgeProps, "className" | "variant"> & {
  href?: string;
  children: ReactNode;
};

export function PricingBadge({
  className,
  variant = "outline",
  href,
  children,
}: PricingBadgeProps) {
  const content = (
    <Badge variant={variant} className={className}>
      <PinIcon className="mr-2" size={ICON_SIZE} />
      {children}
      {href && <ArrowRightIcon className="ml-2" size={ICON_SIZE} />}
    </Badge>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
