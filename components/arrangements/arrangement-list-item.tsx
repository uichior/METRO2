"use client"

import { Arrangement } from "./types"
import { Checkbox } from "@/components/ui/checkbox"
import { Star, AlertTriangle, PackageCheck, Trash } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// 手配リストアイテムのプロパティ
interface ArrangementListItemProps {
  arrangement: Arrangement
  isSelected: boolean
  onSelect: (arrangement: Arrangement) => void
  isChecked?: boolean
  onCheckChange?: (checked: boolean) => void
  onToggleImportant: (arrangement: Arrangement) => void
  onToggleUrgent: (arrangement: Arrangement) => void
  onToggleCompleted: (arrangement: Arrangement) => void
  onDelete: (arrangement: Arrangement) => void
}

// 手配ステータスに応じた色を返す関数
function getStatusColor(status: string): string {
  switch (status) {
    case '未手配':
      return 'bg-gray-100 text-gray-800'
    case '手配中':
      return 'bg-blue-100 text-blue-800'
    case '手配完了':
      return 'bg-green-100 text-green-800'
    case 'キャンセル':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export function ArrangementListItem({
  arrangement,
  isSelected,
  onSelect,
  isChecked,
  onCheckChange,
  onToggleImportant,
  onToggleUrgent,
  onToggleCompleted,
  onDelete
}: ArrangementListItemProps) {
  return (
    <Card
      className={cn(
        "transition-all hover:bg-accent/50 cursor-pointer relative",
        isSelected && "ring-2 ring-primary"
      )}
      onClick={() => onSelect(arrangement)}
    >
      <CardContent className="p-4">
        <div className="grid grid-cols-[auto_1fr] gap-3">
          {/* チェックボックス */}
          <div className="flex items-start pt-1">
            <Checkbox 
              checked={isChecked} 
              onCheckedChange={onCheckChange}
              onClick={(e) => e.stopPropagation()}
              aria-label="手配を選択"
            />
          </div>
          
          {/* 手配情報 */}
          <div className="space-y-2">
            {/* 上段: 製品名とステータス */}
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                {/* 1行目: 製品名 */}
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{arrangement.name}</h3>
                </div>
                
                {/* 2行目: 手配コードと取引先 */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{arrangement.code}</span>
                  <span className="text-xs text-muted-foreground">|</span>
                  <span className="text-xs text-muted-foreground">{arrangement.client}</span>
                  <span className="text-xs text-muted-foreground">|</span>
                  <span className="text-xs text-muted-foreground">仕入先: {arrangement.supplierCount}社</span>
                </div>
              </div>
              <Badge className={cn(getStatusColor(arrangement.status))}>
                {arrangement.status}
              </Badge>
            </div>
            
            {/* 中段: 納期と担当者 */}
            <div className="grid grid-cols-2 text-sm">
              <div>
                <span className="text-muted-foreground">納期: </span>
                <span>{arrangement.requiredDate}</span>
              </div>
              <div>
                <span className="text-muted-foreground">進捗: </span>
                <span>{arrangement.progress}%</span>
              </div>
            </div>
            
            {/* 進捗バー */}
            <Progress value={arrangement.progress} className="h-1.5" />
            
            {/* 下段: 金額 */}
            <div className="flex justify-end items-center">
              <span className="font-medium">{formatCurrency(arrangement.totalAmount)}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      {/* アクションボタン */}
      <div className="absolute top-2 right-2 flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-5 w-5 p-0",
            arrangement.isImportant ? "text-amber-500" : "text-muted-foreground hover:text-amber-500"
          )}
          onClick={(e) => {
            e.stopPropagation()
            onToggleImportant(arrangement)
          }}
        >
          <Star className="h-4 w-4" fill={arrangement.isImportant ? "currentColor" : "none"} />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-5 w-5 p-0",
            arrangement.isUrgent ? "text-red-500" : "text-muted-foreground hover:text-red-500"
          )}
          onClick={(e) => {
            e.stopPropagation()
            onToggleUrgent(arrangement)
          }}
        >
          <AlertTriangle className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-5 w-5 p-0",
            arrangement.isCompleted ? "text-green-500" : "text-muted-foreground hover:text-green-500"
          )}
          onClick={(e) => {
            e.stopPropagation()
            onToggleCompleted(arrangement)
          }}
        >
          <PackageCheck className="h-4 w-4" fill={arrangement.isCompleted ? "currentColor" : "none"} />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5 p-0 text-muted-foreground hover:text-destructive"
          onClick={(e) => {
            e.stopPropagation()
            onDelete(arrangement)
          }}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}
