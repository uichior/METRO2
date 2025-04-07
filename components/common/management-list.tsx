"use client"

import React, { useState, useEffect, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, FileDown, MoreHorizontal, Copy, Trash, Archive, Mail, Tag, CheckSquare, Edit, Share } from "lucide-react"

export interface FilterOption {
  value: string
  label: string
}

export interface FilterConfig {
  id: string
  label: string
  options: FilterOption[]
  defaultValue?: string
}

export interface ActionButton {
  label: string
  icon: ReactNode
  onClick: (selectedIds: string[]) => void
  color?: string
  disabled?: boolean
}

export interface ListItem {
  id: string
  [key: string]: any
}

interface ManagementListProps {
  itemName: string
  items: ListItem[]
  children: ReactNode
  filters?: FilterConfig[]
  onSearch?: (term: string) => void
  onFilterChange?: (filterId: string, value: string) => void
  onAddNew?: () => void
  onExport?: () => void
  selectedCount?: number
  totalCount?: number
  actionButtons?: ActionButton[]
  onSelectionChange?: (selectedIds: string[]) => void
}

export function ManagementList({
  itemName,
  items = [],
  children,
  filters = [],
  onSearch,
  onFilterChange,
  onAddNew,
  onExport,
  selectedCount: propSelectedCount,
  totalCount: propTotalCount,
  actionButtons = [],
  onSelectionChange,
}: ManagementListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  
  // 選択状態を管理
  const totalCount = propTotalCount || items.length
  const selectedCount = propSelectedCount || selectedIds.length

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchTerm)
  }
  
  // 全選択/解除の処理
  const handleSelectAll = () => {
    if (selectedIds.length === items.length) {
      // 全解除
      setSelectedIds([])
    } else {
      // 全選択
      setSelectedIds(items.map(item => item.id))
    }
  }
  
  // 個別アイテムの選択/解除
  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id])
    } else {
      setSelectedIds(prev => prev.filter(itemId => itemId !== id))
    }
  }
  
  // 選択状態が変更されたら親コンポーネントに通知
  useEffect(() => {
    onSelectionChange?.(selectedIds)
  }, [selectedIds, onSelectionChange])
  
  // 子要素にselectionPropsを注入
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        // @ts-ignore - 子コンポーネントにselectionPropsを渡す
        selectionProps: {
          selectedIds,
          onSelectItem: handleSelectItem
        }
      })
    }
    return child
  })

  return (
    <div className="w-full md:w-[40%] border-r flex flex-col overflow-hidden bg-white">
      {/* フィルターとアクション領域 */}
      <div className="border-b p-3 bg-white">
        <div className="flex flex-wrap gap-2 mb-2">
          {/* 年フィルター */}
          <Select defaultValue="all-years" onValueChange={(v) => onFilterChange?.("year", v)}>
            <SelectTrigger className="w-[100px] h-9 text-sm bg-background">
              <SelectValue placeholder="全年" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-years">全年</SelectItem>
              <SelectItem value="2023">2023年</SelectItem>
              <SelectItem value="2022">2022年</SelectItem>
              <SelectItem value="2021">2021年</SelectItem>
            </SelectContent>
          </Select>

          {/* 月フィルター */}
          <Select defaultValue="all-months" onValueChange={(v) => onFilterChange?.("month", v)}>
            <SelectTrigger className="w-[100px] h-9 text-sm bg-background">
              <SelectValue placeholder="全月" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-months">全月</SelectItem>
              <SelectItem value="01">1月</SelectItem>
              <SelectItem value="02">2月</SelectItem>
              <SelectItem value="03">3月</SelectItem>
              <SelectItem value="04">4月</SelectItem>
              <SelectItem value="05">5月</SelectItem>
              <SelectItem value="06">6月</SelectItem>
              <SelectItem value="07">7月</SelectItem>
              <SelectItem value="08">8月</SelectItem>
              <SelectItem value="09">9月</SelectItem>
              <SelectItem value="10">10月</SelectItem>
              <SelectItem value="11">11月</SelectItem>
              <SelectItem value="12">12月</SelectItem>
            </SelectContent>
          </Select>

          {/* 検索ボックス */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <form onSubmit={handleSearch}>
              <Input
                type="search"
                placeholder={`検索...`}
                className="pl-8 h-9 text-sm bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>

          {/* 状態フィルター */}
          <Select defaultValue="all-status" onValueChange={(v) => onFilterChange?.("status", v)}>
            <SelectTrigger className="w-[120px] h-9 text-sm bg-background">
              <SelectValue placeholder="全状態" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-status">全状態</SelectItem>
              <SelectItem value="completed">納品完了</SelectItem>
              <SelectItem value="pending">出荷待ち</SelectItem>
              <SelectItem value="shipping">出荷準備中</SelectItem>
            </SelectContent>
          </Select>

          {/* 新規登録ボタン */}
          <Button onClick={onAddNew} className="h-9 px-3 bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-1" />
            新規{itemName}登録
          </Button>

          {/* CSVエクスポートボタン */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9 bg-background" onClick={onExport}>
                  <FileDown className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>CSVエクスポート</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* 選択状態表示とアクションボタン */}
      <div className="px-3 py-2 border-b bg-muted/30 flex items-center justify-between">
        <div className="flex items-center">
          <Checkbox 
            id="select-all" 
            className="mr-2 data-[state=checked]:bg-primary"
            checked={items.length > 0 && selectedIds.length === items.length}
            onCheckedChange={handleSelectAll}
          />
          <label htmlFor="select-all" className="text-sm font-medium">
            ALL ({selectedCount}/{totalCount})
          </label>
        </div>
        
        {/* 選択時のアクションボタン */}
        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2">
            {actionButtons.map((action, index) => (
              <Button 
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => action.onClick(selectedIds)}
                disabled={action.disabled}
                className={`h-8 px-2 ${action.color ? `text-${action.color}` : ''}`}
              >
                {action.icon}
                <span className="ml-1 text-xs">{action.label}</span>
              </Button>
            ))}
            
            {/* その他のアクションボタンが多い場合はドロップダウンで表示 */}
            {actionButtons.length > 3 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {actionButtons.slice(3).map((action, index) => (
                    <DropdownMenuItem 
                      key={index + 3}
                      onClick={() => action.onClick(selectedIds)}
                      disabled={action.disabled}
                    >
                      {action.icon}
                      <span className="ml-2">{action.label}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        )}
      </div>

      {/* リストコンテンツ */}
      <div className="flex-1 overflow-auto">{childrenWithProps}</div>

      {/* フッター */}
      <div className="border-t p-2 bg-muted/30 text-sm text-muted-foreground">表示: {totalCount}件</div>
    </div>
  )
}

