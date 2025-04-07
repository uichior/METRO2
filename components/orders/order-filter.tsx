"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface OrderFilterProps {
  onFilterChange: (filter: { type: string; value: string }) => void
  activeFilters: Record<string, string>
  orderCounts: {
    total: number
    ordered: number
    manufacturing: number
    shipping: number
    delivered: number
    cancelled: number
  }
}

export function FilterPanel({
  onFilterChange,
  activeFilters,
  orderCounts
}: OrderFilterProps) {
  // ステータスフィルターの選択状態
  const [selectedStatus, setSelectedStatus] = useState<string>(activeFilters.status || 'すべて')
  
  // 折りたたみ状態の管理
  const [statusOpen, setStatusOpen] = useState(true)
  const [timeframeOpen, setTimeframeOpen] = useState(true)
  const [amountOpen, setAmountOpen] = useState(true)

  // ステータスフィルターの変更ハンドラー
  const handleStatusChange = (status: string) => {
    setSelectedStatus(status)
    onFilterChange({ type: 'status', value: status })
  }

  return (
    <div className="space-y-6 p-6">
      {/* ステータスフィルター */}
      <Collapsible open={statusOpen} onOpenChange={setStatusOpen} className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">ステータス</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform",
                statusOpen ? "transform rotate-180" : ""
              )} />
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="flex flex-col space-y-2 pt-2">
          <Button
            variant={selectedStatus === 'すべて' ? 'secondary' : 'ghost'}
            className="justify-between h-auto py-2 px-3"
            onClick={() => handleStatusChange('すべて')}
          >
            <span>すべて</span>
            <Badge variant="secondary" className="ml-auto">
              {orderCounts.total}
            </Badge>
          </Button>
          
          <Button
            variant={selectedStatus === '受注済' ? 'secondary' : 'ghost'}
            className="justify-between h-auto py-2 px-3"
            onClick={() => handleStatusChange('受注済')}
          >
            <span>受注済</span>
            <Badge variant="secondary" className="ml-auto">
              {orderCounts.ordered}
            </Badge>
          </Button>
          
          <Button
            variant={selectedStatus === '製造中' ? 'secondary' : 'ghost'}
            className="justify-between h-auto py-2 px-3"
            onClick={() => handleStatusChange('製造中')}
          >
            <span>製造中</span>
            <Badge variant="secondary" className="ml-auto">
              {orderCounts.manufacturing}
            </Badge>
          </Button>
          
          <Button
            variant={selectedStatus === '出荷準備中' ? 'secondary' : 'ghost'}
            className="justify-between h-auto py-2 px-3"
            onClick={() => handleStatusChange('出荷準備中')}
          >
            <span>出荷準備中</span>
            <Badge variant="secondary" className="ml-auto">
              {orderCounts.shipping}
            </Badge>
          </Button>
          
          <Button
            variant={selectedStatus === '納品済' ? 'secondary' : 'ghost'}
            className="justify-between h-auto py-2 px-3"
            onClick={() => handleStatusChange('納品済')}
          >
            <span>納品済</span>
            <Badge variant="secondary" className="ml-auto">
              {orderCounts.delivered}
            </Badge>
          </Button>
          
          <Button
            variant={selectedStatus === 'キャンセル' ? 'secondary' : 'ghost'}
            className="justify-between h-auto py-2 px-3"
            onClick={() => handleStatusChange('キャンセル')}
          >
            <span>キャンセル</span>
            <Badge variant="secondary" className="ml-auto">
              {orderCounts.cancelled}
            </Badge>
          </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      {/* 納品期限フィルター */}
      <Collapsible open={timeframeOpen} onOpenChange={setTimeframeOpen} className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">納品期限</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform",
                timeframeOpen ? "transform rotate-180" : ""
              )} />
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="flex flex-col space-y-2 pt-2">
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
        </CollapsibleContent>
      </Collapsible>
      
      {/* 金額フィルター */}
      <Collapsible open={amountOpen} onOpenChange={setAmountOpen} className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">金額</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform",
                amountOpen ? "transform rotate-180" : ""
              )} />
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="flex flex-col space-y-2 pt-2">
          <Button
            variant={activeFilters.amount === 'すべて' ? 'secondary' : 'ghost'}
            className="justify-start h-auto py-2 px-3"
            onClick={() => onFilterChange({ type: 'amount', value: 'すべて' })}
          >
            すべて
          </Button>
          
          <Button
            variant={activeFilters.amount === '100万円未満' ? 'secondary' : 'ghost'}
            className="justify-start h-auto py-2 px-3"
            onClick={() => onFilterChange({ type: 'amount', value: '100万円未満' })}
          >
            100万円未満
          </Button>
          
          <Button
            variant={activeFilters.amount === '100万円以上500万円未満' ? 'secondary' : 'ghost'}
            className="justify-start h-auto py-2 px-3"
            onClick={() => onFilterChange({ type: 'amount', value: '100万円以上500万円未満' })}
          >
            100万円以上500万円未満
          </Button>
          
          <Button
            variant={activeFilters.amount === '500万円以上' ? 'secondary' : 'ghost'}
            className="justify-start h-auto py-2 px-3"
            onClick={() => onFilterChange({ type: 'amount', value: '500万円以上' })}
          >
            500万円以上
          </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
