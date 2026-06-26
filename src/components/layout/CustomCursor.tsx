"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    const hoverableElements = document.querySelectorAll("a, button, [data-cursor-hover]");
    const addHover = () => setHovered(true);
    const removeHover = () => setHovered(false);

    hoverableElements.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      hoverableElements.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, [cursorX, cursorY]);

  if (typeof window === "undefined") return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: hovered ? 48 : 16,
        height: hovered ? 48 : 16,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="w-full h-full rounded-full bg-white" />
    </motion.div>
  );
}
