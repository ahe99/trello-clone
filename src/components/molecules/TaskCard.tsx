import React from 'react'
import type { FC, DragEvent } from 'react'
import { Draggable } from 'react-beautiful-dnd'

import type { CardData } from '@utils/Data'

export interface TaskCardProps {
  className?: string
  data: CardData
  index: number
}

const DraggableTaskCard: FC<TaskCardProps> = ({
  className,
  index,
  data: { id, title, description, types },
}) => {
  return (
    <div className="m-2">
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`w-56 h-48 p-2 border-solid border-2 rounded-md flex flex-col cursor-pointer  hover:bg-primary-400 ${
              snapshot.isDragging ? 'bg-primary-400' : 'bg-primary-500'
            } ${className}`}
          >
            <div className=" self-stretch flex justify-start">
              <div className="font-bold">{title}</div>
            </div>
            <span className="m-1 border-b-2" />
            <div className="flex-1">
              <div>{description}</div>
            </div>
          </div>
        )}
      </Draggable>
    </div>
  )
}

const StaticTaskCard: FC<TaskCardProps> = ({
  className,
  data: { id, title, description, types },
}) => {
  return (
    <div
      className={`w-56 h-48 p-2 m-2 border-solid border-2 rounded-md flex flex-col cursor-pointer bg-primary-500 hover:bg-primary-400  ${className}`}
    >
      <div className="border-b-2 self-stretch flex justify-start">
        <div className="font-bold">{title}</div>
      </div>
      <div className="flex-1">
        <div>{description}</div>
      </div>
    </div>
  )
}

export const TaskCard = {
  Static: StaticTaskCard,
  Draggble: DraggableTaskCard,
}
