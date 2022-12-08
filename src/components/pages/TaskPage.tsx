import React, { useState } from "react";
import type { FC } from "react";

import { BoardData } from "@utils/Data";
import { TaskBoard } from "@components/templates";
import { Button, Icon } from "@components/atoms";
export interface TaskPageProps {
  className?: string;
}

const mockBoard = [
  {
    title: "board1",
    id: "board1",
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
  },
] as BoardData[];

export const TaskPage: FC<TaskPageProps> = ({ className }) => {
  const [tasks, setTasks] = useState(mockBoard);

  /**
   * @description wait for improvement
   */
  const handleCreateBoard = () => {
    setTasks((prev) => {
      const defaultBoard: BoardData = {
        id: String(prev.length),
        title: `example ${prev.length}`,
        data: [],
      };

      return [defaultBoard, ...prev];
    });
  };
  const handleUpdateBoard = (newBoard: BoardData) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === newBoard.id) {
          return newBoard;
        } else {
          return task;
        }
      })
    );
  };
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex justify-start border-b-2 border-dashed border-l-indigo-400 p-2 ">
        <Button
          className="mr-2 flex h-12 w-12 items-center justify-center rounded-md border-2 border-solid bg-primary-500 text-primary-900 "
          onClick={handleCreateBoard}
        >
          <Icon type="Plus" size={"2rem"} />
        </Button>
      </div>
      {tasks.map((task) => (
        <div
          className="border-b-2 border-dashed border-l-indigo-400 p-2 last:border-b-0"
          key={task.id}
        >
          <TaskBoard
            id={task.id}
            title={task.title}
            data={task.data}
            onDragEnd={handleUpdateBoard}
            onCreateColumn={handleUpdateBoard}
            onEditColumn={handleUpdateBoard}
            onDeleteColumn={handleUpdateBoard}
            onCreateCard={handleUpdateBoard}
            onEditCard={handleUpdateBoard}
            onDeleteCard={handleUpdateBoard}
          />
        </div>
      ))}
    </div>
  );
};
