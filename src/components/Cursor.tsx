import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function Cursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredEl, setHoveredEl] = useState<string | null>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Add custom cursor class to body
    document.body.classList.add("custom-cursor-active");

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const closestLink = target.closest("a, button, [role='button'], input, select, textarea");
      if (closestLink) {
        if (closestLink.classList.contains("cocktail-card")) {
          setHoveredEl("SIP");
        } else if (closestLink.classList.contains("gallery-item")) {
          setHoveredEl("VIEW");
        } else {
          setHoveredEl("LINK");
        }
      } else {
        setHoveredEl(null);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  const isTextHover = hoveredEl === "SIP" || hoveredEl === "VIEW";

  return (
    <motion.div
      className="hidden lg:flex fixed top-0 left-0 pointer-events-none z-50 items-center justify-center rounded-full"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
        width: isTextHover ? 80 : hoveredEl === "LINK" ? 48 : 12,
        height: isTextHover ? 80 : hoveredEl === "LINK" ? 48 : 12,
        backgroundColor: isTextHover 
          ? "rgba(197, 168, 128, 0.95)" 
          : hoveredEl === "LINK" 
            ? "rgba(11, 30, 54, 0.08)" 
            : "rgba(11, 30, 54, 1)",
        border: hoveredEl === "LINK" ? "1px solid rgba(197, 168, 128, 0.5)" : "none",
        mixBlendMode: isTextHover ? "normal" : hoveredEl === "LINK" ? "normal" : "normal",
        boxShadow: hoveredEl ? "0 0 20px rgba(197, 168, 128, 0.3)" : "none",
      }}
    >
      {isTextHover && (
        <span className="text-[10px] font-mono tracking-widest font-bold text-brand-charcoal uppercase">
          {hoveredEl}
        </span>
      )}
    </motion.div>
  );
}
