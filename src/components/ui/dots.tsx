import { cn } from "@/lib/utils";
import React from "react";

interface DotProps {
  children: React.ReactNode;
  className?: string
}
 
export function DotBackground({
  children,
  className
}: DotProps) {
  return (
    <div className={`left-0 flex h-[100dvh] w-full bg-none ${className}`}>
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#888888_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
      <div 
        className={cn(
          "pointer-events-none",
          "absolute",
          "inset-0",
          "bg-[var(--background)]",
          "[mask-image:radial-gradient(ellipse_at_center,transparent_1%,var(--background)_68%)]",
          )}>
      </div>

      {children}
    </div>
  );
}