export type ContactDetail = {
  label: string;
  value: string;
  href?: string;
};

export const contactDetails: ContactDetail[] = [
  {
    label: "eMail",
    value: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
    href: `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || ""}`,
  },
  {
    label: "WhatsApp",
    value: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || "",
    href: process.env.NEXT_PUBLIC_WHATSAPP_URL || "",
  },
];
