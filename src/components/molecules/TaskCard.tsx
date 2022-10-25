import React, { forwardRef, Ref } from 'react'
import type { FC, DragEvent } from 'react'

type CardTheme = {}

type CardContent = {
  title: string
  description: string
  types: string[]
}

type Position = {
  row: number
  column: number
}

export interface TaskCardProps {
  className?: string
  position: Position
  data: CardContent
  onDragEnter: (e: DragEvent<HTMLDivElement>, position: Position) => void
  onDragStart: (e: DragEvent<HTMLDivElement>, position: Position) => void
  onDragEnd: () => void
}

export const TaskCard: FC<TaskCardProps> = ({
  className,
  position,
  data: { title, description, types },
  onDragEnter,
  onDragStart,
  onDragEnd,
}) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, position)}
      onDragEnter={(e) => onDragEnter(e, position)}
      onDragEnd={(e) => onDragEnter(e, position)}
      onDragOver={(e) => e.preventDefault()}
      className="w-56 h-68 border-solid border-2 rounded-md flex flex-col cursor-pointer hover:bg-slate-200">
      <div className="border-b-2 self-stretch flex justify-start">
        <div className="font-bold">{title}</div>
      </div>
      <div className="flex-1">
        <div>{description}</div>
      </div>
    </div>
  )
}

TaskCard.displayName = 'TaskCard'
