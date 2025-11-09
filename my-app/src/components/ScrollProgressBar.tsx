import { useEffect, useRef, useState } from "react";
import * as Progress from "@radix-ui/react-progress";

type ScrollProgressBarProps = {
  /** Labels evenly spaced along the bar, alternating left/right */
  labels?: string[];
  /** Bar height in px */
  height?: number;
  /** Bar thickness in px */
  thickness?: number;
  /** Gap from bar to label in px */
  labelGap?: number;
};

export default function ScrollProgressBar({
  labels = [],
  height = 360,
  thickness = 8,
  labelGap = 8,
}: ScrollProgressBarProps) {
  const [value, setValue] = useState(0); // scroll progress %
  const raf = useRef<number | null>(null);
  const busy = useRef(false);

  useEffect(() => {
    const el = document.scrollingElement || document.documentElement;

    const compute = () => {
      const viewportH = window.visualViewport?.height ?? window.innerHeight;
      const max = Math.max(0, el.scrollHeight - viewportH);
      const y =
        typeof window.scrollY === "number" ? window.scrollY : el.scrollTop;
      const ratio = max > 0 ? y / max : 0;
      const pct = Math.max(0, Math.min(100, ratio * 100));
      setValue(pct);
    };

    const onScroll = () => {
      if (busy.current) return;
      busy.current = true;
      raf.current = requestAnimationFrame(() => {
        busy.current = false;
        compute();
      });
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", compute);
    window.visualViewport?.addEventListener("resize", compute);
    window.visualViewport?.addEventListener("scroll", compute);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", compute);
      window.visualViewport?.removeEventListener("resize", compute);
      window.visualViewport?.removeEventListener("scroll", compute);
    };
  }, []);

  // convert progress % -> 0–1 ratio
  const progressRatio = value / 100;

  return (
    <div
      style={{
        height,
        marginTop: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* narrow wrapper so labels hug the bar */}
      <div
        style={{
          position: "relative",
          width: thickness,
          height: "100%",
        }}
      >
        {/* progress bar */}
        <Progress.Root
          value={value}
          aria-label="Scroll progress"
          style={{
            width: thickness,
            height: "100%",
            background: "var(--gray-5, rgba(0,0,0,0.08))",
            borderRadius: 9999,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Progress.Indicator asChild>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${value}%`,
                transition: "height 120ms linear",
                background: "var(--indigo-9, #3b82f6)",
              }}
            />
          </Progress.Indicator>
        </Progress.Root>

        {/* labels */}
        {labels.map((label, i) => {
          const fraction =
            labels.length > 1 ? i / (labels.length - 1) : 0.5;
          const top = fraction * height;
          const isLeft = i % 2 === 0;

          // highlight if scrolled past this label
          const isActive = fraction <= progressRatio;
          const activeColor = "var(--indigo-9, #3b82f6)";
          const inactiveColor = "var(--gray-9, #888)";
          const color = isActive ? activeColor : inactiveColor;

          return (
            <span
              key={i}
              style={{
                position: "absolute",
                top,
                transform: "translateY(-50%)",
                [isLeft ? "right" : "left"]: `calc(100% + ${labelGap}px)`,
                whiteSpace: "normal",
                font: "inherit",
                lineHeight: 1.2,
                color,
                textAlign: isLeft ? "right" : "left",
                transition: "color 150ms ease",
                pointerEvents: "none",
              }}
            >
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
