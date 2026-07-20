const CONTACT_EMAIL = "nachhilfe@leonweimann.de";
const CONTACT_WHATSAPP = "+49 7824 6190305";
const CONTACT_WHATSAPP_URL = "https://wa.me/message/LN3P6IQ7LDPQH1";

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
    label: "E-Mail",
    content: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  whatsapp: {
    key: "whatsapp",
    label: "WhatsApp",
    content: CONTACT_WHATSAPP,
    href: CONTACT_WHATSAPP_URL,
  },
} satisfies Record<ContactDetailKey, ContactDetail>;

export const contactDetailsList = Object.values(contactDetails);
