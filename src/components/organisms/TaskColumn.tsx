import React from 'react'
import type { FC, DragEvent } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import type { DropResult } from 'react-beautiful-dnd'

import type { ColumnData, CardData } from '@utils/Data'

import { TaskCard } from '@components/molecules'

export interface TaskColumnProps extends ColumnData {
  className?: string
  onDragEnd?: (newColumn: CardData[]) => void
}

export const TaskColumn: FC<TaskColumnProps> = ({
  className,
  title,
  id,
  data,
}) => {
  return (
    <div
      className={`w-60  bg-primary-200 flex flex-col items-center border-solid border-2 rounded-md ${className}`}
    >
      <div className="mx-4 mt-2 self-start">{title}</div>
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
    </div>
  )
}
