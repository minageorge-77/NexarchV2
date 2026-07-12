"use client";

import { useEffect, useRef, useState } from "react";

export default function Counter({ target, currency = false }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const duration = 1800;
          const frames = 60;
          const increment = target / (duration / (1000 / frames));
          let current = 0;

          const step = () => {
            current += increment;
            if (current < target) {
              setValue(Math.ceil(current));
              requestAnimationFrame(step);
            } else {
              setValue(target);
            }
          };
          requestAnimationFrame(step);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {currency ? "$" : ""}
      {value.toLocaleString()}
    </span>);

}