"use client";

import { Booker } from "@/components/cal/booker";
import { Section } from "@/components/layout/section";
import { H1, InlineLink, Lead } from "@/components/ui/typography";
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

export default function Contact() {
  const isMobile = useIsMobile();
  const bookerProps = getBookingDetails("kennenlernen");

  return (
    <>
      <Section gradient="top" containerClassName="gap-12">
        <CTA>
          <CTAHeader>
            <H1>Kontaktiere mich noch heute</H1>
            <Lead>Ich freue mich auf deine Nachricht</Lead>
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
              <Link href={contactDetails.whatsapp.href}>Jetzt anschreiben</Link>
            </Button>
          </CTAFooter>
        </CTA>

        <div className="sm:text-center text-muted-foreground">
          <Link
            href="#"
            className="flex items-center justify-center gap-4 px-2"
          >
            <MoveDown size={16} />
            <p>Oder beginne mit einem persönlichen Erstgespräch</p>
            <MoveDown size={16} />
          </Link>
        </div>
      </Section>

      <Section
        gradient="bottom"
        containerClassName="text-center gap-8"
        offsetFooter
      >
        <H1>Kennenlern-Gespräch</H1>

        <Booker
          calUsername={bookerProps.calUsername}
          eventSlug={bookerProps.eventSlug}
        />
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
