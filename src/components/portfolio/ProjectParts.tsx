import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { linkHost } from "@/lib/project";
import { cn } from "@/lib/utils";

export function MetaList({ project, className }: { project: Project; className?: string }) {
  const rows = [
    ["Role", project.role],
    ["Context", project.context],
    ["Period", project.period],
  ].filter((row): row is [string, string] => Boolean(row[1]));

  if (rows.length === 0) return null;

  return (
    <dl className={cn("grid gap-3 text-sm", className)}>
      {rows.map(([term, value]) => (
        <div key={term} className="grid grid-cols-[4.5rem_1fr] gap-3">
          <dt className="font-mono text-xs leading-5 text-muted-foreground">{term}</dt>
          <dd className="text-foreground">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function TechList({
  tech,
  limit,
  className,
}: {
  tech: string[];
  limit?: number;
  className?: string;
}) {
  const shown = limit ? tech.slice(0, limit) : tech;
  const hidden = tech.length - shown.length;
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Technologies">
      {shown.map((t) => (
        <li key={t}>
          <Badge>{t}</Badge>
        </li>
      ))}
      {hidden > 0 && (
        <li>
          <Badge variant="muted">+{hidden} more</Badge>
        </li>
      )}
    </ul>
  );
}

export function FlowSteps({
  flow,
  compact,
}: {
  flow: NonNullable<Project["flow"]>;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <p className="font-mono text-xs leading-5 text-muted-foreground">
        <span className="sr-only">{flow.label}: </span>
        {flow.steps.join(" → ")}
      </p>
    );
  }
  return (
    <div>
      <p className="font-mono text-xs text-muted-foreground">{flow.label}</p>
      <ol className="mt-3 flex flex-wrap items-center gap-y-2 font-mono text-xs">
        {flow.steps.map((step, i) => (
          <li key={step} className="flex items-center">
            <span className="rounded-md border border-foreground/10 bg-card/70 px-2 py-1 text-foreground">
              {step}
            </span>
            {i < flow.steps.length - 1 && (
              <ArrowRight aria-hidden className="mx-1.5 size-3 text-muted-foreground" />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Outcome({ text }: { text: string }) {
  return (
    <figure className="border-l-2 border-brand pl-4">
      <figcaption className="font-mono text-xs text-brand">Outcome</figcaption>
      <blockquote className="mt-2 text-[15px] leading-relaxed text-foreground">{text}</blockquote>
    </figure>
  );
}

export function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center gap-1 text-sm font-medium text-foreground",
        className,
      )}
    >
      <span className="link-underline">{children ?? linkHost(href)}</span>
      <ArrowUpRight
        aria-hidden
        className="size-3.5 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
      />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
