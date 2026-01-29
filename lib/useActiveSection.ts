"use client";

import { useEffect, useMemo, useState } from "react";

export function useActiveSection(sectionIds: string[]) {
  const ids = useMemo(() => sectionIds.filter(Boolean), [sectionIds.join("|")]);
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // Pick the most visible intersecting section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActive(visible.target.id);
      },
      {
        root: null,
        // Top/bottom margins to reduce flicker
        rootMargin: "-45% 0px -50% 0px",
        threshold: [0.1, 0.2, 0.35, 0.5, 0.75]
      }
    );

    for (const el of elements) obs.observe(el);
    return () => obs.disconnect();
  }, [ids.join("|")]);

  return active;
}
