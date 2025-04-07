"use client"

import { CalendarDays, Users } from "lucide-react"
import { Project } from "./types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

interface ProjectListItemProps {
  project: Project
  isSelected: boolean
  onSelect: (project: Project) => void
  isChecked?: boolean
  onCheckChange?: (checked: boolean) => void
}

export function ProjectListItem({ project, isSelected, onSelect, isChecked, onCheckChange }: ProjectListItemProps) {
  // 金額の計算と表示用フォーマット
  const amount = project.amount || (project.unitPrice && project.quantity ? project.unitPrice * project.quantity : 0)
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(value)
  }

  // ステータスに応じたスタイルを返す
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "計画中": return "bg-secondary text-secondary-foreground"
      case "進行中": return "bg-amber-500 text-white"
      case "完了": return "bg-green-500 text-white"
      case "中断": return "bg-destructive text-destructive-foreground"
      default: return "bg-primary text-primary-foreground"
    }
  }

  return (
    <Card
      className={`mb-2 cursor-pointer border-l-4 relative ${
        isSelected
          ? "border-l-primary bg-muted"
          : "border-l-transparent hover:border-l-primary/50 hover:bg-muted/50"
      }`}
      onClick={() => onSelect(project)}
    >
      <div className="absolute top-3 left-3" onClick={(e) => e.stopPropagation()}>
        <Checkbox
          checked={isChecked}
          onCheckedChange={(checked) => onCheckChange?.(!!checked)}
        />
      </div>
      <CardContent className="p-3 pl-10">
        <div className="flex items-center mb-1">
          <div className="flex-1">
            <div className="font-medium">{project.name}</div>
            <div className="text-sm text-muted-foreground">{project.code} - {project.client}</div>
          </div>
          <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ml-2 ${getStatusStyle(project.status)}`}>
            {project.status}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="flex items-center">
            <CalendarDays className="h-3 w-3 mr-1 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(project.startDate).toLocaleDateString("ja-JP")} - {new Date(project.endDate).toLocaleDateString("ja-JP")}
            </span>
          </div>
          <div className="flex items-center">
            <Users className="h-3 w-3 mr-1 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{project.manager}</span>
          </div>
        </div>

        <div className="flex justify-end mt-2">
          <div className="flex items-center gap-1 whitespace-nowrap text-xs">
            <span className="font-medium">{formatCurrency(amount)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
