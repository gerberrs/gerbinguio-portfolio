import { capabilities } from "@/data/profile";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "./SectionHeader";

export function Capabilities() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="py-16 md:py-24">
      <div className="container-page">
        <SectionHeader id="capabilities" label="Capabilities" title="Tools I work with">
          <p>The platforms I build in day to day, and the ones I reach for around them.</p>
        </SectionHeader>

        <dl>
          {capabilities.map((group, i) => (
            <div
              key={group.title}
              data-reveal
              className="relative grid gap-3 py-6 md:grid-cols-12 md:gap-8"
            >
              {i > 0 && (
                <span data-rule aria-hidden className="absolute inset-x-0 top-0 h-px bg-border" />
              )}
              <dt className="text-sm font-medium md:col-span-3 md:pt-0.5">{group.title}</dt>
              <dd className="md:col-span-9">
                <ul data-stagger className="flex flex-wrap gap-1.5">
                  {group.primary.map((item) => (
                    <li key={item}>
                      <Badge variant="brand">{item}</Badge>
                    </li>
                  ))}
                  {group.items.map((item) => (
                    <li key={item}>
                      <Badge>{item}</Badge>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
