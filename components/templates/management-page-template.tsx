"use client"

import { useState, type ReactNode, useMemo } from "react"
import { ManagementLayout } from "@/components/common/management-layout"
import { Header } from "@/components/common/header"
import { FilterPanel } from "./filter-panel"
import { ListPanel } from "./list-panel"
import { DetailPanel } from "./detail-panel"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Download, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

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
  listItemComponent: (props: { item: T; isSelected: boolean; onSelect: (item: T) => void; isChecked?: boolean; onCheckChange?: (checked: boolean) => void }) => ReactNode
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
  const toggleSelectAll = (checked: boolean | "indeterminate") => {
    if (checked === true) {
      setSelectedItems(filteredItems.map((item) => item.id))
    } else {
      setSelectedItems([])
    }
    
    // 親コンポーネントに通知
    if (externalOnSelectionChange) {
      const newSelectedItems = checked === true 
        ? filteredItems.map((item) => item.id)
        : []
      externalOnSelectionChange(newSelectedItems)
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
  
  // 合計金額の計算
  const totalAmount = useMemo(() => {
    if (calculateTotalAmount && filteredItems.length > 0) {
      return calculateTotalAmount(filteredItems)
    }
    return undefined
  }, [calculateTotalAmount, filteredItems])
  
  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      {/* ヘッダー */}
      <Header 
        title={title}
        rightContent={
          <div className="flex items-center gap-2">
            {onAddNew && (
              <Button size="sm" onClick={onAddNew}>
                <Plus className="h-4 w-4 mr-1" />
                新規
              </Button>
            )}
            {onExport && (
              <Button variant="outline" size="sm" onClick={onExport}>
                <Download className="h-4 w-4 mr-1" />
                CSV
              </Button>
            )}
          </div>
        }
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* フィルターパネル */}
        {filterPanel && (
          <FilterPanel
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          >
            {filterPanel}
          </FilterPanel>
        )}
      
        {/* リストパネル */}
        <ListPanel
          width={listPanelWidth}
          items={filteredItems}
          selectedItems={selectedItems}
          onSelectAll={toggleSelectAll}
          onExport={onExport}
          onAddNew={onAddNew}
          totalAmount={totalAmount}
          actionButton={actionButtons.length > 0 ? {
            icon: actionButtons[0].icon || <MoreHorizontal className="h-4 w-4" />,
            onClick: actionButtons[0].onClick
          } : undefined}
        >
          <div className="space-y-1 p-2">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="relative"
              >
                {listItemComponent({
                  item,
                  isSelected: selectedItem?.id === item.id,
                  onSelect: handleSelectItem,
                  isChecked: selectedItems.includes(item.id),
                  onCheckChange: (checked: boolean) => toggleItemSelection(item.id, checked)
                })}
              </div>
            ))}
            
            {filteredItems.length === 0 && (
              <div className="flex items-center justify-center h-32">
                <p className="text-muted-foreground">表示する{itemName}がありません</p>
              </div>
            )}
          </div>
        </ListPanel>
        
        {/* 詳細パネル */}
        <DetailPanel
          selectedItem={selectedItem}
          itemName={itemName}
        >
          {selectedItem && detailComponent({ selectedItem })}
        </DetailPanel>
      </div>
    </div>
  )
}
