import { Button } from "@/components/ui/button";
import { CustomFormStepProps } from "../create-proposal-form";

export function LoadsConsumptionForm(props: CustomFormStepProps) {
  return (
    <>
      <Button onClick={() => props.navigate("next")}>Next</Button>
    </>
  );
}
