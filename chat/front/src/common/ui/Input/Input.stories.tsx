import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@/common/ui/Input/Input";

type Story = StoryObj<typeof meta>;

const meta = {
  title: "Input",
  component: Input,
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;

export const Text: Story = {
  args: {
    id: "test",
    name: "test",
    type: "text",
    placeholder: "Placeholder",
  },
};

export const Password: Story = {
  args: {
    id: "password",
    name: "password",
    type: "password",
    placeholder: "Placeholder",
  },
};

export const Error: Story = {
  args: {
    id: "error",
    name: "error",
    placeholder: "Placeholder",
    value: "error",
    error: "Error text",
  },
};

export const Disable: Story = {
  args: {
    id: "disabled",
    name: "disabled",
    placeholder: "Placeholder",
    disabled: true,
  },
};
