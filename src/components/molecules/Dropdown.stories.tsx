import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Icon } from "@components/atoms";
import { Dropdown } from "./Dropdown";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: "atoms/Dropdown",
  component: Dropdown,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Dropdown>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Dropdown> = (args) => (
  <div className="flex h-40 w-40 justify-end">
    <Dropdown {...args} />
  </div>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  options: [
    {
      icon: "Edit",
      label: "Edit",
      key: "Edit",
    },
    {
      icon: "Delete",
      label: "Delete",
      key: "Delete",
    },
  ],
  children: <Icon type="More" size="1.2rem" />,
  onSelectItem: (key) => {
    console.log(key);
  },
};
