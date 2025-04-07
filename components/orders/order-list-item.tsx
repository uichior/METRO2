"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Star, AlertTriangle, Package, Trash2 } from "lucide-react"
import { Order } from "./types"

interface OrderListItemProps {
  order: Order
  isSelected: boolean
  onSelect: (order: Order) => void
  isChecked?: boolean
  onCheckChange?: (checked: boolean) => void
  onToggleImportant?: (order: Order) => void
  onToggleUrgent?: (order: Order) => void
  onToggleDelivered?: (order: Order) => void
  onDelete?: (order: Order) => void
}

export function OrderListItem({
  order,
  isSelected,
  onSelect,
  isChecked,
  onCheckChange,
  onToggleImportant,
  onToggleUrgent,
  onToggleDelivered,
  onDelete
}: OrderListItemProps) {
  // ステータスに応じたスタイルを取得
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "受注済": return "bg-amber-500 text-white"
      case "製造中": return "bg-blue-500 text-white"
      case "出荷準備中": return "bg-purple-500 text-white"
      case "配送中": return "bg-indigo-500 text-white"
      case "納品済": return "bg-green-500 text-white"
      case "キャンセル": return "bg-destructive text-destructive-foreground"
      default: return "bg-primary text-primary-foreground"
    }
  }

  // 金額のフォーマット
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', { 
      style: 'currency', 
      currency: 'JPY',
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <Card 
      className={cn(
        "transition-all hover:bg-accent/50 cursor-pointer",
        isSelected && "border-l-4 border-l-primary"
      )}
      onClick={() => onSelect(order)}
    >
      <CardContent className="p-4">
        <div className="grid grid-cols-[auto_1fr] gap-3">
          {/* チェックボックス */}
          <div className="flex items-start pt-1">
            <Checkbox 
              checked={isChecked} 
              onCheckedChange={onCheckChange}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          {/* 情報コンテンツ */}
          <div className="space-y-2">
            {/* 上段: 製品名と星アイコン、ステータス */}
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                {/* 1行目: 製品名とアイコン群 */}
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{order.name}</h3>
                  <div className="flex items-center gap-1">
                    {/* 重要アイコン */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "h-5 w-5 p-0",
                        order.isImportant ? "text-amber-500" : "text-muted-foreground hover:text-amber-500"
                      )}
                      onClick={(e) => {
                        e.stopPropagation()
                        onToggleImportant?.(order)
                      }}
                    >
                      <Star className="h-4 w-4" fill={order.isImportant ? "currentColor" : "none"} />
                    </Button>
                    
                    {/* 緊急アイコン */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "h-5 w-5 p-0",
                        order.isUrgent ? "text-red-500" : "text-muted-foreground hover:text-red-500"
                      )}
                      onClick={(e) => {
                        e.stopPropagation()
                        onToggleUrgent?.(order)
                      }}
                    >
                      <AlertTriangle className="h-4 w-4" />
                    </Button>
                    
                    {/* 納品アイコン */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "h-5 w-5 p-0",
                        order.isDelivered ? "text-green-500" : "text-muted-foreground hover:text-green-500"
                      )}
                      onClick={(e) => {
                        e.stopPropagation()
                        onToggleDelivered?.(order)
                      }}
                    >
                      <Package className="h-4 w-4" fill={order.isDelivered ? "currentColor" : "none"} />
                    </Button>
                    
                    {/* 削除アイコン */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 p-0 text-muted-foreground hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete?.(order)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* 2行目: 注文番号と取引先 */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{order.code}</span>
                  <span className="text-xs text-muted-foreground">|</span>
                  <span className="text-xs text-muted-foreground">{order.client}</span>
                </div>
              </div>
              <Badge className={cn(getStatusStyle(order.status))}>
                {order.status}
              </Badge>
            </div>
            
            {/* 中段: 納期と担当者 */}
            <div className="grid grid-cols-2 text-sm">
              <div>
                <span className="text-muted-foreground">納期: </span>
                <span>{new Date(order.deliveryDate).toLocaleDateString('ja-JP')}</span>
              </div>
              <div>
                <span className="text-muted-foreground">担当者: </span>
                <span>{order.manager}</span>
              </div>
            </div>
            
            {/* 下段: 金額、単価、数量 */}
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {order.quantity && order.unitPrice && (
                  <span>{order.quantity}個 × {formatCurrency(order.unitPrice)}</span>
                )}
              </div>
              <span className="font-medium">{formatCurrency(order.amount)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
