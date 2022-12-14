import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Droppable, DropResult, DragDropContext } from "react-beautiful-dnd";

import { DROP_TYPE } from "@helpers/constants";
import { createCard, moveInSameColumn } from "@helpers/cards";
import type { CardData, ColumnData } from "@utils/Data";

import { TaskColumn } from "./TaskColumn";
import { inSameDroppable, isSameDraggable } from "@helpers/position";

export default {
  title: "organisms/TaskColumn",
  component: TaskColumn,
  argTypes: {},
} as ComponentMeta<typeof TaskColumn>;

const mockData = [
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
];

const Template: ComponentStory<typeof TaskColumn> = (args) => {
  const [title, setTitle] = useState("test column 1");
  const [column, setColumn] = useState<CardData[]>(mockData);

  const handleCreateCard = () => {
    const newCard = createCard();
    setColumn((prev) => [...prev, newCard]);
  };

  const handleEditCard = (_: string, card: CardData) => {
    setColumn((prev) =>
      prev.map((item) => (item.id === card.id ? card : item))
    );
  };

  const handleEditColumn = (column: ColumnData) => {
    setTitle(column.title);
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    const hasDestination = !!destination;
    if (!hasDestination || isSameDraggable(source, destination)) {
      return;
    }

    //always true since we have only one column here
    if (inSameDroppable(source, destination)) {
      const newColumn = moveInSameColumn(column, source, destination);
      setColumn(newColumn);
    } else {
      //...
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable
        droppableId={"0"}
        type={DROP_TYPE.COLUMN}
        direction="horizontal"
        isDropDisabled={true}
      >
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-row"
          >
            <TaskColumn
              {...args}
              title={title}
              data={column}
              index={0}
              onEdit={handleEditColumn}
              onCreateCard={handleCreateCard}
              onEditCard={handleEditCard}
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  id: "0",
};
