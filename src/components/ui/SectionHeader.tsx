"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  title,
  subtitle,
  className = "",
  align = "left",
}: SectionHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;

    const ctx = gsap.context(() => {
      // Animate title words
      if (titleRef.current) {
        const words = title.split(" ");
        titleRef.current.innerHTML = words
          .map(
            (word) =>
              `<span class="inline-block overflow-hidden"><span class="section-title-word inline-block" style="transform: translateY(100%);">${word}&nbsp;</span></span>`
          )
          .join("");

        gsap.to(".section-title-word", {
          y: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }

      // Animate subtitle
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Animate decorative line
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            delay: 0.4,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    }, containerRef);

    hasAnimated.current = true;

    return () => ctx.revert();
  }, [title]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      <h2
        ref={titleRef}
        className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-foreground mb-4 tracking-tight"
      >
        {title}
      </h2>
      {subtitle && (
        <p
          ref={subtitleRef}
          className="text-foreground-muted text-lg md:text-xl font-serif leading-relaxed opacity-0"
        >
          {subtitle}
        </p>
      )}
      <div
        ref={lineRef}
        className={cn(
          "h-px bg-gradient-to-r from-foreground/20 via-foreground/10 to-transparent mt-6 origin-left",
          align === "center" && "mx-auto max-w-xs origin-center"
        )}
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
