"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type CTAVariant = "center" | "left" | "right";

type CTAContextValue = {
  variant: CTAVariant;
};

const CTAContext = React.createContext<CTAContextValue | null>(null);

function useCTAContext() {
  const context = React.useContext(CTAContext);

  if (!context) {
    throw new Error("CTA components must be used within <CTA />");
  }

  return context;
}

const itemAlignment: Record<CTAVariant, string> = {
  center: "items-center",
  left: "items-start",
  right: "items-end",
};

const textAlignment: Record<CTAVariant, string> = {
  center: "text-center",
  left: "text-left",
  right: "text-right",
};

const actionJustify: Record<CTAVariant, string> = {
  center: "justify-center",
  left: "justify-start",
  right: "justify-end",
};

const rootLayout: Record<CTAVariant, string> = {
  center: "mx-auto max-w-176 items-center gap-10",
  left: "max-w-3xl items-start gap-8",
  right: "ml-auto max-w-3xl items-end gap-8",
};

type CTAProps = React.ComponentProps<"section"> & {
  variant?: CTAVariant;
};

function CTA({ className, variant = "center", ...props }: CTAProps) {
  return (
    <CTAContext.Provider value={{ variant }}>
      <section
        data-slot="cta"
        data-variant={variant}
        className={cn(
          "relative flex w-full flex-col text-foreground",
          rootLayout[variant],
          textAlignment[variant],
          className,
        )}
        {...props}
      />
    </CTAContext.Provider>
  );
}

function CTAHeader({ className, ...props }: React.ComponentProps<"div">) {
  const { variant } = useCTAContext();

  return (
    <div
      data-slot="cta-header"
      data-variant={variant}
      className={cn(
        "flex w-full flex-col gap-2",
        itemAlignment[variant],
        className,
      )}
      {...props}
    />
  );
}

function CTAIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="cta-icon"
      className={cn(
        "flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary",
        className,
      )}
      {...props}
    />
  );
}

function CTABadge({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="cta-badge"
      className={cn(
        "flex flex-wrap items-center gap-2 not-first:mt-2 mb-2",
        className,
      )}
      {...props}
    />
  );
}

function CTAContent({ className, ...props }: React.ComponentProps<"div">) {
  const { variant } = useCTAContext();

  return (
    <div
      data-slot="cta-content"
      data-variant={variant}
      className={cn(
        "flex w-full flex-col gap-6",
        itemAlignment[variant],
        className,
      )}
      {...props}
    />
  );
}

function CTABody({ className, ...props }: React.ComponentProps<"div">) {
  const { variant } = useCTAContext();

  return (
    <div
      data-slot="cta-body"
      data-variant={variant}
      className={cn(
        "flex w-full flex-col gap-4",
        itemAlignment[variant],
        className,
      )}
      {...props}
    />
  );
}

function CTAActions({ className, ...props }: React.ComponentProps<"div">) {
  const { variant } = useCTAContext();

  return (
    <div
      data-slot="cta-actions"
      data-variant={variant}
      className={cn(
        "flex flex-col gap-3 sm:flex-row",
        itemAlignment[variant],
        actionJustify[variant],
        "*:w-full sm:*:w-auto",
        className,
      )}
      {...props}
    />
  );
}

function CTAFooter({ className, ...props }: React.ComponentProps<"div">) {
  const { variant } = useCTAContext();

  return (
    <div
      data-slot="cta-footer"
      data-variant={variant}
      className={cn(
        "text-sm text-muted-foreground",
        textAlignment[variant],
        className,
      )}
      {...props}
    />
  );
}

export {
  CTA,
  CTAHeader,
  CTAIcon,
  CTABadge,
  CTAContent,
  CTABody,
  CTAActions,
  CTAFooter,
};
