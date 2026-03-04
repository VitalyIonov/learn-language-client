import React from "react";
import { cn } from "~/shared/lib/utils";

type Props = {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

export const DataSection = ({ className, children, onClick }: Props) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-4 rounded-lg bg-slate-800 p-6 shadow-md",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
