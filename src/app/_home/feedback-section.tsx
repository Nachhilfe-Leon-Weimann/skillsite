import { Section } from "@/components/layout/section";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FeedbackItem, feedbackList } from "@/content/feedback";
import { Star } from "lucide-react";

export function FeedbackSection() {
  return (
    <Section variant="content">
      <Carousel>
        <CarouselContent className="-ml-6">
          {feedbackList.map((feedbackItem, index) => (
            <CarouselItem key={index} className="basis-1/3 pl-6">
              <FeedbackCard item={feedbackItem} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </Section>
  );
}

function FeedbackCard({ item }: { item: FeedbackItem }) {
  return (
    <Card className="shadow-none ring-0 h-full bg-transparent">
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
        <CardAction className="flex flex-row gap-2 text-accent-foreground">
          {Array.from({ length: item.rating }).map((_, index) => (
            <Star key={index} size={20} />
          ))}
        </CardAction>
      </CardHeader>
      <CardContent className="h-full">
        <p className="text-primary">{item.quote}</p>
      </CardContent>
      <CardFooter>
        <CardDescription>
          {item.subject} {item.gradeLevel && `- ${item.gradeLevel}`} -{" "}
          {item.role}
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
