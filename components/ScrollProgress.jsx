"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? window.scrollY / docHeight : 0;
      setScale(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[60] bg-transparent" aria-hidden="true">
      <div
        className="h-full bg-graphite origin-left"
        style={{ transform: `scaleX(${scale})` }} />
      
    </div>);

}