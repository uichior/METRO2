"use client"

import React, { useState, useMemo } from "react"
import { ManagementTemplate } from "../templates/management-template"
import { ArrangementListItem } from "./arrangement-list-item"
import { ArrangementDetail } from "./arrangement-detail"
import { Arrangement } from "./types"
import { Plus, Download, Trash } from "lucide-react"
import { ArrangementFilterPanel } from "./arrangement-filter"
import { sampleArrangements } from "./sample-data"

// フィルター設定
const filterConfigs = [
  {
    type: "status",
    label: "ステータス",
    options: ["すべて", "未手配", "手配中", "手配完了", "キャンセル"],
    defaultValue: "すべて"
  },
  {
    type: "requiredDate",
    label: "納期",
    options: ["すべて", "今週", "今月", "次月", "期限超過"],
    defaultValue: "すべて"
  },
  {
    type: "progress",
    label: "進捗状況",
    options: ["すべて", "0%", "1-50%", "51-99%", "100%"],
    defaultValue: "すべて"
  }
]

export function ArrangementManagement() {
  // 選択された手配IDの状態管理
  const [selectedArrangementIds, setSelectedArrangementIds] = useState<string[]>([])
  
  // 手配データの状態管理
  const [arrangements, setArrangements] = useState<Arrangement[]>(sampleArrangements)
  
  // フィルターの状態管理
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({
    status: 'すべて',
    requiredDate: 'すべて',
    progress: 'すべて'
  })

  // 検索クエリの状態管理
  const [searchQuery, setSearchQuery] = useState<string>('')
  
  // 未完了のみ表示の状態管理
  const [incompleteOnly, setIncompleteOnly] = useState<boolean>(true)
  
  // 選択された手配
  const [selectedArrangement, setSelectedArrangement] = useState<Arrangement | null>(arrangements.length > 0 ? arrangements[0] : null)

  // 手配数のカウント
  const arrangementCounts = useMemo(() => {
    return {
      total: sampleArrangements.length,
      pending: sampleArrangements.filter(a => a.status === '未手配').length,
      inProgress: sampleArrangements.filter(a => a.status === '手配中').length,
      completed: sampleArrangements.filter(a => a.status === '手配完了').length,
      cancelled: sampleArrangements.filter(a => a.status === 'キャンセル').length
    }
  }, [])

  // 新規手配追加ハンドラー
  const handleAddNew = () => {
    alert('新規手配を追加します')
  }
  
  // エクスポートハンドラー
  const handleExport = () => {
    alert('手配一覧をエクスポートします')
  }
  
  // 削除ハンドラー
  const handleDelete = (ids: string[]) => {
    alert(`選択した手配(${ids.join(', ')})を削除します`)
  }
  
  // 重要フラグ切り替えハンドラー
  const handleToggleImportant = (arrangement: Arrangement) => {
    setArrangements(prevArrangements => 
      prevArrangements.map(a => 
        a.id === arrangement.id ? { ...a, isImportant: !a.isImportant } : a
      )
    )
  }
  
  // 緊急フラグ切り替えハンドラー
  const handleToggleUrgent = (arrangement: Arrangement) => {
    setArrangements(prevArrangements => 
      prevArrangements.map(a => 
        a.id === arrangement.id ? { ...a, isUrgent: !a.isUrgent } : a
      )
    )
  }
  
  // 完了フラグ切り替えハンドラー
  const handleToggleCompleted = (arrangement: Arrangement) => {
    const now = new Date().toISOString().split('T')[0];
    setArrangements(prevArrangements => 
      prevArrangements.map(a => 
        a.id === arrangement.id ? { 
          ...a, 
          isCompleted: !a.isCompleted,
          status: !a.isCompleted ? '手配完了' : a.status === '手配完了' ? '手配中' : a.status,
          completionDate: !a.isCompleted ? now : '',
          progress: !a.isCompleted ? 100 : a.progress
        } : a
      )
    )
  }
  
  // 手配削除ハンドラー
  const handleDeleteArrangement = (arrangement: Arrangement) => {
    if (confirm(`手配「${arrangement.name}」を削除しますか？`)) {
      setArrangements(prevArrangements => prevArrangements.filter(a => a.id !== arrangement.id))
      if (selectedArrangement?.id === arrangement.id) {
        setSelectedArrangement(null)
      }
    }
  }
  
  // フィルター適用関数
  const getFilteredItems = (arrangements: Arrangement[], searchTerm: string, filters: Record<string, string>, incompleteOnly: boolean) => {
    let result = [...arrangements]
    
    // ステータスフィルター
    if (filters.status !== 'すべて') {
      result = result.filter(arrangement => arrangement.status === filters.status)
    }
    
    // 進捗フィルター
    if (filters.progress !== 'すべて') {
      if (filters.progress === '0%') {
        result = result.filter(arrangement => arrangement.progress === 0)
      } else if (filters.progress === '1-50%') {
        result = result.filter(arrangement => arrangement.progress > 0 && arrangement.progress <= 50)
      } else if (filters.progress === '51-99%') {
        result = result.filter(arrangement => arrangement.progress > 50 && arrangement.progress < 100)
      } else if (filters.progress === '100%') {
        result = result.filter(arrangement => arrangement.progress === 100)
      }
    }
    
    // 納期フィルター
    if (filters.requiredDate !== 'すべて') {
      const today = new Date()
      const dayOfWeek = today.getDay()
      const startOfWeek = new Date(today)
      startOfWeek.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)) // 月曜日を週の始まりとする
      startOfWeek.setHours(0, 0, 0, 0)
      
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)
      endOfWeek.setHours(23, 59, 59, 999)
      
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
      
      const startOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
      const endOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0)
      
      if (filters.requiredDate === '今週') {
        result = result.filter(arrangement => {
          const requiredDate = new Date(arrangement.requiredDate)
          return requiredDate >= startOfWeek && requiredDate <= endOfWeek
        })
      } else if (filters.requiredDate === '今月') {
        result = result.filter(arrangement => {
          const requiredDate = new Date(arrangement.requiredDate)
          return requiredDate >= startOfMonth && requiredDate <= endOfMonth
        })
      } else if (filters.requiredDate === '次月') {
        result = result.filter(arrangement => {
          const requiredDate = new Date(arrangement.requiredDate)
          return requiredDate >= startOfNextMonth && requiredDate <= endOfNextMonth
        })
      } else if (filters.requiredDate === '期限超過') {
        result = result.filter(arrangement => {
          const requiredDate = new Date(arrangement.requiredDate)
          return requiredDate < today && arrangement.status !== '手配完了'
        })
      }
    }
    
    // 検索フィルター
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      result = result.filter(arrangement => {
        return (
          arrangement.name.toLowerCase().includes(searchLower) ||
          arrangement.code.toLowerCase().includes(searchLower) ||
          arrangement.description.toLowerCase().includes(searchLower) ||
          arrangement.client.toLowerCase().includes(searchLower) ||
          arrangement.manager.toLowerCase().includes(searchLower)
        )
      })
    }
    
    // 未完了のみ表示
    if (incompleteOnly) {
      result = result.filter(arrangement => arrangement.status !== '手配完了' && arrangement.status !== 'キャンセル')
    }
    
    return result
  }

  // フィルター変更ハンドラー
  const handleFilterChange = (filter: { type: string; value: string }) => {
    setActiveFilters(prev => ({
      ...prev,
      [filter.type]: filter.value
    }))
  }

  // フィルタリングされた手配
  const filteredArrangements = useMemo(() => {
    return getFilteredItems(arrangements, searchQuery, activeFilters, incompleteOnly);
  }, [arrangements, searchQuery, activeFilters, incompleteOnly]);
  
  // 検索ハンドラー
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <ManagementTemplate
      title="手配管理"
      items={arrangements}
      filteredItems={filteredArrangements}
      selectedIds={selectedArrangementIds}
      setSelectedIds={setSelectedArrangementIds}
      selectedItem={selectedArrangement}
      setSelectedItem={setSelectedArrangement}
      onSearch={handleSearch}
      searchPlaceholder="手配を検索..."
      incompleteOnly={incompleteOnly}
      onIncompleteChange={setIncompleteOnly}
      onAddNew={handleAddNew}
      onExport={handleExport}
      onDelete={handleDelete}
      filterPanel={
        <ArrangementFilterPanel 
          onFilterChange={handleFilterChange}
          activeFilters={activeFilters}
          arrangementCounts={arrangementCounts}
        />
      }
      listItemComponent={({ item, isSelected, onSelect, isChecked, onCheckChange }) => (
        <ArrangementListItem 
          arrangement={item}
          isSelected={isSelected}
          onSelect={onSelect}
          isChecked={isChecked}
          onCheckChange={onCheckChange}
          onToggleImportant={handleToggleImportant}
          onToggleUrgent={handleToggleUrgent}
          onToggleCompleted={handleToggleCompleted}
          onDelete={handleDeleteArrangement}
        />
      )}
      detailComponent={selectedArrangement && <ArrangementDetail selectedArrangement={selectedArrangement} />}
    />
  )
}
