import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
// Cookie settings are temporarily disabled (see layout.tsx) - the button remains
// available for later use.
// import { CookieSettingsButton } from "@/components/consent/cookie-settings-button";
import { primaryNav } from "@/content/site";
import { legalContact } from "@/content/legal";
import { routes } from "@/lib/routes";

const linkClass =
  "text-small text-on-navy-soft transition-colors hover:text-white";
const legalLinkClass = "text-on-navy-muted transition-colors hover:text-white";

export function Footer() {
  return (
    <footer className="bg-navy text-on-navy-soft">
      <Container className="py-[clamp(40px,5vw,56px)]">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Link href={routes.home} aria-label="Startseite">
            <Logo onDark />
          </Link>
          <ThemeToggle />
        </div>

        <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5">
          {primaryNav.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass}>
              {item.label}
            </Link>
          ))}
          <Link href={routes.onlineLearning} className={linkClass}>
            Discord &amp; Teams
          </Link>
          <Link href={routes.booking} className={linkClass}>
            Termin
          </Link>
          <Link href={routes.login} className={linkClass}>
            Login
          </Link>
          <a href={`mailto:${legalContact.email}`} className={linkClass}>
            {legalContact.email}
          </a>
        </nav>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-t border-white/15 pt-5 text-caption text-on-navy-muted">
          <span>© {new Date().getFullYear()} Leon Weimann · Schwanau</span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
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
