import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TaskCard } from './TaskCard'
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const TaskCardBase = TaskCard.Static
export default {
  title: 'molecules/TaskCard',
  component: TaskCardBase,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof TaskCardBase>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TaskCardBase> = (args) => (
  <TaskCardBase {...args} />
)

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  data: {
    id: '0',
    title: 'test card 1',
    description: 'test card 1',
    types: ['test type'],
  },
}
