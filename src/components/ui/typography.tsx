import * as React from "react";
import { cn } from "@/lib/utils";

type TypographyVariant = "site" | "doc";

type TypographyProps<T extends HTMLElement> = React.HTMLAttributes<T> & {
  variant?: TypographyVariant;
};

type InlineLinkProps = React.ComponentPropsWithoutRef<"a"> & {
  variant?: TypographyVariant;
};

// MARK: Headings

export function H1({
  className,
  variant = "site",
  ...props
}: TypographyProps<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        variant === "site"
          ? "font-heading scroll-m-20 text-5xl font-bold tracking-tight text-balance"
          : "font-heading scroll-m-20 text-5xl font-bold tracking-tight text-balance first:mt-0 not-first:mt-10",
        className,
      )}
      {...props}
    />
  );
}

export function H2({
  className,
  variant = "site",
  ...props
}: TypographyProps<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        variant === "site"
          ? "scroll-m-20 text-4xl font-semibold tracking-tight"
          : "scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0 not-first:mt-8 [h1+&]:mt-5",
        className,
      )}
      {...props}
    />
  );
}

export function H3({
  className,
  variant = "site",
  ...props
}: TypographyProps<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        variant === "site"
          ? "scroll-m-20 text-3xl font-semibold tracking-tight"
          : "scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 not-first:mt-7 [h1+&]:mt-5 [h2+&]:mt-4",
        className,
      )}
      {...props}
    />
  );
}

export function H4({
  className,
  variant = "site",
  ...props
}: TypographyProps<HTMLHeadingElement>) {
  return (
    <h4
      className={cn(
        variant === "site"
          ? "scroll-m-20 text-2xl font-semibold tracking-tight"
          : "scroll-m-20 text-lg font-semibold tracking-tight first:mt-0 not-first:mt-7 [h1+&]:mt-5 [h2+&]:mt-4 [h3+&]:mt-3",
        className,
      )}
      {...props}
    />
  );
}

export function H5({
  className,
  variant = "site",
  ...props
}: TypographyProps<HTMLHeadingElement>) {
  return (
    <h5
      className={cn(
        variant === "site"
          ? "scroll-m-20 text-xl font-medium tracking-tight"
          : "scroll-m-20 text-base font-semibold tracking-tight first:mt-0 not-first:mt-6 [h1+&]:mt-5 [h2+&]:mt-4 [h3+&]:mt-3 [h4+&]:mt-3",
        className,
      )}
      {...props}
    />
  );
}

// MARK: Text

export function P({
  className,
  variant = "site",
  ...props
}: TypographyProps<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        variant === "site"
          ? "leading-7"
          : "leading-7 text-foreground not-first:mt-4",
        className,
      )}
      {...props}
    />
  );
}

export function Large({
  className,
  variant = "site",
  ...props
}: TypographyProps<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        variant === "site"
          ? "text-lg font-semibold"
          : "text-lg font-medium leading-8 not-first:mt-5",
        className,
      )}
      {...props}
    />
  );
}

export function Small({
  className,
  variant = "site",
  ...props
}: TypographyProps<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        variant === "site"
          ? "text-sm font-medium"
          : "text-sm leading-6 text-muted-foreground not-first:mt-3",
        className,
      )}
      {...props}
    />
  );
}

export function Lead({
  className,
  variant = "site",
  ...props
}: TypographyProps<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        variant === "site"
          ? "text-xl text-muted-foreground"
          : "text-lg leading-8 text-muted-foreground not-first:mt-4",
        className,
      )}
      {...props}
    />
  );
}

export function Muted({
  className,
  variant = "site",
  ...props
}: TypographyProps<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        variant === "site"
          ? "text-sm text-muted-foreground"
          : "text-sm leading-6 text-muted-foreground not-first:mt-3",
        className,
      )}
      {...props}
    />
  );
}

export function Blockquote({
  className,
  variant = "site",
  ...props
}: TypographyProps<HTMLQuoteElement>) {
  return (
    <blockquote
      className={cn(
        variant === "site"
          ? "mt-6 border-l-2 pl-6 italic"
          : "my-6 border-l-2 pl-6 leading-7 italic text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function Address({
  className,
  variant = "site",
  ...props
}: TypographyProps<HTMLElement>) {
  return (
    <address
      className={cn(
        variant === "site"
          ? "not-italic leading-7"
          : "not-italic leading-7 text-foreground not-first:mt-4",
        className,
      )}
      {...props}
    />
  );
}

export function InlineCode({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"code">) {
  return (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className,
      )}
      {...props}
    />
  );
}

export function InlineLink({
  className,
  variant = "site",
  ...props
}: InlineLinkProps) {
  return (
    <a
      className={cn(
        variant === "site"
          ? "font-medium underline underline-offset-4"
          : "font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...props}
    />
  );
}
