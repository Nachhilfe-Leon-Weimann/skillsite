"use client";

import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { routes } from "@/lib/routes";
import { CircleQuestionMark } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.toString();
  const currentUrl = search ? `${pathname}?${search}` : pathname;

  return (
    <Section gradient="bottom" offsetFooter>
      <Empty>
        <EmptyHeader className="max-w-md">
          <EmptyMedia variant="icon">
            <CircleQuestionMark />
          </EmptyMedia>
          <EmptyTitle>404 - Seite nicht gefunden</EmptyTitle>
          <EmptyDescription>
            <span className="font-semibold">{currentUrl}</span> existiert nicht
            oder wurde verschoben.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="max-w-md flex-row justify-center gap-2">
          <Button variant="outline" asChild>
            <Link href={routes.subjects}>Zu den Fächern</Link>
          </Button>
          <Button asChild>
            <Link href={routes.home}>Zur Startseite</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </Section>
  );
}
