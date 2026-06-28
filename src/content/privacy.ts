import { legalContact } from "@/content/legal";

export const privacyPolicyEffectiveDate = new Date("06-28-2026");

export const privacyContact = {
  email: legalContact.email,
  phone: legalContact.phone,
};

export const privacySections = [
  { id: "verantwortlicher", label: "Verantwortlicher" },
  { id: "website", label: "Besuch der Website" },
  { id: "nachhilfe", label: "Nachhilfetätigkeit" },
  { id: "weitergabe", label: "Weitergabe von Daten" },
  { id: "speicherdauer", label: "Speicherdauer" },
  { id: "rechte", label: "Ihre Rechte" },
  { id: "widerspruch", label: "Widerspruchsrecht" },
  { id: "datensicherheit", label: "Datensicherheit" },
  { id: "aktualitaet", label: "Aktualität & Änderung" },
];

export const logFileItems = [
  "IP-Adresse des anfragenden Rechners",
  "Datum und Uhrzeit des Zugriffs",
  "Name und URL der abgerufenen Datei",
  "Website, von der aus der Zugriff erfolgt (Referrer-URL)",
  "verwendeter Browser und ggf. Betriebssystem sowie Name des Access-Providers",
];

export const logFilePurposes = [
  "einen reibungslosen Verbindungsaufbau der Website sicherzustellen",
  "die Nutzung meiner Website komfortabel zu gestalten",
  "die Systemsicherheit und -stabilität auszuwerten",
  "zu administrativen Zwecken",
];

export const externalPlatformPrivacyLinks = [
  { label: "Discord", href: "https://discord.com/privacy" },
  {
    label: "WhatsApp",
    href: "https://www.whatsapp.com/legal/privacy-policy-eea",
  },
  {
    label: "Instagram",
    href: "https://privacycenter.instagram.com/policy/",
  },
  { label: "YouTube", href: "https://policies.google.com/privacy" },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/legal/page/eea/privacy-policy/de",
  },
  {
    label: "GitHub",
    href: "https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement",
  },
];

export const ownAppProviders = [
  "Fly.io, Inc. (Hosting der API)",
  "Neon.tech, Inc. (PostgreSQL-Datenbank)",
  "Cybrancee (Hosting SkillBot)",
];

export const userRights = [
  "Auskunft über Ihre gespeicherten personenbezogenen Daten zu erhalten (Art. 15 DSGVO)",
  "unrichtige Daten berichtigen zu lassen (Art. 16 DSGVO)",
  "die Löschung Ihrer Daten zu verlangen, soweit keine gesetzlichen Pflichten entgegenstehen (Art. 17 DSGVO)",
  "die Verarbeitung einschränken zu lassen (Art. 18 DSGVO)",
  "Ihre Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten (Art. 20 DSGVO)",
  "erteilte Einwilligungen mit Wirkung für die Zukunft zu widerrufen (Art. 7 Abs. 3 DSGVO)",
  "sich bei einer Aufsichtsbehörde zu beschweren (Art. 77 DSGVO)",
];
