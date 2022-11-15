import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Droppable, DropResult, DragDropContext } from "react-beautiful-dnd";

import { TaskCard } from "./TaskCard";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: "molecules/TaskCard",
  component: TaskCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof TaskCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TaskCard> = (args) => (
  <DragDropContext onDragEnd={console.log}>
    <Droppable droppableId="0">
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="flex flex-row"
        >
          <TaskCard {...args} />
        </div>
      )}
    </Droppable>
  </DragDropContext>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  data: {
    id: "0",
    title: "test card 1",
    description: "test card 1",
    types: ["test type"],
  },
};
