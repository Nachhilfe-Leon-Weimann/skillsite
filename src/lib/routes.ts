export const routes = {
  home: "/",

  subjects: "/faecher",
  maths: "/faecher#mathematik",
  computer_science: "/faecher#informatik",
  physics: "/faecher#physik",

  details: "/details",
  pricing: "/details#preise",
  educationAndPraticipation: "/details#but",
  communication: "/details#kommunikation",
  process: "/details#ablauf",
  faq: "/details#faq",

  about: "/about",
  contact: "/kontakt",
  booking: "/termin",
} as const;
