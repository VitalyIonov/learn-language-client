import { clsx } from "clsx";

type Props = {
  title: string;
  className?: string;
};

export const PageTitle = ({ title, className }: Props) => {
  return (
    <h1
      className={clsx(
        "mb-6 text-3xl font-bold tracking-tight text-slate-200",
        className,
      )}
    >
      {title}
    </h1>
  );
};
