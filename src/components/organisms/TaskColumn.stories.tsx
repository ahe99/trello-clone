import React, { useState, useRef } from 'react'
import type { DragEvent } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import type { CardData } from '@utils/CardData'

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

  const handleDragEnd = (newColumn: CardData[]) => {
    setColumn(newColumn)
  }

  return <TaskColumn {...args} data={column} onDragEnd={handleDragEnd} />
}
export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  id: '0',
  title: 'test column 1',
}
