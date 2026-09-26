import * as React from "react";

import { cn } from "@/lib/utils";

const fieldClass =
  "flex w-full rounded-md border border-input bg-white/80 px-3.5 text-[15px] text-foreground transition-[border-color,box-shadow] duration-200 placeholder:text-muted-foreground/70 focus-visible:border-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/10 disabled:cursor-not-allowed disabled:opacity-50";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input type={type} ref={ref} className={cn(fieldClass, "h-11", className)} {...props} />
  ),
);
Input.displayName = "Input";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(fieldClass, "min-h-32 resize-y py-3", className)}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

export { Input, Textarea };
