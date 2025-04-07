"use client"

import { useState, type ReactNode, useMemo } from "react"
import { ManagementLayout } from "@/components/common/management-layout"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Plus, Download, Search } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"

// アクションボタンの型定義
export interface ActionButton {
  label: string
  icon?: ReactNode
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  onClick: (selectedIds: string[]) => void
}

// 基本的なアイテムの型定義
export interface BaseItem {
  id: string
  [key: string]: any
}

// テンプレートのプロパティ定義
export interface ManagementPageTemplateProps<T extends BaseItem> {
  // ページタイトルと説明
  title: string
  itemName: string
  
  // データ関連
  items: T[]
  getFilteredItems?: (items: T[], searchTerm: string, filters: Record<string, string>, incompleteOnly: boolean) => T[]
  
  // コンポーネント
  filterPanel?: ReactNode
  listItemComponent: (props: { item: T; isSelected: boolean; onSelect: (item: T) => void }) => ReactNode
  detailComponent: (props: { selectedItem: T | null }) => ReactNode
  
  // アクション
  onAddNew?: () => void
  onExport?: () => void
  actionButtons?: ActionButton[]
  
  // 選択状態
  selectedIds?: string[]
  onSelectionChange?: (selectedIds: string[]) => void
  
  // フィルター設定
  filterConfigs?: Array<{
    id: string
    label: string
    options: Array<{ value: string, label: string }>
    defaultValue: string
  }>
  
  // 合計金額計算関数
  calculateTotalAmount?: (items: T[]) => number
}

export function ManagementPageTemplate<T extends BaseItem>({
  title,
  itemName,
  items,
  getFilteredItems,
  filterPanel,
  listItemComponent,
  detailComponent,
  onAddNew,
  onExport,
  actionButtons = [],
  selectedIds: externalSelectedIds,
  onSelectionChange: externalOnSelectionChange,
  calculateTotalAmount,
  filterConfigs = [],
}: ManagementPageTemplateProps<T> & {
  onSelectionChange?: (selectedIds: string[]) => void
  calculateTotalAmount?: (items: T[]) => number
}) {
  // 状態管理
  const [selectedItem, setSelectedItem] = useState<T | null>(items.length > 0 ? items[0] : null)
  const [selectedItems, setSelectedItems] = useState<string[]>(externalSelectedIds || [])
  const [searchTerm, setSearchTerm] = useState('')
  const [showIncompleteOnly, setShowIncompleteOnly] = useState(false)
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    filterConfigs.reduce((acc, filter) => {
      acc[filter.id] = filter.defaultValue
      return acc
    }, {} as Record<string, string>)
  )
  
  // フィルタリングされたアイテム
  const filteredItems = useMemo(() => {
    let result = items
    
    // 検索フィルター
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      result = result.filter(item => {
        // 検索可能なフィールドをチェック
        return Object.entries(item).some(([key, value]) => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchLower)
          }
          return false
        })
      })
    }
    
    // 未完了のみ表示
    if (showIncompleteOnly) {
      result = result.filter(item => item.status !== '完了')
    }
    
    // カスタムフィルター関数があれば使用
    if (getFilteredItems) {
      return getFilteredItems(result, searchTerm, activeFilters, showIncompleteOnly)
    }
    
    return result
  }, [items, searchTerm, showIncompleteOnly, getFilteredItems, activeFilters])
  
  // 全選択の切り替え
  const toggleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredItems.map((item) => item.id))
    }
  }
  
  // 選択アイテムの切り替え
  const handleSelectItem = (item: T) => {
    setSelectedItem(item)
  }
  
  // アイテム選択の切り替え
  const toggleItemSelection = (itemId: string, checked: boolean) => {
    setSelectedItems((prev) => {
      if (checked) {
        if (prev.includes(itemId)) return prev
        return [...prev, itemId]
      } else {
        return prev.filter((id) => id !== itemId)
      }
    })
    
    // 親コンポーネントに通知
    if (externalOnSelectionChange) {
      const newSelectedItems = checked 
        ? [...selectedItems, itemId]
        : selectedItems.filter(id => id !== itemId)
      externalOnSelectionChange(newSelectedItems)
    }
  }
  
  // 通貨フォーマット関数
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(value)
  }
  
  // リストパネルの幅
  const listPanelWidth = "w-[30%]"
  
  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      {/* ヘッダー */}
      <div className="flex-none h-14 border-b border-border bg-background">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">{title}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {onAddNew && (
              <Button size="sm" className="h-8 bg-black text-white hover:bg-black/90" onClick={onAddNew}>
                <Plus className="mr-1 h-4 w-4" />
                新規
              </Button>
            )}
            
            {onExport && (
              <Button size="sm" variant="outline" className="h-8" onClick={onExport}>
                <Download className="mr-1 h-4 w-4" />
                CSV
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* フィルターパネル */}
        {filterPanel && (
          <div className="w-80 h-full border-r border-border overflow-y-auto">
            <div className="p-4">
              <div className="space-y-4">
                {/* 検索ボックス */}
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="検索..."
                    className="pl-8 h-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                

                
                {/* フィルターコンテンツ */}
                {filterPanel}
              </div>
            </div>
          </div>
        )}
      
        {/* リストパネル */}
        <div className={`${listPanelWidth} h-full border-r border-border flex flex-col`}>
        {/* リストヘッダー */}
        <div className="flex-none p-4 border-b border-border">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Checkbox 
                checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                onCheckedChange={toggleSelectAll}
                aria-label="全選択"
                className="mr-2"
              />

            </div>
            <div className="flex items-center space-x-2">
              {actionButtons.length > 0 && actionButtons[0] && (
                <Button variant="ghost" size="icon" onClick={() => actionButtons[0].onClick(selectedItems)} disabled={selectedItems.length === 0} className={selectedItems.length === 0 ? "opacity-50" : ""} title="削除">
                  {actionButtons[0].icon || <MoreHorizontal className="h-4 w-4" />}
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
          
          {/* 検索ボックスと未完了スイッチはフィルターパネルに移動しました */}
          
          {/* アクションボタンはヘッダーに移動しました */}
        </div>
        
        {/* リスト本体 */}
        <div className="flex-1 overflow-y-auto">
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
              <p className="text-muted-foreground mb-2">該当する{itemName}がありません</p>
              {onAddNew && (
                <Button size="sm" onClick={onAddNew}>
                  <Plus className="mr-1 h-4 w-4" />
                  新規{itemName}を追加
                </Button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredItems.map((item) => (
                <div 
                  key={item.id}
                  className={`relative ${selectedItem?.id === item.id ? 'bg-muted/50' : 'hover:bg-muted/30'}`}
                  onClick={() => handleSelectItem(item)}
                >
                  {listItemComponent({ 
                    item, 
                    isSelected: selectedItems.includes(item.id),
                    onSelect: () => toggleItemSelection(item.id, !selectedItems.includes(item.id))
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* リストフッター（合計金額など） */}
        {calculateTotalAmount && (
          <div className="flex-none p-4 border-t border-border">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">合計金額</span>
              <span className="text-lg font-semibold">{formatCurrency(calculateTotalAmount(filteredItems))}</span>
            </div>
          </div>
        )}
      </div>
      
        {/* 詳細パネル */}
        <div className="flex-1 h-full overflow-auto">
          <div className="p-6">
            {selectedItem ? (
              <div>
                {detailComponent({ selectedItem })}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">選択された{itemName}がありません</p>
              </div>
            )}
          </div>
        </div>
    </div>
  </div>
  )
}
