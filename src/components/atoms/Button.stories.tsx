import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "./Button";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: "atoms/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const CreateCard = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
CreateCard.args = {
  className:
    "mb-2 flex h-6 w-56 items-center justify-center rounded-md border-2 border-solid bg-primary-500 text-center text-xl text-primary-900 hover:bg-primary-400",
  children: "+",
  onClick: () => {
    console.log("create card");
  },
};
