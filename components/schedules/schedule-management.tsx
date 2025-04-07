"use client"

import { useState, useMemo } from "react"
import { ManagementPageTemplate } from "@/components/templates/management-page-template"
import { ScheduleListItem, type Schedule } from "./schedule-list-item"
import { ScheduleDetail } from "./schedule-detail"
import { ScheduleFilterPanel } from "./schedule-filter-panel"
import { Trash2 } from "lucide-react"

// ダミーデータ
const dummySchedules: Schedule[] = [
  {
    id: "1",
    title: "プロジェクト進捗ミーティング",
    date: "2025-04-10",
    status: "pending"
  },
  {
    id: "2",
    title: "クライアントとの打ち合わせ",
    date: "2025-04-12",
    status: "pending"
  },
  {
    id: "3",
    title: "チームビルディング",
    date: "2025-04-05",
    status: "completed"
  },
  {
    id: "4",
    title: "製品デモンストレーション",
    date: "2025-04-03",
    status: "cancelled"
  }
]

export function ScheduleManagement() {
  // 検索語の状態管理
  const [searchTerm, setSearchTerm] = useState<string>('')
  // 選択されたスケジュールIDの状態管理
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  // 未完了のみ表示
  const [incompleteOnly, setIncompleteOnly] = useState<boolean>(false)
  
  // フィルターの状態管理
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({
    status: 'すべて',
    participant: 'すべて'
  })
  
  const handleDeleteSchedules = (ids: string[]) => {
    // 実際の削除ロジックはここに実装
    console.log("削除するスケジュール:", ids)
  }
  
  const handleAddNew = () => {
    // 新規スケジュール追加ロジック
    console.log("新規スケジュール追加")
  }
  
  const handleExport = () => {
    // エクスポートロジック
    console.log("スケジュールをエクスポート")
  }

  // スケジュール数のカウント
  const scheduleCounts = useMemo(() => {
    return {
      total: dummySchedules.length,
      pending: dummySchedules.filter(s => s.status === 'pending').length,
      completed: dummySchedules.filter(s => s.status === 'completed').length,
      cancelled: dummySchedules.filter(s => s.status === 'cancelled').length
    }
  }, [])
  
  // フィルター設定
  const filterConfigs = [
    {
      id: "status",
      label: "ステータス",
      options: [
        { value: "すべて", label: "すべて" },
        { value: "pending", label: "予定" },
        { value: "completed", label: "完了" },
        { value: "cancelled", label: "中止" }
      ],
      defaultValue: "すべて"
    },
    {
      id: "participant",
      label: "参加者",
      options: [
        { value: "すべて", label: "すべて" },
        { value: "yamada", label: "山田太郎" },
        { value: "sato", label: "佐藤次郎" },
        { value: "suzuki", label: "鈴木花子" }
      ],
      defaultValue: "すべて"
    }
  ]
  
  // フィルター変更ハンドラー
  const handleFilterChange = (filter: { id: string; value: string }) => {
    setActiveFilters(prev => ({
      ...prev,
      [filter.id]: filter.value
    }))
  }
  
  // フィルター関数
  const getFilteredItems = (items: Schedule[], searchTerm: string, filters: Record<string, string>, incompleteOnly: boolean) => {
    return items.filter(item => {
      // 検索語でフィルタリング
      if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // ステータスフィルター
      if (filters.status && filters.status !== 'すべて' && item.status !== filters.status) {
        return false;
      }
      
      // 未完了のみフィルタリング
      if (incompleteOnly && item.status !== "pending") {
        return false;
      }
      
      return true;
    });
  };

  // 選択されたスケジュール
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null)

  // フィルタリングされたアイテム
  const filteredItems = useMemo(() => {
    return getFilteredItems(dummySchedules, searchTerm, activeFilters, incompleteOnly)
  }, [dummySchedules, searchTerm, activeFilters, incompleteOnly])

  // 選択ハンドラー
  const handleSelectItem = (item: Schedule) => {
    setSelectedSchedule(item)
  }

  // チェックボックス選択ハンドラー
  const handleSelectSchedule = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id])
    } else {
      setSelectedIds(prev => prev.filter(itemId => itemId !== id))
    }
  }

  return (
    <ManagementPageTemplate
      title="スケジュール管理"
      itemName="スケジュール"
      items={dummySchedules}
      listItemComponent={({ item, isSelected, onSelect }) => (
        <ScheduleListItem 
          item={item} 
          isSelected={isSelected} 
          onSelect={onSelect}
          selectionProps={{
            selectedIds,
            onSelectItem: handleSelectSchedule
          }}
        />
      )}
      detailComponent={({ selectedItem }) => (
        <ScheduleDetail selectedItem={selectedItem} />
      )}
      filterPanel={<ScheduleFilterPanel 
        onIncompleteOnlyChange={setIncompleteOnly}
      />}
      getFilteredItems={getFilteredItems}
      filterConfigs={filterConfigs}
      onAddNew={handleAddNew}
      onExport={handleExport}
      actionButtons={[
        {
          label: "削除",
          icon: <Trash2 className="h-4 w-4" />,
          variant: "destructive",
          onClick: handleDeleteSchedules
        }
      ]}
      selectedIds={selectedIds}
      onSelectionChange={setSelectedIds}
    />
  )
}
