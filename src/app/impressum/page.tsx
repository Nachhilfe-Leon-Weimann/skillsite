import { Section } from "@/components/layout/section";
import { Address, H1, H2, InlineLink, P } from "@/components/ui/typography";

const CONTACT_EMAIL = "nachhilfe@leonweimann.de";
const CONTACT_PHONE = "+49 7824 6190305";

export default function ImpressumPage() {
  return (
    <Section offsetFooter containerClassName="justify-start">
      <H1 variant="doc">Impressum</H1>

      <H2 variant="doc">Inhalte gemäß §5 DDG</H2>
      <Address variant="doc">
        Nachhilfe Leon Weimann
        <br />
        Leon Weimann
        <br />
        Friedhofstraße 11
        <br />
        77963 Schwanau
        <br />
        Deutschland
      </Address>

      <H2 variant="doc">Kontaktdaten</H2>
      <P variant="doc">
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

      <H2 variant="doc">Redaktionell verantwortlich</H2>
      <Address variant="doc">
        Nachhilfe Leon Weimann
        <br />
        Leon Weimann
        <br />
        Friedhofstraße 11
        <br />
        77963 Schwanau
        <br />
        Deutschland
      </Address>

      <H2 variant="doc">
        Verbraucherstreitbeilegung / Universalschlichtungsstelle
      </H2>
      <P variant="doc">
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
        vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </P>
    </Section>
  );
}
