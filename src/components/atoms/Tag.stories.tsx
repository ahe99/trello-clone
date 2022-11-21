import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Tag } from "./Tag";
import { Icon } from "./Icon";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: "atoms/Tag",
  component: Tag,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Tag>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Tag> = (args) => {
  return <Tag {...args} />;
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  label: "tag 1",
};

export const Clickable = Template.bind({});
Clickable.args = {
  label: "tag 2",
  className: "cursor-pointer",
};

export const Deletable = Template.bind({});
Deletable.args = {
  label: "tag 3",
  children: (
    <div
      className="cursor-pointer"
      onClick={() => {
        console.log("delete");
      }}
    >
      <Icon type="Close" size="0.8rem" />
    </div>
  ),
};
