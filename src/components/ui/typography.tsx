import * as React from "react";
import { cn } from "@/lib/utils";

// MARK: Helpers

type PolymorphicProps<C extends React.ElementType> = {
  as?: C;
  className?: string;
} & React.ComponentPropsWithoutRef<C>;

function createTypography<C extends React.ElementType>(
  defaultTag: C,
  baseStyles: string,
) {
  return function Component<T extends React.ElementType = C>({
    as,
    className,
    ...props
  }: PolymorphicProps<T>) {
    const Comp = (as || defaultTag) as React.ElementType;
    return <Comp className={cn(baseStyles, className)} {...props} />;
  };
}

// MARK: Headings

export const H1 = createTypography(
  "h1",
  "scroll-m-20 text-4xl font-bold tracking-tight md:text-5xl",
);

export const H2 = createTypography(
  "h2",
  "scroll-m-20 text-3xl font-semibold tracking-tight md:text-4xl",
);

export const H3 = createTypography(
  "h3",
  "scroll-m-20 text-2xl font-semibold md:text-3xl",
);

export const H4 = createTypography(
  "h4",
  "scroll-m-20 text-xl font-medium md:text-2xl",
);

// MARK: Text level

export const P = createTypography("p", "leading-7 text-muted-foreground");

export const Lead = createTypography("p", "text-lg text-muted-foreground");

export const Large = createTypography("div", "text-lg font-semibold");

export const Small = createTypography("small", "text-sm text-muted-foreground");

export const Muted = createTypography("p", "text-sm text-muted-foreground");

// MARK: Other

export const Blockquote = createTypography(
  "blockquote",
  "mt-6 border-l-2 pl-6 italic text-muted-foreground",
);

export const InlineCode = createTypography(
  "code",
  "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
);

export const List = createTypography("ul", "my-6 ml-6 list-disc [&>li]:mt-2");

export const OrderedList = createTypography(
  "ol",
  "my-6 ml-6 list-decimal [&>li]:mt-2",
);

export const ListItem = createTypography("li", "");

export const TextLink = createTypography(
  "a",
  "font-medium underline underline-offset-4 hover:text-primary",
);
