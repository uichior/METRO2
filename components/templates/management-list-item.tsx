"use client"

import { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

export interface SelectionProps {
  selectedIds: string[]
  onSelectItem: (id: string, checked: boolean) => void
}

export interface ManagementListItemProps {
  id: string
  title: string
  subtitle?: string
  status?: {
    label: string
    variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning"
  }
  isSelected: boolean
  onSelect: () => void
  onCheckChange?: (checked: boolean) => void
  isChecked?: boolean
  metadata?: {
    label: string
    value: string | number
    icon?: ReactNode
  }[]
  rightContent?: ReactNode
  onClick?: () => void
  selectionProps?: SelectionProps
}

export function ManagementListItem({
  id,
  title,
  subtitle,
  status,
  isSelected,
  onSelect,
  onCheckChange,
  isChecked,
  metadata = [],
  rightContent,
  onClick,
  selectionProps,
}: ManagementListItemProps) {
  // ステータスバッジのスタイルを決定
  const getBadgeVariant = () => {
    if (!status) return ""

    switch (status.variant) {
      case "success":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-amber-100 text-amber-800"
      case "destructive":
        return "bg-red-100 text-red-800"
      case "secondary":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const handleClick = () => {
    onSelect()
    onClick?.()
  }

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  // 複数選択機能のサポート
  const isItemSelected = selectionProps ? selectionProps.selectedIds.includes(id) : isChecked
  
  return (
    <Card
      className={`mb-2 cursor-pointer border-l-4 relative ${
        isSelected
          ? "border-l-primary bg-muted"
          : "border-l-transparent hover:border-l-primary/50 hover:bg-muted/50"
      } ${isItemSelected ? "bg-muted/80" : ""}`}
      onClick={handleClick}
    >
      <div className="absolute top-3 left-3" onClick={handleCheckboxClick}>
        <Checkbox
          checked={isItemSelected}
          onCheckedChange={(checked) => {
            if (selectionProps) {
              selectionProps.onSelectItem(id, !!checked)
            } else if (onCheckChange) {
              onCheckChange(!!checked)
            }
          }}
        />
      </div>
      <CardContent className="p-3 pl-10">
        <div className="flex items-center mb-1">
          <div className="font-medium">{title}</div>
          {status && <Badge className={`ml-2 ${getBadgeVariant()}`}>{status.label}</Badge>}
        </div>
        {subtitle && <div className="text-sm text-muted-foreground mb-1">{subtitle}</div>}
        
        {metadata.length > 0 && (
          <div className="flex space-x-4 mb-1 text-xs">
            {metadata.map((item, index) => (
              <div key={index} className="flex items-center whitespace-nowrap">
                <span className="text-muted-foreground">{item.label}:</span>
                <span className="ml-1 font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        )}
        
        {rightContent && (
          <div className="flex justify-between items-center text-sm mt-2">
            {rightContent}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
