import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TaskCard } from '@components/molecules'
import type { CardContent } from '@components/molecules'

import { TaskColumn } from './TaskColumn'
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'organisms/TaskColumn',
  component: TaskColumn,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof TaskColumn>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TaskColumn> = (args) => (
  <TaskColumn {...args} />
)

const mockData = [
  {
    title: 'test card 1',
    description: 'test card 1',
    types: ['test type'],
    position: { row: 0, column: 0 },
  },
  {
    title: 'test card 2',
    description: 'test card 2',
    types: ['test type'],
    position: { row: 1, column: 0 },
  },
  {
    title: 'test card 3',
    description: 'test card 3',
    types: ['test type'],
    position: { row: 2, column: 0 },
  },
]

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  id: 0,
  title: 'test column 1',
  data: mockData,
}
