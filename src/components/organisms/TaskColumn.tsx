import React, { useState, useRef } from 'react'
import type { FC, DragEvent } from 'react'

import { TaskCard } from '@components/molecules'
import type { CardContent, Position } from '@components/molecules'

type ColumnType = {
  id: number
  title: string
}

export interface TaskColumnProps extends ColumnType {
  data: CardContent[]
  onOrderChange?: (id: number, newColumn: CardContent[]) => void
  onChangeColumn?: (toPosition: Position) => void
}

export const TaskColumn: FC<TaskColumnProps> = ({
  title,
  id,
  data,
  onOrderChange,
  onChangeColumn,
}) => {
  const [column, setColumn] = useState<CardContent[]>(data)
  const from = useRef<Position | null>(null)
  const to = useRef<Position | null>(null)

  const handleDragStart = (
    e: DragEvent<HTMLDivElement>,
    position: Position
  ) => {
    from.current = position
    // console.log('from', from.current)
  }
  const handleDragEnter = (
    e: DragEvent<HTMLDivElement>,
    position: Position
  ) => {
    to.current = position
    // console.log('to', to.current)
  }
  const handleDragEnd = () => {
    // console.log('from', from.current)
    // console.log('to', to.current)
    if (from.current && to.current) {
      const atSameColumn = from.current?.column === to.current?.column

      if (atSameColumn) {
        const fromIndex = from.current.row
        const toIndex = to.current.row

        const computedColumn = column.map((item, index) => {
          if (index === fromIndex) {
            // console.log('index === fromIndex', item.title)
            const newItem = { ...item }
            newItem.position.row = toIndex
            return newItem
          } else if (index > fromIndex && index <= toIndex) {
            // console.log('index > fromIndex && index < toIndex', item.title)
            const newItem = { ...item }
            newItem.position.row = newItem.position.row - 1
            return newItem
          } else {
            return item
          }
        })
        // console.log('computedColumn', computedColumn)
        const sorttedColumn = computedColumn.sort(ascendingSortColumn)
        setColumn(sorttedColumn)

        if (onOrderChange) {
          onOrderChange(id, sorttedColumn)
        }
      } else {
        if (onChangeColumn) {
          onChangeColumn(to.current)
          //add filter the old one
          const computedColumn = column.filter((item, index) => {
            return index === item.position.row
          })
          const reorderedColumn = computedColumn.map((item, index) => {
            const newItem = { ...item }
            newItem.position.row = index
            return newItem
          })
          setColumn(reorderedColumn)
        }
      }
    }

    from.current = null
    to.current = null
  }

  const ascendingSortColumn = (a: CardContent, b: CardContent) => {
    return a.position.row - b.position.row
  }

  return (
    <div className="flex flex-col">
      <div>{title}</div>
      <hr />
      <br />
      {column.map((item) => (
        <TaskCard
          key={item.position.row}
          data={item}
          onDragStart={handleDragStart}
          onDragEnter={handleDragEnter}
          onDragEnd={handleDragEnd}
        />
      ))}
    </div>
  )
}
