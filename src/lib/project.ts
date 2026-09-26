import type { Project } from "@/data/projects";

/** Pretty host for a project link: "https://theneyaclinic.co.uk/x" → "theneyaclinic.co.uk". */
export const linkHost = (url: string) => new URL(url).hostname.replace(/^www\./, "");

/** The first "Business impact" line in a case study, if the project has one. */
export const projectOutcome = (project: Project) =>
  project.caseStudy?.find((slide) => slide.impact)?.impact;

/** Images for the on-page composition, falling back to the cover image. */
export const projectVisuals = (project: Project) =>
  project.gallery ?? [{ src: project.image, alt: project.name }];

/** Opens a project's case study, optionally at a specific slide. */
export type OpenProject = (slug: string, slide?: number) => void;
