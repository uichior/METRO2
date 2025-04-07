"use client"

import { CalendarClock, Clock } from "lucide-react"
import { ManagementListItem, SelectionProps } from "../templates/management-list-item"

export interface Schedule {
  id: string
  title: string
  date: string
  time?: string
  location?: string
  status: "pending" | "completed" | "cancelled"
}

interface ScheduleListItemProps {
  item: Schedule
  isSelected: boolean
  onSelect: (item: Schedule) => void
  selectionProps?: SelectionProps
}

export function ScheduleListItem({ item, isSelected, onSelect, selectionProps }: ScheduleListItemProps) {
  // ステータスに応じたバリアント
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "pending": return "warning"
      case "completed": return "success"
      case "cancelled": return "destructive"
      default: return "default"
    }
  }

  // ステータスラベルの取得
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return "予定"
      case "completed": return "完了"
      case "cancelled": return "中止"
      default: return status
    }
  }

  return (
    <div className="p-2">
      <div className="font-medium">{item.title}</div>
      {item.location && <div className="text-sm text-muted-foreground">{item.location}</div>}
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <CalendarClock className="h-3 w-3 mr-1 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{item.date}</span>
          </div>
          {item.time && (
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </div>
          )}
        </div>
        <div>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${getStatusColor(item.status)}`}>
            {getStatusLabel(item.status)}
          </span>
        </div>
      </div>
    </div>
  )
}

// ステータスに応じた色を返す
 function getStatusColor(status: string) {
  switch (status) {
    case "pending": return "bg-yellow-100 text-yellow-800"
    case "completed": return "bg-green-100 text-green-800"
    case "cancelled": return "bg-red-100 text-red-800"
    default: return "bg-gray-100 text-gray-800"
  }
}
