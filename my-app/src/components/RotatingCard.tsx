import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
  Card,
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Separator,
} from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

type CardItem = {
  id?: string | number;
  title: string;
  content: React.ReactNode;
};

type RotatingCardsProps = {
  items: CardItem[];
  defaultIndex?: number;
  autoRotate?: boolean;
  rotateIntervalMs?: number;
  loop?: boolean;
  height?: number | string;
};

export default function RotatingCards({
  items,
  defaultIndex = 0,
  autoRotate = false,
  rotateIntervalMs = 5000,
  loop = true,
  height,
}: RotatingCardsProps) {
  const total = items.length;
  const [idx, setIdx] = useState(() => clampIndex(defaultIndex, total));
  const [trackIndex, setTrackIndex] = useState(idx + 1);
  const [animated, setAnimated] = useState(true);
  const [paused, setPaused] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  const timerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // clone slides for loop effect
  const slides = useMemo(() => {
    if (total === 0) return [] as CardItem[];
    if (total === 1) return [items[0]];
    return [items[total - 1], ...items, items[0]];
  }, [items, total]);

  // Track container width responsively
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateWidth = () => setContainerWidth(el.offsetWidth);
    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);

    window.addEventListener("resize", updateWidth);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  // Sync indices if items change
  const itemsKey = useMemo(
    () => items.map((it) => it.id ?? it.title).join("|"),
    [items]
  );
  useEffect(() => {
    const safe = clampIndex(idx, total);
    setIdx(safe);
    setTrackIndex(total > 1 ? safe + 1 : 0);
  }, [total, itemsKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // next/prev handlers
  const next = useCallback(() => {
    if (total <= 1) return;
    if (!loop && idx === total - 1) return;
    setAnimated(true);

    if (loop && idx === total - 1) {
      setTrackIndex(total + 1);
    } else {
      setIdx((i) => i + 1);
      setTrackIndex((ti) => ti + 1);
    }
  }, [idx, total, loop]);

  const prev = useCallback(() => {
    if (total <= 1) return;
    if (!loop && idx === 0) return;
    setAnimated(true);

    if (loop && idx === 0) {
      setTrackIndex(0);
    } else {
      setIdx((i) => i - 1);
      setTrackIndex((ti) => ti - 1);
    }
  }, [idx, total, loop]);

  // auto-rotation
  useEffect(() => {
    if (paused || !autoRotate || total < 2) return;
    clearTimer(timerRef);
    timerRef.current = window.setInterval(next, rotateIntervalMs);
    return () => clearTimer(timerRef);
  }, [paused, autoRotate, rotateIntervalMs, total, next]);

  // Handle transition end for seamless looping
  const handleTransitionEnd = () => {
    if (!loop || total < 2) return;

    if (trackIndex === total + 1) {
      setAnimated(false);
      setTrackIndex(1);
      setIdx(0);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimated(true))
      );
    }
    if (trackIndex === 0) {
      setAnimated(false);
      setTrackIndex(total);
      setIdx(total - 1);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimated(true))
      );
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [next, prev]);

  if (total === 0) {
    return (
      <Card variant="surface">
        <Box p="4">
          <Text size="3" color="gray">
            Provide at least one card item.
          </Text>
        </Box>
      </Card>
    );
  }

  const current = items[idx];

  return (
    <Card
      ref={containerRef}
      tabIndex={0}
      variant="surface"
      style={{ outline: "none", userSelect: "none", width: "100%" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Rotating cards"
    >
      <Flex direction="column" gap="3" p="4" style={{ height }}>
        <Flex align="center" justify="between">
          <Heading size="5">{current.title}</Heading>
          <Text size="2" color="gray">{`Card ${idx + 1} of ${total}`}</Text>
        </Flex>

        <Separator size="4" />

        {/* Viewport */}
        <Box
          style={{
            position: "relative",
            width: "100%",
            flexGrow: 1,
            overflow: "hidden",
          }}
        >
          {/* Track (moves entire card width) */}
          <Box
            onTransitionEnd={handleTransitionEnd}
            style={{
              display: "flex",
              height: "100%",
              width: `${slides.length * 100}%`,
              transform: `translateX(-${(trackIndex * 100) / slides.length}%)`,
              transition: animated ? "transform 420ms ease" : "none",
            }}
          >
            {slides.map((slide, i) => (
              <Box
                key={(slide.id ?? slide.title) + "_" + i}
                style={{
                  width: `${100 / slides.length}%`,
                  flex: "0 0 auto",
                  // 👇 allow shrinking on small screens
                  minWidth: 0,
                  display: "flex",
                  alignItems: "stretch",
                }}
              >
                {/* full card body that slides */}
                <Box
                  style={{
                    width: "100%",
                    height: "100%",
                    // 👇 prevent inner content from forcing width
                    minWidth: 0,
                    overflow: "hidden",
                  }}
                >
                  {" "}
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      minWidth: 0,
                      overflow: "hidden",
                      // long words/urls won’t blow up layout
                      wordBreak: "break-word",
                    }}
                  >
                    {slide.content}
                  </div>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Flex align="center" justify="between" mt="2">
          <Flex gap="2">
            <Button
              variant="soft"
              onClick={prev}
              disabled={total < 2 || (!loop && idx === 0)}
            >
              ← Prev
            </Button>
            <Button
              variant="soft"
              onClick={next}
              disabled={total < 2 || (!loop && idx === total - 1)}
            >
              Next →
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}

// helpers
function clampIndex(i: number, len: number) {
  if (len <= 0) return 0;
  return Math.max(0, Math.min(i, len - 1));
}
function clearTimer(ref: React.MutableRefObject<number | null>) {
  if (ref.current) {
    window.clearInterval(ref.current);
    ref.current = null;
  }
}
