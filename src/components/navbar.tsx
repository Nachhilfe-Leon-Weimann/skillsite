import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from "@/components/ui/item";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { CalendarRange } from "lucide-react";
import Link from "next/link";

import { navItems, NavItem, NavItemChildren } from "@/lib/navigation";

import { Logo } from "@/components/logo";

export function Navbar() {
  return (
    <header className="w-full border-b bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
        {/* Left Group */}
        <div className="flex items-center gap-8">
          <Link href="/">
            <Logo />
          </Link>

          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {navItems.map((item) => (
                <NavMenuItem key={item.label} item={item} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Group */}
        <div className="flex items-center gap-3">
          <Button size="icon" variant="ghost">
            <CalendarRange className="w-4 h-4" />
          </Button>
          <LoginButton />
          <Button>Jetzt starten</Button>
        </div>
      </div>
    </header>
  );
}

function NavMenuItem({ item }: { item: NavItem }) {
  if (item.children) {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-125 gap-1 p-0">
            {item.children.map((child) => (
              <ListItem key={child.label} child={child} />
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
        <Link href={item.href}>{item.label}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

function ListItem({
  child,
  ...props
}: {
  child: NavItemChildren;
} & React.ComponentPropsWithoutRef<"li">) {
  const Icon = child.icon;
  const tag = child.tag;
  const description = child.description;

  return (
    <li {...props}>
      <NavigationMenuLink href={child.href}>
        <Item className="p-0 m-0">
          {Icon && (
            <ItemMedia variant="icon">
              <Icon />
            </ItemMedia>
          )}
          <ItemContent>
            <ItemTitle>{child.label}</ItemTitle>
            {description && <ItemDescription>{description}</ItemDescription>}
          </ItemContent>
          {tag && (
            <ItemActions>
              <Badge
                className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-50"
                variant="outline"
              >
                {tag}
              </Badge>
            </ItemActions>
          )}
        </Item>
      </NavigationMenuLink>
    </li>
  );
}

function LoginButton() {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button disabled variant="secondary" size="sm">
          Log in
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Bald verfügbar</p>
      </TooltipContent>
    </Tooltip>
  );
}
