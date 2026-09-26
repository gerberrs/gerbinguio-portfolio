import { useRef } from "react";
import { ArrowDown, Download, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { useSmoothScroll } from "@/components/SmoothScroll";
import { gsap, motionQueries, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const current = projects.find((p) => p.tier === "featured");

function StatusPanel({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3 text-sm", className)}>
      {current && (
        <div>
          <p className="font-mono text-xs text-muted-foreground">Currently</p>
          <p className="mt-1 font-medium leading-snug">{current.title}</p>
          {current.period && <p className="mt-0.5 text-muted-foreground">{current.period}</p>}
        </div>
      )}
      <div className="space-y-1.5 border-t border-foreground/10 pt-3 text-muted-foreground">
        <p className="flex items-center gap-2">
          <MapPin aria-hidden className="size-3.5 shrink-0" />
          {profile.location}
        </p>
        <p className="flex items-center gap-2">
          <span aria-hidden className="mx-[3px] size-2 shrink-0 rounded-full bg-brand" />
          Open to freelance &amp; full-time work
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();

  // Intro: the old loading screen's staggered reveal, condensed into a
  // sub-second entrance that never blocks reading.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(motionQueries.motion, () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from("[data-hero-item]", { autoAlpha: 0, y: 14, duration: 0.8, stagger: 0.08 })
          .from(
            "[data-hero-portrait]",
            {
              clipPath: "inset(0% 0% 100% 0%)",
              duration: 1.2,
              ease: "power3.inOut",
              clearProps: "clipPath",
            },
            0.1,
          )
          .from("[data-hero-panel]", { autoAlpha: 0, y: 12, duration: 0.7 }, 0.7);
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      id="top"
      ref={ref}
      tabIndex={-1}
      aria-labelledby="hero-title"
      className="container-page pb-16 pt-[calc(var(--nav-height)+3.5rem)] outline-none md:pb-24 md:pt-[calc(var(--nav-height)+6rem)]"
    >
      <div className="grid items-end gap-12 md:grid-cols-12 md:gap-10 lg:gap-16">
        <div className="md:col-span-7">
          <div data-hero-item className="flex items-center gap-3">
            <img
              src={profile.portrait}
              alt=""
              width={48}
              height={48}
              className="size-12 rounded-lg object-cover object-[50%_30%] md:hidden"
            />
            <p className="font-mono text-[13px] text-muted-foreground">
              {profile.name} <span className="text-foreground/30">·</span> {profile.role}
            </p>
          </div>

          <h1
            id="hero-title"
            data-hero-item
            className="mt-6 max-w-[20ch] text-[clamp(2.25rem,5.2vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-balance"
          >
            I build systems in GoHighLevel and Zoho,{" "}
            <span className="text-muted-foreground">with Zapier tying everything together.</span>
          </h1>

          <p
            data-hero-item
            className="mt-6 max-w-[52ch] text-lg leading-relaxed text-foreground/75"
          >
            Lead capture, pipelines, email campaigns, AI reports — if a task keeps repeating itself,
            I'd rather build something that does it automatically.
          </p>

          <div data-hero-item className="mt-9 flex flex-wrap items-center gap-3">
            <Button size="lg" onClick={() => scrollTo("#work")} className="group">
              View selected work
              <ArrowDown className="transition-transform duration-200 group-hover:translate-y-0.5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollTo("#contact")}>
              Get in touch
            </Button>
            <a
              href={profile.resume}
              download
              className="ml-1 inline-flex items-center gap-1.5 rounded-md px-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Download aria-hidden className="size-4" />
              <span className="link-underline">Résumé (PDF)</span>
            </a>
          </div>

          <StatusPanel className="mt-12 max-w-sm md:hidden" />
        </div>

        <div className="relative hidden md:col-span-5 md:block">
          <div data-hero-portrait className="aspect-[4/5] overflow-hidden rounded-xl bg-muted">
            <img
              src={profile.portrait}
              alt={`Portrait of ${profile.name}`}
              width={820}
              height={1024}
              fetchPriority="high"
              data-parallax="0.04"
              className="size-full object-cover object-[50%_35%]"
            />
          </div>
          <div
            data-hero-panel
            className="glass absolute -left-10 bottom-8 w-72 rounded-lg p-4 lg:-left-16"
          >
            <StatusPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
