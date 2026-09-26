import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Maximize2 } from "lucide-react";
import type { CaseStudySlide, Project } from "@/data/projects";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useSmoothScroll } from "@/components/SmoothScroll";
import { cn } from "@/lib/utils";
import { ExternalLink, MetaList, TechList } from "./ProjectParts";

const pad = (n: number) => String(n).padStart(2, "0");

function Shot({
  src,
  alt,
  onZoom,
}: {
  src: string;
  alt: string;
  onZoom: (src: string, alt: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onZoom(src, alt)}
      className="group relative block w-full cursor-zoom-in overflow-hidden rounded-lg border border-foreground/10 bg-muted"
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="max-h-[28rem] w-full object-cover object-top"
      />
      <span className="glass absolute right-2 top-2 inline-flex size-8 items-center justify-center rounded-md opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
        <Maximize2 className="size-3.5" aria-hidden />
        <span className="sr-only">Enlarge image</span>
      </span>
    </button>
  );
}

function Slide({
  slide,
  index,
  total,
  onZoom,
}: {
  slide: CaseStudySlide;
  index: number;
  total: number;
  onZoom: (src: string, alt: string) => void;
}) {
  const images = slide.images ?? [];
  return (
    <section
      id={`case-${index}`}
      aria-labelledby={`case-${index}-title`}
      className="scroll-mt-6 border-t border-border pt-10"
    >
      <p className="font-mono text-xs text-muted-foreground">
        {pad(index + 1)} / {pad(total)}
      </p>
      <h3 id={`case-${index}-title`} className="mt-2 text-xl font-semibold tracking-tight">
        {slide.title}
      </h3>
      <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-foreground/85">
        {slide.content}
      </p>

      {images.length > 0 && (
        <div className={cn("mt-6 grid gap-3", images.length > 1 && "sm:grid-cols-2")}>
          {images.map((src, i) => (
            <Shot
              key={src}
              src={src}
              alt={images.length > 1 ? `${slide.title}, screenshot ${i + 1}` : slide.title}
              onZoom={onZoom}
            />
          ))}
        </div>
      )}

      {slide.highlights && slide.highlights.length > 0 && (
        <div className="mt-7">
          <p className="font-mono text-xs text-muted-foreground">What I automated</p>
          <ul className="mt-3 space-y-2.5">
            {slide.highlights.map((h) => (
              <li key={h} className="flex gap-2.5 text-[15px] leading-relaxed text-foreground/85">
                <Check aria-hidden className="mt-1 size-4 shrink-0 text-brand" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {slide.impact && (
        <div className="mt-7 rounded-lg border border-brand/15 bg-brand-soft/60 px-5 py-4">
          <p className="font-mono text-xs text-brand">Business impact</p>
          <p className="mt-1.5 text-[15px] leading-relaxed text-foreground">{slide.impact}</p>
        </div>
      )}

      {slide.links && slide.links.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
          {slide.links.map((l) => (
            <li key={l.url}>
              <ExternalLink href={l.url}>{l.label}</ExternalLink>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/**
 * Case study reader. Replaces the old per-page Swiper carousel with one
 * vertically scrolling document (easier to read and to skim), plus a section
 * index on desktop. Page scrolling (Lenis) pauses while it's open.
 */
export function ProjectDialog({
  project,
  initialSlide,
  onClose,
}: {
  project: Project | null;
  initialSlide: number | null;
  onClose: () => void;
}) {
  const { setPaused } = useSmoothScroll();
  const bodyRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    setPaused(Boolean(project));
  }, [project, setPaused]);

  const slides: CaseStudySlide[] = project
    ? (project.caseStudy ?? [
        { title: "Overview", content: project.description, images: [project.image] },
      ])
    : [];
  const hasIndex = slides.length > 2;

  const jumpTo = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
    const body = bodyRef.current;
    const target = body?.querySelector<HTMLElement>(`#case-${index}`);
    if (body && target) body.scrollTo({ top: target.offsetTop - 24, behavior });
  }, []);

  // Opening from a specific build thumbnail lands on that section.
  useEffect(() => {
    if (!project || initialSlide === null) return;
    const id = requestAnimationFrame(() => jumpTo(initialSlide, "auto"));
    return () => cancelAnimationFrame(id);
  }, [project, initialSlide, jumpTo]);

  return (
    <>
      <Dialog open={Boolean(project)} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="flex h-[min(92dvh,60rem)] max-w-5xl flex-col overflow-hidden p-0">
          {project && (
            <>
              <header className="border-b border-border px-5 py-4 pr-14 sm:px-8">
                <p className="font-mono text-xs text-brand">{project.type}</p>
                <DialogTitle className="mt-1.5 text-lg sm:text-xl">{project.title}</DialogTitle>
                <DialogDescription className="sr-only">
                  Case study for {project.name}
                </DialogDescription>
              </header>

              <div className={cn("grid min-h-0 flex-1", hasIndex && "md:grid-cols-[14rem_1fr]")}>
                {hasIndex && (
                  <nav
                    aria-label="Case study sections"
                    className="hidden border-r border-border p-5 md:block"
                  >
                    <ol className="space-y-1">
                      {slides.map((slide, i) => (
                        <li key={slide.title}>
                          <button
                            type="button"
                            onClick={() => jumpTo(i)}
                            className="flex w-full gap-2 rounded-md px-2 py-1.5 text-left text-sm text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
                          >
                            <span className="font-mono text-xs leading-5">{pad(i + 1)}</span>
                            <span className="leading-5">{slide.title}</span>
                          </button>
                        </li>
                      ))}
                    </ol>
                  </nav>
                )}

                <div
                  ref={bodyRef}
                  data-lenis-prevent
                  className="relative overflow-y-auto overscroll-contain px-5 pb-12 pt-8 sm:px-8"
                >
                  <div className="space-y-6 pb-10">
                    <p className="max-w-prose text-[17px] leading-relaxed text-foreground/85">
                      {project.description}
                    </p>
                    <MetaList project={project} />
                    <TechList tech={project.tech} />
                    {project.link && (
                      <ExternalLink href={project.link}>Visit live site</ExternalLink>
                    )}
                  </div>

                  <div className="space-y-12">
                    {slides.map((slide, i) => (
                      <Slide
                        key={slide.title}
                        slide={slide}
                        index={i}
                        total={slides.length}
                        onZoom={(src, alt) => setZoom({ src, alt })}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={zoom !== null} onOpenChange={(open) => !open && setZoom(null)}>
        <DialogContent className="w-auto max-w-[min(94vw,90rem)] border-0 bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">{zoom?.alt ?? "Image preview"}</DialogTitle>
          <DialogDescription className="sr-only">Enlarged screenshot</DialogDescription>
          {zoom && (
            <img
              src={zoom.src}
              alt={zoom.alt}
              className="mx-auto max-h-[88dvh] w-auto rounded-lg bg-white object-contain shadow-2xl"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
