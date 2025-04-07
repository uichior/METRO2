"use client"

import { useState } from "react"
import { Package, DollarSign, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  ManagementPageTemplate, 
  type BaseItem 
} from "./management-page-template"
import { ManagementListItem } from "./management-list-item"
import { ManagementDetailView, type DetailTab } from "./management-detail-view"

// サンプルアイテムの型定義
interface SampleItem extends BaseItem {
  name: string
  code: string
  status: string
  price: number
  quantity: number
  supplier: string
  date: string
}

// サンプルデータ
const sampleItems: SampleItem[] = [
  {
    id: "ITEM-001",
    name: "サンプル商品A",
    code: "A001",
    status: "準備中",
    price: 10000,
    quantity: 5,
    supplier: "株式会社サンプル",
    date: "2025-04-01"
  },
  {
    id: "ITEM-002",
    name: "サンプル商品B",
    code: "B002",
    status: "完了",
    price: 15000,
    quantity: 3,
    supplier: "株式会社テスト",
    date: "2025-04-02"
  },
  {
    id: "ITEM-003",
    name: "サンプル商品C",
    code: "C003",
    status: "保留中",
    price: 8000,
    quantity: 10,
    supplier: "株式会社サンプル",
    date: "2025-04-03"
  }
]

// フィルター設定
const filterConfigs = [
  {
    id: "status",
    label: "ステータス",
    options: [
      { value: "", label: "すべて" },
      { value: "準備中", label: "準備中" },
      { value: "完了", label: "完了" },
      { value: "保留中", label: "保留中" }
    ]
  }
]

export function SampleManagementPage() {
  // 新規作成ハンドラー
  const handleAddNew = () => {
    console.log("新規作成ボタンがクリックされました")
  }

  // エクスポートハンドラー
  const handleExport = () => {
    console.log("エクスポートボタンがクリックされました")
  }

  // フィルタリング処理
  const getFilteredItems = (
    items: SampleItem[], 
    searchTerm: string, 
    filters: Record<string, string>
  ) => {
    return items.filter(item => {
      // 検索条件
      if (
        searchTerm && 
        !item.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !item.code.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false
      }
      
      // ステータスフィルター
      if (filters.status && item.status !== filters.status) {
        return false
      }
      
      return true
    })
  }

  // リストアイテムコンポーネント
  const ListItemComponent = ({ 
    item, 
    isSelected, 
    onSelect 
  }: { 
    item: SampleItem; 
    isSelected: boolean; 
    onSelect: (item: SampleItem) => void 
  }) => {
    // ステータスに応じたバリアント
    const getStatusVariant = (status: string) => {
      switch (status) {
        case "準備中": return "warning"
        case "完了": return "success"
        case "保留中": return "secondary"
        default: return "default"
      }
    }

    return (
      <ManagementListItem
        id={item.id}
        title={item.name}
        subtitle={`${item.code}`}
        status={{
          label: item.status,
          variant: getStatusVariant(item.status)
        }}
        isSelected={isSelected}
        onSelect={() => onSelect(item)}
        metadata={[
          {
            label: "単価",
            value: `${item.price.toLocaleString()}円`,
            icon: <DollarSign className="h-3 w-3 text-muted-foreground" />
          },
          {
            label: "数量",
            value: item.quantity,
            icon: <Package className="h-3 w-3 text-muted-foreground" />
          },
          {
            label: "日付",
            value: new Date(item.date).toLocaleDateString("ja-JP"),
            icon: <Calendar className="h-3 w-3 text-muted-foreground" />
          }
        ]}
        rightContent={
          <div className="flex items-center">
            <User className="h-3 w-3 mr-1" />
            {item.supplier}
          </div>
        }
      />
    )
  }

  // 詳細コンポーネント
  const DetailComponent = ({ 
    selectedItem 
  }: { 
    selectedItem: SampleItem | null 
  }) => {
    if (!selectedItem) {
      return <ManagementDetailView />
    }

    // ステータスに応じたバリアント
    const getStatusVariant = (status: string) => {
      switch (status) {
        case "準備中": return "warning"
        case "完了": return "success"
        case "保留中": return "secondary"
        default: return "default"
      }
    }

    // タブ定義
    const tabs: DetailTab[] = [
      {
        id: "basic",
        label: "基本情報",
        content: (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">商品コード</div>
                <Input value={selectedItem.code} readOnly className="bg-background border-muted" />
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">商品名</div>
                <Input value={selectedItem.name} readOnly className="bg-background border-muted" />
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">単価</div>
                <Input value={`${selectedItem.price.toLocaleString()}円`} readOnly className="bg-background border-muted" />
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">数量</div>
                <Input value={selectedItem.quantity.toString()} readOnly className="bg-background border-muted" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">仕入先</div>
                <Input value={selectedItem.supplier} readOnly className="bg-background border-muted" />
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">日付</div>
                <Input 
                  value={new Date(selectedItem.date).toLocaleDateString("ja-JP")} 
                  readOnly 
                  className="bg-background border-muted" 
                />
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">合計金額</div>
                <Input 
                  value={`${(selectedItem.price * selectedItem.quantity).toLocaleString()}円`} 
                  readOnly 
                  className="bg-background border-muted font-medium" 
                />
              </div>
            </div>
          </div>
        )
      },
      {
        id: "history",
        label: "履歴",
        content: (
          <div className="text-center text-muted-foreground p-4">
            履歴データはありません
          </div>
        )
      }
    ]

    return (
      <ManagementDetailView
        id={selectedItem.id}
        title={selectedItem.name}
        subtitle={selectedItem.code}
        status={{
          label: selectedItem.status,
          variant: getStatusVariant(selectedItem.status)
        }}
        actionButtons={
          <>
            <Button variant="outline" size="sm">
              編集
            </Button>
            <Button variant="outline" size="sm">
              削除
            </Button>
          </>
        }
        tabs={tabs}
      />
    )
  }

  return (
    <ManagementPageTemplate
      title="サンプル管理"
      itemName="サンプル"
      items={sampleItems}
      getFilteredItems={getFilteredItems}
      listItemComponent={ListItemComponent}
      detailComponent={DetailComponent}
      onAddNew={handleAddNew}
      onExport={handleExport}
      filterConfigs={filterConfigs}
    />
  )
}
