import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/common/ui/Button/Button";
import MenuIcon from "../../../../public/icon/menu.svg";

type Story = StoryObj<typeof meta>;

const meta = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

export const Large: Story = {
  args: {
    size: "lg",
    children: "Text",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Text",
  },
};

export const Icon: Story = {
  args: {
    isIcon: true,
    children: <MenuIcon />,
  },
};
