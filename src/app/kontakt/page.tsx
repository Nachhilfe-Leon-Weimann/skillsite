"use client";

import { Booker } from "@/components/cal/booker";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { BrandIcon } from "@/components/social-link";
import { Button } from "@/components/ui/button";
import { H1, H2 } from "@/components/ui/typography";
import { QRCodeSVG } from "qrcode.react";
import { type ContactDetail, contactDetails } from "@/lib/contact-details";
import { socials } from "@/lib/socials";
import { MoveDown } from "lucide-react";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Contact() {
  const isMobile = useIsMobile();
  const whatsAppSocial = socials.find((s) => s.id === "whatsapp");

  return (
    <div>
      <Section variant="content" gradient="top">
        <Container className="flex flex-col items-center justify-between md:py-16 gap-8 sm:gap-12 md:gap-24">
          <div>
            <H1 className="md:text-center">Kontaktiere mich noch heute</H1>
          </div>

          <div className="flex flex-col items-center justify-between gap-8 sm:gap-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-12">
              <H2 className="pb-6 sm:p-6 self-center">
                Ich freue mich auf deine Nachricht!
              </H2>

              <div className="bg-card border rounded-xl px-6 py-4 grid grid-cols-1 min-[950px]:grid-cols-2 gap-8">
                <div className="flex flex-col items-center justify-center min-[950px]:items-start">
                  <dl>
                    {contactDetails.map((contactDetail) => (
                      <ContactDetailCell
                        key={contactDetail.label}
                        contactDetail={contactDetail}
                        className="py-2"
                      />
                    ))}
                  </dl>
                </div>

                {!isMobile && (
                  <div className="flex items-center justify-center min-[950px]:justify-end">
                    <QRCode href={whatsAppSocial?.href || "#"} />
                  </div>
                )}
              </div>
            </div>

            <Button size="lg" asChild>
              <Link href={whatsAppSocial?.href || "#"}>
                {whatsAppSocial && <BrandIcon icon={whatsAppSocial.icon} />}
                Jetzt anschreiben
              </Link>
            </Button>
          </div>

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
        </Container>
      </Section>

      <Section variant="content" gradient="bottom">
        <Container className="flex flex-col items-center">
          <div className="text-center mb-12">
            <H1>Kennenlern-Gespräch</H1>
          </div>

          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="w-3/4 h-full mt-16">
              <Booker
                calUsername="nachhilfe-leonweimann"
                eventSlug="kennenlernen"
              />
            </div>
          </div>
        </Container>
      </Section>
    </div>
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
        <Link href={contactDetail.href || "#"}>{contactDetail.value}</Link>
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
