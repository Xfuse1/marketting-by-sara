import { useEffect, useState } from 'react';

export default function useScrollSpy(sectionIds: string[], offset = 0) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      let current: string | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top - offset <= 0) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [sectionIds, offset]);

  return active;
}
