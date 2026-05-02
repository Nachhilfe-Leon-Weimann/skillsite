import { CalendarRange } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { Container } from "@/components/layout/container";
import { Logo } from "@/components/logo";
import { DesktopNav } from "@/components/navigation/desktop-nav";
import { LoginButton } from "@/components/navigation/login-button";
import { MobileNavMenu } from "@/components/navigation/mobile-nav";
import { routes } from "@/lib/routes";

export function Navbar() {
  return (
    <nav aria-label="Hauptnavigation" className="relative">
      <Container className="flex h-16 items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-6">
          <Link href={routes.home} className="shrink-0">
            <span className="hidden sm:block">
              <Logo />
            </span>
            <span className="sm:hidden">
              <Logo iconOnly />
            </span>
          </Link>

          <DesktopNav />
        </div>

        <div className="flex shrink-0 flex-row-reverse items-center gap-2 sm:gap-3 lg:flex-row">
          <MobileNavMenu />

          <Button size="icon" variant="ghost" asChild>
            <Link href={routes.booking}>
              <CalendarRange className="size-4" aria-hidden="true" />
              <span className="sr-only">Termin buchen</span>
            </Link>
          </Button>

          <span className="hidden lg:inline-flex">
            <LoginButton />
          </span>

          <Button asChild>
            <Link href={routes.booking}>Jetzt starten</Link>
          </Button>
        </div>
      </Container>
    </nav>
  );
}
