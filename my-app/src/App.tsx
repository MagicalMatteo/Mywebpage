import { useState } from "react";
import "@radix-ui/themes/styles.css";
import "./index.css";
import { Theme } from "@radix-ui/themes";
import { Mainbody } from "./structure/mainbody";


export default function App() {
  const [appearance] = useState<"light" | "dark">("dark");

  return (
    <Theme appearance={appearance} radius="large" scaling="100%">
      <div style={{ background: "var(--color-surface)" }}>
        {/* Spline hero */}
          <Mainbody/>
      </div>
    </Theme>
  );
}
