import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function LoginButton() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button disabled type="button" variant="secondary" size="sm">
          Log in
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Bald verfügbar</p>
      </TooltipContent>
    </Tooltip>
  );
}
