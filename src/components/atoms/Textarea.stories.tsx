import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Textarea } from "./Textarea";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: "atoms/Textarea",
  component: Textarea,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Textarea>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Textarea> = (args) => {
  const [value, setValue] = useState("");
  return <Textarea {...args} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
