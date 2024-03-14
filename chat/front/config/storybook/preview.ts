import type { Preview } from "@storybook/react";
import { StyleDecorator } from "./decorators/style";
import { ThemeDecorator } from "./decorators/theme";
import { ThemeEnum } from "@/common/types/theme";
import { RouterDecorator } from "./decorators/router";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [StyleDecorator, ThemeDecorator(ThemeEnum.LIGHT), RouterDecorator],
};

export default preview;
