import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termin",
  description: "Buche deinen nächsten Nachhilfe-Termin bei uns!",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
