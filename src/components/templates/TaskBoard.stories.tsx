import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import type { BoardData, ColumnData } from "@utils/Data";

import { TaskBoard } from "./TaskBoard";

export default {
  title: "templates/TaskBoard",
  component: TaskBoard,
  argTypes: {},
} as ComponentMeta<typeof TaskBoard>;

const mockData = {
  id: "0",
  title: "test board 1",
  data: [
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
  ],
};

const Template: ComponentStory<typeof TaskBoard> = (args) => {
  const [tasks, setTasks] = useState<BoardData>(mockData);

  const handleDragEnd = (newBoard: BoardData) => {
    setTasks(newBoard);
  };
  const handleCreateColumn = (newBoard: BoardData) => {
    setTasks(newBoard);
  };
  const handleEditColumn = (newBoard: BoardData) => {
    setTasks(newBoard);
  };
  const handleDeleteColumn = (newBoard: BoardData) => {
    setTasks(newBoard);
  };
  const handleCreateCard = (newBoard: BoardData) => {
    setTasks(newBoard);
  };
  const handleEditCard = (newBoard: BoardData) => {
    setTasks(newBoard);
  };
  const handleDeleteCard = (newBoard: BoardData) => {
    setTasks(newBoard);
  };

  return (
    <TaskBoard
      id={tasks.id}
      title={tasks.title}
      data={tasks.data}
      onDragEnd={handleDragEnd}
      onCreateColumn={handleCreateColumn}
      onEditColumn={handleEditColumn}
      onDeleteColumn={handleDeleteColumn}
      onCreateCard={handleCreateCard}
      onEditCard={handleEditCard}
      onDeleteCard={handleDeleteCard}
    />
  );
};
export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
