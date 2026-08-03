import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<
  HTMLInputElement,
  InputProps
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none transition-all",
        "placeholder:text-slate-400",
        "focus:border-blue-600 focus:ring-4 focus:ring-blue-100",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";