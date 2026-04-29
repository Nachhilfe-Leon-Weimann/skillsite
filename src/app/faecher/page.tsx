import { SubjectsDetails } from "@/app/faecher/_sections/subjects-details";
import { SubjectsFAQ } from "@/app/faecher/_sections/subjects-faq";
import { SubjectsHero } from "@/app/faecher/_sections/subjects-hero";
import { Separator } from "@/components/ui/separator";

export default function Subjects() {
  return (
    <>
      <SubjectsHero />
      <Separator />
      <SubjectsDetails />
      <Separator />
      <SubjectsFAQ />
    </>
  );
}
