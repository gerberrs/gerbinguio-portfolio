import { useState } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Which section is under the reading line, and whether the page has left the
 * top — both from ScrollTrigger so they stay in sync with Lenis (no extra
 * scroll listeners).
 */
export function useScrollState(sectionIds: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useGSAP(
    () => {
      const sections: { id: string; trigger: ScrollTrigger }[] = [];
      // Derive from all triggers rather than the one that toggled, so a big
      // jump (e.g. "Back to top") can't leave a stale section highlighted.
      const sync = () => setActive(sections.filter((s) => s.trigger.isActive).pop()?.id ?? null);

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        sections.push({
          id,
          trigger: ScrollTrigger.create({
            trigger: el,
            start: "top 40%",
            end: "bottom 40%",
            onToggle: sync,
          }),
        });
      }

      const triggers = sections.map((s) => s.trigger);
      triggers.push(
        ScrollTrigger.create({
          start: 12,
          end: "max",
          onToggle: (self) => setScrolled(self.isActive),
        }),
      );

      return () => triggers.forEach((t) => t.kill());
    },
    { dependencies: [sectionIds] },
  );

  return { active, scrolled };
}
