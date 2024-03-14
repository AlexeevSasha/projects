import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "@/common/ui/TextArea/TextArea";

type Story = StoryObj<typeof meta>;

const meta = {
  title: "TextArea",
  component: TextArea,
  tags: ["autodocs"],
} satisfies Meta<typeof TextArea>;

export default meta;

export const Text: Story = {
  args: {
    id: "test",
    name: "test",
    placeholder: "Placeholder",
  },
};
