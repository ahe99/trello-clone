import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DropResult, DragDropContext } from 'react-beautiful-dnd'

import { isSamePosition, isSameColumn, moveInSameColumn } from '@helpers/cards'
import type { CardData } from '@utils/Data'

import { TaskColumn } from './TaskColumn'

export default {
  title: 'organisms/TaskColumn',
  component: TaskColumn,
  argTypes: {},
} as ComponentMeta<typeof TaskColumn>

const mockData = [
  {
    id: '0',
    title: 'test card 1',
    description: 'test card 1',
    types: ['test type'],
  },
  {
    id: '1',
    title: 'test card 2',
    description: 'test card 2',
    types: ['test type'],
  },
  {
    id: '2',
    title: 'test card 3',
    description: 'test card 3',
    types: ['test type'],
  },
]

const Template: ComponentStory<typeof TaskColumn> = (args) => {
  const [column, setColumn] = useState<CardData[]>(mockData)

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result

    const hasDestination = !!destination
    if (!hasDestination || isSamePosition(source, destination)) {
      return
    }

    //always true since we have only one column here
    if (isSameColumn(source, destination)) {
      const newColumn = moveInSameColumn(column, source, destination)
      setColumn(newColumn)
    } else {
      //...
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <TaskColumn {...args} data={column} />
    </DragDropContext>
  )
}
export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  id: '0',
  title: 'test column 1',
}
