import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Card fan carousel, adapted from 21st.dev's "card-fan-carousel": cards sit in
 * a fan, spread on hover, and page with the arrows when there are more than
 * seven. Changes from the original: real screenshots or a text card instead of
 * stock images, theme tokens instead of black/white, GSAP from `@/lib/gsap`,
 * the entrance plays when scrolled into view (static for reduced motion), and
 * cards are buttons with keyboard paging.
 */

export interface FanCard {
  /** Short mono label above the title, e.g. "01". */
  label?: string;
  title: string;
  /** Screenshot (full-size path; the -sm variant is used). Omit for a text card. */
  image?: string;
  /** Shown on text cards only. */
  summary?: string;
  onSelect?: () => void;
}

const MAX_VISIBLE = 7;
const HALF = 3;

const FAN_POSITIONS = [
  { rot: -21, scale: 0.7756, x: -30, y: 7.3, zIndex: 1 },
  { rot: -14, scale: 0.8498, x: -22, y: 4.0, zIndex: 2 },
  { rot: -7, scale: 0.9346, x: -11, y: 1.3, zIndex: 3 },
  { rot: 0, scale: 1.0, x: 0, y: 0.0, zIndex: 10 },
  { rot: 7, scale: 0.9346, x: 11, y: 1.3, zIndex: 3 },
  { rot: 14, scale: 0.8498, x: 22, y: 4.0, zIndex: 2 },
  { rot: 21, scale: 0.7756, x: 30, y: 7.3, zIndex: 1 },
];

/** Horizontal spread per breakpoint (the fan narrows on small screens). */
function widthMultiplier(width: number) {
  // Tuned so the outer cards stay inside the page container.
  if (width < 480) return 0.22;
  if (width < 640) return 0.36;
  if (width < 768) return 0.46;
  if (width < 1024) return 0.72;
  return 0.85;
}

/**
 * Vertical drop of the outer cards: shallower on small screens (where cards are
 * small), and squeezed further when the viewport is too short for the layout.
 * Layout heights match `.fan-layout` in index.css.
 */
function heightMultiplier(width: number) {
  let idealRem: number;
  if (width < 480) idealRem = 19.5;
  else if (width < 640) idealRem = 22.5;
  else if (width < 768) idealRem = 24;
  else if (width < 1024) idealRem = 27;
  else idealRem = 29.5;
  const fit = Math.min(1, (window.innerHeight * 0.7) / (idealRem * 16));
  return fit * (width < 768 ? 0.5 : 1);
}

function slotConfig(slotCount: number, slot: number) {
  if (slotCount >= MAX_VISIBLE) return FAN_POSITIONS[slot];
  const center = slotCount >> 1;
  const distance = slotCount > 1 ? (slot - center) / center : 0;
  const abs = Math.abs(distance);
  return {
    rot: distance * 21,
    scale: 1.0 - 0.2244 * abs * abs,
    x: distance * 30,
    y: abs * abs * 7.3,
    zIndex: 10 - Math.abs(slot - center),
  };
}

const thumb = (src: string) => src.replace(/\.webp$/, "-sm.webp");

export function CardFanCarousel({ cards, label }: { cards: FanCard[]; label: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const hasEntered = useRef(false);
  const directionRef = useRef<"left" | "right" | null>(null);
  const prevVisible = useRef<Set<number>>(new Set());

  const total = cards.length;
  const paginated = total > MAX_VISIBLE;
  const [center, setCenter] = useState(paginated ? HALF : total >> 1);

  /** card index → fan slot, for the cards currently in the fan. */
  const visibleMap = useCallback(
    (c: number) => {
      const map = new Map<number, number>();
      if (!paginated) {
        for (let i = 0; i < total; i++) map.set(i, i);
        return map;
      }
      for (let slot = 0; slot < MAX_VISIBLE; slot++) {
        map.set((((c + slot - HALF) % total) + total) % total, slot);
      }
      return map;
    },
    [total, paginated],
  );

  const cycle = useCallback(
    (direction: "left" | "right") => {
      if (isAnimating.current || !paginated) return;
      isAnimating.current = true;
      directionRef.current = direction;
      setCenter((prev) =>
        direction === "right" ? (prev + 1) % total : (prev - 1 + total) % total,
      );
    },
    [total, paginated],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !total) return;
    const els = Array.from(container.querySelectorAll<HTMLElement>(".fan-card"));
    if (!els.length) return;

    const reduced = prefersReducedMotion();
    const map = visibleMap(center);
    const previously = prevVisible.current;
    const direction = directionRef.current;
    const firstMount = !hasEntered.current;
    const slotCount = paginated ? MAX_VISIBLE : total;
    const config = (slot: number) => slotConfig(slotCount, slot);
    const target = (slot: number) => {
      const { x, y, rot, scale, zIndex } = config(slot);
      const w = widthMultiplier(window.innerWidth);
      const h = heightMultiplier(window.innerWidth);
      return { x: `${x * w}rem`, y: `${y * h}rem`, rotation: rot, scale, opacity: 1, zIndex };
    };

    let done = 0;
    const onCardDone = () => {
      if (++done >= map.size) {
        isAnimating.current = false;
        hasEntered.current = true;
      }
    };

    let entrance: ScrollTrigger | undefined;

    if (firstMount) {
      isAnimating.current = true;
      els.forEach((el, i) => {
        const slot = map.get(i);
        if (slot === undefined) gsap.set(el, { opacity: 0, scale: 0.3, x: 0, y: 0, zIndex: 0 });
        else if (reduced) gsap.set(el, target(slot));
        else gsap.set(el, { x: 0, y: "6rem", rotation: 0, scale: 0.5, opacity: 0 });
      });
      if (reduced) {
        isAnimating.current = false;
        hasEntered.current = true;
      } else {
        // Play the fan-out once, when it scrolls into view rather than on load.
        entrance = ScrollTrigger.create({
          trigger: container,
          start: "top 85%",
          once: true,
          onEnter: () => {
            els.forEach((el, i) => {
              const slot = map.get(i);
              if (slot === undefined) return;
              gsap.to(el, {
                ...target(slot),
                duration: 1.1,
                ease: "elastic.out(1.05,.78)",
                delay: slot * 0.06,
                onComplete: onCardDone,
              });
            });
          },
        });
      }
    } else {
      const duration = (d: number) => (reduced ? 0 : d);
      els.forEach((el, i) => {
        const slot = map.get(i);
        const wasVisible = previously.has(i);
        if (slot !== undefined) {
          if (!wasVisible) {
            const enterX = direction === "right" ? 40 : -40;
            gsap.set(el, {
              x: `${enterX}rem`,
              rotation: direction === "right" ? 30 : -30,
              scale: 0.5,
              opacity: 0,
            });
          }
          gsap.to(el, {
            ...target(slot),
            duration: duration(wasVisible ? 0.5 : 0.6),
            ease: "power2.out",
            overwrite: "auto",
            onComplete: onCardDone,
          });
        } else if (wasVisible) {
          gsap.to(el, {
            x: `${direction === "right" ? -40 : 40}rem`,
            opacity: 0,
            scale: 0.5,
            rotation: direction === "right" ? -30 : 30,
            zIndex: 0,
            duration: duration(0.4),
            ease: "power2.in",
          });
        }
      });
    }

    prevVisible.current = new Set(map.keys());

    // Hover spread: mouse only, so a tap on touch screens just opens the card.
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const visible = els
      .map((el, i) => ({ el, slot: map.get(i) }))
      .filter((v): v is { el: HTMLElement; slot: number } => v.slot !== undefined)
      .sort((a, b) => a.slot - b.slot);
    const centerSlot = visible.length >> 1;
    let activeSlot: number | null = null;
    let leaveTimer: ReturnType<typeof setTimeout> | null = null;

    const layout = (hovered: number | null) => {
      const w = widthMultiplier(window.innerWidth);
      const h = heightMultiplier(window.innerWidth);
      visible.forEach(({ el, slot }) => {
        const base = config(slot);
        let x = base.x * w;
        let y = base.y * h;
        let rotation = base.rot;
        let scale = base.scale;
        let delay = Math.abs(slot - (hovered ?? centerSlot)) * 0.02;

        if (hovered !== null) {
          const distance = Math.abs(slot - hovered);
          delay = distance * 0.02;
          if (slot === hovered) {
            y -= 2.5 * h;
            scale *= 1.06;
          } else {
            const normalized = centerSlot > 0 ? (slot - centerSlot) / centerSlot : 0;
            const push = 8 * (1 - Math.abs(normalized)) * (1 + 0.2 * Math.max(0, 3 - distance));
            const side = slot < hovered ? -1 : 1;
            x += side * push * w;
            rotation += (side * 3) / (distance + 1);
          }
        }

        gsap.to(el, {
          x: `${x}rem`,
          y: `${y}rem`,
          rotation,
          scale,
          duration: reduced ? 0 : 0.5,
          delay: reduced ? 0 : delay,
          ease: "elastic.out(1,.75)",
          overwrite: "auto",
        });
        gsap.set(el, { zIndex: base.zIndex });
      });
    };

    const enterHandlers = canHover
      ? visible.map(({ el, slot }) => {
          const handler = () => {
            if (isAnimating.current) return;
            if (leaveTimer) clearTimeout(leaveTimer);
            leaveTimer = null;
            if (activeSlot !== slot) {
              activeSlot = slot;
              layout(slot);
            }
          };
          el.addEventListener("mouseenter", handler);
          return { el, handler };
        })
      : [];

    const onLeave = () => {
      if (isAnimating.current) return;
      if (leaveTimer) clearTimeout(leaveTimer);
      leaveTimer = setTimeout(() => {
        activeSlot = null;
        layout(null);
      }, 50);
    };
    if (canHover) container.addEventListener("mouseleave", onLeave);

    const onResize = () => {
      if (!isAnimating.current) layout(activeSlot);
    };
    window.addEventListener("resize", onResize);

    return () => {
      entrance?.kill();
      enterHandlers.forEach(({ el, handler }) => el.removeEventListener("mouseenter", handler));
      container.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      if (leaveTimer) clearTimeout(leaveTimer);
    };
  }, [center, total, visibleMap, paginated]);

  if (!total) return null;

  const shown = visibleMap(center);
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") cycle("left");
    if (e.key === "ArrowRight") cycle("right");
  };

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={paginated ? onKeyDown : undefined}
      className="flex flex-col items-center [overflow-x:clip]"
    >
      <div ref={containerRef} className="fan-layout relative w-full">
        {cards.map((card, i) => {
          const inFan = shown.has(i);
          return (
            <button
              key={card.title}
              type="button"
              onClick={card.onSelect}
              tabIndex={inFan ? 0 : -1}
              aria-hidden={!inFan}
              className="fan-card group block overflow-hidden rounded-xl border border-foreground/10 bg-muted text-left opacity-0 shadow-[0_18px_40px_-20px_hsl(var(--shadow)/0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {card.image ? (
                <>
                  <img
                    src={thumb(card.image)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 size-full object-cover object-top"
                  />
                  <span className="glass absolute inset-x-2 bottom-2 flex gap-2 rounded-md px-3 py-2 text-[13px] font-medium leading-snug sm:text-sm">
                    {card.label && (
                      <span className="font-mono text-xs leading-5 text-muted-foreground">
                        {card.label}
                      </span>
                    )}
                    <span className="line-clamp-2">{card.title}</span>
                  </span>
                </>
              ) : (
                <span className="absolute inset-0 flex flex-col bg-card p-4 sm:p-5">
                  {card.label && (
                    <span className="font-mono text-xs text-brand">{card.label}</span>
                  )}
                  <span className="mt-2 text-[15px] font-semibold leading-snug tracking-tight sm:text-base">
                    {card.title}
                  </span>
                  {card.summary && (
                    <span className="mt-2 line-clamp-4 hidden text-sm leading-relaxed text-muted-foreground sm:block">
                      {card.summary}
                    </span>
                  )}
                  <span className="mt-auto font-mono text-xs text-muted-foreground group-hover:text-foreground">
                    Read section →
                  </span>
                </span>
              )}
            </button>
          );
        })}
      </div>

      {paginated && (
        <div className="mt-2 flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => cycle("left")} aria-label="Previous build">
            <ChevronLeft />
          </Button>
          <div className="flex items-center gap-2" aria-hidden>
            {cards.map((card, i) => (
              <span
                key={card.title}
                className={cn(
                  "size-1.5 rounded-full transition-colors duration-300",
                  i === center ? "bg-foreground/70" : "bg-foreground/15",
                )}
              />
            ))}
          </div>
          <Button variant="outline" size="icon" onClick={() => cycle("right")} aria-label="Next build">
            <ChevronRight />
          </Button>
          <span className="sr-only" aria-live="polite">
            {cards[center].title}, {center + 1} of {total}
          </span>
        </div>
      )}
    </div>
  );
}
