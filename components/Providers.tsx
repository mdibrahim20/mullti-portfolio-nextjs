"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig, useReducedMotion } from "framer-motion";

export function Providers({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <MotionConfig reducedMotion={reduced ? "always" : "user"}>{children}</MotionConfig>
    </ThemeProvider>
  );
}
