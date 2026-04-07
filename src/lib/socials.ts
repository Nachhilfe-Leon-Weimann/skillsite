import {
  SimpleIcon,
  siDiscord,
  siWhatsapp,
  siInstagram,
  siYoutube,
  siTiktok,
  siGithub,
} from "simple-icons/icons";

type SocialId =
  | "discord"
  | "whatsapp"
  | "instagram"
  | "youtube"
  | "tiktok"
  | "github";

export type Social = {
  id: SocialId;
  label: string;
  href: string;
  icon: SimpleIcon;
  helptext?: string;
};

export const socials: Social[] = [
  {
    id: "discord",
    label: "Discord",
    href: process.env.NEXT_PUBLIC_DISCORD_URL ?? "",
    icon: siDiscord,
    helptext: "Tritt unserer Discord-Community bei!",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "",
    icon: siWhatsapp,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
    icon: siInstagram,
  },
  {
    id: "youtube",
    label: "YouTube",
    href: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "",
    icon: siYoutube,
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: process.env.NEXT_PUBLIC_TIKTOK_URL ?? "",
    icon: siTiktok,
  },
  {
    id: "github",
    label: "GitHub",
    href: process.env.NEXT_PUBLIC_GITHUB_URL ?? "",
    icon: siGithub,
  },
];
