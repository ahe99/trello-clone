import React from 'react'
import type { FC, DragEvent } from 'react'
import { Droppable, DragDropContext } from 'react-beautiful-dnd'
import type { DropResult } from 'react-beautiful-dnd'

import type { CardData } from '@utils/CardData'
import type { Position } from '@utils/Position'

import { TaskCard } from '@components/molecules'

type ColumnType = {
  id: string
  title: string
}

export interface TaskColumnProps extends ColumnType {
  data: CardData[]
  onDragEnd?: (newColumn: CardData[]) => void
}

export const TaskColumn: FC<TaskColumnProps> = ({
  title,
  id,
  data,
  // onDragEnd,
  // onDragStart,
  // onDragEnter,
  onDragEnd,
  // onDrop,
}) => {
  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result

    const hasDestination = !!destination
    const isSamePosition =
      source.droppableId === destination?.droppableId &&
      source.index === destination?.index
    if (isSamePosition || !hasDestination) {
      return
    }

    const newData: CardData[] = [...data]
    const [draggedItem] = newData.splice(source.index, 1)
    newData.splice(destination.index, 0, draggedItem)

    if (onDragEnd) {
      onDragEnd(newData)
    }
  }

  return (
    <div className="flex flex-col">
      <div>{title}</div>
      <hr />
      <br />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={id}>
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {data.map((item, i) => (
                <TaskCard.Draggble
                  key={i}
                  index={i}
                  data={item}
                />
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
