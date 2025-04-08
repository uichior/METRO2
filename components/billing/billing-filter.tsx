"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FilterPanel, FilterSection } from "@/components/shared/filter-panel"

// 請求書のステータスカウント型
interface BillingCounts {
  total: number
  draft: number
  issued: number
  paid: number
  overdue: number
}

// フィルターパネルのプロパティ
interface FilterPanelProps {
  onFilterChange: (filter: { type: string; value: string }) => void
  activeFilters: Record<string, string>
  billingCounts: BillingCounts
}

export function BillingFilterPanel({ onFilterChange, activeFilters, billingCounts }: FilterPanelProps) {
  // リセット処理
  const handleReset = () => {
    onFilterChange({ type: 'status', value: 'すべて' })
    onFilterChange({ type: 'dueDate', value: 'すべて' })
    onFilterChange({ type: 'amount', value: 'すべて' })
  }

  return (
    <FilterPanel title="フィルター" onReset={handleReset}>
      {/* ステータスフィルター */}
      <FilterSection title="ステータス" defaultOpen={true}>
        <div className="space-y-2">
            <Button
              variant={activeFilters.status === 'すべて' ? "secondary" : "ghost"}
              className="w-full justify-between h-auto py-2 px-3"
              onClick={() => onFilterChange({ type: 'status', value: 'すべて' })}
            >
              <span>すべて</span>
              <Badge variant="outline">{billingCounts.total}</Badge>
            </Button>
            <Button
              variant={activeFilters.status === '下書き' ? "secondary" : "ghost"}
              className="w-full justify-between h-auto py-2 px-3"
              onClick={() => onFilterChange({ type: 'status', value: '下書き' })}
            >
              <span>下書き</span>
              <Badge variant="outline">{billingCounts.draft}</Badge>
            </Button>
            <Button
              variant={activeFilters.status === '発行済' ? "secondary" : "ghost"}
              className="w-full justify-between h-auto py-2 px-3"
              onClick={() => onFilterChange({ type: 'status', value: '発行済' })}
            >
              <span>発行済</span>
              <Badge variant="outline">{billingCounts.issued}</Badge>
            </Button>
            <Button
              variant={activeFilters.status === '支払済' ? "secondary" : "ghost"}
              className="w-full justify-between h-auto py-2 px-3"
              onClick={() => onFilterChange({ type: 'status', value: '支払済' })}
            >
              <span>支払済</span>
              <Badge variant="outline">{billingCounts.paid}</Badge>
            </Button>
            <Button
              variant={activeFilters.status === '期限超過' ? "secondary" : "ghost"}
              className="w-full justify-between h-auto py-2 px-3"
              onClick={() => onFilterChange({ type: 'status', value: '期限超過' })}
            >
              <span>期限超過</span>
              <Badge variant="outline">{billingCounts.overdue}</Badge>
            </Button>
          </div>
      </FilterSection>
      
      {/* 支払期限フィルター */}
      <FilterSection title="支払期限" defaultOpen={true}>
        <div className="space-y-2">
            <Button
              variant={activeFilters.dueDate === 'すべて' ? "secondary" : "ghost"}
              className="w-full justify-start h-auto py-2 px-3"
              onClick={() => onFilterChange({ type: 'dueDate', value: 'すべて' })}
            >
              すべて
            </Button>
            <Button
              variant={activeFilters.dueDate === '今週' ? "secondary" : "ghost"}
              className="w-full justify-start h-auto py-2 px-3"
              onClick={() => onFilterChange({ type: 'dueDate', value: '今週' })}
            >
              今週
            </Button>
            <Button
              variant={activeFilters.dueDate === '今月' ? "secondary" : "ghost"}
              className="w-full justify-start h-auto py-2 px-3"
              onClick={() => onFilterChange({ type: 'dueDate', value: '今月' })}
            >
              今月
            </Button>
            <Button
              variant={activeFilters.dueDate === '次月' ? "secondary" : "ghost"}
              className="w-full justify-start h-auto py-2 px-3"
              onClick={() => onFilterChange({ type: 'dueDate', value: '次月' })}
            >
              次月
            </Button>
          </div>
      </FilterSection>
      
      {/* 金額フィルター */}
      <FilterSection title="金額" defaultOpen={true}>
        <div className="space-y-2">
            <Button
              variant={activeFilters.amount === 'すべて' ? "secondary" : "ghost"}
              className="w-full justify-start h-auto py-2 px-3"
              onClick={() => onFilterChange({ type: 'amount', value: 'すべて' })}
            >
              すべて
            </Button>
            <Button
              variant={activeFilters.amount === '～100万円' ? "secondary" : "ghost"}
              className="w-full justify-start h-auto py-2 px-3"
              onClick={() => onFilterChange({ type: 'amount', value: '～100万円' })}
            >
              ～100万円
            </Button>
            <Button
              variant={activeFilters.amount === '～500万円' ? "secondary" : "ghost"}
              className="w-full justify-start h-auto py-2 px-3"
              onClick={() => onFilterChange({ type: 'amount', value: '～500万円' })}
            >
              ～500万円
            </Button>
            <Button
              variant={activeFilters.amount === '～1000万円' ? "secondary" : "ghost"}
              className="w-full justify-start h-auto py-2 px-3"
              onClick={() => onFilterChange({ type: 'amount', value: '～1000万円' })}
            >
              ～1000万円
            </Button>
            <Button
              variant={activeFilters.amount === '1000万円～' ? "secondary" : "ghost"}
              className="w-full justify-start h-auto py-2 px-3"
              onClick={() => onFilterChange({ type: 'amount', value: '1000万円～' })}
            >
              1000万円～
            </Button>
          </div>
      </FilterSection>
    </FilterPanel>
  )
}
