import { useState } from "react";
import { careerRoles, education, type CareerRole } from "@/data/career";
import { ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./SectionHeader";

/** Marker on the Experience rail (desktop), lit by `data-rail` when reached. */
function RailDot() {
  return (
    <span
      aria-hidden
      data-rail-dot
      className="absolute -left-[calc(2.5rem+5px)] top-[calc(2.5rem+4px)] hidden size-2.5 rounded-full border border-foreground/25 bg-background transition-colors duration-300 md:block"
    />
  );
}

/**
 * One role. Descriptions start clamped (current roles get a little more room
 * than older ones) so the timeline reads at a glance; "Read more" opens the rest.
 */
function Role({ role, first }: { role: CareerRole; first?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const current = /present/i.test(role.period);
  const clampable = role.description.length > 160;
  const id = `role-${role.slug}`;

  return (
    <li data-slide className="relative grid gap-3 py-8 md:grid-cols-12 md:gap-8 md:py-10">
      {!first && <span data-rule aria-hidden className="absolute inset-x-0 top-0 h-px bg-border" />}
      <RailDot />
      <div className="md:col-span-3">
        <p className="flex items-center gap-2 font-mono text-[13px] text-foreground">
          {current && <span aria-hidden className="size-1.5 rounded-full bg-brand" />}
          {role.period}
        </p>
        {role.kind && <p className="mt-1 text-sm text-muted-foreground">{role.kind}</p>}
      </div>
      <div className="max-w-3xl md:col-span-9">
        <h3 className="text-lg font-semibold tracking-tight">
          {role.title}
          {role.org && <span className="font-normal text-muted-foreground"> · {role.org}</span>}
        </h3>
        <p
          id={id}
          className={cn(
            "mt-3 text-[15px] leading-relaxed text-foreground/80",
            clampable && !expanded && (current ? "line-clamp-3" : "line-clamp-2"),
          )}
        >
          {role.description}
        </p>
        {clampable && (
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={id}
            onClick={() => {
              setExpanded((v) => !v);
              // The page got taller or shorter: re-measure scroll-triggered reveals below.
              requestAnimationFrame(() => ScrollTrigger.refresh());
            }}
            className="mt-2 rounded-md py-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
        <p className="mt-3 font-mono text-xs leading-5 text-muted-foreground">
          <span className="sr-only">Skills: </span>
          {role.tags.join(" · ")}
        </p>
      </div>
    </li>
  );
}

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      tabIndex={-1}
      className="py-16 outline-none md:py-24"
    >
      <div className="container-page">
        <SectionHeader id="experience" label="Experience" title="Career so far">
          <p>
            My career didn't start in tech. I spent nearly three years working as a service crew
            member while finishing my degree, then got my first opportunity as a front-end developer
            intern. Since then, I've worked in software engineering and eventually specialized in
            CRM and automation systems.
          </p>
        </SectionHeader>

        {/* The rail on the left fills as you scroll; each role's dot lights up on arrival. */}
        <ol data-rail className="relative md:pl-10">
          <span aria-hidden className="absolute left-0 top-0 hidden h-full w-px bg-border md:block">
            <span data-rail-fill className="block h-full w-px origin-top bg-brand" />
          </span>
          {careerRoles.map((role, i) => (
            <Role key={role.slug} role={role} first={i === 0} />
          ))}
          <li data-slide className="relative grid gap-3 py-8 md:grid-cols-12 md:gap-8 md:py-10">
            <span data-rule aria-hidden className="absolute inset-x-0 top-0 h-px bg-border" />
            <RailDot />
            <div className="md:col-span-3">
              <p className="font-mono text-[13px]">{education.year}</p>
              <p className="mt-1 text-sm text-muted-foreground">Education</p>
            </div>
            <h3 className="text-lg font-semibold tracking-tight md:col-span-9">
              {education.degree}
            </h3>
          </li>
        </ol>
      </div>
    </section>
  );
}
