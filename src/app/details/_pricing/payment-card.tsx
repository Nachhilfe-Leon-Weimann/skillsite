import { IconInfoCard } from "@/components/shared/icon-info-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

type PaymentCardItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type PaymentCardSection = {
  title: string;
  items: readonly PaymentCardItem[];
};

type PaymentCardProps = {
  sections: readonly PaymentCardSection[];
};

export function PaymentCard({ sections }: PaymentCardProps) {
  return (
    <Card size="sm">
      {sections.map((section) => (
        <div key={section.title} className="grid gap-4">
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {section.items.map((item) => (
              <IconInfoCard
                key={item.title}
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </CardContent>
        </div>
      ))}
    </Card>
  );
}
