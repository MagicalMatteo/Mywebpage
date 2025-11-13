import * as Dialog from "@radix-ui/react-dialog";
import { Button, Flex, Card, Heading, Text } from "@radix-ui/themes";
import * as Tooltip from "@radix-ui/react-tooltip";
import RotatingFieldForm from "../form/RotatingFieldForm";
import ScrollProgressBar from "../components/ScrollProgressBar";
import { TextBlock } from "../components/TextComponents/TextBlock";

interface BaseComponentProps {
  showToast?: any;
  inputStyle?: any;
}

export const HomePage: React.FC<BaseComponentProps> = ({ showToast, inputStyle }) => {
  return (
    <Card
      size="5"
      style={{
        // avoid a hard line right at the fade seam:
        borderTop: "none",
        // shadows can produce a seam; lift slightly below the seam instead
        boxShadow: "var(--shadow-5)",
        paddingTop: 16, // keep first text away from masked area
      }}
    >
      <Flex direction="column" gap="3">
        <Heading size="4">Welcome 👋</Heading>
        <Text size="3" color="gray">
          This page showcases Radix Themes + Primitives in a single React file.
          Try the dialog, dropdown, tooltips, tabs, and toast.
        </Text>

        <RotatingFieldForm />

        <ScrollProgressBar
          labels={[
            <TextBlock key="block1" title="Landschulheim Marquartstein" text="2,3 Abitur" width="100%" />,
            <TextBlock key="block2" title="Technische Hochschule Rosenheim" text="Bachelor of Science in Computer Science" width="100%" />,
            <TextBlock key="block3" title="Internships" text="Sirconic GmbH" width="100%" />,
            <TextBlock key="block4" title="TBD..." width="100%" />,
          ]}
          height={400}
          labelGap={16}
          maxFillPercent={90}
        />

        <Flex gap="3" wrap="wrap">
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Button onClick={showToast} variant="ghost">
                Show toast
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content sideOffset={6}>
              Fires a Radix Toast
            </Tooltip.Content>
          </Tooltip.Root>

          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button variant="ghost">Open dialog</Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay style={{ position: "fixed", inset: 0, background: "var(--black-a7)" }} />
              <Dialog.Content
                onOpenAutoFocus={(e) => e.preventDefault()}
                style={{
                  background: "var(--color-panel)",
                  color: "var(--color-foreground)",
                  borderRadius: 12,
                  boxShadow: "var(--shadow-5)",
                  width: 420,
                  maxWidth: "calc(100vw - 24px)",
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  padding: 20,
                }}
              >
                <Dialog.Title style={{ marginBottom: 6 }}>Create item</Dialog.Title>
                <Dialog.Description style={{ marginBottom: 14, color: "var(--gray-11)" }}>
                  Fill a couple of fields and hit create.
                </Dialog.Description>

                <Flex direction="column" gap="3">
                  <label style={{ fontSize: 14 }}>
                    <Text as="span">Name</Text>
                    <input type="text" placeholder="e.g. Alpha" style={inputStyle} />
                  </label>
                  <label style={{ fontSize: 14 }}>
                    <Text as="span">Notes</Text>
                    <textarea rows={3} placeholder="Optional" style={inputStyle} />
                  </label>
                </Flex>

                <Flex justify="end" gap="2" mt="4">
                  <Dialog.Close asChild>
                    <Button variant="soft" color="gray">Cancel</Button>
                  </Dialog.Close>
                  <Dialog.Close asChild>
                    <Button onClick={showToast}>Create</Button>
                  </Dialog.Close>
                </Flex>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </Flex>
      </Flex>
    </Card>
  );
};
