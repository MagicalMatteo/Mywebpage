import { useState, useRef } from "react";
import "@radix-ui/themes/styles.css";
import "./index.css";
import { Theme } from "@radix-ui/themes";
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

          <Mainbody showToast={showToast} overlap={OVERLAP} />
      </div>
    </Theme>
  );
}
