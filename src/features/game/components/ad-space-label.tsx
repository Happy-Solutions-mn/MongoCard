import Link from "next/link";
import { cn } from "@/lib/utils";
import { AD_SPACE_LABEL } from "@/lib/advertise";

interface AdSpaceLabelProps {
  className?: string;
  linked?: boolean;
}

export function AdSpaceLabel({ className, linked = true }: AdSpaceLabelProps) {
  const text = (
    <span
      className={cn(
        "block text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground",
        linked && "transition-colors hover:text-primary",
        className,
      )}
    >
      {AD_SPACE_LABEL}
    </span>
  );

  if (linked) {
    return (
      <Link href="/advertise" className="shrink-0">
        {text}
      </Link>
    );
  }

  return text;
}

interface AdSpaceFrameProps {
  children: React.ReactNode;
  className?: string;
  labelClassName?: string;
}

export function AdSpaceFrame({
  children,
  className,
  labelClassName,
}: AdSpaceFrameProps) {
  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      <AdSpaceLabel className={labelClassName} />
      {children}
    </div>
  );
}
