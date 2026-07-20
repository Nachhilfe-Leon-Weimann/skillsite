import { Address } from "@/components/ui/typography";
import { legalContact } from "@/content/legal";

export function ContactAddress({ className }: { className?: string }) {
  return (
    <Address className={className}>
      {legalContact.businessName}
      <br />
      {legalContact.ownerName}
      <br />
      {legalContact.street}
      <br />
      {legalContact.city}
      <br />
      {legalContact.country}
    </Address>
  );
}
