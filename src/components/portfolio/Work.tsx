import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { ArrowRight } from "lucide-react";
import { projects, type CaseStudySlide, type Project } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { useSmoothScroll } from "@/components/SmoothScroll";
import {
  projectOutcome,
  projectVisuals,
  responsiveImage,
  thumbSrc,
  type OpenProject,
} from "@/lib/project";
import { ScrollTrigger } from "@/lib/gsap";
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

function FeaturedProject({
  project,
  next,
  onOpen,
}: {
  project: Project;
  /** The row right after this one, previewed at the end of the builds strip. */
  next?: NextRow;
  onOpen: OpenProject;
}) {
  const cover = projectVisuals(project)[0];
  const outcome = projectOutcome(project);
  const builds = project.caseStudy ?? [];

  return (
    <article aria-labelledby={`${project.slug}-title`}>
      <div data-zoom className="relative">
        <button
          type="button"
          onClick={() => onOpen(project.slug)}
          aria-label={`Open case study: ${project.name}`}
          className="group block w-full"
        >
          <div className="aspect-[4/3] overflow-hidden rounded-xl border border-foreground/10 bg-muted sm:aspect-[16/9]">
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
          {/* Clamped on the page; the case study opens with the full text. */}
          <p className="line-clamp-4 max-w-prose text-[17px] leading-relaxed text-foreground/85">
            {project.description}
          </p>
          {outcome && <Outcome text={outcome} />}
          <TechList tech={project.tech} />
          <ProjectActions project={project} onOpen={() => onOpen(project.slug)} />
        </div>
      </div>

      {builds.length > 1 && (
        <BuildStrip project={project} builds={builds} next={next} onOpen={onOpen} />
      )}
    </article>
  );
}

type NextRow = { project: Project; index: number; reverse: boolean };

/**
 * Keeps the builds-strip miniature an exact scaled copy of the real next row:
 * returns the scale and height that fit the row's current size into `frame`.
 */
function useMiniatureFit(frame: RefObject<HTMLElement | null>, rowId: string | undefined) {
  const [fit, setFit] = useState<{ rowWidth: number; scale: number; height: number } | null>(
    null,
  );

  useLayoutEffect(() => {
    const box = frame.current;
    const row = rowId ? document.getElementById(rowId) : null;
    if (!box || !row) return;
    const measure = () => {
      const rowWidth = row.offsetWidth;
      if (!rowWidth || !box.offsetWidth) return;
      const scale = box.offsetWidth / rowWidth;
      setFit((prev) => {
        const height = Math.round(row.offsetHeight * scale);
        return prev && prev.rowWidth === rowWidth && prev.height === height
          ? prev
          : { rowWidth, scale, height };
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(row);
    ro.observe(box);
    return () => ro.disconnect();
  }, [frame, rowId]);

  // The card's height changed, so scroll positions further down the page moved.
  useEffect(() => {
    if (fit) ScrollTrigger.refresh();
  }, [fit]);

  return fit;
}

/**
 * The featured project's builds as one horizontal row. On desktop (with
 * motion) `data-horizontal` pins it and scrolling down slides it sideways;
 * otherwise it's a native swipe row with snap points.
 *
 * The last card is a live miniature of the next project's row. When pinned,
 * the whole strip (the "camera") zooms in on it until the miniature is full
 * size and sits exactly where the real row is, which then takes over.
 */
function BuildStrip({
  project,
  builds,
  next,
  onOpen,
}: {
  project: Project;
  builds: CaseStudySlide[];
  next?: NextRow;
  onOpen: OpenProject;
}) {
  const { scrollTo } = useSmoothScroll();
  const miniFrame = useRef<HTMLDivElement>(null);
  const nextId = next ? `project-${next.project.slug}` : undefined;
  const fit = useMiniatureFit(miniFrame, nextId);
  const nextCover = next ? projectVisuals(next.project)[0] : null;

  return (
    <div data-horizontal data-horizontal-handoff={nextId} className="relative mt-14">
      <div data-horizontal-camera className="relative">
        <p data-reveal data-horizontal-fade className="font-mono text-xs text-muted-foreground">
          {builds.length} builds in this engagement
        </p>
        <div
          data-horizontal-viewport
          className="-mx-5 mt-4 snap-x snap-mandatory scroll-px-5 overflow-x-auto px-5 pb-2 sm:scroll-px-8 [scrollbar-width:none] sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
        >
          <ol data-horizontal-track className="flex w-max items-start gap-4 md:gap-6">
            {builds.map((build, i) => {
              const image = build.images?.[0];
              return (
                <li
                  key={build.title}
                  data-horizontal-fade
                  className="w-[78vw] max-w-[22rem] shrink-0 snap-start md:w-[26rem] md:max-w-none"
                >
                  <button
                    type="button"
                    onClick={() => onOpen(project.slug, i)}
                    className="group block w-full text-left"
                  >
                    <div className="aspect-[16/10] overflow-hidden rounded-lg border border-foreground/10 bg-muted">
                      {image ? (
                        <img
                          {...responsiveImage(image, "(min-width: 768px) 416px, 78vw")}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          data-horizontal-depth
                          className="size-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      ) : (
                        // No screenshot yet: show the outcome instead of an empty frame.
                        <div className="flex size-full flex-col justify-between bg-card p-5">
                          <p className="font-mono text-xs text-brand">Business impact</p>
                          <p className="line-clamp-4 text-sm leading-relaxed text-foreground/85">
                            {build.impact ?? build.content}
                          </p>
                        </div>
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
              );
            })}
            {next && nextCover && (
              <li className="w-[78vw] max-w-[22rem] shrink-0 snap-start md:w-[26rem] md:max-w-none">
                <div className="group relative">
                  {/* Desktop: a scaled copy of the real next row. */}
                  <div
                    ref={miniFrame}
                    data-horizontal-next
                    inert
                    aria-hidden
                    className="relative hidden overflow-hidden rounded-lg bg-background ring-1 ring-foreground/10 md:block"
                    style={{ height: fit?.height ?? 260 }}
                  >
                    {fit && (
                      <div
                        className="absolute left-0 top-0 origin-top-left"
                        style={{ width: fit.rowWidth, transform: `scale(${fit.scale})` }}
                      >
                        <ProjectRow
                          project={next.project}
                          index={next.index}
                          reverse={next.reverse}
                          onOpen={onOpen}
                          preview
                        />
                      </div>
                    )}
                  </div>
                  {/* Touch / small screens: the miniature would be unreadable, so a cover. */}
                  <div className="aspect-[16/10] overflow-hidden rounded-lg border border-foreground/10 bg-muted md:hidden">
                    <img
                      {...responsiveImage(nextCover.src, "78vw")}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover object-top"
                    />
                  </div>
                  <button
                    type="button"
                    data-horizontal-fade
                    onClick={() => scrollTo(`#${nextId}`)}
                    className="mt-3 flex gap-2 text-left text-sm font-medium leading-snug before:absolute before:inset-x-0 before:top-0 before:aspect-[16/10] before:content-[''] md:before:h-full"
                  >
                    <span className="font-mono text-xs leading-5 text-brand">Next</span>
                    <span className="group-hover:underline group-hover:underline-offset-4">
                      {next.project.name} →
                    </span>
                  </button>
                </div>
              </li>
            )}
          </ol>
        </div>
        {/* Shown (and driven) only when the strip is pinned. */}
        <div aria-hidden data-horizontal-progress className="mt-6 hidden h-px bg-border">
          <div className="h-px origin-left scale-x-0 bg-foreground/60" />
        </div>
      </div>
    </div>
  );
}

function ProjectRow({
  project,
  index,
  reverse,
  onOpen,
  preview,
}: {
  project: Project;
  index: number;
  reverse: boolean;
  onOpen: OpenProject;
  /** Static copy for the builds-strip miniature: no ids, no scroll motion, not sticky. */
  preview?: boolean;
}) {
  const outcome = projectOutcome(project);
  const open = () => onOpen(project.slug);

  return (
    <article
      id={preview ? undefined : `project-${project.slug}`}
      aria-labelledby={preview ? undefined : `${project.slug}-title`}
      className="grid gap-8 md:grid-cols-12 md:items-start md:gap-12 lg:gap-16"
    >
      <div
        className={cn(
          "md:col-span-7",
          !preview && "md:sticky md:top-28",
          reverse && "md:order-2",
        )}
      >
        <ProjectMedia project={project} onOpen={open} preview={preview} />
      </div>

      <div
        data-reveal={preview ? undefined : ""}
        className={cn("space-y-6 md:col-span-5", reverse && "md:order-1")}
      >
        <div>
          <p className="font-mono text-xs text-muted-foreground">
            <span className="text-brand">{pad(index)}</span>
            {project.context && <span> · {project.context}</span>}
          </p>
          <h3
            id={preview ? undefined : `${project.slug}-title`}
            className="mt-3 text-2xl font-semibold tracking-[-0.015em] text-balance md:text-[1.75rem] md:leading-tight"
          >
            {project.name}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">{project.type}</p>
        </div>
        <p className="line-clamp-3 text-[15px] leading-relaxed text-foreground/85">
          {project.description}
        </p>
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
            <FeaturedProject
              key={project.slug}
              project={project}
              next={
                selected[0] && { project: selected[0], index: featured.length + 1, reverse: false }
              }
              onOpen={onOpen}
            />
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
