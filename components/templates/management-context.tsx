"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { BaseItem } from "./management-template"

// 管理コンテキストの型定義
interface ManagementContextType<T extends BaseItem> {
  // ページタイトルと説明
  title: string
  
  // データ関連
  items: T[]
  filteredItems: T[]
  selectedIds: string[]
  setSelectedIds: (ids: string[]) => void
  selectedItem: T | null
  setSelectedItem: (item: T | null) => void
  
  // 検索関連
  searchQuery: string
  setSearchQuery: (query: string) => void
  searchPlaceholder?: string
  onSearch?: (query: string) => void
  
  // フィルター関連
  incompleteOnly: boolean
  setIncompleteOnly: (value: boolean) => void
  onIncompleteChange?: (checked: boolean) => void
  
  // アクション
  onAddNew?: () => void
  onExport?: () => void
  onDelete?: (ids: string[]) => void
  handleAddNew?: () => void
  handleExport?: () => void
  handleDelete?: (ids: string[]) => void
  
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
  
  // ヘルパー関数
  toggleSelectAll: (checked: boolean) => void
  handleSelectItem: (item: T) => void
  handleCheckItem: (itemId: string, checked: boolean) => void
}

// デフォルト値（型エラーを避けるため）
const defaultContext: ManagementContextType<any> = {
  title: "",
  items: [],
  filteredItems: [],
  selectedIds: [],
  setSelectedIds: () => {},
  selectedItem: null,
  setSelectedItem: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
  searchPlaceholder: "",
  incompleteOnly: false,
  setIncompleteOnly: () => {},
  filterPanel: null,
  listItemComponent: () => null,
  detailComponent: null,
  toggleSelectAll: () => {},
  handleSelectItem: () => {},
  handleCheckItem: () => {}
}

// コンテキストの作成
export const ManagementContext = createContext<ManagementContextType<any>>(defaultContext)

// コンテキストプロバイダーのプロパティ
interface ManagementProviderProps<T extends BaseItem> {
  title: string
  items: T[]
  filteredItems: T[]
  children: ReactNode
  searchPlaceholder?: string
  onSearch?: (query: string) => void
  onIncompleteChange?: (checked: boolean) => void
  onAddNew?: () => void
  onExport?: () => void
  onDelete?: (ids: string[]) => void
  calculateTotal?: (items: T[]) => number
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

// コンテキストプロバイダー
export function ManagementProvider<T extends BaseItem>({
  title,
  items,
  filteredItems,
  children,
  searchPlaceholder,
  onSearch,
  onIncompleteChange,
  onAddNew,
  onExport,
  onDelete,
  calculateTotal,
  filterPanel,
  listItemComponent,
  detailComponent
}: ManagementProviderProps<T>) {
  // 状態管理
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [selectedItem, setSelectedItem] = useState<T | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [incompleteOnly, setIncompleteOnly] = useState<boolean>(false)
  
  // 全選択の切り替え
  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredItems.map(item => item.id))
    } else {
      setSelectedIds([])
    }
  }
  
  // アイテム選択の切り替え
  const handleSelectItem = (item: T) => {
    setSelectedItem(item)
  }
  
  // チェックボックス変更ハンドラー
  const handleCheckItem = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...prev, itemId])
    } else {
      setSelectedIds(prev => prev.filter(id => id !== itemId))
    }
  }
  
  // コンテキスト値
  const contextValue: ManagementContextType<T> = {
    title,
    items,
    filteredItems,
    selectedIds,
    setSelectedIds,
    selectedItem,
    setSelectedItem,
    searchQuery,
    setSearchQuery,
    searchPlaceholder,
    onSearch,
    incompleteOnly,
    setIncompleteOnly,
    onIncompleteChange,
    onAddNew,
    onExport,
    onDelete,
    handleAddNew: onAddNew,
    handleExport: onExport,
    handleDelete: onDelete,
    calculateTotal,
    filterPanel,
    listItemComponent,
    detailComponent,
    toggleSelectAll,
    handleSelectItem,
    handleCheckItem
  }
  
  return (
    <ManagementContext.Provider value={contextValue}>
      {children}
    </ManagementContext.Provider>
  )
}

// カスタムフック
export function useManagement<T extends BaseItem>() {
  return useContext<ManagementContextType<T>>(ManagementContext)
}
