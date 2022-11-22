import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "./Button";
import { Icon } from "./Icon";
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
    "mb-2 mr-2 flex w-56 h-6 items-center justify-center rounded-md bg-primary-500 text-primary-900 opacity-40 hover:border-2 hover:border-solid hover:opacity-100",
  children: <Icon type="Plus" />,
  onClick: () => {
    console.log("create card");
  },
};
