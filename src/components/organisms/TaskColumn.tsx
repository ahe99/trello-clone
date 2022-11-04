import React from 'react'
import type { FC, DragEvent } from 'react'
import { Droppable, DragDropContext } from 'react-beautiful-dnd'
import type { DropResult } from 'react-beautiful-dnd'

import type { CardData } from '@utils/CardData'

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
    <div className="w-60 bg-primary-200 flex flex-col items-center border-solid border-2 rounded-md">
      <div>{title}</div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={id}>
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {data.map((item, i) => (
                <TaskCard.Draggble
                  key={item.id}
                  index={i}
                  data={item}
                  className="mb-2"
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
