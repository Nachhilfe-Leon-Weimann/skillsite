import { contactDetails } from "@/content/contact";

export type SocialKey =
  | "discord"
  | "whatsapp"
  | "instagram"
  | "youtube"
  | "tiktok"
  | "github";

export type Social = {
  key: SocialKey;
  label: string;
  href: string;
};

export const socials: Social[] = [
  {
    key: "discord",
    label: "Discord",
    href: "https://discord.com/invite/6DuZYhtuf2",
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    href: contactDetails.whatsapp.href,
  },
  {
    key: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/nachhilfeleonweimann",
  },
  {
    key: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@NachhilfeLeonWeimann",
  },
  {
    key: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@nachhilfeleonweimann",
  },
  {
    key: "github",
    label: "GitHub",
    href: "https://github.com/Nachhilfe-Leon-Weimann",
  },
];
