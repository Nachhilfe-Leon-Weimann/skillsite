import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung von Nachhilfe Leon Weimann mit Informationen zu Website, Kontakt, Terminbuchung und Nachhilfetätigkeit.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
