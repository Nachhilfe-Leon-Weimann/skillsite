export type ContactDetailKey = "eMail" | "whatsapp";

export type ContactDetail = {
  key: string;
  label: string;
  content: string;
  href: string;
};

export const contactDetails = {
  eMail: {
    key: "eMail",
    label: "eMail",
    content: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
    href: `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || ""}`,
  },
  whatsapp: {
    key: "whatsapp",
    label: "WhatsApp",
    content: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || "",
    href: process.env.NEXT_PUBLIC_WHATSAPP_URL || "",
  },
} satisfies Record<ContactDetailKey, ContactDetail>;

export const contactDetailsList = Object.values(contactDetails);
