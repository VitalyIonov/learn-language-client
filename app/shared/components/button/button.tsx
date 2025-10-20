import React from "react";
import type { ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";
import { Button as ButtonBase } from "@headlessui/react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
  uiType?: "main" | "ghost";
};

const buttonStyles = {
  main: clsx(
    "inline-flex",
    "gap-2 items-center justify-center",
    "px-3 py-1.5",
    "text-base font-semibold text-white",
    "bg-indigo-700",
    "rounded-md",
    "shadow-inner",
    "cursor-pointer",
    "focus:not-data-focus:outline-none data-disabled:cursor-not-allowed data-disabled:bg-slate-500 data-focus:outline data-focus:outline-white data-hover:bg-indigo-800 data-open:bg-gray-700",
    "lg:text-sm/6",
  ),
  ghost: clsx(
    "text-sm font-semibold text-slate-200",
    "bg-transparent",
    "rounded-md",
    "shadow-inner",
    "transition-all",
    "cursor-pointer",
  ),
};

export const Button = ({
  children,
  className,
  uiType = "main",
  ...buttonProps
}: Props) => (
  <ButtonBase
    className={clsx(buttonStyles[uiType], className)}
    {...buttonProps}
  >
    {children}
  </ButtonBase>
);
