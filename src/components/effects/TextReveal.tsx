"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

export function TextReveal({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.03,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  const words = children.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          key={index}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

interface CharacterRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export function CharacterReveal({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.02,
}: CharacterRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const characters = children.split("");

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 50, rotateX: -90 },
            visible: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
                delay: delay + index * staggerDelay,
              },
            },
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

interface GradientTextRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export function GradientTextReveal({
  children,
  className = "",
  delay = 0,
}: GradientTextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.span
      ref={ref}
      className={`inline-block bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text ${className}`}
      initial={{ opacity: 0, backgroundPosition: "200% 0" }}
      animate={
        isInView
          ? {
              opacity: 1,
              backgroundPosition: "0% 0",
              transition: {
                opacity: { duration: 0.5, delay },
                backgroundPosition: { duration: 1.5, delay: delay + 0.2 },
              },
            }
          : {}
      }
      style={{ backgroundSize: "200% 100%" }}
    >
      <motion.span
        initial={{ opacity: 0, y: 30 }}
        animate={
          isInView
            ? {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] },
              }
            : {}
        }
        className="text-transparent"
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

// ============================================
// GSAP ScrollTrigger-based Components
// ============================================

interface GSAPTextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
  duration?: number;
  type?: "words" | "chars";
  start?: string;
}

export function GSAPTextReveal({
  children,
  className = "",
  as: Component = "div",
  delay = 0,
  stagger = 0.03,
  duration = 0.8,
  type = "words",
  start = "top 85%",
}: GSAPTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;

    const container = containerRef.current;
    const text = container.textContent || "";

    // Split text based on type
    const elements = type === "chars" ? text.split("") : text.split(" ");

    // Create wrapped elements
    container.innerHTML = elements
      .map((el, i) => {
        const content = type === "words" ? (i < elements.length - 1 ? el + " " : el) : el;
        const escaped = content.replace(/ /g, "&nbsp;");
        return `<span class="inline-block overflow-hidden"><span class="gsap-text-item inline-block" style="transform: translateY(110%); opacity: 0;">${escaped === "" ? "&nbsp;" : escaped}</span></span>`;
      })
      .join("");

    const items = container.querySelectorAll(".gsap-text-item");

    gsap.to(items, {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container,
        start,
        once: true,
      },
    });

    hasAnimated.current = true;

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === container) t.kill();
      });
    };
  }, [children, delay, duration, stagger, type, start]);

  return (
    <Component
      ref={containerRef as React.RefObject<HTMLDivElement & HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
      className={cn("will-change-transform", className)}
    >
      {children}
    </Component>
  );
}

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  start?: string;
}

export function FadeIn({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  direction = "up",
  distance = 40,
  start = "top 85%",
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;

    const element = ref.current;

    const directionMap = {
      up: { y: distance, x: 0 },
      down: { y: -distance, x: 0 },
      left: { x: distance, y: 0 },
      right: { x: -distance, y: 0 },
      none: { x: 0, y: 0 },
    };

    const { x, y } = directionMap[direction];

    gsap.fromTo(
      element,
      { opacity: 0, x, y },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start,
          once: true,
        },
      }
    );

    hasAnimated.current = true;

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === element) t.kill();
      });
    };
  }, [delay, duration, direction, distance, start]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}

interface ParallaxScrollProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // Negative = slower scroll, Positive = faster
}

export function ParallaxScroll({
  children,
  className = "",
  speed = -0.2,
}: ParallaxScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    gsap.to(element, {
      yPercent: speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === element) t.kill();
      });
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  start?: string;
}

export function StaggerContainer({
  children,
  className = "",
  stagger = 0.1,
  duration = 0.6,
  delay = 0,
  start = "top 85%",
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;

    const container = ref.current;
    const items = container.children;

    gsap.fromTo(
      items,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start,
          once: true,
        },
      }
    );

    hasAnimated.current = true;

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === container) t.kill();
      });
    };
  }, [stagger, duration, delay, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

interface SplitLineRevealProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export function SplitLineReveal({
  children,
  className = "",
  delay = 0,
  duration = 1,
}: SplitLineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;

    const element = ref.current;

    gsap.fromTo(
      element,
      {
        clipPath: "inset(0 100% 0 0)",
        opacity: 0,
      },
      {
        clipPath: "inset(0 0% 0 0)",
        opacity: 1,
        duration,
        delay,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          once: true,
        },
      }
    );

    hasAnimated.current = true;

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === element) t.kill();
      });
    };
  }, [delay, duration]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
