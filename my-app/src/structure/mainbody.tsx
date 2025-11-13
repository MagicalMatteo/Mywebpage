import { Flex } from "@radix-ui/themes";
import { HomePage } from "../pages/home";

interface BaseComponentProps {
  showToast?: any;
  inputStyle?: any;
  overlap?: number; // px
}

export const Mainbody: React.FC<BaseComponentProps> = ({
  showToast,
  inputStyle,
  overlap = 96,
}) => {
  const FADE = Math.round(overlap * 1.1); // slightly larger than overlap

  return (
    <div
      style={{
        position: "relative",
        background: "var(--color-surface)",

        // Fade TOP of Mainbody to transparent so Spline shows through.
        WebkitMaskImage:
          `linear-gradient(to bottom, transparent 0, black ${FADE}px, black 100%)`,
        maskImage:
          `linear-gradient(to bottom, transparent 0, black ${FADE}px, black 100%)`,

        // seam-prevention hints
        backfaceVisibility: "hidden",
        transform: "translateZ(0)",
        willChange: "opacity",
      }}
    >
      <Flex
        asChild
        direction="column"
        p="4"
        gap="4"
        style={{
          position: "relative",
          // IMPORTANT: no background here; the container carries it so the mask can cut alpha
        }}
      >
        <HomePage showToast={showToast} inputStyle={inputStyle} />
      </Flex>
    </div>
  );
};
