export type SetupStep = { n: string; title: string; text: string };

/** One-time setup: get Discord, join via link, wait for manual unlock. */
export const discordSetup: SetupStep[] = [
  {
    n: "1",
    title: "Discord holen",
    text: "Kostenlos als App auf Handy, Tablet oder Computer – oder direkt im Browser, ganz ohne Installation.",
  },
  {
    n: "2",
    title: "Über den Link beitreten",
    text: "Ein Klick auf den Einladungslink, und du bist auf dem Server. Den Link findest du direkt darunter.",
  },
  {
    n: "3",
    title: "Freischaltung abwarten",
    text: "Direkt nach dem Beitreten siehst du noch keine Kanäle – das ist normal. Ich schalte dich von Hand frei. Spätestens vor deiner ersten Stunde bist du drin.",
  },
];

/** What happens on the day of a lesson (rendered as a LessonTimeline). */
export const lessonSteps: SetupStep[] = [
  {
    n: "1",
    title: "Kurz vorher in die ‚lounge‘",
    text: "Klick dich rund 5 Minuten vor dem Termin in den Sprachkanal ‚lounge‘ ein. Mehr musst du nicht tun.",
  },
  {
    n: "2",
    title: "Ich hole dich in unseren Raum",
    text: "In der ‚lounge‘ hörst du niemanden und kannst selbst nicht sprechen – das ist so eingestellt. Zum Termin hole ich dich von dort in unseren privaten Raum.",
  },
  {
    n: "3",
    title: "Auf ‚Stream anschauen‘ klicken",
    text: "Damit du meinen Bildschirm siehst, klickst du auf ‚Stream anschauen‘. Je nach Gerät sitzt der Button woanders – findest du ihn nicht, frag mich einfach, ich zeig’s dir.",
  },
  {
    n: "4",
    title: "Gemeinsam lösen",
    text: "Ab hier arbeiten wir zusammen an deinen Aufgaben – wie am selben Tisch, nur ohne Anfahrt.",
  },
];

export type Feature = { title: string; text: string };

export const discordFeatures: Feature[] = [
  {
    title: "Dein persönlicher Kanal",
    text: "Ein Textkanal nur für dich und mich – ‚vorname-nachname‘. Hier schreiben wir und laden Dateien hoch.",
  },
  {
    title: "Materialien bleiben da",
    text: "Aufschrieb, Aufgaben und Lösungen sammeln sich in deinem Kanal – während unserer Zusammenarbeit auch zwischen den Stunden abrufbar.",
  },
  {
    title: "Fragen zwischendurch",
    text: "Kurz vor der Klausur noch eine Frage? Schreib mir einfach in deinem Kanal. Meistens antworte ich noch am selben Tag.",
  },
  {
    title: "Alles an einem Ort",
    text: "Ankündigungen, Termine, Materialien und Nachrichten findest du gebündelt auf dem Server.",
  },
];

export type TeamsNote = { name: string; tag: string; text: string };

export const teamsNote: TeamsNote = {
  name: "Microsoft Teams",
  tag: "Auf Wunsch",
  text: "Microsoft Teams geht auch. Wenn du Teams über die Schule ohnehin nutzt, läuft die Stunde genauso – sag mir einfach vorher Bescheid.",
};

export const techNote =
  "Computer, Laptop oder Tablet · stabiles Internet · Headset empfohlen. Eine Kamera brauchst du nicht. Discord ist kostenlos.";
