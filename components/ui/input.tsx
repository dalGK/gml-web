import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean; // opcional: para forzar aria-invalid
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, onInvalid, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        // ❌ No queremos validación nativa del navegador
       // required={required ?? undefined}
        onInvalid={(e) => {
          e.preventDefault();
          onInvalid?.(e as any);
        }}
        // Si te pasan error, lo marcamos; si no, respetamos lo que venga en props
        aria-invalid={error ?? (props as any)["aria-invalid"]}
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
