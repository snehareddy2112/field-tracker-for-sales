import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "outline" | "ghost" | "destructive";
}

export function Button({
  asChild = false,
  className,
  variant = "default",
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  const variants = {
    default:
      "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
    outline:
      "border border-slate-300 bg-white hover:bg-slate-100",
    ghost:
      "hover:bg-slate-100",
    destructive:
      "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <Comp
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}