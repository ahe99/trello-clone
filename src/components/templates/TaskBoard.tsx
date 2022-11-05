import React, { useState, useRef } from 'react'
import type { FC } from 'react'
import { Droppable, DropResult, DragDropContext } from 'react-beautiful-dnd'

import { moveInSameColumn, moveBetweenColumns } from '@helpers/cards'
import { moveInSameBoard } from '@helpers/column'
import { isSameDraggable, inSameDroppable, getDroppableBoardId } from '@helpers/position'
import { BoardData, ColumnData } from '@utils/Data'
import { DROP_TYPE } from '@helpers/constants'

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
    const { source, destination, type } = result
    let newData = [...data]

    const hasDestination = !!destination
    if (!hasDestination || isSameDraggable(source, destination)) {
      return
    }

    if (type === DROP_TYPE.CARD) {
      if (inSameDroppable(source, destination)) {
        const targetColumn = data.find(
          (item) => source.droppableId === item.id
        )!

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
        newData = moveBetweenColumns(data, source, destination)
      }
    } else if (type === DROP_TYPE.COLUMN) {
      if (inSameDroppable(source, destination)) {
        newData = moveInSameBoard(data, source, destination)
      }
    }

    if (onDragEnd) {
      onDragEnd(newData)
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={`grow-0 border-solid border-2 rounded-md ${className}`}>
        <Droppable
          droppableId={getDroppableBoardId(id)}
          type={DROP_TYPE.COLUMN}
          direction="horizontal"
        >
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-row"
            >
              {data.map((item, index) => (
                <TaskColumn
                  key={item.id}
                  index={index}
                  className="m-2"
                  title={item.title}
                  id={item.id}
                  data={item.data}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  )
}
