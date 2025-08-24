import { clsx } from "clsx";

type Props = {
  title: string;
  className?: string;
};

export const PageTitle = ({ title, className }: Props) => {
  return (
    <h1
      className={clsx(
        "mb-12 text-lg font-bold tracking-tight text-slate-200 lg:mb-24 lg:text-3xl",
        className,
      )}
    >
      {title}
    </h1>
  );
};
