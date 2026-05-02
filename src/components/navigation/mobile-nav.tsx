import { CalendarRange, ChevronDown, Menu, XIcon } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Logo } from "@/components/logo";
import { DropdownListItem } from "@/components/navigation/dropdown-list-item";
import { LoginButton } from "@/components/navigation/login-button";
import { navItems, type NavItem } from "@/lib/navigation";
import { routes } from "@/lib/routes";

const mobileDropdownSectionHeaderClassName = "flex h-6 items-center gap-2 px-1";

export function MobileNavMenu() {
  return (
    <Sheet>
      <SheetTrigger aria-label="Navigation öffnen" asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden active:translate-y-px data-[state=open]:bg-muted"
        >
          <Menu aria-hidden="true" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-[min(92vw,24rem)] gap-0 p-0"
      >
        <SheetHeader className="flex flex-row justify-between border-b py-4 pl-4 pr-6">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SheetDescription className="sr-only">
            Hauptnavigation mit Seitenlinks und Kontaktaktionen
          </SheetDescription>

          <SheetClose asChild>
            <Link href={routes.home}>
              <Logo />
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Button variant="ghost" size="icon">
              <XIcon aria-hidden="true" />
              <span className="sr-only">Navigation schließen</span>
            </Button>
          </SheetClose>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="p-4 pr-6">
            <nav aria-label="Mobile Navigation">
              <ul className="grid gap-2">
                {navItems.map((item) => (
                  <MobileNavItem key={item.label} item={item} />
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <SheetFooter className="border-t px-5 py-4 pr-6">
          <SheetClose asChild>
            <Link
              href={routes.booking}
              className={buttonVariants({
                variant: "secondary",
                className: "w-full",
              })}
            >
              <CalendarRange aria-hidden="true" />
              Termin buchen
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <LoginButton />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function MobileNavItem({ item }: { item: NavItem }) {
  if (!item.dropdown) {
    return (
      <li>
        <SheetClose asChild>
          <Link
            href={item.href}
            className="block rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-muted hover:text-primary focus:bg-muted focus:text-primary focus:outline-none active:translate-y-px"
          >
            {item.label}
          </Link>
        </SheetClose>
      </li>
    );
  }

  return (
    <li>
      <Collapsible className="group/collapsible">
        <CollapsibleTrigger className="group/mobile-trigger flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors duration-200 hover:bg-muted hover:text-primary focus:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 group-data-[state=open]/collapsible:bg-muted active:translate-y-px">
          <span>{item.label}</span>
          <ChevronDown
            className="size-4 text-muted-foreground transition-all duration-200 group-hover/mobile-trigger:text-primary group-data-[state=open]/collapsible:rotate-180"
            aria-hidden="true"
          />
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="grid gap-3 py-2 pl-4">
            {item.dropdown.sections.map((section) => (
              <div key={section.title} className="grid gap-1">
                <div className={mobileDropdownSectionHeaderClassName}>
                  <span className="font-heading text-xs font-semibold uppercase text-muted-foreground">
                    {section.title}
                  </span>

                  {section.tag && (
                    <Badge
                      variant="outline"
                      className="border-foreground/10 bg-background/80 text-[0.7rem]"
                    >
                      {section.tag}
                    </Badge>
                  )}
                </div>

                <ul>
                  {section.items.map((child) => (
                    <DropdownListItem key={child.title} item={child} mobile />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </li>
  );
}
