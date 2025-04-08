"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Star, AlertTriangle, Package, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Delivery } from "./types"
import { Progress } from "@/components/ui/progress"

// 金額をフォーマットする関数
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('ja-JP', { 
    style: 'currency', 
    currency: 'JPY',
    maximumFractionDigits: 0
  }).format(amount)
}

// ステータスに応じたスタイルを取得する関数
const getStatusStyle = (status: string) => {
  switch (status) {
    case '納品準備中':
      return "bg-blue-100 text-blue-800"
    case '配送中':
      return "bg-amber-100 text-amber-800"
    case '納品済':
      return "bg-green-100 text-green-800"
    case 'キャンセル':
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

// 納品リストアイテムのプロパティ定義
interface DeliveryListItemProps {
  delivery: Delivery
  isSelected: boolean
  onSelect: (delivery: Delivery) => void
  isChecked?: boolean
  onCheckChange?: (checked: boolean) => void
  onToggleImportant?: (delivery: Delivery) => void
  onToggleUrgent?: (delivery: Delivery) => void
  onToggleReceived?: (delivery: Delivery) => void
  onDelete?: (delivery: Delivery) => void
}

export function DeliveryListItem({
  delivery,
  isSelected,
  onSelect,
  isChecked,
  onCheckChange,
  onToggleImportant,
  onToggleUrgent,
  onToggleReceived,
  onDelete
}: DeliveryListItemProps) {
  // 納品日をフォーマットする
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP')
  }
  
  // 進捗率を計算する
  const progressPercentage = Math.round((delivery.receivedItems / delivery.totalItems) * 100)
  
  return (
    <Card 
      className={cn(
        "transition-all hover:bg-accent/50 cursor-pointer relative",
        isSelected && "ring-2 ring-primary"
      )}
      onClick={() => onSelect(delivery)}
    >
      <CardContent className="p-4">
        <div className="grid grid-cols-[auto_1fr] gap-3">
          {/* チェックボックス */}
          <div className="flex items-start pt-1">
            <Checkbox 
              checked={isChecked} 
              onCheckedChange={onCheckChange}
              onClick={(e) => e.stopPropagation()}
              aria-label="納品を選択"
            />
          </div>
          
          {/* 納品情報 */}
          <div className="space-y-2">
            {/* 上段: 製品名とステータス */}
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                {/* 1行目: 製品名 */}
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{delivery.name}</h3>
                </div>
                
                {/* 2行目: 納品コードと取引先 */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{delivery.code}</span>
                  <span className="text-xs text-muted-foreground">|</span>
                  <span className="text-xs text-muted-foreground">{delivery.client}</span>
                </div>
              </div>
              <Badge className={cn(getStatusStyle(delivery.status))}>
                {delivery.status}
              </Badge>
            </div>
            
            {/* 中段: 納品日と受領日 */}
            <div className="grid grid-cols-2 text-sm">
              <div>
                <span className="text-muted-foreground">納品日: </span>
                <span>{formatDate(delivery.deliveryDate)}</span>
              </div>
              {delivery.receiptDate ? (
                <div>
                  <span className="text-muted-foreground">受領日: </span>
                  <span>{formatDate(delivery.receiptDate)}</span>
                </div>
              ) : (
                <div>
                  <span className="text-muted-foreground">担当: </span>
                  <span>{delivery.manager}</span>
                </div>
              )}
            </div>
            
            {/* 進捗バー */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>進捗: {progressPercentage}%</span>
                <span>({delivery.receivedItems}/{delivery.totalItems})</span>
              </div>
              <Progress value={progressPercentage} className="h-1.5" />
            </div>
            
            {/* 下段: 金額 */}
            <div className="flex justify-end items-center">
              <span className="font-medium">{formatCurrency(delivery.amount)}</span>
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
            delivery.isImportant ? "text-amber-500" : "text-muted-foreground hover:text-amber-500"
          )}
          onClick={(e) => {
            e.stopPropagation()
            onToggleImportant?.(delivery)
          }}
        >
          <Star className="h-4 w-4" fill={delivery.isImportant ? "currentColor" : "none"} />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-5 w-5 p-0",
            delivery.isUrgent ? "text-red-500" : "text-muted-foreground hover:text-red-500"
          )}
          onClick={(e) => {
            e.stopPropagation()
            onToggleUrgent?.(delivery)
          }}
        >
          <AlertTriangle className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-5 w-5 p-0",
            delivery.isReceived ? "text-green-500" : "text-muted-foreground hover:text-green-500"
          )}
          onClick={(e) => {
            e.stopPropagation()
            onToggleReceived?.(delivery)
          }}
        >
          <Package className="h-4 w-4" fill={delivery.isReceived ? "currentColor" : "none"} />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5 p-0 text-muted-foreground hover:text-destructive"
          onClick={(e) => {
            e.stopPropagation()
            onDelete?.(delivery)
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}
