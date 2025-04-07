"use client"

import { useState, type ReactNode, useMemo } from "react"
import { Header } from "@/components/common/header"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Plus, Download, Trash } from "lucide-react"

// 基本的なアイテムの型定義
export interface BaseItem {
  id: string
  [key: string]: any
}

// テンプレートのプロパティ定義
export interface ManagementTemplateProps<T extends BaseItem> {
  // ページタイトルと説明
  title: string
  
  // データ関連
  items: T[]
  filteredItems: T[]
  selectedIds: string[]
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>
  selectedItem: T | null
  setSelectedItem: React.Dispatch<React.SetStateAction<T | null>>
  
  // 検索関連
  onSearch?: (query: string) => void
  searchPlaceholder?: string
  
  // フィルター関連
  incompleteOnly?: boolean
  onIncompleteChange?: (checked: boolean) => void
  
  // アクション
  onAddNew?: () => void
  onExport?: () => void
  onDelete?: (ids: string[]) => void
  
  // コンポーネント
  filterPanel: ReactNode
  listItemComponent: (props: { 
    item: T; 
    isSelected: boolean; 
    onSelect: (item: T) => void; 
    isChecked?: boolean; 
    onCheckChange?: (checked: boolean) => void 
  }) => ReactNode
  detailComponent: ReactNode
}

export function ManagementTemplate<T extends BaseItem>({
  title,
  items,
  filteredItems,
  selectedIds,
  setSelectedIds,
  selectedItem,
  setSelectedItem,
  onSearch,
  searchPlaceholder = "検索...",
  incompleteOnly,
  onIncompleteChange,
  onAddNew,
  onExport,
  onDelete,
  filterPanel,
  listItemComponent,
  detailComponent
}: ManagementTemplateProps<T>) {
  
  // 全選択の切り替え
  const toggleSelectAll = (checked: boolean | "indeterminate") => {
    if (checked === true) {
      setSelectedIds(filteredItems.map(item => item.id));
    } else {
      setSelectedIds([]);
    }
  }
  
  // アイテム選択の切り替え
  const handleSelectItem = (item: T) => {
    setSelectedItem(item);
  }
  
  // チェックボックス変更ハンドラー
  const handleCheckChange = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev: string[]) => [...prev, itemId]);
    } else {
      setSelectedIds((prev: string[]) => prev.filter((id: string) => id !== itemId));
    }
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      {/* ヘッダー */}
      <Header 
        title={title}
        onSearch={onSearch}
        searchPlaceholder={searchPlaceholder}
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
        <div className="w-[250px] border-r flex-shrink-0 overflow-y-auto">
          {filterPanel}
        </div>
        
        {/* リストパネル */}
        <div className="w-[30%] border-r flex-shrink-0 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="select-all"
                  checked={selectedIds.length > 0 && selectedIds.length === filteredItems.length}
                  onCheckedChange={toggleSelectAll}
                  aria-label="すべて選択"
                />
                <h2 className="text-lg font-semibold">受注一覧</h2>
                {onIncompleteChange && (
                  <div className="flex items-center gap-2 ml-4">
                    <Switch
                      id="incomplete-only"
                      checked={incompleteOnly}
                      onCheckedChange={onIncompleteChange}
                    />
                    <label htmlFor="incomplete-only" className="text-sm cursor-pointer">
                      未納のみ
                    </label>
                  </div>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                {filteredItems.length} 件
              </div>
            </div>
            
            {selectedIds.length > 0 && onDelete && (
              <div className="flex items-center justify-between mb-4 bg-muted p-2 rounded-md">
                <span className="text-sm">{selectedIds.length}件選択中</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(selectedIds)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash className="h-4 w-4 mr-1" />
                  削除
                </Button>
              </div>
            )}
            
            <div className="space-y-2">
              {filteredItems.map((item) => (
                <div key={item.id}>
                  {listItemComponent({
                    item,
                    isSelected: selectedItem?.id === item.id,
                    onSelect: handleSelectItem,
                    isChecked: selectedIds.includes(item.id),
                    onCheckChange: (checked) => handleCheckChange(item.id, checked)
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* 詳細パネル */}
        <div className="flex-1 overflow-y-auto">
          {detailComponent}
        </div>
      </div>
    </div>
  )
}
