import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { CardTitle } from "./CardTitle";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: "atoms/card/CardTitle",
  component: CardTitle,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof CardTitle>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CardTitle> = (args) => (
  <CardTitle {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  value: "card title",
  className: "",
  innerClassName: "",
};
