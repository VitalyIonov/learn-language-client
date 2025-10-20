import {
  Popover as PopoverBase,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { clsx } from "clsx";
import type { ReactNode } from "react";

export type Props = {
  button: ({ open }: { open: boolean }) => ReactNode;
  children: ReactNode;
  className?: string;
  panelClassName?: string;
  anchor?: string;
  transition?: boolean;
};

export const Popover = ({
  button,
  children,
  className,
  panelClassName,
  anchor = "bottom end",
  transition = true,
}: Props) => {
  return (
    <PopoverBase className={className}>
      {({ open }) => (
        <>
          <PopoverButton
            className={clsx(
              "block",
              "text-sm/6 font-semibold",
              "cursor-pointer",
              "focus:outline-none data-active:text-white data-focus:outline data-focus:outline-white data-hover:text-white",
            )}
          >
            {button({ open })}
          </PopoverButton>
          <PopoverPanel
            transition={transition}
            anchor={anchor as any}
            className={clsx(
              "flex-col",
              "text-sm/6",
              "bg-slate-900",
              "divide-y divide-white/5 rounded-xl border-1 border-slate-700",
              "transition duration-200 ease-in-out",
              "flex, [--anchor-gap:--spacing(5)]",
              "data-closed:-translate-y-1 data-closed:opacity-0",
              panelClassName,
            )}
          >
            {children}
          </PopoverPanel>
        </>
      )}
    </PopoverBase>
  );
};
