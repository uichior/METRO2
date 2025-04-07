"use client"

import { ReactNode } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Download, Plus } from "lucide-react"
import { BaseItem } from "./management-page-template"
import { formatCurrency } from "@/lib/utils"

export interface ListPanelProps<T extends BaseItem> {
  width: string
  items: T[]
  selectedItems: string[]
  onSelectAll: (checked: boolean | "indeterminate") => void
  onExport?: () => void
  onAddNew?: () => void
  actionButton?: {
    icon: ReactNode
    onClick: (selectedIds: string[]) => void
  }
  children: ReactNode
  totalAmount?: number
  footerContent?: ReactNode
}

export function ListPanel<T extends BaseItem>({
  width,
  items,
  selectedItems,
  onSelectAll,
  onExport,
  onAddNew,
  actionButton,
  children,
  totalAmount,
  footerContent
}: ListPanelProps<T>) {
  return (
    <div className={`${width} h-full border-r border-border flex flex-col`}>
      {/* リストヘッダー */}
      <div className="flex-none p-4 border-b border-border">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Checkbox
              id="select-all"
              checked={selectedItems.length > 0 && selectedItems.length === items.length}
              onCheckedChange={onSelectAll}
              aria-label="すべて選択"
              className="mr-2"
            />
            <label htmlFor="select-all" className="text-sm text-muted-foreground cursor-pointer">
              すべて選択
            </label>
          </div>
          <div className="flex items-center space-x-2">
            {actionButton && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => actionButton.onClick(selectedItems)} 
                disabled={selectedItems.length === 0} 
                className={selectedItems.length === 0 ? "opacity-50" : ""} 
                title="削除"
              >
                {actionButton.icon || <MoreHorizontal className="h-4 w-4" />}
              </Button>
            )}
            {onExport && (
              <Button variant="ghost" size="icon" onClick={onExport} title="エクスポート">
                <Download className="h-4 w-4" />
              </Button>
            )}
            {onAddNew && (
              <Button variant="ghost" size="icon" onClick={onAddNew} title="新規追加">
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* リスト本体 */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
      
      {/* リストフッター */}
      <div className="flex-none p-4 border-t border-border bg-muted/30">
        {footerContent ? (
          footerContent
        ) : (
          <div className="flex flex-col space-y-1">
            {totalAmount !== undefined && (
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">合計金額:</span>
                <span className="font-bold">{formatCurrency(totalAmount)}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>選択中:</span>
              <span>{selectedItems.length} / {items.length} 件</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
