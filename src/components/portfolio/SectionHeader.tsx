import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  id: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
};

/** Label + heading on the left, optional short intro on the right, hairline below. */
export function SectionHeader({ id, label, title, children, className }: SectionHeaderProps) {
  return (
    <header
      data-reveal
      className={cn(
        "grid gap-5 border-b border-border pb-8 md:grid-cols-12 md:items-end md:gap-8",
        className,
      )}
    >
      <div className="md:col-span-7">
        <p className="font-mono text-xs text-brand">{label}</p>
        <h2
          id={`${id}-title`}
          className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-balance md:text-[2.5rem] md:leading-[1.1]"
        >
          {title}
        </h2>
      </div>
      {children && (
        <div className="text-[15px] leading-relaxed text-muted-foreground md:col-span-5">
          {children}
        </div>
      )}
    </header>
  );
}
