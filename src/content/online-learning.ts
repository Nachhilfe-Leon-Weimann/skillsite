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
    text: "Ein Klick auf den Einladungslink, und du bist auf dem Server. Den Link findest du gleich hier drunter.",
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
    text: "Von der ‚lounge‘ ziehe ich dich in unseren privaten Raum. Dass dort niemand spricht oder du selbst nicht sprechen kannst, ist völlig normal – und genau so gewollt.",
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
    text: "Ein Textkanal nur für dich – ‚vorname-nachname‘. Hier schreiben wir und laden Dateien hoch.",
  },
  {
    title: "Materialien bleiben da",
    text: "Aufschrieb, Aufgaben und Lösungen sammeln sich in deinem Kanal – dauerhaft abrufbar, auch nach der Stunde.",
  },
  {
    title: "Fragen zwischendurch",
    text: "Kurz vor der Klausur noch eine Frage – schreib mir einfach in deinem Kanal. Antwort meist am selben Tag.",
  },
  {
    title: "Der Server wächst",
    text: "Ankündigungen, Termine und mehr an einem Ort. Ich baue den Server laufend aus – da kommt noch einiges.",
  },
];

export type TeamsNote = { name: string; tag: string; text: string };

export const teamsNote: TeamsNote = {
  name: "MS Teams",
  tag: "Auf Wunsch",
  text: "MS Teams geht auch. Wenn du das über die Schule ohnehin nutzt, läuft die Stunde genauso – sag mir einfach vorher Bescheid.",
};

export const techNote =
  "Computer, Laptop oder Tablet · stabiles Internet · Headset empfohlen. Eine Kamera brauchst du nicht – Discord ist kostenlos.";
