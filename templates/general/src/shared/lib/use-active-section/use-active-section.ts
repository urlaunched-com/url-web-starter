"use client";

import { useEffect, useMemo, useState } from "react";

const useActiveSection = <T extends string>(
  sectionIds: T[],
  defaultActiveSection: T,
  threshold: number[] = [0, 0.1, 0.9, 1],
  rootMargin: string = "-50% 0px -45% 0px",
) => {
  const [activeSection, setActiveSection] = useState<T>(defaultActiveSection);

  const observer = useMemo(() => {
    return new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as T);
          }
        });
      },
      {
        root: null,
        rootMargin,
        threshold,
      },
    );
  }, [threshold, rootMargin]);

  useEffect(() => {
    sectionIds.forEach(id => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, observer]);

  return activeSection;
};

export default useActiveSection;
