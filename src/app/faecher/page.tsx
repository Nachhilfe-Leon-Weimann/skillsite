import { MathDetails } from "@/app/faecher/_sections/math-details";
import { SubjectsHero } from "@/app/faecher/_sections/subjects-hero";
import { Separator } from "@/components/ui/separator";

export default function Subjects() {
  return (
    <>
      <SubjectsHero />
      <Separator />
      <MathDetails />
    </>
  );
}
