import { addons } from "@storybook/addons";
// import { themes } from '@storybook/theming';

import customTheme from "./custom-theme.js";

addons.setConfig({
  theme: customTheme,
});
