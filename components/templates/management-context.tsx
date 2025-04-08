"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { BaseItem } from "./management-template"

// 管理コンテキストの型定義
interface ManagementContextType<T extends BaseItem> {
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
  
  // フィルター関連
  incompleteOnly: boolean
  setIncompleteOnly: (value: boolean) => void
  
  // アクション
  handleAddNew?: () => void
  handleExport?: () => void
  handleDelete?: (ids: string[]) => void
  
  // ヘルパー関数
  toggleSelectAll: (checked: boolean) => void
  handleSelectItem: (item: T) => void
  handleCheckChange: (itemId: string, checked: boolean) => void
}

// デフォルト値（型エラーを避けるため）
const defaultContext: ManagementContextType<any> = {
  items: [],
  filteredItems: [],
  selectedIds: [],
  setSelectedIds: () => {},
  selectedItem: null,
  setSelectedItem: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
  incompleteOnly: false,
  setIncompleteOnly: () => {},
  toggleSelectAll: () => {},
  handleSelectItem: () => {},
  handleCheckChange: () => {}
}

// コンテキストの作成
export const ManagementContext = createContext<ManagementContextType<any>>(defaultContext)

// コンテキストプロバイダーのプロパティ
interface ManagementProviderProps<T extends BaseItem> {
  items: T[]
  filteredItems: T[]
  children: ReactNode
  onAddNew?: () => void
  onExport?: () => void
  onDelete?: (ids: string[]) => void
}

// コンテキストプロバイダー
export function ManagementProvider<T extends BaseItem>({
  items,
  filteredItems,
  children,
  onAddNew,
  onExport,
  onDelete
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
  const handleCheckChange = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...prev, itemId])
    } else {
      setSelectedIds(prev => prev.filter(id => id !== itemId))
    }
  }
  
  // コンテキスト値
  const contextValue: ManagementContextType<T> = {
    items,
    filteredItems,
    selectedIds,
    setSelectedIds,
    selectedItem,
    setSelectedItem,
    searchQuery,
    setSearchQuery,
    incompleteOnly,
    setIncompleteOnly,
    handleAddNew: onAddNew,
    handleExport: onExport,
    handleDelete: onDelete,
    toggleSelectAll,
    handleSelectItem,
    handleCheckChange
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
