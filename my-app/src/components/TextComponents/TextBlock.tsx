import React from "react";

type TextBlockProps = {
  title: string;
  text?: string;
  /** Width of the block. Accepts px, %, ch, rem, etc. Defaults to 60ch for comfy reading. */
  width?: string | number;
  /** Optional alignment of the whole block (applied via auto margins). */
  align?: "left" | "center" | "right";
  /** Optional className for further styling. */
  className?: string;
};

export const TextBlock: React.FC<TextBlockProps> = ({
  title,
  text,
  width = "60ch",
  align = "left",
  className,
}) => {
  const resolvedWidth =
    typeof width === "number" ? `${width}px` : width;

  const margin =
    align === "center"
      ? "0 auto"
      : align === "right"
      ? "0 0 0 auto"
      : "0"; // left

  return (
    <section
      className={className}
      style={{ width: resolvedWidth, margin }}
    >
      <h2 style={{ margin: 0, lineHeight: 1.2, fontSize: "1.25rem" }}>
        {title}
      </h2>
      <p style={{ marginTop: 8, whiteSpace: "pre-line" }}>
        {text}
      </p>
    </section>
  );
};
