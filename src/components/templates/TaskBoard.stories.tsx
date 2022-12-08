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
  title: "the project",
  id: "board1",
  data: [
    {
      id: "0",
      title: "todo",
      data: [
        {
          id: "0",
          title: "Fix Bug",
          description: "Fix the bug ASAP",
          types: ["test type"],
        },
        {
          id: "1",
          title: "Watch tutorial on youtube",
          description: "keep growing!",
          types: ["test type"],
        },
        {
          id: "2",
          title: "Continue on the project",
          description: "to work on the editing",
          types: ["test type"],
        },
      ],
    },
    {
      id: "1",
      title: "doing",
      data: [
        {
          id: "10",
          title: "Plan on the structure",
          description: "project structure",
          types: ["test type"],
        },
      ],
    },
    {
      id: "2",
      title: "done",
      data: [
        {
          id: "20",
          title: "Design the page",
          description: "Design the UI",
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
