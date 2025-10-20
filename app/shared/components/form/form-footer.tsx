import { clsx } from "clsx";
import { Button } from "~/shared/components";

type Props = {
  submitLabel: string;
  id: string;
  className?: string;
};

export const FormFooter = ({ className, id, submitLabel }: Props) => (
  <div className={clsx("flex justify-end", className)}>
    <Button type="submit" form={id}>
      {submitLabel}
    </Button>
  </div>
);
