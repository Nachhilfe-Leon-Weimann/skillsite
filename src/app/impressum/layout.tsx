import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Rechtliche Informationen und Kontaktangaben.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
