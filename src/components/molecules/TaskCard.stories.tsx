import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TaskCard } from './TaskCard'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'molecules/TaskCard',
  component: TaskCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof TaskCard>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TaskCard> = (args) => (
  <TaskCard {...args} />
)

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  data: {
    title: 'test card 1',
    description: 'test card 1',
    types: ['test type'],
    position: { x: 0, y: 0 },
  },
  onDragEnter: (e, position) => {
    console.log('onDragEnter', position)
  },
  onDragStart: (e, position) => {
    console.log('onDragStart', position)
  },
  onDrop: (e, position) => {
    console.log('onDrop', position)
  },
  onDragEnd: () => {},
}
