import React from 'react'
import type { FC, DragEvent } from 'react'

type CardTheme = {}

export type Position = {
  row: number
  column: number
}

export type CardContent = {
  title: string
  description: string
  types?: string[]
  position: Position
}

export interface TaskCardProps {
  className?: string
  data: CardContent
  onDragEnter: (e: DragEvent<HTMLDivElement>, position: Position) => void
  onDragStart: (e: DragEvent<HTMLDivElement>, position: Position) => void
  onDragEnd: (e: DragEvent<HTMLDivElement>, position: Position) => void
}

export const TaskCard: FC<TaskCardProps> = ({
  className,
  data: { title, description, types, position },
  onDragEnter = () => {},
  onDragStart = () => {},
  onDragEnd = () => {},
}) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, position)}
      onDragEnter={(e) => onDragEnter(e, position)}
      onDragEnd={(e) => onDragEnd(e, position)}
      onDragOver={(e) => e.preventDefault()}
      className="w-56 h-68 border-solid border-2 rounded-md flex flex-col cursor-pointer hover:bg-slate-200"
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

TaskCard.displayName = 'TaskCard'
