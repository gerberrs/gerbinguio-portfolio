import { about, profile } from "@/data/profile";
import { education } from "@/data/career";
import { responsiveImage } from "@/lib/project";

const facts = [
  ["Based in", profile.location],
  ["Education", `BS Information Technology, ${education.year}`],
  ["Focus", "CRM systems & automation"],
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      tabIndex={-1}
      className="py-16 outline-none md:py-24"
    >
      <div className="container-page grid gap-12 md:grid-cols-12 md:gap-12 lg:gap-20">
        <div className="relative md:col-span-5">
          <div data-reveal-image className="aspect-[4/5] overflow-hidden rounded-xl bg-muted">
            <img
              {...responsiveImage(profile.candid, "(min-width: 768px) 40vw, 100vw")}
              alt={`${profile.shortName} at an outdoor concert`}
              loading="lazy"
              decoding="async"
              data-parallax="0.05"
              className="size-full object-cover"
            />
          </div>
          <dl className="glass absolute inset-x-4 bottom-4 grid gap-2.5 rounded-lg p-4 text-sm sm:inset-x-5 sm:bottom-5">
            {facts.map(([term, value]) => (
              <div key={term} className="grid grid-cols-[5.5rem_1fr] gap-3">
                <dt className="font-mono text-xs leading-5 text-muted-foreground">{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="md:col-span-7 md:pt-4">
          <div data-reveal>
            <p className="font-mono text-xs text-brand">About</p>
            <h2
              id="about-title"
              className="mt-3 max-w-[22ch] text-3xl font-semibold tracking-[-0.02em] text-balance md:text-[2.5rem] md:leading-[1.1]"
            >
              A little about me and how I ended up in automation
            </h2>
          </div>
          <div className="mt-8 max-w-prose space-y-5 text-[17px] leading-relaxed text-foreground/80">
            {about.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} data-reveal>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
