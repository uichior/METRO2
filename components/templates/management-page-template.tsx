"use client"

import { useState, useEffect, useRef, type ReactNode, useMemo } from "react"
import { ManagementLayout } from "@/components/common/management-layout"
import { ManagementList, ActionButton } from "@/components/common/management-list"
import { Button } from "@/components/ui/button"
import { ManagementDetail } from "@/components/common/management-detail"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Search, Download, Plus, ChevronDown, User } from "lucide-react"
import { CreditCard } from "lucide-react"
import { Input } from "@/components/ui/input"
import { SimpleSearch } from "@/components/common/simple-search"
import { Switch } from "@/components/ui/switch"

// 基本的なアイテムの型定義（必要に応じて拡張）
export interface BaseItem {
  id: string
  [key: string]: any
}

// テンプレートのプロパティ定義
export interface ManagementPageTemplateProps<T extends BaseItem> {
  // ページタイトルと説明
  title: string
  itemName: string
  
  // データ関連
  items: T[]
  getFilteredItems?: (items: T[], searchTerm: string, filters: Record<string, string>) => T[]
  
  // コンポーネント
  filterPanel?: ReactNode // フィルターパネル
  listPanel?: ReactNode // リストパネル
  listItemComponent?: (props: { item: T; isSelected: boolean; onSelect: (item: T) => void }) => ReactNode
  detailComponent: (props: { selectedItem: T | null }) => ReactNode
  
  // アクション
  onAddNew?: () => void
  onExport?: () => void
  actionButtons?: ActionButton[]
  
  // 選択状態
  selectedIds?: string[]
  onSelectionChange?: (selectedIds: string[]) => void
  
  // フィルター設定
  filterConfigs?: {
    id: string
    label: string
    options: { value: string; label: string }[]
    defaultValue?: string
  }[]
  
  // 合計金額計算関数
  calculateTotalAmount?: (items: T[]) => number
}

export function ManagementPageTemplate<T extends BaseItem>({
  title,
  itemName,
  items,
  getFilteredItems,
  filterPanel,
  listPanel,
  listItemComponent,
  detailComponent,
  onAddNew,
  onExport,
  actionButtons = [],
  selectedIds = [],
  onSelectionChange,
  filterConfigs = [],
  calculateTotalAmount,
}: ManagementPageTemplateProps<T>) {
  // 状態管理
  const [selectedItem, setSelectedItem] = useState<T | null>(items.length > 0 ? items[0] : null)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({
    status: 'すべて',
    assignee: 'すべて',
    timeframe: 'すべて',
    year: '',
    month: ''
  })
  const [selectedItems, setSelectedItems] = useState<string[]>(selectedIds || [])
  const [incompleteOnly, setIncompleteOnly] = useState(true)
  
  // 親コンポーネントからの選択状態を反映
  useEffect(() => {
    // JSON文字列化して比較し、変更がある場合のみ更新
    const currentIds = JSON.stringify(selectedIds || [])
    const storedIds = JSON.stringify(selectedItems)
    
    if (currentIds !== storedIds) {
      setSelectedItems(selectedIds || [])
    }
  }, [selectedIds])

  // フィルタリングされたアイテムを取得
  const filteredItems = useMemo(() => {
    // カスタムフィルター関数があれば使用
    if (getFilteredItems) {
      return getFilteredItems(items, searchTerm, activeFilters);
    }
    
    // デフォルトのフィルタリングロジック
    return items.filter(item => {
      // 検索キーワードフィルター
      if (searchTerm && searchTerm.trim() !== '') {
        const searchLower = searchTerm.toLowerCase().trim();
        const searchableFields = ['id', 'name', 'title', 'description', 'client', 'status'];
        
        // 検索可能なフィールドに検索語が含まれているか確認
        const matchesSearch = searchableFields.some(field => {
          if (item[field]) {
            return String(item[field]).toLowerCase().includes(searchLower);
          }
          return false;
        });
        
        if (!matchesSearch) {
          return false;
        }
      }
      
      // 年フィルター
      if (activeFilters.year && activeFilters.year !== '') {
        const yearFilter = activeFilters.year.replace(/[^0-9]/g, '');
        if (yearFilter && item.startDate) {
          const itemYear = new Date(item.startDate).getFullYear().toString();
          if (itemYear !== yearFilter) {
            return false;
          }
        }
      }
      
      // 月フィルター
      if (activeFilters.month && activeFilters.month !== '') {
        const monthFilter = activeFilters.month.replace(/[^0-9]/g, '');
        if (monthFilter && item.startDate) {
          const itemMonth = (new Date(item.startDate).getMonth() + 1).toString();
          if (itemMonth !== monthFilter) {
            return false;
          }
        }
      }
      
      // 担当者フィルター
      if (activeFilters.assignee && activeFilters.assignee !== '' && activeFilters.assignee !== 'すべて') {
        if (item.assignee !== activeFilters.assignee) {
          return false;
        }
      }
      
      // 未完のみフィルター
      if (incompleteOnly && item.status === '完了') {
        return false;
      }
      
      return true;
    });
  }, [items, searchTerm, activeFilters, incompleteOnly, getFilteredItems])

  // フィルタリング後、選択アイテムがなくなった場合は最初のアイテムを選択
  useEffect(() => {
    if (filteredItems.length > 0 && !selectedItem) {
      setSelectedItem(filteredItems[0])
    } else if (filteredItems.length > 0 && selectedItem && !filteredItems.some(item => item.id === selectedItem.id)) {
      setSelectedItem(filteredItems[0])
    }
  }, [filteredItems, selectedItem])

  // フィルターの変更を処理
  const handleFilterChange = (filterId: string, value: string) => {
    setActiveFilters((prev: Record<string, string>) => ({
      ...prev,
      [filterId]: value
    }))
  }
  
  // 通貨フォーマット関数
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(value)
  }

  // 選択アイテムの切り替え
  const handleSelectItem = (item: T) => {
    setSelectedItem(item)
  }
  
  // 選択状態の変更を親コンポーネントに伝える
  const prevSelectedItemsRef = useRef<string[]>([])
  
  useEffect(() => {
    // 前回の値と比較して変更がある場合のみ通知
    const prevSelectedItems = prevSelectedItemsRef.current
    const currentSelectedItems = selectedItems
    
    if (onSelectionChange && 
        JSON.stringify(currentSelectedItems) !== JSON.stringify(prevSelectedItems)) {
      prevSelectedItemsRef.current = [...currentSelectedItems]
      onSelectionChange(currentSelectedItems)
    }
  }, [selectedItems, onSelectionChange])

  // 選択アイテムの切り替え
  const toggleItemSelection = (itemId: string, checked: boolean) => {
    setSelectedItems((prev) => {
      if (checked) {
        if (prev.includes(itemId)) return prev
        return [...prev, itemId]
      } else {
        return prev.filter((id) => id !== itemId)
      }
    })
  }

  // 全選択の切り替え
  const toggleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredItems.map((item) => item.id))
    }
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      {/* ヘッダー */}
      <div className="flex-none h-14 border-b border-border bg-background">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">{title}</h1>
            
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8">
                    {activeFilters.year || '全年'}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onClick={() => {
                    setActiveFilters(prev => ({ ...prev, year: '' }));
                  }}>全年</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    setActiveFilters(prev => ({ ...prev, year: '2025年' }));
                  }}>2025年</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    setActiveFilters(prev => ({ ...prev, year: '2024年' }));
                  }}>2024年</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    setActiveFilters(prev => ({ ...prev, year: '2023年' }));
                  }}>2023年</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8">
                    {activeFilters.month || '全月'}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onClick={() => {
                    setActiveFilters(prev => ({ ...prev, month: '' }));
                  }}>全月</DropdownMenuItem>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                    <DropdownMenuItem key={month} onClick={() => {
                      setActiveFilters(prev => ({ ...prev, month: `${month}月` }));
                    }}>{month}月</DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8">
                    <User className="mr-1 h-4 w-4" />
                    {activeFilters.assignee || '全担当者'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onClick={() => handleFilterChange('assignee', '')}>全担当者</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFilterChange('assignee', '田中')}>田中</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFilterChange('assignee', '鈴木')}>鈴木</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFilterChange('assignee', '佐藤')}>佐藤</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="プロジェクトを検索..."
                className="h-8 w-[200px] pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm">未完のみ</span>
              <Checkbox 
                checked={incompleteOnly} 
                onCheckedChange={(checked) => setIncompleteOnly(!!checked)}
              />
            </div>
            
            {onAddNew && (
              <Button size="sm" className="h-8 bg-black text-white hover:bg-black/90" onClick={onAddNew}>
                <Plus className="mr-1 h-4 w-4" />
                新規
              </Button>
            )}
            
            {onExport && (
              <Button size="sm" variant="outline" className="h-8" onClick={onExport}>
                <Download className="mr-1 h-4 w-4" />
                CSV
              </Button>
            )}
          </div>
        </div>
      </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-gray-100 rounded-full py-1 px-3">
              <div className="bg-black rounded-full p-1">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="text-sm font-medium">株式会社grayscale</div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="プロジェクトを検索..."
              className="h-8 w-[200px] pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm">未完のみ</span>
            <Checkbox 
              checked={incompleteOnly} 
              onCheckedChange={(checked) => setIncompleteOnly(!!checked)}
            />
          </div>
          
          {onAddNew && (
            <Button size="sm" className="h-8 bg-black text-white hover:bg-black/90" onClick={onAddNew}>
              <Plus className="mr-1 h-4 w-4" />
              新規
            </Button>
          )}
          
          {onExport && (
            <Button size="sm" variant="outline" className="h-8" onClick={onExport}>
              <Download className="mr-1 h-4 w-4" />
              CSV
            </Button>
          )}
        </div>
      </div>
    </div>
    
    <div className="flex flex-1 overflow-hidden">
      {/* フィルターパネル */}
      {filterPanel && (
        <div className="w-80 h-full border-r border-border overflow-y-auto">
          {filterPanel}
        </div>
      )}
      
      {/* リストパネル */}
      {listPanel ? (
        // カスタムリストパネルがある場合はそれを使用
        <div className="w-[36rem] h-full border-r border-border overflow-hidden relative">
          {listPanel}
        </div>
                  ))}
                  
                  {actionButtons.length > 3 && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="outline" disabled={selectedIds.length === 0} className={selectedIds.length === 0 ? 'opacity-50' : ''}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {actionButtons.slice(3).map((button, index) => (
                          <DropdownMenuItem 
                            key={index}
                            onClick={() => button.onClick(selectedIds)}
                            disabled={button.disabled}
                            className="flex items-center gap-2"
                          >
                            {button.icon}
                            {button.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* リストパネルのフィルターは削除 */}
          
          <div className="flex-1 overflow-y-auto">
            <div className="divide-y divide-border">
              {listItemComponent && filteredItems.map((item) => {
                const isItemSelected = selectedItems.includes(item.id);
                return (
                  <div key={item.id} className="relative">
                    <div className={`${isItemSelected ? 'bg-muted/80' : ''}`}>
                      {listItemComponent({ 
                        item, 
                        isSelected: selectedItem?.id === item.id,
                        onSelect: () => handleSelectItem(item)
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="flex-none p-3 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground">
                {filteredItems.length}件の{itemName}
              </div>
              {calculateTotalAmount && (
                <div className="flex items-center gap-1 text-sm font-medium">
                  <CreditCard className="h-3 w-3 text-muted-foreground" />
                  <span>合計: {formatCurrency(calculateTotalAmount(filteredItems))}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // リストコンポーネントが提供されていない場合
        <div className="w-80 h-full border-r border-border overflow-hidden flex items-center justify-center">
          <div className="text-muted-foreground">リストコンポーネントが設定されていません</div>
        </div>
      )}
      
      {/* 詳細パネル */}
      <div className="w-full h-full overflow-hidden relative">
        {detailComponent({ selectedItem })}      
      </div>
    </div>
  )
}
