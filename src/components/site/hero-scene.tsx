"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function HeroScene({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = ref.current;
    if (!target || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from("[data-hero-copy]", {
        opacity: 0,
        y: 32,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.from("[data-hero-card]", {
        opacity: 0,
        y: 60,
        scale: 0.96,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.to("[data-float='slow']", {
        yPercent: -4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 6,
      });
    }, target);

    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}
