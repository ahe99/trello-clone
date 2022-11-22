import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { CardDescription } from "./CardDescription";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: "atoms/card/CardDescription",
  component: CardDescription,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof CardDescription>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CardDescription> = (args) => (
  <CardDescription {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  value: "card description",
  className: "",
  innerClassName: "",
};
