import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import type { ColumnData } from "@utils/Data";

import { TaskBoard } from "./TaskBoard";

export default {
  title: "templates/TaskBoard",
  component: TaskBoard,
  argTypes: {},
} as ComponentMeta<typeof TaskBoard>;

const mockData = [
  {
    id: "0",
    title: "test column 1",
    data: [
      {
        id: "0",
        title: "test card 1",
        description: "test card 1",
        types: ["test type"],
      },
      {
        id: "1",
        title: "test card 2",
        description: "test card 2",
        types: ["test type"],
      },
      {
        id: "2",
        title: "test card 3",
        description: "test card 3",
        types: ["test type"],
      },
    ],
  },
  {
    id: "1",
    title: "test column 2",
    data: [
      {
        id: "3",
        title: "test card 4",
        description: "test card 4",
        types: ["test type"],
      },
    ],
  },
];

const Template: ComponentStory<typeof TaskBoard> = (args) => {
  const [data, setData] = useState<ColumnData[]>(mockData);

  const handleDragEnd = (newBoard: ColumnData[]) => {
    setData(newBoard);
  };
  const handleCreateCard = (newBoard: ColumnData[]) => {
    setData(newBoard);
  };
  const handleCreateColumn = (newBoard: ColumnData[]) => {
    setData(newBoard);
  };
  return (
    <TaskBoard
      {...args}
      data={data}
      onDragEnd={handleDragEnd}
      onCreateCard={handleCreateCard}
      onCreateColumn={handleCreateColumn}
    />
  );
};
export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  id: "0",
  title: "test board 1",
};
