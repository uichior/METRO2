"use client"

import { useState, useEffect } from "react"
import { ManagementTemplate } from "@/components/templates/management-template-new"
import { FilterPanel, FilterSection } from "@/components/shared/filter-panel"
import { DetailPanel, DetailTab } from "@/components/shared/detail-panel"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Edit, Trash, FileText, Calendar, CreditCard, Package } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"

// 受注データの型定義
interface Order {
  id: string
  orderNumber: string
  customerName: string
  orderDate: string
  deliveryDate: string
  amount: number
  status: "pending" | "processing" | "completed" | "cancelled"
  items: {
    id: string
    name: string
    quantity: number
    price: number
  }[]
}

// サンプルデータ
const sampleOrders: Order[] = [
  {
    id: "order-1",
    orderNumber: "ORD-2023-001",
    customerName: "株式会社山田製作所",
    orderDate: "2023-01-15",
    deliveryDate: "2023-02-28",
    amount: 450000,
    status: "completed",
    items: [
      { id: "item-1", name: "アルミフレーム A-100", quantity: 10, price: 15000 },
      { id: "item-2", name: "ステンレスパネル B-200", quantity: 5, price: 30000 },
      { id: "item-3", name: "制御ユニット C-300", quantity: 2, price: 75000 }
    ]
  },
  {
    id: "order-2",
    orderNumber: "ORD-2023-002",
    customerName: "佐藤電機株式会社",
    orderDate: "2023-02-10",
    deliveryDate: "2023-03-15",
    amount: 320000,
    status: "processing",
    items: [
      { id: "item-4", name: "電源ユニット PS-500", quantity: 4, price: 45000 },
      { id: "item-5", name: "センサーモジュール SM-100", quantity: 8, price: 12500 }
    ]
  },
  {
    id: "order-3",
    orderNumber: "ORD-2023-003",
    customerName: "鈴木工業株式会社",
    orderDate: "2023-02-20",
    deliveryDate: "2023-04-05",
    amount: 780000,
    status: "pending",
    items: [
      { id: "item-6", name: "大型フレーム LF-1000", quantity: 2, price: 250000 },
      { id: "item-7", name: "制御システム CS-2000", quantity: 1, price: 280000 }
    ]
  }
]

// ステータスバッジコンポーネント
function StatusBadge({ status }: { status: Order["status"] }) {
  const statusMap = {
    pending: { label: "未処理", variant: "outline" as const },
    processing: { label: "処理中", variant: "secondary" as const },
    completed: { label: "完了", variant: "default" as const },
    cancelled: { label: "キャンセル", variant: "destructive" as const }
  }
  
  const { label, variant } = statusMap[status]
  
  return <Badge variant={variant}>{label}</Badge>
}

// 受注管理コンポーネント
export default function OrderManagement() {
  // 状態管理
  const [orders, setOrders] = useState<Order[]>(sampleOrders)
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(sampleOrders)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<Order["status"] | "all">("all")
  const [incompleteOnly, setIncompleteOnly] = useState(false)
  
  // 検索とフィルタリング
  useEffect(() => {
    let result = [...orders]
    
    // 検索クエリでフィルタリング
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(order => 
        order.orderNumber.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query)
      )
    }
    
    // ステータスでフィルタリング
    if (statusFilter !== "all") {
      result = result.filter(order => order.status === statusFilter)
    }
    
    // 未完了のみ表示
    if (incompleteOnly) {
      result = result.filter(order => order.status !== "completed")
    }
    
    setFilteredOrders(result)
  }, [orders, searchQuery, statusFilter, incompleteOnly])
  
  // 検索ハンドラー
  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }
  
  // 新規作成ハンドラー
  const handleAddNew = () => {
    alert("新規受注作成ダイアログを表示")
  }
  
  // エクスポートハンドラー
  const handleExport = () => {
    alert("CSVエクスポート")
  }
  
  // 削除ハンドラー
  const handleDelete = (ids: string[]) => {
    if (confirm(`選択した${ids.length}件の受注を削除しますか？`)) {
      setOrders(prev => prev.filter(order => !ids.includes(order.id)))
    }
  }
  
  // フィルターリセットハンドラー
  const handleResetFilters = () => {
    setStatusFilter("all")
    setIncompleteOnly(false)
  }
  
  // 未完了フィルター切り替えハンドラー
  const handleIncompleteChange = (checked: boolean) => {
    setIncompleteOnly(checked)
  }
  
  // フィルターパネル
  const filterPanel = (
    <FilterPanel title="絞り込み" onReset={handleResetFilters}>
      <FilterSection title="ステータス">
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="status-all"
              name="status"
              checked={statusFilter === "all"}
              onChange={() => setStatusFilter("all")}
              className="mr-2"
            />
            <label htmlFor="status-all" className="text-sm">すべて</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="status-pending"
              name="status"
              checked={statusFilter === "pending"}
              onChange={() => setStatusFilter("pending")}
              className="mr-2"
            />
            <label htmlFor="status-pending" className="text-sm">未処理</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="status-processing"
              name="status"
              checked={statusFilter === "processing"}
              onChange={() => setStatusFilter("processing")}
              className="mr-2"
            />
            <label htmlFor="status-processing" className="text-sm">処理中</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="status-completed"
              name="status"
              checked={statusFilter === "completed"}
              onChange={() => setStatusFilter("completed")}
              className="mr-2"
            />
            <label htmlFor="status-completed" className="text-sm">完了</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="status-cancelled"
              name="status"
              checked={statusFilter === "cancelled"}
              onChange={() => setStatusFilter("cancelled")}
              className="mr-2"
            />
            <label htmlFor="status-cancelled" className="text-sm">キャンセル</label>
          </div>
        </div>
      </FilterSection>
    </FilterPanel>
  )
  
  // リストアイテムコンポーネント
  const listItemComponent = ({ 
    item, 
    isSelected, 
    onSelect, 
    isChecked, 
    onCheckChange 
  }: { 
    item: Order; 
    isSelected: boolean; 
    onSelect: (item: Order) => void; 
    isChecked?: boolean; 
    onCheckChange?: (checked: boolean) => void 
  }) => (
    <Card 
      className={`cursor-pointer ${isSelected ? "border-primary" : ""}`}
      onClick={() => onSelect(item)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={isChecked}
            onCheckedChange={onCheckChange}
            onClick={(e) => e.stopPropagation()}
            aria-label="選択"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <div className="font-medium">{item.orderNumber}</div>
              <StatusBadge status={item.status} />
            </div>
            <div className="text-sm mb-1">{item.customerName}</div>
            <div className="flex items-center text-xs text-muted-foreground gap-4">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                納期: {formatDate(item.deliveryDate)}
              </div>
              <div className="flex items-center">
                <CreditCard className="h-3 w-3 mr-1" />
                {formatCurrency(item.amount)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
  
  // 詳細コンポーネント
  const detailComponent = (
    <DetailPanel
      title="受注詳細"
      tabs={[
        { value: "summary", label: "概要" },
        { value: "items", label: "アイテム" },
        { value: "details", label: "詳細情報" },
        { value: "attachments", label: "添付ファイル" }
      ]}
      defaultTab="summary"
      actions={
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Edit className="h-4 w-4 mr-1" />
            編集
          </Button>
        </div>
      }
    >
      <DetailTab value="summary" label="概要">
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{filteredOrders.find(o => o.id === "order-1")?.orderNumber}</h3>
              <StatusBadge status={filteredOrders.find(o => o.id === "order-1")?.status || "pending"} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">顧客名</div>
                <div>{filteredOrders.find(o => o.id === "order-1")?.customerName}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">受注日</div>
                <div>{formatDate(filteredOrders.find(o => o.id === "order-1")?.orderDate || "")}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">納期</div>
                <div>{formatDate(filteredOrders.find(o => o.id === "order-1")?.deliveryDate || "")}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">金額</div>
                <div>{formatCurrency(filteredOrders.find(o => o.id === "order-1")?.amount || 0)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DetailTab>
      
      <DetailTab value="items" label="アイテム">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">注文アイテム</h3>
            <div className="space-y-2">
              {filteredOrders.find(o => o.id === "order-1")?.items.map(item => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">数量: {item.quantity}</div>
                  </div>
                  <div className="text-right">
                    <div>{formatCurrency(item.price)}</div>
                    <div className="text-sm text-muted-foreground">合計: {formatCurrency(item.price * item.quantity)}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </DetailTab>
      
      <DetailTab value="details" label="詳細情報">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">詳細情報</h3>
            <p className="text-muted-foreground">詳細情報がここに表示されます。</p>
          </CardContent>
        </Card>
      </DetailTab>
      
      <DetailTab value="attachments" label="添付ファイル">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">添付ファイル</h3>
            <p className="text-muted-foreground">添付ファイルがここに表示されます。</p>
          </CardContent>
        </Card>
      </DetailTab>
    </DetailPanel>
  )
  
  // メインコンポーネントのレンダリング
  return (
    <ManagementTemplate
      title="受注管理"
      items={orders}
      filteredItems={filteredOrders}
      onSearch={handleSearch}
      searchPlaceholder="受注番号、顧客名で検索"
      incompleteOnly={incompleteOnly}
      onIncompleteChange={handleIncompleteChange}
      onAddNew={handleAddNew}
      onExport={handleExport}
      onDelete={handleDelete}
      filterPanel={filterPanel}
      listItemComponent={listItemComponent}
      detailComponent={detailComponent}
    />
  )
}
