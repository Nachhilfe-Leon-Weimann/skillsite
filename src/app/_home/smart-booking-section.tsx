import {
  CTA,
  CTAActions,
  CTABody,
  CTAContent,
  CTAHeader,
} from "@/components/blocks/cta";
import { Section } from "@/components/layout/section";
import { ContactAction } from "@/components/shared/contact-action";
import { H1, Lead, P } from "@/components/ui/typography";
import { ImageIcon } from "lucide-react";

export function SmartBookingSection() {
  return (
    <Section containerClassName="justify-evenly gap-24">
      <SmartBookingSectionHeader />
      <SmartBookingSectionDetailed />
    </Section>
  );
}

function SmartBookingSectionHeader() {
  return (
    <CTA>
      <CTAHeader>
        <Lead>Effizient lernen, ohne Terminchaos</Lead>
        <H1>Effektive Nachhilfe durch smarte Planung.</H1>
      </CTAHeader>

      <CTAContent>
        <CTABody>
          <P>
            Meine Nachhilfe bietet nicht nur erstklassige Erklärungen, sondern
            auch ein intelligentes System zur Organisation deiner Termine und
            Lernzeiten
          </P>
        </CTABody>

        <CTAActions>
          <ContactAction />
        </CTAActions>
      </CTAContent>
    </CTA>
  );
}

function SmartBookingSectionDetailed() {
  return (
    <div className="grid grid-cols-2 gap-16">
      <CTA variant="left">
        <CTAHeader>
          <Lead>Smarte Terminbuchung</Lead>
          <H1>
            Finde deinen perfekten Termin – <br /> flexibel & unkompliziert.
          </H1>
        </CTAHeader>

        <CTAContent>
          <CTABody>
            <P>
              Keine langen Wartezeiten oder endlose Nachrichten – mit meinem
              Online-Buchungssystem siehst du sofort alle verfügbaren Termine
              und kannst in wenigen Sekunden einen passenden Slot auswählen. So
              bleibt mehr Zeit für das Wesentliche: effektives Lernen.
            </P>
          </CTABody>

          <CTAActions>
            <ContactAction align="left" />
          </CTAActions>
        </CTAContent>
      </CTA>

      <div className="bg-blue-300/50 border-2 rounded-2xl border-blue-400/60 flex flex-col justify-center items-center">
        <ImageIcon className="text-primary/60" size={128} />
        Icon Placeholder
      </div>
    </div>
  );
}
