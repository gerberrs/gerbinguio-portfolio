import type { MouseEvent } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

const icon = "absolute inset-0 !size-[18px] transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  // The new theme spreads from the button's centre (also for keyboard presses).
  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    const r = event.currentTarget.getBoundingClientRect();
    toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={cn("text-muted-foreground", className)}
    >
      <span className="relative size-[18px]">
        <Sun
          className={cn(icon, isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0")}
        />
        <Moon
          className={cn(icon, isDark ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100")}
        />
      </span>
    </Button>
  );
}
