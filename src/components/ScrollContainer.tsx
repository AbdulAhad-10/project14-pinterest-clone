"use client";

import React, { useEffect, useRef } from "react";

interface ScrollContainerProps {
  children: React.ReactNode;
}

const ScrollContainer: React.FC<ScrollContainerProps> = ({ children }) => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!isScrolling) {
        isScrolling = true;
        const direction = e.deltaY > 0 ? 1 : -1;
        const sections = container.querySelectorAll("section");
        const currentSection = Math.round(
          container.scrollTop / window.innerHeight
        );
        const nextSection = Math.max(
          0,
          Math.min(sections.length - 1, currentSection + direction)
        );

        container.scrollTo({
          top: nextSection * window.innerHeight,
          behavior: "smooth",
        });

        setTimeout(() => {
          isScrolling = false;
        }, 1000);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <main ref={containerRef} className="scroll-main">
      {children}
    </main>
  );
};

export default ScrollContainer;
