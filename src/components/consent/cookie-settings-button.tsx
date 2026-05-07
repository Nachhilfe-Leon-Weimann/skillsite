"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useConsent } from "@/providers/consent-provider";

type ButtonVariant = React.ComponentPropsWithRef<typeof Button>["variant"];

type CookieSettingsButtonProps = React.ComponentPropsWithRef<typeof Button> & {
  variant?: "link" | "outline";
  label?: string;
};

const cookieButtonVariants = {
  link: {
    buttonVariant: "link",
    className: "h-auto p-0 text-muted-foreground",
  },
  outline: {
    buttonVariant: "outline",
    className: "",
  },
} satisfies Record<
  NonNullable<CookieSettingsButtonProps["variant"]>,
  {
    buttonVariant: ButtonVariant;
    className: string;
  }
>;

const cookieButtonLabels = {
  link: "Cookies",
  outline: "Cookie-Einstellungen",
};

export function CookieSettingsButton({
  variant = "outline",
  label,
  className,
  onClick,
  type,
  ...props
}: CookieSettingsButtonProps) {
  const { openSettings } = useConsent();

  return (
    <Button
      {...props}
      type={type ?? "button"}
      aria-haspopup="dialog"
      variant={cookieButtonVariants[variant].buttonVariant}
      className={cn(cookieButtonVariants[variant].className, className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          openSettings();
        }
      }}
    >
      {label || cookieButtonLabels[variant]}
    </Button>
  );
}
