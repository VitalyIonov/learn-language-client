import { clsx } from "clsx";
import { Button } from "~/shared/components";

type Props = {
  submitLabel: string;
  id: string;
  className?: string;
  disabled?: boolean;
};

export const FormFooter = ({ className, id, submitLabel, disabled }: Props) => (
  <div className={clsx("flex justify-end", className)}>
    <Button className="h-12" type="submit" form={id} disabled={disabled}>
      {submitLabel}
    </Button>
  </div>
);
