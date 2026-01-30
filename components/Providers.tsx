"use client";

import { ThemeProvider } from "next-themes";
import { MotionConfig, useReducedMotion } from "framer-motion";
import { DataProvider } from "./DataProvider";

interface ProvidersProps {
  children: React.ReactNode;
  fallbackData?: any;
}

export function Providers({ children, fallbackData }: ProvidersProps) {
  const reduced = useReducedMotion();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <MotionConfig reducedMotion={reduced ? "always" : "user"}>
        <DataProvider fallbackData={fallbackData}>
          {children}
        </DataProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
