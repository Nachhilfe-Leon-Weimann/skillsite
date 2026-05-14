import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import {
  Address,
  H1,
  H2,
  H3,
  InlineLink,
  Lead,
  P,
  Small,
} from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import {
  CalendarDays,
  ExternalLink,
  Mail,
  Scale,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { PrivacySectionNav } from "./privacy-section-nav";

const CONTACT_EMAIL = "nachhilfe@leonweimann.de";
const CONTACT_PHONE = "+49 7824 6190305";

const sections = [
  { id: "verantwortlicher", label: "Verantwortlicher" },
  { id: "website", label: "Besuch der Website" },
  { id: "nachhilfe", label: "Nachhilfetätigkeit" },
  { id: "weitergabe", label: "Weitergabe von Daten" },
  { id: "rechte", label: "Ihre Rechte" },
  { id: "widerspruch", label: "Widerspruchsrecht" },
  { id: "datensicherheit", label: "Datensicherheit" },
  { id: "aktualitaet", label: "Aktualität & Änderung" },
];

const logFileItems = [
  "IP-Adresse des anfragenden Rechners",
  "Datum und Uhrzeit des Zugriffs",
  "Name und URL der abgerufenen Datei",
  "Website, von der aus der Zugriff erfolgt (Referrer-URL)",
  "verwendeter Browser und ggf. Betriebssystem sowie Name des Access-Providers",
];

const logFilePurposes = [
  "einen reibungslosen Verbindungsaufbau der Website sicherzustellen",
  "die Nutzung meiner Website komfortabel zu gestalten",
  "die Systemsicherheit und -stabilität auszuwerten",
  "zu administrativen Zwecken",
];

const externalPlatforms = [
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

const ownAppProviders = [
  "Fly.io, Inc. (Hosting der API)",
  "Neon.tech, Inc. (PostgreSQL-Datenbank)",
  "Cybrancee (Hosting SkillBot)",
];

const userRights = [
  "Auskunft über Ihre gespeicherten personenbezogenen Daten zu erhalten (Art. 15 DSGVO)",
  "unrichtige Daten berichtigen zu lassen (Art. 16 DSGVO)",
  "die Löschung Ihrer Daten zu verlangen, soweit keine gesetzlichen Pflichten entgegenstehen (Art. 17 DSGVO)",
  "die Verarbeitung einschränken zu lassen (Art. 18 DSGVO)",
  "Ihre Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten (Art. 20 DSGVO)",
  "erteilte Einwilligungen mit Wirkung für die Zukunft zu widerrufen (Art. 7 Abs. 3 DSGVO)",
  "sich bei einer Aufsichtsbehörde zu beschweren (Art. 77 DSGVO)",
];

export default function DatenschutzPage() {
  return (
    <Section offsetFooter containerClassName="justify-start">
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-14">
        <article className="min-w-0">
          <Card className="py-0 shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <header>
                <div className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1 text-sm text-muted-foreground">
                  <ShieldCheck className="size-4" aria-hidden="true" />
                  Datenschutz nach DSGVO
                </div>
                <H1
                  variant="doc"
                  className="mt-5 hyphens-auto text-4xl leading-tight sm:text-5xl"
                >
                  Datenschutzerklärung
                </H1>
                <Lead variant="doc" className="max-w-3xl">
                  Informationen zur Verarbeitung personenbezogener Daten beim
                  Besuch dieser Website und im Rahmen der Nachhilfetätigkeit.
                </Lead>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <HeaderFact icon={CalendarDays} label="Stand">
                    September 2025
                  </HeaderFact>
                  <HeaderFact icon={Mail} label="Kontakt">
                    <InlineLink variant="doc" href={`mailto:${CONTACT_EMAIL}`}>
                      {CONTACT_EMAIL}
                    </InlineLink>
                  </HeaderFact>
                </div>
              </header>
            </CardContent>
          </Card>

          <DocSection id="verantwortlicher" title="1. Verantwortlicher">
            <P variant="doc">
              Verantwortlich für die Verarbeitung Ihrer personenbezogenen Daten
              ist:
            </P>
            <Address variant="doc">
              Nachhilfe Leon Weimann
              <br />
              Leon Weimann
              <br />
              Friedhofstraße 11
              <br />
              77963 Schwanau
            </Address>
            <P variant="doc" className="mt-6">
              E-Mail:{" "}
              <InlineLink variant="doc" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </InlineLink>
              <br />
              Telefonnummer:{" "}
              <InlineLink variant="doc" href={`tel:${CONTACT_PHONE}`}>
                {CONTACT_PHONE}
              </InlineLink>
            </P>
          </DocSection>

          <DocSection
            id="website"
            title="2. Datenverarbeitung beim Besuch der Website"
          >
            <P variant="doc" className="text-muted-foreground">
              Beim Besuch der Website werden technische Abrufe,
              Kontaktaufnahmen, Terminbuchungen, externe Links sowie notwendige
              und optionale Speicherungen getrennt betrachtet.
            </P>

            <SubSection title="a) Server-Logfiles">
              <P variant="doc">
                Beim Aufrufen meiner Website
                <span className="font-medium"> nachhilfe.leonweimann.de </span>
                werden durch den auf Ihrem Endgerät zum Einsatz kommenden
                Browser automatisch Informationen an den Server meiner Website
                gesendet. Diese werden temporär in einem sog. Logfile
                gespeichert:
              </P>
              <DetailGrid>
                <DetailList
                  title="Gespeicherte Informationen"
                  items={logFileItems}
                />
                <DetailList
                  title="Zweck der Verarbeitung"
                  items={logFilePurposes}
                />
              </DetailGrid>
              <LegalBasis>Art. 6 Abs. 1 lit. f DSGVO.</LegalBasis>
            </SubSection>

            <SubSection title="b) Terminbuchung über cal.com">
              <P variant="doc">
                Für Terminbuchungen nutze ich den Dienst cal.com (cal.com S.L.,
                Spanien). Die von Ihnen eingegebenen Daten (z. B. Name,
                E-Mail-Adresse) werden an cal.com übermittelt.
              </P>
              <ProviderLink href="https://cal.com/privacy">
                Datenschutzerklärung von cal.com
              </ProviderLink>
              <LegalBasis>Art. 6 Abs. 1 lit. b DSGVO.</LegalBasis>
            </SubSection>

            <SubSection title="c) Verlinkung zu externen Plattformen">
              <P variant="doc">
                Meine Website enthält Links zu externen Diensten (Discord,
                WhatsApp, Instagram, YouTube, TikTok, GitHub). Erst beim
                Anklicken werden Daten an den jeweiligen Anbieter übertragen.
                Bitte beachten Sie die Datenschutzbestimmungen dieser
                Plattformen:
              </P>
              <LinkList links={externalPlatforms} />
            </SubSection>

            <SubSection title="d) Cookies und lokale Speicherung">
              <P variant="doc">
                Diese Website verwendet technisch notwendige Speicherungen, um
                Grundfunktionen bereitzustellen und Ihre Cookie-Auswahl zu
                speichern. Die Cookie-Auswahl wird lokal in Ihrem Browser
                gespeichert.
              </P>
              <P variant="doc">
                Optionale externe Dienste, insbesondere eingebettete Inhalte wie
                die Terminbuchung über cal.com, werden erst geladen, wenn Sie
                externe Dienste akzeptieren. Diese Anbieter können eigene
                Cookies oder vergleichbare Technologien einsetzen.
              </P>
              <LegalBasis>
                Art. 6 Abs. 1 lit. f DSGVO für technisch notwendige
                Speicherungen; Art. 6 Abs. 1 lit. a DSGVO für optionale externe
                Dienste.
              </LegalBasis>
            </SubSection>
          </DocSection>

          <DocSection
            id="nachhilfe"
            title="3. Datenverarbeitung im Rahmen der Nachhilfetätigkeit"
          >
            <DocGroup title="Abrechnung und Buchhaltung">
              <SubSection title="a) Zeiterfassung und Abrechnung (Clockodo)">
                <P variant="doc">
                  Für Zeiterfassung und Abrechnung nutze ich den Dienst Clockodo
                  (Clockodo GmbH, Viktoriastraße 25A, 59425 Unna). Verarbeitet
                  werden Name, Kontaktdaten und Abrechnungsinformationen. Mit
                  Clockodo besteht ein Auftragsverarbeitungsvertrag.
                </P>
                <ProviderLink href="https://www.clockodo.com/de/datenschutz/">
                  Datenschutzerklärung von Clockodo
                </ProviderLink>
                <LegalBasis>Art. 6 Abs. 1 lit. b DSGVO.</LegalBasis>
              </SubSection>

              <SubSection title="b) Buchhaltung (sevDesk)">
                <P variant="doc">
                  Zur Abwicklung meiner Buchhaltung nutze ich sevDesk (sevDesk
                  GmbH, Hauptstraße 115, 77652 Offenburg). Dabei werden
                  Kundendaten (Name, Adresse, Rechnungsdaten) verarbeitet. Ein
                  Auftragsverarbeitungsvertrag liegt vor.
                </P>
                <ProviderLink href="https://sevdesk.de/datenschutz/">
                  Datenschutzerklärung von sevDesk
                </ProviderLink>
                <LegalBasis>
                  Art. 6 Abs. 1 lit. c DSGVO und lit. b DSGVO.
                </LegalBasis>
              </SubSection>
            </DocGroup>

            <DocGroup title="Kommunikation und Unterricht">
              <SubSection title="c) Kommunikation per Microsoft 365 Business (E-Mail, Teams, Forms)">
                <P variant="doc">
                  Für E-Mails, Online-Meetings und Anmeldungen nutze ich
                  Microsoft 365 (Microsoft Ireland Operations Limited, Dublin,
                  Irland).
                </P>
                <DocList
                  items={[
                    "E-Mail/Teams: Kommunikation mit Schülern/Kunden",
                    "Microsoft Forms: Erfassung von Anmeldedaten (z. B. Name, E-Mail-Adresse, Unterrichtsfach)",
                  ]}
                />
                <ProviderLink href="https://privacy.microsoft.com/de-de/privacystatement">
                  Datenschutzerklärung von Microsoft
                </ProviderLink>
                <LegalBasis>Art. 6 Abs. 1 lit. b DSGVO.</LegalBasis>
              </SubSection>

              <SubSection title="d) Kommunikation über WhatsApp (Business)">
                <P variant="doc">
                  Ich biete zur Kontaktaufnahme WhatsApp an (WhatsApp Ireland
                  Limited, Dublin / Meta Platforms Inc., USA). Dabei werden
                  Telefonnummern und Nachrichteninhalte verarbeitet; auch eine
                  Übertragung in die USA ist möglich. Die Nutzung ist
                  freiwillig.
                </P>
                <ProviderLink href="https://www.whatsapp.com/legal/privacy-policy-eea">
                  Datenschutzerklärung von WhatsApp
                </ProviderLink>
                <LegalBasis>
                  Art. 6 Abs. 1 lit. a DSGVO oder lit. b DSGVO.
                </LegalBasis>
              </SubSection>

              <SubSection title="e) Kommunikation über Kleinanzeigen">
                <P variant="doc">
                  Ich nutze die Plattform Kleinanzeigen (Kleinanzeigen GmbH,
                  Berlin) für die Kontaktaufnahme. Bei Anfragen werden dort
                  Name, Kontaktdaten und Nachrichteninhalte verarbeitet.
                  Verantwortlich für die Datenverarbeitung ist die Kleinanzeigen
                  GmbH.
                </P>
                <ProviderLink href="https://themen.kleinanzeigen.de/datenschutzerklaerung/">
                  Datenschutzerklärung von Kleinanzeigen
                </ProviderLink>
                <LegalBasis>Art. 6 Abs. 1 lit. b DSGVO.</LegalBasis>
              </SubSection>

              <SubSection title="f) Online-Unterricht über Discord">
                <P variant="doc">
                  Für Online-Nachhilfe nutze ich einen Discord-Server (Discord
                  Inc., San Francisco, USA). Dabei werden Benutzernamen,
                  Kommunikationsinhalte und Nutzungsdaten verarbeitet. Es kann
                  eine Datenübertragung in die USA erfolgen.
                </P>
                <ProviderLink href="https://discord.com/privacy">
                  Datenschutzerklärung von Discord
                </ProviderLink>
                <LegalBasis>Art. 6 Abs. 1 lit. b DSGVO.</LegalBasis>
              </SubSection>
            </DocGroup>

            <DocGroup title="Software und Zahlung">
              <SubSection title="g) Eigene Anwendungen (SkillBot & SkillForge)">
                <P variant="doc">
                  Zur Organisation der Nachhilfe setze ich eigene
                  Softwarelösungen (SkillBot und SkillForge) ein, die
                  personenbezogene Daten (z. B. Name, Kontaktdaten,
                  Unterrichtszeiten, Kommunikationsdaten) verarbeiten.
                </P>
                <P variant="doc">
                  Die Daten werden auf Servern folgender Anbieter gespeichert:
                </P>
                <DocList items={ownAppProviders} />
                <P variant="doc">
                  Mit allen Anbietern bestehen Auftragsverarbeitungsverträge
                  gemäß Art. 28 DSGVO.
                </P>
                <LegalBasis>Art. 6 Abs. 1 lit. b DSGVO.</LegalBasis>
              </SubSection>

              <SubSection title="h) Zahlungsabwicklung">
                <P variant="doc">
                  PayPal: Zahlungsdaten werden an PayPal (Europe) S.à r.l. et
                  Cie, Luxemburg, übermittelt.
                </P>
                <ProviderLink href="https://www.paypal.com/de/webapps/mpp/ua/privacy-full">
                  Datenschutzerklärung von PayPal
                </ProviderLink>
                <P variant="doc">
                  Banküberweisung (C24 Bank / Sparkasse): Für Überweisungen
                  werden die angegebenen Zahlungsdaten an das jeweilige
                  Kreditinstitut übermittelt.
                </P>
                <LegalBasis>Art. 6 Abs. 1 lit. b DSGVO.</LegalBasis>
              </SubSection>
            </DocGroup>
          </DocSection>

          <DocSection id="weitergabe" title="4. Weitergabe von Daten">
            <P variant="doc">
              Eine Übermittlung Ihrer personenbezogenen Daten an Dritte erfolgt
              nur in den oben beschriebenen Fällen oder wenn eine gesetzliche
              Verpflichtung besteht.
            </P>
          </DocSection>

          <DocSection id="rechte" title="5. Ihre Rechte">
            <P variant="doc">Sie haben jederzeit das Recht,</P>
            <DocList items={userRights} />
          </DocSection>

          <DocSection id="widerspruch" title="6. Widerspruchsrecht">
            <P variant="doc">
              Sofern Ihre Daten auf Grundlage von berechtigten Interessen (Art.
              6 Abs. 1 lit. f DSGVO) verarbeitet werden, haben Sie das Recht,
              dieser Verarbeitung zu widersprechen.
            </P>
          </DocSection>

          <DocSection id="datensicherheit" title="7. Datensicherheit">
            <P variant="doc">
              Ich nutze technische und organisatorische Sicherheitsmaßnahmen, um
              Ihre Daten gegen Verlust, Zerstörung oder unbefugten Zugriff zu
              schützen.
            </P>
          </DocSection>

          <DocSection
            id="aktualitaet"
            title="8. Aktualität und Änderung dieser Datenschutzerklärung"
          >
            <P variant="doc">
              Diese Datenschutzerklärung ist aktuell gültig und hat den Stand
              September 2025. Änderungen können durch Anpassungen meiner Dienste
              oder aufgrund geänderter gesetzlicher Vorgaben notwendig werden.
            </P>
          </DocSection>
        </article>

        <aside className="order-first lg:order-last lg:sticky lg:top-28 lg:self-start">
          <PrivacySectionNav sections={sections} />
        </aside>
      </div>
    </Section>
  );
}

function DocSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-m-24 border-b py-10 last:border-b-0 sm:py-12"
    >
      <H2 variant="doc" className="max-w-3xl">
        {title}
      </H2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-l pl-4 not-first:mt-8 sm:pl-6">
      <H3 variant="doc" className="text-lg">
        {title}
      </H3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function DocGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="not-first:mt-10">
      <p className="mb-4 text-sm font-medium uppercase tracking-normal text-muted-foreground">
        {title}
      </p>
      <div>{children}</div>
    </div>
  );
}

function DocList({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul className={cn("my-4 space-y-2 leading-7", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            className="mt-[0.7rem] size-1.5 shrink-0 rounded-full bg-foreground/45"
            aria-hidden="true"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DetailGrid({ children }: { children: React.ReactNode }) {
  return <div className="my-5 grid gap-4 sm:grid-cols-2">{children}</div>;
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <Card size="sm" className="rounded-lg bg-muted/35 py-0 shadow-none">
      <CardContent className="p-4">
        <p className="text-sm font-medium leading-6">{title}</p>
        <DocList items={items} className="my-3 text-sm leading-6" />
      </CardContent>
    </Card>
  );
}

function LinkList({
  links,
}: {
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <ul className="my-4 grid gap-2 sm:grid-cols-2">
      {links.map((link) => (
        <li key={link.href}>
          <Card
            size="sm"
            variant="interactive"
            className="rounded-lg py-0 shadow-none"
          >
            <CardContent className="p-0">
              <InlineLink
                variant="doc"
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-3 px-3 py-2 text-sm no-underline"
              >
                <span>{link.label}</span>
                <ExternalLink
                  className="size-3.5 shrink-0"
                  aria-hidden="true"
                />
              </InlineLink>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}

function ProviderLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <P variant="doc">
      <span className="text-muted-foreground">Datenschutzerklärung: </span>
      <InlineLink
        variant="doc"
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1"
      >
        {children}
        <ExternalLink className="size-3.5" aria-hidden="true" />
      </InlineLink>
    </P>
  );
}

function LegalBasis({ children }: { children: React.ReactNode }) {
  return (
    <Card size="sm" className="mt-4 rounded-lg bg-muted/50 py-0 shadow-none">
      <CardContent className="flex gap-3 p-3">
        <Scale className="mt-1 size-4 shrink-0 text-muted-foreground" />
        <p className="text-sm leading-6 text-muted-foreground">
          <span className="font-medium text-foreground">Rechtsgrundlage: </span>
          {children}
        </p>
      </CardContent>
    </Card>
  );
}

function HeaderFact({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Card size="sm" className="rounded-lg bg-background py-0 shadow-none">
      <CardContent className="flex items-center gap-3 p-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-md bg-muted text-muted-foreground">
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <Small variant="doc" className="mt-0">
            {label}
          </Small>
          <p className="truncate text-sm font-medium leading-5">{children}</p>
        </div>
      </CardContent>
    </Card>
  );
}
