import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ColumnTitle } from "./ColumnTitle";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: "atoms/column/ColumnTitle",
  component: ColumnTitle,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ColumnTitle>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ColumnTitle> = (args) => (
  <ColumnTitle {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  value: "column title",
  className: "",
  innerClassName: "",
};
