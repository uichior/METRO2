"use client"

import { useState, useEffect, useMemo } from "react"
import type { SortOption } from "@/types/common"

interface UseFilterProps<T> {
  data: T[]
  defaultSortOption?: SortOption
}

interface UseFilterReturn<T> {
  filteredData: T[]
  searchTerm: string
  setSearchTerm: (term: string) => void
  filterValues: Record<string, string>
  setFilterValue: (key: string, value: string) => void
  resetFilters: () => void
  sortOption: SortOption | null
  setSortOption: (option: SortOption | null) => void
  selectedItems: string[]
  toggleItemSelection: (id: string) => void
  selectAllItems: (select: boolean) => void
  isItemSelected: (id: string) => boolean
}

/**
 * データのフィルタリング、ソート、選択機能を提供するカスタムフック
 */
export function useFilter<T extends { id: string }>({
  data,
  defaultSortOption = null,
}: UseFilterProps<T>): UseFilterReturn<T> {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [filterValues, setFilterValues] = useState<Record<string, string>>({})
  const [sortOption, setSortOption] = useState<SortOption | null>(defaultSortOption)
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  // フィルター値を設定する関数
  const setFilterValue = (key: string, value: string) => {
    setFilterValues((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // すべてのフィルターをリセットする関数
  const resetFilters = () => {
    setSearchTerm("")
    setFilterValues({})
    setSortOption(defaultSortOption)
  }

  // データをフィルタリングしてソートする
  const filteredData = useMemo(() => {
    let result = [...data]

    // 検索語句でフィルタリング（検索語句が空の場合はスキップ）
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      result = result.filter((item) => {
        // itemのすべてのプロパティを検索
        return Object.values(item).some((value) => {
          if (value === null || value === undefined) return false
          return String(value).toLowerCase().includes(term)
        })
      })
    }

    // フィルター値でフィルタリング
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value !== "all" && value !== "") {
        result = result.filter((item) => {
          const itemValue = (item as any)[key]
          return itemValue?.toString() === value
        })
      }
    })

    // ソート（ソートオプションがある場合）
    if (sortOption) {
      const { key, direction } = sortOption
      result.sort((a, b) => {
        const valueA = (a as any)[key]
        const valueB = (b as any)[key]

        if (valueA === valueB) return 0

        const comparison = valueA < valueB ? -1 : 1
        return direction === "asc" ? comparison : -comparison
      })
    }

    return result
  }, [data, searchTerm, filterValues, sortOption])

  // 選択アイテムをトグルする関数
  const toggleItemSelection = (id: string) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  // 全アイテムを選択/解除する関数
  const selectAllItems = (select: boolean) => {
    if (select) {
      setSelectedItems(filteredData.map((item) => item.id))
    } else {
      setSelectedItems([])
    }
  }

  // アイテムが選択されているかどうかをチェックする関数
  const isItemSelected = (id: string) => {
    return selectedItems.includes(id)
  }

  // データが変更されたときに選択をクリア
  useEffect(() => {
    setSelectedItems([])
  }, [data])

  return {
    filteredData,
    searchTerm,
    setSearchTerm,
    filterValues,
    setFilterValue,
    resetFilters,
    sortOption,
    setSortOption,
    selectedItems,
    toggleItemSelection,
    selectAllItems,
    isItemSelected,
  }
}

