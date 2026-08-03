import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "danger" | "default";
}

export function Badge({
  children,
  variant = "default",
}: BadgeProps) {
  const variants = {
    default:
      "bg-slate-100 text-slate-700",

    success:
      "bg-green-100 text-green-700",

    warning:
      "bg-amber-100 text-amber-700",

    danger:
      "bg-red-100 text-red-700",
  };

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
        variants[variant]
      )}
    >
      {children}
    </span>
  );
}