import React from 'react'
import type { FC, DragEvent } from 'react'
import { Draggable } from 'react-beautiful-dnd'

import type { CardData } from '@utils/CardData'

export interface TaskCardProps {
  className?: string
  data: CardData
}

const DraggableTaskCard: FC<TaskCardProps & { index: number }> = ({
  className,
  index,
  data: { id, title, description, types },
}) => {
  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`w-56 h-68 border-solid border-2 rounded-md flex flex-col cursor-pointer hover:bg-slate-200 ${className}`}
        >
          <div className="border-b-2 self-stretch flex justify-start">
            <div className="font-bold">{title}</div>
          </div>
          <div className="flex-1">
            <div>{description}</div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

const StaticTaskCard: FC<TaskCardProps> = ({
  className,
  data: { id, title, description, types },
}) => {
  return (
    <div
      className={`w-56 h-68 border-solid border-2 rounded-md flex flex-col cursor-pointer hover:bg-slate-200 ${className}`}
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
