import Link from "next/link";
import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";
import { socials } from "@/lib/socials";
import { SocialLink } from "@/components/social-link";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
        {/* Top Row */}
        <div className="relative flex items-center justify-center">
          {/* Logo */}
          <div className="absolute left-0">
            <Link href="/">
              <Logo iconOnly />
            </Link>
          </div>

          {/* Legals */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/impressum" className="hover:text-foreground">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-foreground">
              Datenschutz
            </Link>
            <Link href="/cookies" className="hover:text-foreground">
              Cookies
            </Link>
          </div>

          {/* Socials */}
          <div className="absolute right-0 flex items-center gap-2">
            {socials.map((social) => (
              <SocialLink key={social.id} social={social} side="bottom" />
            ))}
          </div>
        </div>

        <Separator />

        {/* Bottom Row */}
        <div className="grid grid-cols-1 gap-2 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()}. Alle Rechte vorbehalten.</span>

          <span>
            Alle Marken, Logos und Markennamen sind Eigentum ihrer jeweiligen
            Inhaber.
          </span>
        </div>
      </div>
    </footer>
  );
}
