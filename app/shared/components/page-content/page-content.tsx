import React from "react";
import { clsx } from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const PageContent = ({ className, children }: Props) => {
  return <div className={clsx("px-4 lg:px-6", className)}>{children}</div>;
};
