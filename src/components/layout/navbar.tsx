"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { LinkButton } from "@/components/ui/button";
import { primaryCta, primaryNav, platformNav } from "@/content/site";
import { routes } from "@/lib/routes";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  // Close the mobile menu whenever the route changes (render-time reset).
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  const isActive = (href: string) => {
    const base = href.split("#")[0];
    return base === "/" ? pathname === "/" : pathname.startsWith(base);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-[color-mix(in_srgb,var(--bg)_84%,transparent)] backdrop-blur-[14px]">
      <Container className="flex items-center gap-4 py-3">
        <Link href={routes.home} aria-label="Startseite" className="shrink-0">
          <Logo />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden flex-1 items-center justify-end gap-1 min-[880px]:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-[0.95rem] transition-colors hover:bg-surface-2",
                isActive(item.href)
                  ? "font-semibold text-ink"
                  : "text-ink-soft",
              )}
            >
              {item.label}
            </Link>
          ))}

          <div className="group relative">
            <button
              type="button"
              aria-haspopup="true"
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.95rem] transition-colors hover:bg-surface-2",
                isActive(routes.onlineLearning)
                  ? "font-semibold text-ink"
                  : "text-ink-soft",
              )}
            >
              Online lernen
              <ChevronDown
                className="size-3.5 transition-transform duration-200 group-hover:rotate-180"
                aria-hidden
              />
            </button>
            <div className="invisible absolute right-0 top-[calc(100%+6px)] z-10 flex w-64 translate-y-2 flex-col gap-0.5 rounded-2xl border border-line bg-surface p-2 opacity-0 shadow-card transition-[opacity,transform,visibility] duration-300 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              {platformNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex flex-col gap-0.5 rounded-xl px-3 py-2.5 transition-colors hover:bg-surface-2"
                >
                  <span className="text-[0.95rem] font-semibold text-ink">
                    {item.label}
                  </span>
                  <span className="text-[0.82rem] text-ink-soft">
                    {item.note}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Right cluster */}
        <div className="ml-auto flex items-center gap-2.5 min-[880px]:ml-0">
          <Link
            href={routes.login}
            className="hidden rounded-full px-3 py-2 text-[0.95rem] font-semibold text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink min-[880px]:inline-flex"
          >
            Login
          </Link>
          <LinkButton
            href={primaryCta.href}
            variant="primary"
            size="md"
            className="hidden min-[880px]:inline-flex"
          >
            {primaryCta.label}
          </LinkButton>
          <button
            type="button"
            aria-label="Menü"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-line bg-surface text-ink min-[880px]:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile panel */}
      {open ? (
        <div className="border-t border-line bg-bg min-[880px]:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "border-b border-line py-3 text-[1.05rem]",
                  isActive(item.href)
                    ? "font-semibold text-ink"
                    : "text-ink-soft",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={routes.onlineLearning}
              className="border-b border-line py-3 text-[1.05rem] font-semibold text-ink-soft"
            >
              Discord &amp; MS Teams
            </Link>
            <Link
              href={routes.booking}
              className="border-b border-line py-3 text-[1.05rem] font-semibold text-ink-soft"
            >
              Termin buchen
            </Link>
            <Link
              href={routes.login}
              className="py-3 text-[1.05rem] font-semibold text-ink-soft"
            >
              Login
            </Link>
            <LinkButton
              href={primaryCta.href}
              variant="primary"
              className="mt-2 w-full"
            >
              {primaryCta.label}
            </LinkButton>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
