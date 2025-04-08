"use client"

import { ReactNode } from "react"
import { Header } from "@/components/common/header"
import { FilterPanel, FilterSection } from "@/components/shared/filter-panel"
import { ListPanel } from "@/components/shared/list-panel"
import { DetailPanel } from "@/components/shared/detail-panel"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Download, ShoppingCart, Truck, FileText, Hammer, Package } from "lucide-react"
import { Trash } from "lucide-react"
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
  
  // 合計金額計算
  calculateTotal?: (items: T[]) => number
  
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
    handleCheckItem 
  } = useManagement<T>()
  
  return listItemComponent({
    item,
    isSelected: selectedItem?.id === item.id,
    onSelect: handleSelectItem,
    isChecked: selectedIds.includes(item.id),
    onCheckChange: (checked) => handleCheckItem(item.id, checked)
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
      {selectedIds.length > 0 && handleDelete ? (
        <div className="flex items-center justify-between mb-4 bg-muted p-2 rounded-md">
          <div className="flex items-center gap-2 pl-2">
            <Checkbox
              id="select-all"
              checked={selectedIds.length > 0 && selectedIds.length === filteredItems.length}
              onCheckedChange={toggleSelectAll}
              aria-label="すべて選択"
            />
            <span className="text-sm">{selectedIds.length}件選択中</span>
          </div>
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
      ) : (
        <div className="flex items-center mb-4">
          <div className="flex items-center gap-2 pl-2">
            <Checkbox
              id="select-all"
              checked={selectedIds.length > 0 && selectedIds.length === filteredItems.length}
              onCheckedChange={toggleSelectAll}
              aria-label="すべて選択"
            />
            <span className="text-sm text-muted-foreground">すべて選択</span>
          </div>
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
  calculateTotal,
  filterPanel,
  listItemComponent,
  detailComponent
}: ManagementTemplateProps<T>) {
  
  return (
    <ManagementProvider
      title={title}
      items={items}
      filteredItems={filteredItems}
      searchPlaceholder={searchPlaceholder}
      onSearch={onSearch}
      onIncompleteChange={onIncompleteChange}
      onAddNew={onAddNew}
      onExport={onExport}
      onDelete={onDelete}
      calculateTotal={calculateTotal}
      filterPanel={filterPanel}
      listItemComponent={listItemComponent}
      detailComponent={detailComponent}
    >
      <ManagementTemplateContent />
    </ManagementProvider>
  )
}

// 内部コンテンツコンポーネント（コンテキストを使用）
function ManagementTemplateContent<T extends BaseItem>() {
  const {
    title,
    items,
    filteredItems,
    searchPlaceholder,
    onSearch,
    incompleteOnly,
    onIncompleteChange,
    onAddNew,
    onExport,
    onDelete,
    calculateTotal,
    filterPanel,
    listItemComponent,
    detailComponent,
    selectedItem,
    selectedIds,
    toggleSelectAll,
    handleSelectItem,
    handleCheckItem,
    handleDelete,
    handleExport,
    setSearchQuery,
    setIncompleteOnly
  } = useManagement<T>()
  
  // 検索ハンドラー
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (onSearch) onSearch(query)
  }
  
  // ページタイトルに対応するアイコンを取得
  const getPageIcon = () => {
    if (title.includes("受注")) return <ShoppingCart size={20} />
    if (title.includes("納品")) return <Truck size={20} />
    if (title.includes("請求")) return <FileText size={20} />
    if (title.includes("手配")) return <Hammer size={20} />
    if (title.includes("仕入")) return <Package size={20} />
    return null
  }
  
  const pageIcon = getPageIcon()
  
  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      {/* ヘッダー */}
      <Header
        title={title}
        showSearch={false}
        leftContent={
          <div className="flex items-center gap-2 ml-4">
            {pageIcon && (
              <div className="mr-2">
                {pageIcon}
              </div>
            )}
            {onAddNew && (
              <Button size="sm" onClick={onAddNew}>
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
      
      <div className="grid grid-cols-[250px_350px_1fr] gap-4 h-full p-4">
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
            // onAddプロパティは削除されました - 新規作成ボタンはヘッダーのみに表示
            emptyState={
              <div className="flex items-center justify-center h-32">
                <p className="text-muted-foreground">データがありません</p>
              </div>
            }
            footerContent={
              <div className="flex items-center justify-between px-2">
                <div>{filteredItems.length} 件表示</div>
                {calculateTotal && (
                  <div className="font-medium">
                    合計: {new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(calculateTotal(filteredItems))}
                  </div>
                )}
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
