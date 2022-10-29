import React, { useState, useRef } from 'react'
import type { DragEvent } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import type { CardData } from '@utils/CardData'
import type { Position } from '@utils/Position'
import { sortAscendingColumn } from '@helpers/card'

import { TaskColumn } from './TaskColumn'

export default {
  title: 'organisms/TaskColumn',
  component: TaskColumn,
  argTypes: {},
} as ComponentMeta<typeof TaskColumn>

const mockData = [
  {
    title: 'test card 1',
    description: 'test card 1',
    types: ['test type'],
    position: { x: 0, y: 0 },
  },
  {
    title: 'test card 2',
    description: 'test card 2',
    types: ['test type'],
    position: { x: 0, y: 1 },
  },
  {
    title: 'test card 3',
    description: 'test card 3',
    types: ['test type'],
    position: { x: 0, y: 2 },
  },
]

const Template: ComponentStory<typeof TaskColumn> = (args) => {
  const [column, setColumn] = useState<CardData[]>(mockData)
  const from = useRef<Position | null>(null)
  const to = useRef<Position | null>(null)

  const handleDragStart = (id: number, position: Position) => {
    from.current = position
    // console.log('from', from.current)
  }

  const handleDrop = (id: number, position: Position) => {
    to.current = position
    // console.log('from', from.current)
    // console.log('to', to.current)

    if (from.current && to.current) {
      const fromIndex = from.current.y
      const toIndex = to.current.y

      if (fromIndex < toIndex) {
        const computedColumn = column.map((item, index) => {
          if (index === fromIndex) {
            // console.log('index === fromIndex', item.title)
            const newItem = { ...item }
            newItem.position.y = toIndex
            return newItem
          } else if (index > fromIndex && index <= toIndex) {
            // console.log('index > fromIndex && index < toIndex', item.title)
            const newItem = { ...item }
            newItem.position.y = newItem.position.y - 1
            return newItem
          } else {
            return item
          }
        })
        // console.log('computedColumn', computedColumn)
        const sorttedColumn = sortAscendingColumn(computedColumn)
        setColumn(sorttedColumn)
      } else if (fromIndex > toIndex) {
        const computedColumn = column.map((item, index) => {
          if (index === fromIndex) {
            // console.log('index === fromIndex', item.title)
            const newItem = { ...item }
            newItem.position.y = toIndex
            return newItem
          } else if (index >= toIndex && index < fromIndex) {
            // console.log('index >= toIndex && index < fromIndex', item.title)
            const newItem = { ...item }
            newItem.position.y = newItem.position.y + 1
            return newItem
          } else {
            return item
          }
        })
        // console.log('computedColumn', computedColumn)
        const sorttedColumn = sortAscendingColumn(computedColumn)
        setColumn(sorttedColumn)
      }
      from.current = null
      to.current = null
    }
  }

  return (
    <TaskColumn
      {...args}
      data={column}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
    />
  )
}
export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  id: 0,
  title: 'test column 1',
}
