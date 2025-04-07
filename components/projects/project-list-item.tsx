"use client"

import { CalendarDays, Users } from "lucide-react"
import { ManagementListItem, SelectionProps } from "../templates/management-list-item"
import { Project } from "./types"

interface ProjectListItemProps {
  project: Project
  isSelected: boolean
  onSelect: (project: Project) => void
  selectionProps?: SelectionProps
}

export function ProjectListItem({ project, isSelected, onSelect, selectionProps }: ProjectListItemProps) {
  // ステータスに応じたバリアント
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "計画中": return "secondary"
      case "進行中": return "warning"
      case "完了": return "success"
      case "中断": return "destructive"
      default: return "default"
    }
  }

  // 金額の計算と表示用フォーマット
  const amount = project.amount || (project.unitPrice && project.quantity ? project.unitPrice * project.quantity : 0)
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(value)
  }

  return (
    <ManagementListItem
      id={project.id}
      title={project.name}
      subtitle={`${project.code} - ${project.client}`}
      status={{
        label: project.status,
        variant: getStatusVariant(project.status)
      }}
      isSelected={isSelected}
      onSelect={() => onSelect(project)}
      selectionProps={selectionProps}
      metadata={[
        {
          label: "期間",
          value: `${new Date(project.startDate).toLocaleDateString("ja-JP")} - ${new Date(project.endDate).toLocaleDateString("ja-JP")}`,
          icon: <CalendarDays className="h-3 w-3 text-muted-foreground" />
        },
        {
          label: "担当者",
          value: project.manager,
          icon: <Users className="h-3 w-3 text-muted-foreground" />
        }
      ]}
      rightContent={
        <div className="flex items-center gap-4 text-xs">
          {project.unitPrice !== undefined && (
            <div className="flex items-center gap-1 whitespace-nowrap">
              <span className="text-muted-foreground">単価:</span>
              <span className="font-medium">{formatCurrency(project.unitPrice)}</span>
            </div>
          )}
          {project.quantity !== undefined && (
            <div className="flex items-center gap-1 whitespace-nowrap">
              <span className="text-muted-foreground">数量:</span>
              <span className="font-medium">{project.quantity}</span>
            </div>
          )}
          <div className="flex items-center gap-1 whitespace-nowrap">
            <span className="text-muted-foreground">金額:</span>
            <span className="font-medium">{formatCurrency(amount)}</span>
          </div>
        </div>
      }
    />
  )
}
