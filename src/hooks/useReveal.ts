import { useEffect, useRef } from 'react';

/**
 * Attach to a container ref. Once it enters the viewport,
 * the class `is-revealed` is added to the element.
 * CSS handles the actual animation via `.reveal` + `.is-revealed`.
 */
export function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-revealed');
          observer.disconnect(); // fire once
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
