import { useState, useRef } from "react";
import "@radix-ui/themes/styles.css";
import "./index.css";
import { Theme } from "@radix-ui/themes";
import Spline from "@splinetool/react-spline";
import { Mainbody } from "./structure/mainbody";

const HERO_H = "60vh";
const OVERLAP = 96; // how much Mainbody overlaps the Spline (px)

export default function App() {
  const [appearance] = useState<"light" | "dark">("dark");
  const [toastOpen, setToastOpen] = useState(false);
  const toastTimerRef = useRef<number | null>(null);

  const showToast = () => {
    window.clearTimeout(toastTimerRef.current ?? undefined);
    setToastOpen(false);
    toastTimerRef.current = window.setTimeout(() => setToastOpen(true), 10);
  };

  return (
    <Theme appearance={appearance} radius="large" scaling="100%">
      <div style={{ background: "var(--color-surface)" }}>
        {/* Spline hero */}
        <section
          style={{
            position: "relative",
            height: HERO_H,
            overflow: "hidden",
            zIndex: 0,
          }}
        >
          {/* Fade Spline out at the BOTTOM to transparent. */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: -1, // tuck under by 1px to avoid hairline on some GPUs
              WebkitMaskImage:
                `linear-gradient(to bottom, black calc(100% - ${OVERLAP * 1.2}px), transparent 100%)`,
              maskImage:
                `linear-gradient(to bottom, black calc(100% - ${OVERLAP * 1.2}px), transparent 100%)`,
              willChange: "opacity",
              backfaceVisibility: "hidden",
              transform: "translateZ(0)",
            }}
          >
            <Spline
              scene="https://prod.spline.design/QmROvZuuFq8Et0nB/scene.splinecode"
              style={{ position: "absolute", inset: 0 }}
            />
          </div>
        </section>

        {/* Mainbody overlaps upward and also fades at its TOP */}
        <main
          style={{
            position: "relative",
            zIndex: 1,
            marginTop: -OVERLAP,
            paddingTop: OVERLAP,
          }}
        >
          <Mainbody showToast={showToast} overlap={OVERLAP} />
        </main>
      </div>
    </Theme>
  );
}
