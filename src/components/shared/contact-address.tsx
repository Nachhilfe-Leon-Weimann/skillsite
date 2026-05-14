import { Address } from "@/components/ui/typography";
import { legalContact } from "@/content/legal";

export function ContactAddress({
  variant = "doc",
  className,
  ...props
}: React.ComponentProps<typeof Address>) {
  return (
    <Address variant={variant} className={className} {...props}>
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
