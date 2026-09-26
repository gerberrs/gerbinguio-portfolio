import { careerRoles, education } from "@/data/career";
import { SectionHeader } from "./SectionHeader";

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

        <ol className="divide-y divide-border">
          {careerRoles.map((role) => {
            const current = /present/i.test(role.period);
            return (
              <li
                key={role.slug}
                data-reveal
                className="grid gap-3 py-8 md:grid-cols-12 md:gap-8 md:py-10"
              >
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
                    {role.org && (
                      <span className="font-normal text-muted-foreground"> · {role.org}</span>
                    )}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-foreground/80">
                    {role.description}
                  </p>
                  <p className="mt-4 font-mono text-xs leading-5 text-muted-foreground">
                    <span className="sr-only">Skills: </span>
                    {role.tags.join(" · ")}
                  </p>
                </div>
              </li>
            );
          })}
          <li data-reveal className="grid gap-3 py-8 md:grid-cols-12 md:gap-8 md:py-10">
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
