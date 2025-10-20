import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import React from "react";

export type SelectOption<T extends string | number = string> = {
  value: T;
  label: string;
  disabled?: boolean;
};

type Props<T extends string | number> = {
  label?: string;
  value: T | null;
  onChange: (opt: T | null) => void;
  options: SelectOption<T>[];
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  className?: string;
};

export function SingleSelect<T extends string | number>({
  label,
  value,
  onChange,
  options,
  placeholder = "Select…",
  disabled,
  hasError,
  className,
}: Props<T>) {
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={clsx("w-auto", className)}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-slate-300">
          {label}
        </label>
      )}

      <Listbox value={value} onChange={onChange} disabled={disabled}>
        <div className="relative">
          <ListboxButton
            className={clsx(
              "px-3 py-3",
              "w-full",
              "text-left text-slate-200",
              "bg-slate-800",
              "rounded-xl ",
              "border",
              "focus:ring-2 focus:ring-indigo-400/50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
              {
                ["border-red-400 focus:outline-red-400"]: hasError,
                "border-slate-700 focus:outline-none": !hasError,
              },
            )}
          >
            <span className={clsx(!value && "text-slate-400")}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronUpDownIcon
              className={clsx(
                "absolute top-1/2 right-2",
                "pointer-events-none",
                "h-4 w-4",
                "text-slate-400",
                "-translate-y-1/2",
              )}
            />
          </ListboxButton>

          <ListboxOptions
            anchor="bottom start"
            className={clsx(
              "z-50",
              "mt-2 p-1",
              "w-[var(--button-width)]",
              "text-slate-200",
              "bg-slate-800",
              "rounded-xl border-slate-700 outline-none",
              "shadow-xl",
              "border",
            )}
          >
            {options.map((opt) => (
              <ListboxOption
                key={`${opt.value}`}
                value={opt.value}
                disabled={opt.disabled}
                className={clsx(
                  "px-3 py-2",
                  "rounded-lg",
                  "cursor-pointer select-none",
                  "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[focus]:bg-slate-700 data-[selected]:bg-slate-700",
                )}
              >
                {opt.label}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
}
