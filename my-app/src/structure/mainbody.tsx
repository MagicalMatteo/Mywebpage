import * as Tabs from "@radix-ui/react-tabs";
import {
  Button,
  Flex,
  Box,
  Card,
  Heading,
  Text,
  Badge,
} from "@radix-ui/themes";
import { HomePage } from "../pages/home";

interface BaseComponentProps {
  showToast?: any;
  inputStyle?: any; // optional
}

export const Mainbody: React.FC<BaseComponentProps> = ({
  showToast,
  inputStyle,
}) => {
  return (
    <Flex asChild direction="column" p="4" gap="4">
      {/* Tabs as simple navigation */}
      <Tabs.Root defaultValue="home" className="radix-tabs">
        <Tabs.List className="tabs-list">
          <Tabs.Trigger
            value="home"
            className="tabs-trigger">
            Home
          </Tabs.Trigger>
          <Tabs.Trigger value="components" className="tabs-trigger"
          >Components</Tabs.Trigger>
          <Tabs.Trigger value="about" className="tabs-trigger"
          >About</Tabs.Trigger>
        </Tabs.List>

        <Box mt="4">
          <Tabs.Content value="home">
            <HomePage showToast={showToast} inputStyle={inputStyle}/>
      
          </Tabs.Content>

          <Tabs.Content value="components">
            <Flex gap="4" wrap="wrap">
              <Card style={{ minWidth: 260 }}>
                <Heading size="3" mb="1">
                  Buttons
                </Heading>
                <Flex gap="2" wrap="wrap">
                  <Button>Default</Button>
                  <Button variant="soft">Soft</Button>
                  <Button variant="surface">Surface</Button>
                  <Button highContrast>High contrast</Button>
                </Flex>
              </Card>

              <Card style={{ minWidth: 260 }}>
                <Heading size="3" mb="1">
                  Badges & Text
                </Heading>
                <Flex direction="column" gap="2">
                  <Flex gap="2" wrap="wrap">
                    <Badge>New</Badge>
                    <Badge color="green">Active</Badge>
                    <Badge color="red" variant="soft">
                      Error
                    </Badge>
                  </Flex>
                  <Text size="2" color="gray">
                    Radix Themes gives you sensible defaults with tokens that
                    adapt to light/dark automatically.
                  </Text>
                </Flex>
              </Card>
            </Flex>
          </Tabs.Content>

          <Tabs.Content value="about">
            <Card>
              <Heading size="3" mb="1">
                About
              </Heading>
              <Text size="3" color="gray">
                Radix Themes handles theming, layout tokens, and accessible
                components. Primitives add building blocks (Dialog, Menus,
                Popovers, etc.) so you can compose your own design system.
              </Text>
            </Card>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Flex>
  );
};
