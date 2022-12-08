import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import type { ColumnData } from "@utils/Data";

import { TaskPage } from "./TaskPage";

export default {
  title: "pages/TaskPage",
  component: TaskPage,
  argTypes: {},
} as ComponentMeta<typeof TaskPage>;

const Template: ComponentStory<typeof TaskPage> = (args) => {
  return <TaskPage />;
};
export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
