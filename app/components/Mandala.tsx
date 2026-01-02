"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";

interface MandalaProps {
  color?: string;
  className?: string;
  style?: CSSProperties;
  animate?: boolean;
}

export default function Mandala({
  color = "#798777",
  className = "",
  style,
  animate = true,
}: MandalaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current || !animate) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { 
        threshold: 0.05,
        rootMargin: "50px"
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [animate]);

  return (
    <div
      ref={ref}
      className={`relative h-full w-full ${isVisible && animate ? "animate-spin-slow" : ""} ${className}`}
      style={{
        backgroundColor: color,
        maskImage: "url(/mandala.svg)",
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskImage: "url(/mandala.svg)",
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        ...style,
      }}
      aria-hidden="true"
    />
  );
}
