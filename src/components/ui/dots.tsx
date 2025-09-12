import { cn } from "@/lib/utils";
import React from "react";
 
export function DotBackground({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="left-0 flex h-[calc(100dvh-2em)] w-full items-center justify-center bg-none">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#888888_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_1%,var(--background)_68%)] dark:bg-[var(--background)]"></div>
      {children}
    </div>
  );
}