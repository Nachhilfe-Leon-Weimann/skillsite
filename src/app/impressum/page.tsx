import {
  DocHero,
  DocSection,
  DocShell,
} from "@/components/docs/doc-components";
import { Address, InlineLink, P } from "@/components/ui/typography";
import { legalContact } from "@/content/legal";
import { FileText } from "lucide-react";

export default function ImpressumPage() {
  return (
    <DocShell>
      <DocHero
        badge="Anbieterkennzeichnung"
        icon={FileText}
        title="Impressum"
        lead="Rechtliche Angaben und Kontaktinformationen zu Nachhilfe Leon Weimann."
      />

      <DocSection id="anbieter" title="Inhalte gemäß §5 DDG">
        <ContactAddress />
      </DocSection>

      <DocSection id="kontakt" title="Kontaktdaten">
        <P variant="doc">
          E-Mail:{" "}
          <InlineLink variant="doc" href={`mailto:${legalContact.email}`}>
            {legalContact.email}
          </InlineLink>
          <br />
          Telefonnummer:{" "}
          <InlineLink variant="doc" href={`tel:${legalContact.phone}`}>
            {legalContact.phone}
          </InlineLink>
        </P>
      </DocSection>

      <DocSection
        id="streitbeilegung"
        title="Verbraucherstreitbeilegung / Universalschlichtungsstelle"
      >
        <P variant="doc">
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
          vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </P>
      </DocSection>
    </DocShell>
  );
}

function ContactAddress() {
  return (
    <Address variant="doc">
      {legalContact.businessName}
      <br />
      {legalContact.ownerName}
      <br />
      {legalContact.street}
      <br />
      {legalContact.city}
      <br />
      {legalContact.country}
    </Address>
  );
}
