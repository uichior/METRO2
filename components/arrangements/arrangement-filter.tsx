"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { FilterPanel, FilterSection } from "@/components/shared/filter-panel"
import { cn } from "@/lib/utils"

// フィルターパネルのプロパティ
interface FilterPanelProps {
  onFilterChange: (filter: { type: string; value: string }) => void
  activeFilters: Record<string, string>
  arrangementCounts: {
    total: number
    pending: number
    inProgress: number
    completed: number
    cancelled: number
  }
}

export function ArrangementFilterPanel({
  onFilterChange,
  activeFilters,
  arrangementCounts
}: FilterPanelProps) {
  // リセット処理
  const handleReset = () => {
    onFilterChange({ type: 'status', value: 'すべて' })
    onFilterChange({ type: 'requiredDate', value: 'すべて' })
    onFilterChange({ type: 'progress', value: 'すべて' })
  }

  return (
    <FilterPanel title="フィルター" onReset={handleReset}>
      {/* ステータスフィルター */}
      <FilterSection title="ステータス" defaultOpen={true}>
        <div className="space-y-2">
            <div
              className={cn(
                "flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm",
                activeFilters.status === "すべて" ? "bg-muted" : "hover:bg-muted/50"
              )}
              onClick={() => onFilterChange({ type: "status", value: "すべて" })}
            >
              <span>すべて</span>
              <Badge variant="outline">{arrangementCounts.total}</Badge>
            </div>
            <div
              className={cn(
                "flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm",
                activeFilters.status === "未手配" ? "bg-muted" : "hover:bg-muted/50"
              )}
              onClick={() => onFilterChange({ type: "status", value: "未手配" })}
            >
              <span>未手配</span>
              <Badge variant="outline">{arrangementCounts.pending}</Badge>
            </div>
            <div
              className={cn(
                "flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm",
                activeFilters.status === "手配中" ? "bg-muted" : "hover:bg-muted/50"
              )}
              onClick={() => onFilterChange({ type: "status", value: "手配中" })}
            >
              <span>手配中</span>
              <Badge variant="outline">{arrangementCounts.inProgress}</Badge>
            </div>
            <div
              className={cn(
                "flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm",
                activeFilters.status === "手配完了" ? "bg-muted" : "hover:bg-muted/50"
              )}
              onClick={() => onFilterChange({ type: "status", value: "手配完了" })}
            >
              <span>手配完了</span>
              <Badge variant="outline">{arrangementCounts.completed}</Badge>
            </div>
            <div
              className={cn(
                "flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm",
                activeFilters.status === "キャンセル" ? "bg-muted" : "hover:bg-muted/50"
              )}
              onClick={() => onFilterChange({ type: "status", value: "キャンセル" })}
            >
              <span>キャンセル</span>
              <Badge variant="outline">{arrangementCounts.cancelled}</Badge>
            </div>
          </div>
      </FilterSection>

      {/* 納期フィルター */}
      <FilterSection title="納期" defaultOpen={true}>
        <div className="space-y-2">
            <div
              className={cn(
                "flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm",
                activeFilters.requiredDate === "すべて" ? "bg-muted" : "hover:bg-muted/50"
              )}
              onClick={() => onFilterChange({ type: "requiredDate", value: "すべて" })}
            >
              <span>すべて</span>
            </div>
            <div
              className={cn(
                "flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm",
                activeFilters.requiredDate === "今週" ? "bg-muted" : "hover:bg-muted/50"
              )}
              onClick={() => onFilterChange({ type: "requiredDate", value: "今週" })}
            >
              <span>今週</span>
            </div>
            <div
              className={cn(
                "flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm",
                activeFilters.requiredDate === "今月" ? "bg-muted" : "hover:bg-muted/50"
              )}
              onClick={() => onFilterChange({ type: "requiredDate", value: "今月" })}
            >
              <span>今月</span>
            </div>
            <div
              className={cn(
                "flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm",
                activeFilters.requiredDate === "次月" ? "bg-muted" : "hover:bg-muted/50"
              )}
              onClick={() => onFilterChange({ type: "requiredDate", value: "次月" })}
            >
              <span>次月</span>
            </div>
            <div
              className={cn(
                "flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm",
                activeFilters.requiredDate === "期限超過" ? "bg-muted" : "hover:bg-muted/50"
              )}
              onClick={() => onFilterChange({ type: "requiredDate", value: "期限超過" })}
            >
              <span>期限超過</span>
            </div>
          </div>
      </FilterSection>

      {/* 進捗フィルター */}
      <FilterSection title="進捗状況" defaultOpen={true}>
        <div className="space-y-2">
            <div
              className={cn(
                "flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm",
                activeFilters.progress === "すべて" ? "bg-muted" : "hover:bg-muted/50"
              )}
              onClick={() => onFilterChange({ type: "progress", value: "すべて" })}
            >
              <span>すべて</span>
            </div>
            <div
              className={cn(
                "flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm",
                activeFilters.progress === "0%" ? "bg-muted" : "hover:bg-muted/50"
              )}
              onClick={() => onFilterChange({ type: "progress", value: "0%" })}
            >
              <span>0% (未着手)</span>
            </div>
            <div
              className={cn(
                "flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm",
                activeFilters.progress === "1-50%" ? "bg-muted" : "hover:bg-muted/50"
              )}
              onClick={() => onFilterChange({ type: "progress", value: "1-50%" })}
            >
              <span>1-50% (初期段階)</span>
            </div>
            <div
              className={cn(
                "flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm",
                activeFilters.progress === "51-99%" ? "bg-muted" : "hover:bg-muted/50"
              )}
              onClick={() => onFilterChange({ type: "progress", value: "51-99%" })}
            >
              <span>51-99% (後期段階)</span>
            </div>
            <div
              className={cn(
                "flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm",
                activeFilters.progress === "100%" ? "bg-muted" : "hover:bg-muted/50"
              )}
              onClick={() => onFilterChange({ type: "progress", value: "100%" })}
            >
              <span>100% (完了)</span>
            </div>
          </div>
      </FilterSection>
    </FilterPanel>
  )
}
