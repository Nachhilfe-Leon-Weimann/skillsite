export type SetupStep = { n: string; title: string; text: string };

export const discordSetup: SetupStep[] = [
  {
    n: "1",
    title: "Discord holen",
    text: "Kostenlos auf Handy oder Computer – oder direkt im Browser, ganz ohne Installation.",
  },
  {
    n: "2",
    title: "Server beitreten",
    text: "Du bekommst einen Einladungslink zu unserem Server. Ein Klick genügt.",
  },
  {
    n: "3",
    title: "Mikro & Headset testen",
    text: "Kurzer Soundcheck zu Beginn – ich helfe dir beim Einrichten.",
  },
  {
    n: "4",
    title: "Bildschirm teilen",
    text: "So sehen wir beide dieselbe Aufgabe – wie am selben Tisch, nur ohne Anfahrt.",
  },
];

export type Feature = { title: string; text: string };

export const discordFeatures: Feature[] = [
  {
    title: "Unterrichtsräume",
    text: "Eigene Sprachkanäle pro Fach – wir treffen uns einfach im richtigen Raum.",
  },
  {
    title: "Materialien-Kanal",
    text: "Notizen, Aufgaben und Lösungen bleiben dauerhaft abrufbar.",
  },
  {
    title: "Fragen zwischendurch",
    text: "Kurze Frage vor der Klausur? Schreib mir – Antwort meist am selben Tag.",
  },
  {
    title: "Ankündigungen",
    text: "Termine und Infos an einem Ort. So geht nichts unter.",
  },
];

export type Platform = { name: string; tag: string; text: string };

export const platforms: Platform[] = [
  {
    name: "Discord",
    tag: "Standard",
    text: "Mein Klassenzimmer: eigene Sprachkanäle pro Fach, Materialien und kurze Fragen zwischendurch.",
  },
  {
    name: "MS Teams",
    tag: "Auf Wunsch",
    text: "Du nutzt über die Schule lieber Teams? Läuft genauso – sag einfach im Erstgespräch Bescheid.",
  },
];

export const techNote =
  "Computer oder Laptop - stabiles Internet - Headset empfohlen. Beides ist kostenlos – die Einrichtung machen wir gemeinsam.";
