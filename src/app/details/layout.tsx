import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Details",
  description: "Alle möglichen weiteren Informationen",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
