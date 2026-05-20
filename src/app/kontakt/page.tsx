"use client";

import { Booker } from "@/components/cal/booker";
import { Section } from "@/components/layout/section";
import { H1, InlineLink, Lead, Muted, P } from "@/components/ui/typography";
import { QRCodeSVG } from "qrcode.react";
import { MoveDown } from "lucide-react";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import { getBookingDetails } from "@/lib/booking-details";
import { Card, CardContent } from "@/components/ui/card";
import { CTA, CTAContent, CTAFooter, CTAHeader } from "@/components/blocks/cta";
import {
  contactDetails,
  contactDetailsList,
  type ContactDetail,
} from "@/content/contact";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { routes } from "@/lib/routes";
import { handleSectionLinkClick } from "@/lib/scroll-to-section";
import { BrandIcon } from "@/components/social-link";
import { siWhatsapp } from "simple-icons";

const firstMeetingSectionId = "kennenlernen";

export default function Contact() {
  const isMobile = useIsMobile();
  const bookerProps = getBookingDetails("kennenlernen");

  return (
    <>
      <Section gradient="top" containerClassName="relative">
        <CTA>
          <CTAHeader>
            <H1>Kontaktiere mich noch heute</H1>
            <Lead>Ich freue mich auf deine Nachricht!</Lead>
          </CTAHeader>
          <CTAContent>
            <Card>
              <CardContent
                className={cn(
                  "text-left gap-8 grid grid-cols-1 items-center",
                  isMobile ? "sm:grid-cols-1" : "sm:grid-cols-2",
                )}
              >
                <dl
                  className={cn(
                    isMobile ? "flex flex-col sm:flex-row sm:gap-8" : "",
                  )}
                >
                  {contactDetailsList.map((contactDetail) => (
                    <ContactDetailCell
                      key={contactDetail.label}
                      contactDetail={contactDetail}
                      className="py-2"
                    />
                  ))}
                </dl>

                {!isMobile && (
                  <div className="flex flex-row items-center justify-center sm:justify-end">
                    <Tooltip delayDuration={300}>
                      <TooltipTrigger>
                        <QRCode
                          href={contactDetails.whatsapp.href}
                          size={128}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="right">Klick mich</TooltipContent>
                    </Tooltip>
                  </div>
                )}
              </CardContent>
            </Card>
          </CTAContent>
          <CTAFooter>
            <Button size="lg" asChild>
              <Link
                className="gap-2"
                href={contactDetails.whatsapp.href}
                target="_blank"
              >
                <BrandIcon icon={siWhatsapp} />
                Jetzt anschreiben
              </Link>
            </Button>
          </CTAFooter>
        </CTA>

        <div className="absolute inset-x-0 bottom-0 text-center text-muted-foreground">
          <Link
            href={routes.first_meeting}
            onClick={(event) =>
              handleSectionLinkClick(event, routes.first_meeting)
            }
            className="flex items-center justify-center gap-4 px-2"
          >
            <MoveDown size={16} />
            <P>Oder beginne mit einem persönlichen Erstgespräch</P>
            <MoveDown size={16} />
          </Link>
        </div>
      </Section>

      <Section id={firstMeetingSectionId} gradient="bottom" offsetFooter>
        <CTA className="max-w-full">
          <CTAHeader>
            <H1>Kennenlern-Gespräch</H1>
            <Lead>
              Deine Fragen klären und gemeinsam herausfinden, was dir wirklich
              weiterhilft.
            </Lead>
          </CTAHeader>
          <CTAContent>
            <Booker
              calUsername={bookerProps.calUsername}
              eventSlug={bookerProps.eventSlug}
            />
          </CTAContent>
          <CTAFooter>
            <Button className="text-muted-foreground" variant="link" asChild>
              <Link href={routes.booking}>
                <Muted>
                  Du möchtest gleich einen Termin? Hier kannst du das gleich
                  machen
                </Muted>
              </Link>
            </Button>
          </CTAFooter>
        </CTA>
      </Section>
    </>
  );
}

function ContactDetailCell({
  contactDetail,
  className,
}: {
  contactDetail: ContactDetail;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="text-sm text-muted-foreground">{contactDetail.label}</dt>
      <dd className="text-base font-medium">
        <InlineLink href={contactDetail.href} target="_blank">
          {contactDetail.content}
        </InlineLink>
      </dd>
    </div>
  );
}

function QRCode({ href, size }: { href: string; size?: number }) {
  return (
    <Link target="_blank" rel="noopener noreferrer" href={href}>
      <QRCodeSVG
        value={href}
        size={size}
        className="rounded-md border bg-white p-2"
      />
    </Link>
  );
}
