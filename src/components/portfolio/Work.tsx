import { ArrowRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { Button } from "@/components/ui/button";
import {
  projectOutcome,
  projectVisuals,
  responsiveImage,
  thumbSrc,
  type OpenProject,
} from "@/lib/project";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./SectionHeader";
import { ProjectMedia } from "./ProjectMedia";
import { ExternalLink, FlowSteps, MetaList, Outcome, TechList } from "./ProjectParts";

const featured = projects.filter((p) => p.tier === "featured");
const selected = projects.filter((p) => p.tier === "selected");
const compact = projects.filter((p) => p.tier === "compact");

const pad = (n: number) => String(n).padStart(2, "0");

function ProjectActions({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <Button variant="outline" onClick={onOpen} className="group">
        Read case study
        <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </Button>
      {project.link && <ExternalLink href={project.link} />}
    </div>
  );
}

function FeaturedProject({ project, onOpen }: { project: Project; onOpen: OpenProject }) {
  const cover = projectVisuals(project)[0];
  const outcome = projectOutcome(project);
  const builds = project.caseStudy ?? [];

  return (
    <article aria-labelledby={`${project.slug}-title`}>
      <div className="relative">
        <button
          type="button"
          onClick={() => onOpen(project.slug)}
          aria-label={`Open case study: ${project.name}`}
          className="group block w-full"
        >
          <div
            data-reveal-image
            className="aspect-[4/3] overflow-hidden rounded-xl border border-foreground/10 bg-muted sm:aspect-[16/9]"
          >
            <img
              {...responsiveImage(cover.src, "(min-width: 1240px) 1176px, 100vw")}
              alt={cover.alt}
              loading="lazy"
              data-parallax="0.04"
              decoding="async"
              className="size-full object-cover object-top"
            />
          </div>
        </button>
        <div className="glass pointer-events-none absolute bottom-5 right-5 hidden w-80 rounded-lg p-5 md:block">
          <MetaList project={project} />
        </div>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-12 md:gap-12">
        <div data-reveal className="md:col-span-5">
          <p className="font-mono text-xs text-brand">Featured project</p>
          <h3
            id={`${project.slug}-title`}
            className="mt-3 text-3xl font-semibold tracking-[-0.02em] md:text-4xl"
          >
            {project.name}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{project.type}</p>
          <MetaList project={project} className="mt-6 md:hidden" />
        </div>

        <div data-reveal className="space-y-7 md:col-span-7">
          <p className="max-w-prose text-[17px] leading-relaxed text-foreground/85">
            {project.description}
          </p>
          {outcome && <Outcome text={outcome} />}
          <TechList tech={project.tech} />
          <ProjectActions project={project} onOpen={() => onOpen(project.slug)} />
        </div>
      </div>

      {builds.length > 1 && (
        <div className="mt-14">
          <p data-reveal className="font-mono text-xs text-muted-foreground">
            {builds.length} builds in this engagement
          </p>
          <ol className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
            {builds.map((build, i) => (
              <li key={build.title} data-reveal>
                <button
                  type="button"
                  onClick={() => onOpen(project.slug, i)}
                  className="group block w-full text-left"
                >
                  <div className="aspect-[16/10] overflow-hidden rounded-lg border border-foreground/10 bg-muted">
                    {build.images?.[0] && (
                      <img
                        src={thumbSrc(build.images[0])}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="size-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    )}
                  </div>
                  <p className="mt-3 flex gap-2 text-sm font-medium leading-snug">
                    <span className="font-mono text-xs leading-5 text-muted-foreground">
                      {pad(i + 1)}
                    </span>
                    <span className="group-hover:underline group-hover:underline-offset-4">
                      {build.title}
                    </span>
                  </p>
                </button>
              </li>
            ))}
          </ol>
        </div>
      )}
    </article>
  );
}

function ProjectRow({
  project,
  index,
  reverse,
  onOpen,
}: {
  project: Project;
  index: number;
  reverse: boolean;
  onOpen: OpenProject;
}) {
  const outcome = projectOutcome(project);
  const open = () => onOpen(project.slug);

  return (
    <article
      aria-labelledby={`${project.slug}-title`}
      className="grid gap-8 md:grid-cols-12 md:items-start md:gap-12 lg:gap-16"
    >
      <div className={cn("md:sticky md:top-28 md:col-span-7", reverse && "md:order-2")}>
        <ProjectMedia project={project} onOpen={open} />
      </div>

      <div data-reveal className={cn("space-y-6 md:col-span-5", reverse && "md:order-1")}>
        <div>
          <p className="font-mono text-xs text-muted-foreground">
            <span className="text-brand">{pad(index)}</span>
            {project.context && <span> · {project.context}</span>}
          </p>
          <h3
            id={`${project.slug}-title`}
            className="mt-3 text-2xl font-semibold tracking-[-0.015em] text-balance md:text-[1.75rem] md:leading-tight"
          >
            {project.name}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">{project.type}</p>
        </div>
        <p className="text-[15px] leading-relaxed text-foreground/85">{project.description}</p>
        {project.flow ? <FlowSteps flow={project.flow} /> : outcome && <Outcome text={outcome} />}
        {project.role && (
          <p className="text-sm">
            <span className="font-mono text-xs text-muted-foreground">Role </span>
            {project.role}
          </p>
        )}
        <TechList tech={project.tech} limit={6} />
        <ProjectActions project={project} onOpen={open} />
      </div>
    </article>
  );
}

function CompactProject({ project, onOpen }: { project: Project; onOpen: OpenProject }) {
  return (
    <li data-reveal className="flex flex-col">
      <button
        type="button"
        onClick={() => onOpen(project.slug)}
        className="group block w-full text-left"
      >
        <div className="aspect-[4/3] overflow-hidden rounded-lg border border-foreground/10 bg-card">
          <img
            src={thumbSrc(project.image)}
            alt={`${project.name} screenshot`}
            loading="lazy"
            decoding="async"
            className="size-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
        <p className="mt-4 font-mono text-xs text-muted-foreground">{project.type}</p>
        <h4 className="mt-1.5 text-base font-semibold leading-snug group-hover:underline group-hover:underline-offset-4">
          {project.name}
        </h4>
      </button>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
      <div className="mt-3 space-y-2">
        {project.flow ? (
          <FlowSteps flow={project.flow} compact />
        ) : (
          <p className="font-mono text-xs leading-5 text-muted-foreground">
            {project.tech.join(" · ")}
          </p>
        )}
        {project.link && <ExternalLink href={project.link}>Open live app</ExternalLink>}
      </div>
    </li>
  );
}

export function Work({ onOpen }: { onOpen: OpenProject }) {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      tabIndex={-1}
      className="py-16 outline-none md:py-24"
    >
      <div className="container-page">
        <SectionHeader id="work" label="Work" title="Selected projects">
          <p>
            Pipelines, workflows, and the odd full-stack build. Every project opens into a case
            study with the details and screenshots.
          </p>
        </SectionHeader>

        <div className="mt-14 space-y-28 md:mt-16 md:space-y-36">
          {featured.map((project) => (
            <FeaturedProject key={project.slug} project={project} onOpen={onOpen} />
          ))}
          {selected.map((project, i) => (
            <ProjectRow
              key={project.slug}
              project={project}
              index={featured.length + i + 1}
              reverse={i % 2 === 1}
              onOpen={onOpen}
            />
          ))}
        </div>

        {compact.length > 0 && (
          <div className="mt-28 md:mt-36">
            <div
              data-reveal
              className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-4"
            >
              <h3 className="text-lg font-semibold">Smaller builds</h3>
              <p className="font-mono text-xs text-muted-foreground">Automations &amp; web apps</p>
            </div>
            <ul className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {compact.map((project) => (
                <CompactProject key={project.slug} project={project} onOpen={onOpen} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
