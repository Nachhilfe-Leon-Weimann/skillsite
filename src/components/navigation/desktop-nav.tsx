import type { CSSProperties } from "react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { DropdownListItem } from "@/components/navigation/dropdown-list-item";
import { navItems, type NavItem } from "@/lib/navigation";

const dropdownSectionHeaderClassName = "flex h-9 items-center gap-3 px-2 pt-2";

export function DesktopNav() {
  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList className="gap-2">
        {navItems.map((item) => (
          <DesktopNavItem key={item.label} item={item} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function DesktopNavItem({ item }: { item: NavItem }) {
  if (!item.dropdown) {
    return (
      <NavigationMenuItem>
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <Link href={item.href}>{item.label}</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>

      <NavigationMenuContent className="p-0">
        <div
          className="grid w-[min(92vw,52rem)] p-1 md:grid-cols-[repeat(var(--nav-section-count),minmax(0,1fr))]"
          style={
            {
              "--nav-section-count": item.dropdown.sections.length,
            } as CSSProperties
          }
        >
          {item.dropdown.sections.map((section) => (
            <div key={section.title} className="flex min-w-0 flex-col">
              <div className={dropdownSectionHeaderClassName}>
                <p className="font-heading text-xs font-semibold uppercase text-muted-foreground">
                  {section.title}
                </p>

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
                  <DropdownListItem key={child.title} item={child} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
