"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FilterPanel, FilterSection } from "@/components/shared/filter-panel"

// フィルターパネルのプロパティ定義
interface FilterPanelProps {
  onFilterChange: (filter: { type: string; value: string }) => void
  activeFilters: Record<string, string>
  deliveryCounts: {
    total: number
    preparing: number
    shipping: number
    delivered: number
    cancelled: number
  }
}

export function DeliveryFilterPanel({ 
  onFilterChange, 
  activeFilters,
  deliveryCounts
}: FilterPanelProps) {
  // ステータスフィルターの選択状態
  const [selectedStatus, setSelectedStatus] = useState<string>(activeFilters.status || 'すべて')

  // ステータスフィルターの変更ハンドラー
  const handleStatusChange = (status: string) => {
    setSelectedStatus(status)
    onFilterChange({ type: 'status', value: status })
  }
  
  // 納期フィルターの変更ハンドラー
  const handleTimeframeChange = (timeframe: string) => {
    onFilterChange({ type: 'timeframe', value: timeframe })
  }
  
  // 金額フィルターの変更ハンドラー
  const handleAmountChange = (amount: string) => {
    onFilterChange({ type: 'amount', value: amount })
  }
  
  // フィルターリセットハンドラー
  const handleReset = () => {
    onFilterChange({ type: 'status', value: 'すべて' })
    onFilterChange({ type: 'timeframe', value: 'すべて' })
    onFilterChange({ type: 'amount', value: 'すべて' })
  }

  return (
    <FilterPanel title="フィルター" onReset={handleReset}>
      {/* ステータスフィルター */}
      <FilterSection title="ステータス" defaultOpen={true}>
        <div className="flex flex-col space-y-2">
            <Button
              variant={selectedStatus === 'すべて' ? 'secondary' : 'ghost'}
              className="justify-between h-auto py-2 px-3"
              onClick={() => handleStatusChange('すべて')}
            >
              <span>すべて</span>
              <Badge variant="secondary" className="ml-auto">
                {deliveryCounts.total}
              </Badge>
            </Button>
            
            <Button
              variant={selectedStatus === '納品準備中' ? 'secondary' : 'ghost'}
              className="justify-between h-auto py-2 px-3"
              onClick={() => handleStatusChange('納品準備中')}
            >
              <span>納品準備中</span>
              <Badge variant="secondary" className="ml-auto">
                {deliveryCounts.preparing}
              </Badge>
            </Button>
            
            <Button
              variant={selectedStatus === '配送中' ? 'secondary' : 'ghost'}
              className="justify-between h-auto py-2 px-3"
              onClick={() => handleStatusChange('配送中')}
            >
              <span>配送中</span>
              <Badge variant="secondary" className="ml-auto">
                {deliveryCounts.shipping}
              </Badge>
            </Button>
            
            <Button
              variant={selectedStatus === '納品済' ? 'secondary' : 'ghost'}
              className="justify-between h-auto py-2 px-3"
              onClick={() => handleStatusChange('納品済')}
            >
              <span>納品済</span>
              <Badge variant="secondary" className="ml-auto">
                {deliveryCounts.delivered}
              </Badge>
            </Button>
            
            <Button
              variant={selectedStatus === 'キャンセル' ? 'secondary' : 'ghost'}
              className="justify-between h-auto py-2 px-3"
              onClick={() => handleStatusChange('キャンセル')}
            >
              <span>キャンセル</span>
              <Badge variant="secondary" className="ml-auto">
                {deliveryCounts.cancelled}
              </Badge>
            </Button>
          </div>
        </FilterSection>
      
      {/* 納品期限フィルター */}
      <FilterSection title="納品期限" defaultOpen={true}>
        <div className="flex flex-col space-y-2">
            <Button
              variant={activeFilters.timeframe === 'すべて' ? 'secondary' : 'ghost'}
              className="justify-start h-auto py-2 px-3"
              onClick={() => onFilterChange({ type: 'timeframe', value: 'すべて' })}
            >
              すべて
            </Button>
            
            <Button
              variant={activeFilters.timeframe === '今週' ? 'secondary' : 'ghost'}
              className="justify-start h-auto py-2 px-3"
              onClick={() => onFilterChange({ type: 'timeframe', value: '今週' })}
            >
              今週
            </Button>
            
            <Button
              variant={activeFilters.timeframe === '今月' ? 'secondary' : 'ghost'}
              className="justify-start h-auto py-2 px-3"
              onClick={() => onFilterChange({ type: 'timeframe', value: '今月' })}
            >
              今月
            </Button>
            
            <Button
              variant={activeFilters.timeframe === '次月' ? 'secondary' : 'ghost'}
              className="justify-start h-auto py-2 px-3"
              onClick={() => onFilterChange({ type: 'timeframe', value: '次月' })}
            >
              次月
            </Button>
          </div>
      </FilterSection>
      
      {/* 金額フィルター */}
      <FilterSection title="金額" defaultOpen={true}>
        <div className="flex flex-col space-y-2">
            <Button
              variant={activeFilters.amount === 'すべて' ? 'secondary' : 'ghost'}
              className="justify-start h-auto py-2 px-3"
              onClick={() => onFilterChange({ type: 'amount', value: 'すべて' })}
            >
              すべて
            </Button>
            
            <Button
              variant={activeFilters.amount === '～100万円' ? 'secondary' : 'ghost'}
              className="justify-start h-auto py-2 px-3"
              onClick={() => onFilterChange({ type: 'amount', value: '～100万円' })}
            >
              ～100万円
            </Button>
            
            <Button
              variant={activeFilters.amount === '～500万円' ? 'secondary' : 'ghost'}
              className="justify-start h-auto py-2 px-3"
              onClick={() => onFilterChange({ type: 'amount', value: '～500万円' })}
            >
              ～500万円
            </Button>
            
            <Button
              variant={activeFilters.amount === '～1000万円' ? 'secondary' : 'ghost'}
              className="justify-start h-auto py-2 px-3"
              onClick={() => onFilterChange({ type: 'amount', value: '～1000万円' })}
            >
              ～1000万円
            </Button>
            
            <Button
              variant={activeFilters.amount === '1000万円～' ? 'secondary' : 'ghost'}
              className="justify-start h-auto py-2 px-3"
              onClick={() => onFilterChange({ type: 'amount', value: '1000万円～' })}
            >
              1000万円～
            </Button>
          </div>
      </FilterSection>
    </FilterPanel>
  )
}
