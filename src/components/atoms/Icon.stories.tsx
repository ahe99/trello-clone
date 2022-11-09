import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Icon } from "./Icon";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: "atoms/Icon",
  component: Icon,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    className: { table: { category: "Styling" } },
  },
} as ComponentMeta<typeof Icon>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Icon> = (args) => (
  <Icon {...args} size="3rem" />
);

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const More = Template.bind({});
More.args = {
  type: "More",
};

export const Add = Template.bind({});
Add.args = {
  type: "Add",
};

export const ListAdd = Template.bind({});
ListAdd.args = {
  type: "ListAdd",
};

export const FileAdditionOne = Template.bind({});
FileAdditionOne.args = {
  type: "FileAdditionOne",
};

export const Edit = Template.bind({});
Edit.args = {
  type: "Edit",
};

export const Delete = Template.bind({});
Delete.args = {
  type: "Delete",
};

export const Bookmark = Template.bind({});
Bookmark.args = {
  type: "Bookmark",
};

export const BookmarkOne = Template.bind({});
BookmarkOne.args = {
  type: "BookmarkOne",
};

export const BookmarkOneFilled = Template.bind({});
BookmarkOneFilled.args = {
  type: "BookmarkOne",
  theme: "filled",
};
