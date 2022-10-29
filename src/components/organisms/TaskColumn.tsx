import React from 'react'
import type { FC, DragEvent } from 'react'

import type { CardData } from '@utils/CardData'
import type { Position } from '@utils/Position'

import { TaskCard } from '@components/molecules'

type ColumnType = {
  id: number
  title: string
}

export interface TaskColumnProps extends ColumnType {
  data: CardData[]
  onDragStart?: (columnId: number, position: Position) => void
  onDragEnter?: (columnId: number, position: Position) => void
  onDragEnd?: (columnId: number, position: Position) => void
  onDrop?: (columnId: number, position: Position) => void
}

export const TaskColumn: FC<TaskColumnProps> = ({
  title,
  id,
  data,
  onDragStart,
  onDragEnter,
  onDragEnd,
  onDrop,
}) => {
  const handleDragStart = (
    e: DragEvent<HTMLDivElement>,
    position: Position
  ) => {
    if (onDragStart) {
      onDragStart(id, position)
    }
    //...
  }

  const handleDragEnter = (
    e: DragEvent<HTMLDivElement>,
    position: Position
  ) => {
    if (onDragEnter) {
      onDragEnter(id, position)
    }
  }

  const handleDragEnd = (e: DragEvent<HTMLDivElement>, position: Position) => {
    if (onDragEnd) {
      onDragEnd(id, position)
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>, position: Position) => {
    if (onDrop) {
      onDrop(id, position)
    }
  }

  return (
    <div className="flex flex-col">
      <div>{title}</div>
      <hr />
      <br />
      {data.map((item) => (
        <TaskCard
          key={item.position.y}
          data={item}
          onDragStart={handleDragStart}
          onDragEnter={handleDragEnter}
          onDragEnd={handleDragEnd}
          onDrop={handleDrop}
        />
      ))}
    </div>
  )
}
