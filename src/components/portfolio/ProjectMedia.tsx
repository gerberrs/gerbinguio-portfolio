import type { Project } from "@/data/projects";
import { projectVisuals, responsiveImage } from "@/lib/project";
import { cn } from "@/lib/utils";

const frame = "overflow-hidden rounded-xl border border-foreground/10 bg-muted";
const image =
  "size-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.02]";

/**
 * On-page visuals for a project row. Composition follows the material:
 *   3+ images → a staggered triptych of tall site captures
 *   2 images  → primary shot with a second one overlapping its corner
 *   1 image   → a single clean frame
 * The whole block is one button that opens the case study.
 */
export function ProjectMedia({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const visuals = projectVisuals(project);

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open case study: ${project.name}`}
      className="group block w-full text-left"
    >
      {visuals.length >= 3 ? (
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {visuals.slice(0, 3).map((v, i) => (
            <figure key={v.src} className={cn(i === 1 && "sm:translate-y-8")}>
              <div data-reveal-image className={cn(frame, "aspect-[3/5]")}>
                <img
                  {...responsiveImage(v.src, "(min-width: 768px) 18vw, 32vw")}
                  alt={`${v.alt} website`}
                  loading="lazy"
                  decoding="async"
                  className={image}
                />
              </div>
              <figcaption className="mt-3 font-mono text-[11px] text-muted-foreground sm:text-xs">
                {v.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : visuals.length === 2 ? (
        <div className="relative pb-[12%]">
          <div data-reveal-image className={cn(frame, "aspect-[16/10] w-[90%]")}>
            <img
              {...responsiveImage(visuals[0].src, "(min-width: 768px) 52vw, 90vw")}
              alt={visuals[0].alt}
              loading="lazy"
              decoding="async"
              className={image}
            />
          </div>
          <div
            data-reveal-image
            className={cn(
              frame,
              "absolute bottom-0 right-0 aspect-[16/10] w-[46%] shadow-[0_18px_40px_-20px_hsl(var(--foreground)/0.35)] ring-4 ring-background",
            )}
          >
            <img
              {...responsiveImage(visuals[1].src, "(min-width: 768px) 27vw, 46vw")}
              alt={visuals[1].alt}
              loading="lazy"
              decoding="async"
              className={image}
            />
          </div>
        </div>
      ) : (
        <div data-reveal-image className={cn(frame, "aspect-[16/10]")}>
          <img
            {...responsiveImage(visuals[0].src, "(min-width: 768px) 55vw, 100vw")}
            alt={visuals[0].alt}
            loading="lazy"
            decoding="async"
            className={image}
          />
        </div>
      )}
    </button>
  );
}
