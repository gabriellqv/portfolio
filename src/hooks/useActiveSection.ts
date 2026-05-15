import { useEffect, useState } from "react";

/**
 * Tracks which page section is currently visible in the viewport using an
 * IntersectionObserver with a custom root margin.
 *
 * The root margin of "-40% 0px -40% 0px" means a section is considered "active"
 * when its vertical midpoint enters the center ~20% of the viewport. This creates
 * a narrow activation band that provides smoother nav highlighting compared to
 * the default behavior of activating as soon as any part of the section is visible.
 *
 * @param sectionIds - Ordered array of DOM section element IDs to observe.
 *                     The first element is used as the default active section.
 * @returns The ID of the currently active section.
 */
export function useActiveSection(sectionIds: readonly string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px" },
    );

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    for (const section of sections) {
      observer.observe(section);
    }

    return () => {
      for (const section of sections) {
        observer.unobserve(section);
      }
    };
  }, [sectionIds]);

  return activeSection;
}
