export const routes = {
  home: "/",

  subjects: "/faecher",
  maths: "/faecher#mathematik",
  computerScience: "/faecher#informatik",
  physics: "/faecher#physik",
  subjectsFaq: "/faecher#faq",

  process: "/ablauf",
  discordSection: "/ablauf#discord",
  processFaq: "/ablauf#faq",

  pricing: "/preise",
  educationParticipation: "/preise#but",

  about: "/ueber-mich",

  contact: "/kontakt",
  firstMeeting: "/kontakt#kennenlernen",

  booking: "/termin",

  onlineLearning: "/online-lernen",

  login: "/login",

  impressum: "/impressum",
  datenschutz: "/datenschutz",
} as const;

export type RouteKey = keyof typeof routes;
