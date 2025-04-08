"use client"

import { ReactNode } from "react"
import { Header } from "@/components/common/header"
import { ListPanel } from "@/components/shared/list-panel"
import { FilterPanel } from "@/components/shared/filter-panel"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Trash, Plus, Download } from "lucide-react"
import { ManagementProvider, useManagement } from "./management-context"

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

// リストアイテムのラッパーコンポーネント
function ListItemWrapper<T extends BaseItem>({ 
  item, 
  listItemComponent 
}: { 
  item: T; 
  listItemComponent: ManagementTemplateProps<T>["listItemComponent"] 
}) {
  const { 
    selectedItem, 
    handleSelectItem, 
    selectedIds, 
    handleCheckChange 
  } = useManagement<T>()
  
  return listItemComponent({
    item,
    isSelected: selectedItem?.id === item.id,
    onSelect: handleSelectItem,
    isChecked: selectedIds.includes(item.id),
    onCheckChange: (checked) => handleCheckChange(item.id, checked)
  })
}

// リストヘッダーコンポーネント
function ListHeader() {
  const { 
    filteredItems, 
    selectedIds, 
    toggleSelectAll, 
    incompleteOnly, 
    setIncompleteOnly,
    handleAddNew,
    handleDelete
  } = useManagement()
  
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Checkbox
            id="select-all"
            checked={selectedIds.length > 0 && selectedIds.length === filteredItems.length}
            onCheckedChange={toggleSelectAll}
            aria-label="すべて選択"
          />
          {setIncompleteOnly && (
            <div className="flex items-center gap-2 ml-4">
              <Switch
                id="incomplete-only"
                checked={incompleteOnly}
                onCheckedChange={setIncompleteOnly}
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
      
      {selectedIds.length > 0 && handleDelete && (
        <div className="flex items-center justify-between mb-4 bg-muted p-2 rounded-md">
          <span className="text-sm">{selectedIds.length}件選択中</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(selectedIds)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash className="h-4 w-4 mr-1" />
            削除
          </Button>
        </div>
      )}
    </>
  )
}

// メインの管理テンプレートコンポーネント
export function ManagementTemplate<T extends BaseItem>({
  title,
  items,
  filteredItems,
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
  
  return (
    <ManagementProvider
      items={items}
      filteredItems={filteredItems}
      onAddNew={onAddNew}
      onExport={onExport}
      onDelete={onDelete}
    >
      <ManagementTemplateContent
        title={title}
        onSearch={onSearch}
        searchPlaceholder={searchPlaceholder}
        incompleteOnly={incompleteOnly}
        onIncompleteChange={onIncompleteChange}
        filterPanel={filterPanel}
        listItemComponent={listItemComponent}
        detailComponent={detailComponent}
      />
    </ManagementProvider>
  )
}

// 内部コンテンツコンポーネント（コンテキストを使用）
function ManagementTemplateContent<T extends BaseItem>({
  title,
  onSearch,
  searchPlaceholder,
  incompleteOnly,
  onIncompleteChange,
  filterPanel,
  listItemComponent,
  detailComponent
}: Omit<ManagementTemplateProps<T>, 'items' | 'filteredItems' | 'onAddNew' | 'onExport' | 'onDelete'>) {
  
  const { 
    filteredItems, 
    selectedItem,
    handleAddNew,
    handleExport,
    setSearchQuery,
    setIncompleteOnly
  } = useManagement<T>()
  
  // 検索ハンドラー
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (onSearch) onSearch(query)
  }
  
  // 未完了フィルター切り替えハンドラー
  const handleIncompleteChange = (checked: boolean) => {
    setIncompleteOnly(checked)
    if (onIncompleteChange) onIncompleteChange(checked)
  }
  
  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      {/* ヘッダー */}
      <Header 
        title={title}
        onSearch={handleSearch}
        searchPlaceholder={searchPlaceholder}
        rightContent={
          <div className="flex items-center gap-2">
            {handleAddNew && (
              <Button size="sm" onClick={handleAddNew}>
                <Plus className="h-4 w-4 mr-1" />
                新規
              </Button>
            )}
            {handleExport && (
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-1" />
                CSV
              </Button>
            )}
          </div>
        }
      />
      
      <div className="grid grid-cols-[250px_1fr_400px] gap-4 h-full p-4">
        {/* フィルターパネル */}
        <div className="overflow-y-auto">
          {filterPanel}
        </div>
        
        {/* リストパネル */}
        <div className="overflow-y-auto">
          <ListPanel
            title={`${title}一覧`}
            searchPlaceholder={searchPlaceholder}
            onSearch={handleSearch}
            onAdd={handleAddNew}
            emptyState={
              <div className="flex items-center justify-center h-32">
                <p className="text-muted-foreground">データがありません</p>
              </div>
            }
          >
            <ListHeader />
            {filteredItems.map((item) => (
              <ListItemWrapper
                key={item.id}
                item={item}
                listItemComponent={listItemComponent}
              />
            ))}
          </ListPanel>
        </div>
        
        {/* 詳細パネル */}
        <div className="overflow-y-auto">
          {selectedItem ? (
            detailComponent
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-muted-foreground">アイテムを選択してください</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
