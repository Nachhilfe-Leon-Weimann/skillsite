import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";

import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { SheetClose } from "@/components/ui/sheet";

import type { NavDropdownItem, NavIcon } from "@/lib/navigation";

const dropdownListItemClassName =
  "group/link grid grid-cols-[2.25rem_minmax(0,1fr)] items-start gap-3 rounded-md p-2 transition-colors duration-200 focus:outline-none bg-transparent hover:bg-transparent";

const mobileDropdownListItemClassName =
  "group/link grid grid-cols-[2.25rem_minmax(0,1fr)] items-start gap-3 rounded-md px-2 py-2.5 transition-colors duration-200 hover:bg-muted focus:bg-muted focus:outline-none";

type DropdownListItemProps = {
  item: NavDropdownItem;
  mobile?: boolean;
} & ComponentPropsWithoutRef<"li">;

export function DropdownListItem({
  item,
  mobile = false,
  ...props
}: DropdownListItemProps) {
  if (mobile) {
    return (
      <li {...props}>
        <SheetClose asChild>
          <Link href={item.href} className={mobileDropdownListItemClassName}>
            <DropdownListItemContent item={item} />
          </Link>
        </SheetClose>
      </li>
    );
  }

  return (
    <li {...props}>
      <NavigationMenuLink asChild className={dropdownListItemClassName}>
        <Link href={item.href}>
          <DropdownListItemContent item={item} />
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

function DropdownListItemContent({ item }: { item: NavDropdownItem }) {
  return (
    <>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border/80 bg-background text-foreground transition-all duration-200 group-hover/link:border-primary group-hover/link:bg-primary group-hover/link:text-background group-hover/link:shadow-[0_0_14px_oklch(from_var(--primary)_l_c_h/0.18)] group-focus/link:border-primary group-focus/link:bg-primary group-focus/link:text-background group-focus/link:shadow-[0_0_14px_oklch(from_var(--primary)_l_c_h/0.18)]">
        <NavItemIcon icon={item.icon} />
      </span>

      <span className="min-w-0">
        <span className="font-heading block truncate text-sm font-medium leading-snug transition-colors duration-200 group-hover/link:text-primary group-focus/link:text-primary">
          {item.title}
        </span>

        {item.description && (
          <span className="block truncate text-sm leading-normal text-muted-foreground transition-colors duration-200 group-hover/link:text-foreground group-focus/link:text-foreground">
            {item.description}
          </span>
        )}
      </span>
    </>
  );
}

function NavItemIcon({ icon }: { icon: NavIcon }) {
  if (isSimpleIcon(icon)) {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-4"
        fill="currentColor"
      >
        <path d={icon.path} />
      </svg>
    );
  }

  const Icon = icon;

  return <Icon aria-hidden="true" className="size-4" strokeWidth={1.8} />;
}

function isSimpleIcon(
  icon: NavIcon,
): icon is Extract<NavIcon, { path: string }> {
  return typeof icon === "object" && icon !== null && "path" in icon;
}
