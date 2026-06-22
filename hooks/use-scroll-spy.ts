"use client";

import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently active based on scroll position.
 * Works reliably on long single-page layouts with a sticky header offset.
 */
export function useScrollSpy(sectionIds: string[], offset = 96) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const ids = sectionIds.map((id) => id.replace('#', ''));

    const resolveActive = () => {
      const scrollPos = window.scrollY + offset;
      let current = '';

      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          current = `#${id}`;
        }
      }

      setActiveId(current);
    };

    resolveActive();
    window.addEventListener('scroll', resolveActive, { passive: true });
    window.addEventListener('resize', resolveActive);

    return () => {
      window.removeEventListener('scroll', resolveActive);
      window.removeEventListener('resize', resolveActive);
    };
  }, [sectionIds, offset]);

  return activeId;
}
