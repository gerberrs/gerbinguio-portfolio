import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LETTERS = "GERBINGUIO".split("");

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Exit animation
          gsap.to(containerRef.current, {
            opacity: 0,
            scale: 1.05,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete,
          });
        },
      });

      // Animate counter from 0 to 100
      const counterObj = { value: 0 };
      tl.to(counterObj, {
        value: 100,
        duration: 3.5,
        ease: "power1.inOut",
        onUpdate: () => {
          setCounter(Math.round(counterObj.value));
        },
      }, 0);

      // Stagger-animate each letter
      lettersRef.current.forEach((letter, index) => {
        if (!letter) return;
        tl.to(
          letter,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            color: "#F2F4F7",
            textShadow: "0 0 20px rgba(111,168,198,0.6), 0 0 40px rgba(111,168,198,0.3), 0 0 80px rgba(111,168,198,0.15)",
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          index * 0.3 // stagger start time
        );

        // Subtle pulse after revealing
        tl.to(
          letter,
          {
            textShadow: "0 0 10px rgba(111,168,198,0.45), 0 0 20px rgba(111,168,198,0.18)",
            duration: 0.3,
            ease: "power2.out",
          },
          index * 0.3 + 0.5
        );
      });

      // Brief pause at 100% before exit
      tl.to({}, { duration: 0.6 });

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} className="loading-screen">
      {/* Background particles / decorative elements */}
      <div className="loading-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="loading-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="loading-content">
        <div className="loading-letters-container">
          {LETTERS.map((letter, index) => (
            <span
              key={index}
              ref={(el) => { lettersRef.current[index] = el; }}
              className="loading-letter"
              style={{
                opacity: 0,
                transform: "translateY(30px) scale(0.8)",
                filter: "blur(8px)",
                color: "rgba(242,244,247,0.12)",
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Percentage counter */}
        <div className="loading-counter-container">
          <div className="loading-progress-track">
            <div
              className="loading-progress-fill"
              style={{ width: `${counter}%` }}
            />
          </div>
          <span ref={counterRef} className="loading-counter">
            {counter}%
          </span>
        </div>
      </div>
    </div>
  );
}
