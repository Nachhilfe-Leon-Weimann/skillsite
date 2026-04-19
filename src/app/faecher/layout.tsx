import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fächer",
};

export default function SubjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
