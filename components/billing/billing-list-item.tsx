"use client"

import { Billing } from "./types"
import { Checkbox } from "@/components/ui/checkbox"
import { Star, AlertTriangle, CreditCard, Trash } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// 請求書リストアイテムのプロパティ
interface BillingListItemProps {
  billing: Billing
  isSelected: boolean
  onSelect: (billing: Billing) => void
  isChecked?: boolean
  onCheckChange?: (checked: boolean) => void
  onToggleImportant: (billing: Billing) => void
  onToggleUrgent: (billing: Billing) => void
  onTogglePaid: (billing: Billing) => void
  onDelete: (billing: Billing) => void
}

// 請求書ステータスに応じた色を返す関数
function getStatusColor(status: string): string {
  switch (status) {
    case '下書き':
      return 'bg-gray-100 text-gray-800'
    case '発行済':
      return 'bg-blue-100 text-blue-800'
    case '支払済':
      return 'bg-green-100 text-green-800'
    case '期限超過':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export function BillingListItem({
  billing,
  isSelected,
  onSelect,
  isChecked,
  onCheckChange,
  onToggleImportant,
  onToggleUrgent,
  onTogglePaid,
  onDelete
}: BillingListItemProps) {
  return (
    <Card
      className={cn(
        "transition-all hover:bg-accent/50 cursor-pointer relative",
        isSelected && "ring-2 ring-primary"
      )}
      onClick={() => onSelect(billing)}
    >
      <CardContent className="p-4">
        <div className="grid grid-cols-[auto_1fr] gap-3">
          {/* チェックボックス */}
          <div className="flex items-start pt-1">
            <Checkbox 
              checked={isChecked} 
              onCheckedChange={onCheckChange}
              onClick={(e) => e.stopPropagation()}
              aria-label="請求書を選択"
            />
          </div>
          
          {/* 請求書情報 */}
          <div className="space-y-2">
            {/* 上段: 請求書名とステータス */}
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                {/* 1行目: 請求書名 */}
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{billing.name}</h3>
                </div>
                
                {/* 2行目: 請求書コードと取引先 */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{billing.code}</span>
                  <span className="text-xs text-muted-foreground">|</span>
                  <span className="text-xs text-muted-foreground">{billing.client}</span>
                </div>
              </div>
              <Badge className={cn(getStatusColor(billing.status))}>
                {billing.status}
              </Badge>
            </div>
            
            {/* 中段: 期限と担当者 */}
            <div className="grid grid-cols-2 text-sm">
              <div>
                <span className="text-muted-foreground">期限: </span>
                <span>{billing.dueDate}</span>
              </div>
              <div>
                <span className="text-muted-foreground">担当: </span>
                <span>{billing.manager}</span>
              </div>
            </div>
            
            {/* 下段: 金額 */}
            <div className="flex justify-end items-center">
              <span className="font-medium">{formatCurrency(billing.totalAmount)}</span>
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
            billing.isImportant ? "text-amber-500" : "text-muted-foreground hover:text-amber-500"
          )}
          onClick={(e) => {
            e.stopPropagation()
            onToggleImportant(billing)
          }}
        >
          <Star className="h-4 w-4" fill={billing.isImportant ? "currentColor" : "none"} />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-5 w-5 p-0",
            billing.isUrgent ? "text-red-500" : "text-muted-foreground hover:text-red-500"
          )}
          onClick={(e) => {
            e.stopPropagation()
            onToggleUrgent(billing)
          }}
        >
          <AlertTriangle className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-5 w-5 p-0",
            billing.isPaid ? "text-green-500" : "text-muted-foreground hover:text-green-500"
          )}
          onClick={(e) => {
            e.stopPropagation()
            onTogglePaid(billing)
          }}
        >
          <CreditCard className="h-4 w-4" fill={billing.isPaid ? "currentColor" : "none"} />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5 p-0 text-muted-foreground hover:text-destructive"
          onClick={(e) => {
            e.stopPropagation()
            onDelete(billing)
          }}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}
