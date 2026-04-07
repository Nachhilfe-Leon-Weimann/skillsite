"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Social } from "@/lib/socials";
import Link from "next/link";

type Props = {
  social: Social;
  side?: "top" | "bottom" | "left" | "right";
};

export function SocialLink({ social, side = "top" }: Props) {
  const button = (
    <Button asChild size="icon" variant="ghost">
      <Link href={social.href} target="_blank" rel="noopener noreferrer">
        <BrandIcon icon={social.icon} />
        <span className="sr-only">{social.label}</span>
      </Link>
    </Button>
  );

  if (!social.helptext) return button;

  return (
    <Tooltip delayDuration={600}>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side={side}>
        <p>{social.helptext}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export function BrandIcon({ icon }: { icon: { path: string } }) {
  return (
    <svg role="img" viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d={icon.path} />
    </svg>
  );
}
