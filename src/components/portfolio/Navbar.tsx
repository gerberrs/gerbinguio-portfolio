import { useRef, useState } from "react";
import type { MouseEvent } from "react";
import { Download, Menu } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSmoothScroll } from "@/components/SmoothScroll";
import { useScrollState } from "@/hooks/useScrollState";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export function Navbar() {
  const { scrollTo } = useSmoothScroll();
  const { active, scrolled } = useScrollState(SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);
  // Mobile: scroll only after the sheet has closed and released its scroll lock.
  const pendingTarget = useRef<string | null>(null);

  const goTo = (hash: string) => {
    scrollTo(hash);
    const { pathname, search } = window.location;
    window.history.replaceState(
      window.history.state,
      "",
      hash === "#top" ? pathname + search : hash,
    );
    document.querySelector<HTMLElement>(hash)?.focus({ preventScroll: true });
  };

  const onNavClick = (event: MouseEvent<HTMLAnchorElement>, hash: string) => {
    event.preventDefault();
    goTo(hash);
  };

  const onMobileNavClick = (event: MouseEvent<HTMLAnchorElement>, hash: string) => {
    event.preventDefault();
    pendingTarget.current = hash;
    setMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5">
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto flex h-12 max-w-[calc(1240px-2.5rem)] items-center justify-between rounded-xl border border-transparent pl-3 pr-1.5 transition-[background-color,box-shadow,border-color] duration-300 sm:pr-3",
          scrolled && "glass",
        )}
      >
        <a
          href="#top"
          onClick={(e) => onNavClick(e, "#top")}
          className="flex items-baseline gap-2 rounded-md text-[15px] font-semibold tracking-tight"
        >
          {profile.name}
          <span className="hidden font-mono text-xs font-normal text-muted-foreground lg:inline">
            / CRM &amp; Automation
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          <ul className="flex items-center">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => onNavClick(e, `#${item.id}`)}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative inline-flex h-9 items-center rounded-md px-3 text-sm transition-colors duration-200 hover:text-foreground",
                      isActive ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-3 bottom-1 h-px origin-left bg-foreground transition-transform duration-300",
                        isActive ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
          <Separator orientation="vertical" className="mx-2 h-5" />
          <Button asChild variant="outline" size="sm">
            <a href={profile.resume} download>
              Résumé
              <Download />
            </a>
          </Button>
        </div>

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="!size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="flex flex-col p-6"
            onCloseAutoFocus={(event) => {
              const hash = pendingTarget.current;
              if (!hash) return;
              event.preventDefault();
              pendingTarget.current = null;
              goTo(hash);
            }}
          >
            <SheetTitle className="font-mono text-xs font-normal text-muted-foreground">
              Menu
            </SheetTitle>
            <SheetDescription className="sr-only">Jump to a section of the page</SheetDescription>
            <ul className="mt-8 space-y-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => onMobileNavClick(e, `#${item.id}`)}
                    aria-current={active === item.id ? "location" : undefined}
                    className="flex items-center justify-between rounded-md py-2.5 text-2xl font-semibold tracking-tight aria-[current]:text-brand"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-auto space-y-4">
              <Separator />
              <a href={`mailto:${profile.email}`} className="block text-sm font-medium">
                {profile.email}
              </a>
              <Button asChild variant="outline" className="w-full">
                <a href={profile.resume} download>
                  Download résumé
                  <Download />
                </a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
