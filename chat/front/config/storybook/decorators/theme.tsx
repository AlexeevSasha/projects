import { ThemeEnum } from "@/common/types/theme";
import { StoryFn } from "@storybook/react";

export const ThemeDecorator = (theme: ThemeEnum) => (Story: StoryFn) => {
  document.documentElement.dataset.theme = theme;
  return <Story />;
};
