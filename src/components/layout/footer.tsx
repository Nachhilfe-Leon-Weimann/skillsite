import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { SocialLinks } from "@/components/layout/social-links";
import { ThemeToggle } from "@/components/layout/theme-toggle";
// Cookie settings are temporarily disabled (see layout.tsx) - the button remains
// available for later use.
// import { CookieSettingsButton } from "@/components/consent/cookie-settings-button";
import { routes } from "@/lib/routes";

const legalLinkClass = "text-on-navy-muted transition-colors hover:text-white";

export function Footer() {
  return (
    <footer className="bg-navy text-on-navy-soft">
      <Container className="py-[clamp(40px,5vw,56px)]">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Link href={routes.home} aria-label="Startseite">
            <Logo onDark textClassName="max-md:hidden" />
          </Link>
          <SocialLinks />
          <ThemeToggle />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-5 gap-y-4 border-t border-white/15 pt-5 text-caption text-on-navy-muted">
          <span>© {new Date().getFullYear()} Nachhilfe Leon Weimann</span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link href={routes.impressum} className={legalLinkClass}>
              Impressum
            </Link>
            <Link href={routes.datenschutz} className={legalLinkClass}>
              Datenschutz
            </Link>
            {/* <CookieSettingsButton className={legalLinkClass} /> */}
          </div>
        </div>
      </Container>
    </footer>
  );
}
