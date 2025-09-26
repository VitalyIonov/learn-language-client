import type { ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";
import { Button as ButtonBase } from "@headlessui/react";

export const Button = ({
  children,
  ...buttonProps
}: ButtonHTMLAttributes<any>) => (
  <ButtonBase
    className={clsx(
      "inline-flex",
      "items-center justify-center gap-2",
      "px-3 py-1.5",
      "h-16",
      "text-base font-semibold text-white",
      "bg-indigo-700",
      "rounded-md",
      "shadow-inner",
      "cursor-pointer",
      "grow-1",
      "focus:not-data-focus:outline-none data-disabled:cursor-not-allowed data-disabled:bg-slate-500 data-focus:outline data-focus:outline-white data-hover:bg-indigo-800 data-open:bg-gray-700",
      "lg:h-auto lg:text-sm/6",
    )}
    {...buttonProps}
  >
    {children}
  </ButtonBase>
);
