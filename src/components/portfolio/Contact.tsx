import { ArrowUp, ArrowUpRight, Download } from "lucide-react";
import { profile, profileLinks } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { useSmoothScroll } from "@/components/SmoothScroll";
import ContactForm from "./ContactForm";
import { ExternalLink } from "./ProjectParts";

export function Contact() {
  const { scrollTo } = useSmoothScroll();

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      tabIndex={-1}
      className="pt-8 outline-none md:pt-12"
    >
      <div className="container-page">
        <div className="grid gap-14 border-t border-border pt-16 md:grid-cols-12 md:gap-12 md:pt-24 lg:gap-20">
          <div data-reveal className="md:col-span-6">
            <p className="font-mono text-xs text-brand">Contact</p>
            <h2
              id="contact-title"
              className="mt-3 text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em]"
            >
              Let's work together.
            </h2>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-foreground/75">
              {profile.availability}
            </p>

            <a
              href={`mailto:${profile.email}`}
              className="group mt-10 inline-flex items-center gap-2 text-xl font-medium tracking-tight sm:text-2xl"
            >
              <span className="link-underline">{profile.email}</span>
              <ArrowUpRight
                aria-hidden
                className="size-5 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
              />
            </a>

            <dl className="mt-10 grid max-w-md gap-3 text-sm">
              <div className="grid grid-cols-[5.5rem_1fr] gap-3">
                <dt className="font-mono text-xs leading-5 text-muted-foreground">Phone</dt>
                <dd>
                  <a href={profile.phone.href} className="link-underline">
                    {profile.phone.display}
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-[5.5rem_1fr] gap-3">
                <dt className="font-mono text-xs leading-5 text-muted-foreground">Location</dt>
                <dd>{profile.location}</dd>
              </div>
              <div className="grid grid-cols-[5.5rem_1fr] gap-3">
                <dt className="font-mono text-xs leading-5 text-muted-foreground">Elsewhere</dt>
                <dd>
                  <ul className="flex flex-wrap gap-x-5 gap-y-2">
                    {profileLinks.map((link) => (
                      <li key={link.label}>
                        <ExternalLink href={link.href}>{link.label}</ExternalLink>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>

            <Button asChild variant="outline" className="mt-10">
              <a href={profile.resume} download>
                Download résumé
                <Download />
              </a>
            </Button>
          </div>

          <div data-reveal className="glass rounded-xl p-6 sm:p-8 md:col-span-6">
            <ContactForm />
          </div>
        </div>
      </div>

      <footer className="container-page mt-24">
        <div className="flex flex-col gap-4 border-t border-border py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name} · Made with TypeScript &amp; Tailwind CSS
          </p>
          <button
            type="button"
            onClick={() => scrollTo(0)}
            className="group inline-flex items-center gap-1.5 self-start rounded-md transition-colors hover:text-foreground sm:self-auto"
          >
            Back to top
            <ArrowUp
              aria-hidden
              className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </footer>
    </section>
  );
}
