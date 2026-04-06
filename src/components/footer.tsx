import Link from "next/link";
import { Logo } from "@/components/logo";
import {
  siDiscord,
  siWhatsapp,
  siInstagram,
  siYoutube,
  siTiktok,
  siGithub,
} from "simple-icons/icons";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-4">
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
            <BrandIconLink href="#" icon={siDiscord} />
            <BrandIconLink href="#" icon={siWhatsapp} />
            <BrandIconLink href="#" icon={siInstagram} />
            <BrandIconLink href="#" icon={siYoutube} />
            <BrandIconLink href="#" icon={siTiktok} />
            <BrandIconLink href="#" icon={siGithub} />
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

function BrandIconLink({
  href,
  icon,
}: {
  href: string;
  icon: { path: string };
}) {
  return (
    <Button asChild size="icon" variant="ghost">
      <Link href={href}>
        <BrandIcon icon={icon} />
      </Link>
    </Button>
  );
}

function BrandIcon({ icon }: { icon: { path: string } }) {
  return (
    <svg role="img" viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d={icon.path} />
    </svg>
  );
}
