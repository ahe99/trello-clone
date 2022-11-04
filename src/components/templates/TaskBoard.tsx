import React, { useState, useRef } from 'react'
import type { FC } from 'react'
import { DropResult, DragDropContext } from 'react-beautiful-dnd'

import {
  isSamePosition,
  isSameColumn,
  moveInSameColumn,
  moveBetweenColumns,
} from '@helpers/cards'
import { BoardData, ColumnData } from '@utils/Data'

import { TaskColumn } from '@components/organisms'

export interface TaskBoardProps extends BoardData {
  className?: string
  onDragEnd?: (newData: ColumnData[]) => void
}

export const TaskBoard: FC<TaskBoardProps> = ({
  className,
  id,
  title,
  data,
  onDragEnd,
}) => {
  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result
    console.log(destination)
    const hasDestination = !!destination
    if (!hasDestination || isSamePosition(source, destination)) {
      return
    }

    let newData = [...data]
    //always true since we have only one column here
    if (isSameColumn(source, destination)) {
      const targetColumn = data.find((item) => source.droppableId === item.id)!

      const newColumn = {
        id: targetColumn.id,
        title: targetColumn.title,
        data: moveInSameColumn(targetColumn.data, source, destination),
      }

      newData = newData.map((column) => {
        if (column.id === newColumn.id) {
          return newColumn
        } else {
          return column
        }
      })
    } else {
      newData = moveBetweenColumns(newData, source, destination)
    }
    if (onDragEnd) {
      onDragEnd(newData)
    }
  }

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
      onDragStart={(inital) => console.log(inital)}
    >
      <div className={`flex flex-row ${className}`}>
        {data.map((item) => (
          <TaskColumn
            key={item.id}
            className="m-2"
            title={item.title}
            id={item.id}
            data={item.data}
          />
        ))}
      </div>
    </DragDropContext>
  )
}
