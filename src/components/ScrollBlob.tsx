import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * One large, soft amber torus/blob that reacts to page scroll.
 * Scroll progress → rotation + parallax translateY + scale, all run through
 * springs so the motion feels weighted rather than snapping to the scrollbar.
 * Sits behind content (z below cards) and never intercepts pointer events.
 */
const ScrollBlob = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const spring = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.6,
  });

  const rotate = useTransform(spring, [0, 1], [0, 220]);
  const y = useTransform(spring, [0, 1], ["-8%", "22%"]);
  const scale = useTransform(spring, [0, 1], [1, 1.35]);

  if (reduce) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-0 -z-[5] flex items-center justify-center overflow-hidden pointer-events-none"
    >
      <motion.div
        style={{ rotate, y, scale, willChange: "transform" }}
        className="relative"
      >
        {/* soft blurred torus built from two stacked radial gradients */}
        <div
          style={{
            width: "min(70vw, 720px)",
            height: "min(70vw, 720px)",
            borderRadius: "50%",
            filter: "blur(50px)",
            background:
              "radial-gradient(circle at 50% 50%, transparent 30%, rgba(212,165,116,0.16) 42%, rgba(139,94,60,0.10) 56%, transparent 70%)",
          }}
        />
      </motion.div>
    </div>
  );
};

export default ScrollBlob;
