import {
  DocDetailGrid,
  DocDetailList,
  DocGroup,
  DocHero,
  DocLegalBasis,
  DocLinkList,
  DocList,
  DocProviderLink,
  DocSection,
  DocShell,
  DocSubSection,
} from "@/components/docs/doc-components";
import { ContactAddress } from "@/components/shared/contact-address";
import { InlineLink, P } from "@/components/ui/typography";
import {
  externalPlatformPrivacyLinks,
  logFileItems,
  logFilePurposes,
  ownAppProviders,
  privacyContact,
  privacyPolicyEffectiveDate,
  privacySections,
  userRights,
} from "@/content/privacy";
import { CalendarDays, Mail, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/datenschutz" },
  title: "Datenschutz",
  description:
    "Informationen zur Verarbeitung personenbezogener Daten beim Besuch dieser Website und im Rahmen der Nachhilfetätigkeit.",
};

export default function DatenschutzPage() {
  const effectiveDate = privacyPolicyEffectiveDate.toLocaleDateString("de-DE", {
    month: "long",
    year: "numeric",
  });

  return (
    <DocShell sections={privacySections}>
      <DocHero
        badge="Datenschutz nach DSGVO"
        icon={ShieldCheck}
        title="Datenschutzerklärung"
        lead="Informationen zur Verarbeitung personenbezogener Daten beim Besuch dieser Website und im Rahmen der Nachhilfetätigkeit."
        facts={[
          {
            icon: CalendarDays,
            label: "Stand",
            children: <>{effectiveDate}</>,
          },
          {
            icon: Mail,
            label: "Kontakt",
            children: (
              <InlineLink variant="doc" href={`mailto:${privacyContact.email}`}>
                {privacyContact.email}
              </InlineLink>
            ),
          },
        ]}
      />

      <DocSection id="verantwortlicher" title="1. Verantwortlicher">
        <P variant="doc">
          Verantwortlich für die Verarbeitung Ihrer personenbezogenen Daten ist:
        </P>
        <ContactAddress />
        <P variant="doc" className="mt-6">
          E-Mail:{" "}
          <InlineLink variant="doc" href={`mailto:${privacyContact.email}`}>
            {privacyContact.email}
          </InlineLink>
          <br />
          Telefonnummer:{" "}
          <InlineLink variant="doc" href={`tel:${privacyContact.phone}`}>
            {privacyContact.phone}
          </InlineLink>
        </P>
      </DocSection>

      <DocSection
        id="website"
        title="2. Datenverarbeitung beim Besuch der Website"
      >
        <P variant="doc" className="text-ink-soft">
          Beim Besuch der Website werden technische Abrufe, Kontaktaufnahmen,
          Terminbuchungen, externe Links sowie notwendige und optionale
          Speicherungen getrennt betrachtet.
        </P>

        <DocSubSection title="a) Server-Logfiles">
          <P variant="doc">
            Beim Aufrufen meiner Website
            <span className="font-medium"> nachhilfe.leonweimann.de </span>
            werden durch den auf Ihrem Endgerät zum Einsatz kommenden Browser
            automatisch Informationen an den Server meiner Website gesendet.
            Diese werden temporär in einem sog. Logfile gespeichert:
          </P>
          <DocDetailGrid>
            <DocDetailList
              title="Gespeicherte Informationen"
              items={logFileItems}
            />
            <DocDetailList
              title="Zweck der Verarbeitung"
              items={logFilePurposes}
            />
          </DocDetailGrid>
          <DocLegalBasis>Art. 6 Abs. 1 lit. f DSGVO.</DocLegalBasis>
        </DocSubSection>

        <DocSubSection title="b) Terminbuchung über Cal.com">
          <P variant="doc">
            Für Terminbuchungen nutze ich den Dienst Cal.com (Cal.com, Inc.,
            2261 Market Street #4382, San Francisco, CA 94114, USA). Die Anzeige
            freier Termine und die Buchung erfolgen serverseitig über meinen
            eigenen Server. Beim Ausfüllen des Formulars lädt Ihr Browser kein
            Cal.com-Widget und baut keine direkte Verbindung zu Cal.com auf;
            Cal.com setzt dabei keine Cookies in Ihrem Browser.
          </P>
          <P variant="doc">
            Zur Buchung übermittle ich nach Absenden des Formulars die
            eingegebenen Daten an Cal.com: Name, E-Mail-Adresse, Telefonnummer,
            gewählter Termin, gebuchte Leistung bzw. Fächer sowie freiwillige
            Angaben im Hinweisfeld. Zweck ist das Anlegen, Verwalten und
            Nachbereiten des Erstgesprächs.
          </P>
          <P variant="doc">
            Cal.com wird für die Terminverwaltung als Auftragsverarbeiter gemäß
            Art. 28 DSGVO eingesetzt. Eine Verarbeitung personenbezogener Daten
            in den USA kann stattfinden. Die Drittlandübermittlung erfolgt auf
            Grundlage geeigneter Transfermechanismen nach Art. 44 ff. DSGVO,
            insbesondere auf Grundlage des EU-US Data Privacy Frameworks, sofern
            Cal.com hierfür zertifiziert ist, und ergänzend über
            EU-Standardvertragsklauseln im Auftragsverarbeitungsvertrag.
          </P>
          <DocProviderLink href="https://cal.com/privacy">
            Datenschutzerklärung von Cal.com
          </DocProviderLink>
          <DocLegalBasis>
            Art. 6 Abs. 1 lit. b DSGVO, soweit die Buchung der Durchführung
            vorvertraglicher Maßnahmen oder eines Vertrags dient; ergänzend Art.
            6 Abs. 1 lit. f DSGVO für die technische Bereitstellung und
            Organisation der Terminbuchung.
          </DocLegalBasis>
        </DocSubSection>

        <DocSubSection title="c) Verlinkung zu externen Plattformen">
          <P variant="doc">
            Meine Website enthält Links zu externen Diensten (Discord, WhatsApp,
            Instagram, YouTube, TikTok, GitHub). Erst beim Anklicken werden
            Daten an den jeweiligen Anbieter übertragen. Bitte beachten Sie die
            Datenschutzbestimmungen dieser Plattformen:
          </P>
          <DocLinkList links={externalPlatformPrivacyLinks} />
        </DocSubSection>

        <DocSubSection title="d) Cookies und lokale Speicherung">
          <P variant="doc">
            Diese Website setzt keine Cookies zu Werbe- oder Analysezwecken ein
            und bindet keine einwilligungspflichtigen Inhalte Dritter ein.
            Lediglich technisch notwendige Einstellungen – etwa Ihre gewählte
            Darstellung (helles oder dunkles Design) – werden lokal in Ihrem
            Browser gespeichert, damit sie bei Ihrem nächsten Besuch erhalten
            bleiben. Diese Speicherung erfordert keine Einwilligung.
          </P>
          <P variant="doc">
            Die Terminbuchung über Cal.com wird serverseitig abgewickelt und
            setzt keine Cookies in Ihrem Browser (siehe Abschnitt b).
          </P>
          <DocLegalBasis>
            § 25 Abs. 2 TDDDG sowie Art. 6 Abs. 1 lit. f DSGVO für technisch
            notwendige Speicherungen.
          </DocLegalBasis>
        </DocSubSection>
      </DocSection>

      <DocSection
        id="nachhilfe"
        title="3. Datenverarbeitung im Rahmen der Nachhilfetätigkeit"
      >
        <DocGroup title="Abrechnung und Buchhaltung">
          <DocSubSection title="a) Zeiterfassung und Abrechnung (Clockodo)">
            <P variant="doc">
              Für Zeiterfassung und Abrechnung nutze ich den Dienst Clockodo
              (Clockodo GmbH, Viktoriastraße 25A, 59425 Unna). Verarbeitet
              werden Name, Kontaktdaten und Abrechnungsinformationen. Mit
              Clockodo besteht ein Auftragsverarbeitungsvertrag.
            </P>
            <DocProviderLink href="https://www.clockodo.com/de/datenschutz/">
              Datenschutzerklärung von Clockodo
            </DocProviderLink>
            <DocLegalBasis>Art. 6 Abs. 1 lit. b DSGVO.</DocLegalBasis>
          </DocSubSection>

          <DocSubSection title="b) Buchhaltung (sevDesk)">
            <P variant="doc">
              Zur Abwicklung meiner Buchhaltung nutze ich sevDesk (sevDesk GmbH,
              Hauptstraße 115, 77652 Offenburg). Dabei werden Kundendaten (Name,
              Adresse, Rechnungsdaten) verarbeitet. Ein
              Auftragsverarbeitungsvertrag liegt vor.
            </P>
            <DocProviderLink href="https://sevdesk.de/datenschutz/">
              Datenschutzerklärung von sevDesk
            </DocProviderLink>
            <DocLegalBasis>
              Art. 6 Abs. 1 lit. c DSGVO und lit. b DSGVO.
            </DocLegalBasis>
          </DocSubSection>
        </DocGroup>

        <DocGroup title="Kommunikation und Unterricht">
          <DocSubSection title="c) Kommunikation per Microsoft 365 Business (E-Mail, Teams, Forms)">
            <P variant="doc">
              Für E-Mails, Online-Meetings und Anmeldungen nutze ich Microsoft
              365 (Microsoft Ireland Operations Limited, Dublin, Irland).
            </P>
            <DocList
              items={[
                "E-Mail/Teams: Kommunikation mit Schülern/Kunden",
                "Microsoft Forms: Erfassung von Anmeldedaten (z. B. Name, E-Mail-Adresse, Unterrichtsfach)",
              ]}
            />
            <DocProviderLink href="https://privacy.microsoft.com/de-de/privacystatement">
              Datenschutzerklärung von Microsoft
            </DocProviderLink>
            <DocLegalBasis>Art. 6 Abs. 1 lit. b DSGVO.</DocLegalBasis>
          </DocSubSection>

          <DocSubSection title="d) Kommunikation über WhatsApp (Business)">
            <P variant="doc">
              Ich biete zur Kontaktaufnahme WhatsApp an (WhatsApp Ireland
              Limited, Dublin / Meta Platforms Inc., USA). Dabei werden
              Telefonnummern und Nachrichteninhalte verarbeitet; auch eine
              Übertragung in die USA ist möglich. Die Nutzung ist freiwillig.
            </P>
            <DocProviderLink href="https://www.whatsapp.com/legal/privacy-policy-eea">
              Datenschutzerklärung von WhatsApp
            </DocProviderLink>
            <DocLegalBasis>
              Art. 6 Abs. 1 lit. b DSGVO, soweit die Kommunikation der
              Vertragsdurchführung oder vorvertraglichen Maßnahmen dient; im
              Übrigen Art. 6 Abs. 1 lit. f DSGVO.
            </DocLegalBasis>
          </DocSubSection>

          <DocSubSection title="e) Kommunikation über Kleinanzeigen">
            <P variant="doc">
              Ich nutze die Plattform Kleinanzeigen (Kleinanzeigen GmbH, Berlin)
              für die Kontaktaufnahme. Bei Anfragen werden dort Name,
              Kontaktdaten und Nachrichteninhalte verarbeitet. Verantwortlich
              für die Datenverarbeitung ist die Kleinanzeigen GmbH.
            </P>
            <DocProviderLink href="https://themen.kleinanzeigen.de/datenschutzerklaerung/">
              Datenschutzerklärung von Kleinanzeigen
            </DocProviderLink>
            <DocLegalBasis>Art. 6 Abs. 1 lit. b DSGVO.</DocLegalBasis>
          </DocSubSection>

          <DocSubSection title="f) Online-Unterricht über Discord">
            <P variant="doc">
              Für Online-Nachhilfe nutze ich einen Discord-Server (Discord Inc.,
              San Francisco, USA). Dabei werden Benutzernamen,
              Kommunikationsinhalte und Nutzungsdaten verarbeitet. Es kann eine
              Datenübertragung in die USA erfolgen.
            </P>
            <DocProviderLink href="https://discord.com/privacy">
              Datenschutzerklärung von Discord
            </DocProviderLink>
            <DocLegalBasis>Art. 6 Abs. 1 lit. b DSGVO.</DocLegalBasis>
          </DocSubSection>
        </DocGroup>

        <DocGroup title="Software und Zahlung">
          <DocSubSection title="g) Eigene Anwendungen (SkillBot & SkillForge)">
            <P variant="doc">
              Zur Organisation der Nachhilfe setze ich eigene Softwarelösungen
              (SkillBot und SkillForge) ein, die personenbezogene Daten (z. B.
              Name, Kontaktdaten, Unterrichtszeiten, Kommunikationsdaten)
              verarbeiten.
            </P>
            <P variant="doc">
              Die Daten werden auf Servern folgender Anbieter gespeichert:
            </P>
            <DocList items={ownAppProviders} />
            <P variant="doc">
              Mit allen Anbietern bestehen Auftragsverarbeitungsverträge gemäß
              Art. 28 DSGVO.
            </P>
            <DocLegalBasis>Art. 6 Abs. 1 lit. b DSGVO.</DocLegalBasis>
          </DocSubSection>

          <DocSubSection title="h) Zahlungsabwicklung">
            <P variant="doc">
              PayPal: Zahlungsdaten werden an PayPal (Europe) S.à r.l. et Cie,
              Luxemburg, übermittelt.
            </P>
            <DocProviderLink href="https://www.paypal.com/de/webapps/mpp/ua/privacy-full">
              Datenschutzerklärung von PayPal
            </DocProviderLink>
            <P variant="doc">
              Banküberweisung (C24 Bank / Sparkasse): Für Überweisungen werden
              die angegebenen Zahlungsdaten an das jeweilige Kreditinstitut
              übermittelt.
            </P>
            <DocLegalBasis>Art. 6 Abs. 1 lit. b DSGVO.</DocLegalBasis>
          </DocSubSection>
        </DocGroup>
      </DocSection>

      <DocSection id="weitergabe" title="4. Weitergabe von Daten">
        <P variant="doc">
          Eine Übermittlung Ihrer personenbezogenen Daten an Dritte erfolgt nur
          in den oben beschriebenen Fällen oder wenn eine gesetzliche
          Verpflichtung besteht.
        </P>
      </DocSection>

      <DocSection id="speicherdauer" title="5. Speicherdauer">
        <P variant="doc">
          Ich speichere personenbezogene Daten nur so lange, wie es für die
          jeweiligen Zwecke erforderlich ist oder gesetzliche
          Aufbewahrungspflichten bestehen. Buchungs-, Vertrags- und
          Abrechnungsdaten werden für die Dauer der Vertragsdurchführung und
          anschließend im Rahmen gesetzlicher Aufbewahrungspflichten
          gespeichert. Kontaktanfragen werden gelöscht, sobald sie erledigt sind
          und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
          Server-Logfiles werden nur temporär gespeichert, soweit sie für
          Betrieb, Sicherheit und Fehleranalyse der Website erforderlich sind.
        </P>
      </DocSection>

      <DocSection id="rechte" title="6. Ihre Rechte">
        <P variant="doc">Sie haben jederzeit das Recht,</P>
        <DocList items={userRights} />
      </DocSection>

      <DocSection id="widerspruch" title="7. Widerspruchsrecht">
        <P variant="doc">
          Sofern Ihre Daten auf Grundlage von berechtigten Interessen (Art. 6
          Abs. 1 lit. f DSGVO) verarbeitet werden, haben Sie das Recht, dieser
          Verarbeitung zu widersprechen.
        </P>
      </DocSection>

      <DocSection id="datensicherheit" title="8. Datensicherheit">
        <P variant="doc">
          Ich nutze technische und organisatorische Sicherheitsmaßnahmen, um
          Ihre Daten gegen Verlust, Zerstörung oder unbefugten Zugriff zu
          schützen.
        </P>
      </DocSection>

      <DocSection
        id="aktualitaet"
        title="9. Aktualität und Änderung dieser Datenschutzerklärung"
      >
        <P variant="doc">
          Diese Datenschutzerklärung ist aktuell gültig und hat den Stand{" "}
          {effectiveDate}. Änderungen können durch Anpassungen meiner Dienste
          oder aufgrund geänderter gesetzlicher Vorgaben notwendig werden.
        </P>
      </DocSection>
    </DocShell>
  );
}
