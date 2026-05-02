import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type SubjectDetail } from "@/content/subjects";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type SubjectBadgeProps = React.ComponentPropsWithoutRef<typeof Badge> & {
  subject: SubjectDetail;
};

export function SubjectBadge({ className, subject }: SubjectBadgeProps) {
  const Icon = subject.icon;

  return (
    <Button variant="link" className="p-0 hover:no-underline text-md" asChild>
      <Link href={subject.href}>
        <Badge
          variant="outline"
          className={cn(
            "text-md p-3.5 hover:border-primary/40 hover:bg-primary/5 gap-3",
            className,
          )}
        >
          <Icon size={12} />
          {subject.name}
        </Badge>
      </Link>
    </Button>
  );
}
