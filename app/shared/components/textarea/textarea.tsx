import { clsx } from "clsx";
import React from "react";

type Props = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hasError?: boolean;
};

export const Textarea = ({
  id,
  label,
  hasError,
  disabled,
  className,
  ...inputProps
}: Props) => {
  return (
    <div className={clsx("w-auto", className)}>
      {label && (
        <label
          htmlFor={id}
          className="mb-1 block text-sm font-medium text-slate-300"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        {...inputProps}
        className={clsx(
          "px-3 py-2",
          "w-full",
          "text-slate-200 placeholder:text-slate-500",
          "bg-slate-800",
          "rounded-xl border-slate-700",
          "border",
          "focus:ring-2 focus:ring-indigo-400/50 focus:outline-none",
          disabled && "cursor-not-allowed opacity-50",
          hasError && "border-red-400 focus:ring-red-400",
          className,
        )}
        rows={4}
      />
    </div>
  );
};
