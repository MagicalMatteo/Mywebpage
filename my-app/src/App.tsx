// App.tsx
import { useState, useRef } from "react";
import "@radix-ui/themes/styles.css";
import './index.css';
import {
  Theme,
  Button,
  Flex,
  Box,
  Heading,
  Text,
  Separator,
  Switch,
  Badge,
} from "@radix-ui/themes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Tooltip from "@radix-ui/react-tooltip";
import * as Toast from "@radix-ui/react-toast";
import { Mainbody } from "./structure/mainbody";

export default function App() {
  const [appearance, setAppearance] = useState<"light" | "dark">("dark");
  const [toastOpen, setToastOpen] = useState(false);
  const toastTimerRef = useRef<number | null>(null);

  const showToast = () => {
    window.clearTimeout(toastTimerRef.current ?? undefined);
    setToastOpen(false);
    // small timeout lets re-open quickly
    toastTimerRef.current = window.setTimeout(() => setToastOpen(true), 10);
  };

  return (
    <Theme appearance={appearance} radius="large" scaling="100%">
      <Tooltip.Provider delayDuration={250}>
        <Toast.Provider swipeDirection="right">
          {/* Header */}
          <Box
            asChild
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              backdropFilter: "blur(6px)",
              width: "100%", // 👈 fills full width
              left: 0,
            }}
          >
            <Flex
              px="4"
              py="3"
              align="center"
              justify="between"
              style={{ borderBottom: "1px solid var(--gray-6)" }}
            >
              <Flex align="center" gap="3">
                <Badge size="2" color="indigo" variant="soft">
                  Radix + React
                </Badge>
                <Separator orientation="vertical" />
                <Heading size="3">Demo App</Heading>
              </Flex>

              <Flex align="center" gap="3">
                {/* Dropdown menu */}
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <Button highContrast>Actions ▾</Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content sideOffset={6}>
                    <DropdownMenu.Item onSelect={showToast}>
                      Run action
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Sub>
                      <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
                      <DropdownMenu.SubContent>
                        <DropdownMenu.Item onSelect={() => alert("Hello!")}>
                          Say hello
                        </DropdownMenu.Item>
                      </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>

                {/* Theme toggle */}
                <Flex align="center" gap="2">
                  <Text size="2">Dark</Text>
                  <Switch
                    checked={appearance === "dark"}
                    onCheckedChange={(v) => setAppearance(v ? "dark" : "light")}
                    aria-label="Toggle dark mode"
                  />
                </Flex>
              </Flex>
            </Flex>
          </Box>

          <Mainbody showToast={showToast} inputStyle={inputStyle}/>

          {/* Toast (global) */}
          <Toast.Root
            open={toastOpen}
            onOpenChange={setToastOpen}
            duration={2500}
            style={{
              background: "var(--color-panel)",
              borderRadius: 12,
              padding: 12,
              boxShadow: "var(--shadow-4)",
            }}
          >
            <Toast.Title style={{ fontWeight: 600 }}>Done!</Toast.Title>
            <Toast.Description asChild>
              <Text size="2" color="gray">
                Your action completed successfully.
              </Text>
            </Toast.Description>
          </Toast.Root>

          <Toast.Viewport
            style={{
              position: "fixed",
              bottom: 16,
              right: 16,
              width: 360,
              maxWidth: "calc(100vw - 32px)",
              outline: "none",
              zIndex: 9999,
            }}
          />
        </Toast.Provider>
      </Tooltip.Provider>
    </Theme>
  );
}

// quick inline input styles to keep the file self-contained
const inputStyle: React.CSSProperties = {
  width: "100%",
  marginTop: 6,
  padding: "8px 10px",
  borderRadius: 8,
  border: "1px solid var(--gray-6)",
  background: "var(--color-surface)",
  color: "inherit",
  outline: "none",
};
