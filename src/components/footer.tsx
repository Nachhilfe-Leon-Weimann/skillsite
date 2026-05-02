import Link from "next/link";
import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";
import { socials } from "@/lib/socials";
import { SocialLink } from "@/components/social-link";
import { Container } from "@/components/layout/container";
import { routes } from "@/lib/routes";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <Container className="py-6 flex flex-col gap-4">
        {/* Top Row */}
        <div className="grid gap-4 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center lg:relative lg:flex lg:justify-center">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:contents">
            {/* Logo */}
            <div className="sm:justify-self-start lg:absolute lg:left-0">
              <Link href="/">
                <Logo iconOnly />
              </Link>
            </div>

            {/* Socials */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-self-end lg:absolute lg:right-0">
              {socials.map((social) => (
                <SocialLink key={social.id} social={social} side="bottom" />
              ))}
            </div>
          </div>

          {/* Legals */}
          <nav
            aria-label="Rechtliche Links"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground sm:col-start-2 sm:row-start-1"
          >
            <Link href={routes.impressum} className="hover:text-foreground">
              Impressum
            </Link>
            <Link href={routes.datenschutz} className="hover:text-foreground">
              Datenschutz
            </Link>
            {/* // TODO: Button that opens cookie modal */}
            <Link href="/cookies" className="hover:text-foreground">
              Cookies
            </Link>
          </nav>
        </div>

        <Separator />

        {/* Bottom Row */}
        <div className="grid gap-2 text-center text-xs text-muted-foreground sm:grid-cols-[auto_minmax(0,1fr)] sm:text-left">
          <span>© {new Date().getFullYear()}. Alle Rechte vorbehalten.</span>

          <span className="sm:text-right">
            Alle Marken, Logos und Markennamen sind Eigentum ihrer jeweiligen
            Inhaber.
          </span>
        </div>
      </Container>
    </footer>
  );
}
