import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Input } from "./Input";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: "atoms/Input",
  component: Input,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Input>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Input> = (args) => {
  const [value, setValue] = useState("");
  return <Input {...args} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
