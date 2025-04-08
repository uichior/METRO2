"use client"

import { useState, useEffect } from "react"
import { ManagementTemplate } from "@/components/templates/management-template-new"
import { FilterPanel, FilterSection } from "@/components/shared/filter-panel"
import { DetailPanel, DetailTab } from "@/components/shared/detail-panel"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Edit, Calendar, CreditCard, Package, Building, Truck } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"

// 仕入データの型定義
interface Purchase {
  id: string
  purchaseNumber: string
  supplierName: string
  orderDate: string
  deliveryDate: string
  amount: number
  status: "pending" | "ordered" | "received" | "cancelled"
  items: {
    id: string
    name: string
    quantity: number
    price: number
  }[]
}

// サンプルデータ
const samplePurchases: Purchase[] = [
  {
    id: "purchase-1",
    purchaseNumber: "PUR-2023-001",
    supplierName: "東京金属工業株式会社",
    orderDate: "2023-01-10",
    deliveryDate: "2023-01-25",
    amount: 320000,
    status: "received",
    items: [
      { id: "item-1", name: "アルミ板 A5052 t3.0", quantity: 20, price: 8000 },
      { id: "item-2", name: "ステンレス板 SUS304 t2.0", quantity: 10, price: 12000 },
      { id: "item-3", name: "真鍮棒 C3604 φ20", quantity: 5, price: 6000 }
    ]
  },
  {
    id: "purchase-2",
    purchaseNumber: "PUR-2023-002",
    supplierName: "大阪部品商事株式会社",
    orderDate: "2023-02-05",
    deliveryDate: "2023-02-20",
    amount: 450000,
    status: "ordered",
    items: [
      { id: "item-4", name: "ベアリングユニット UCF205", quantity: 15, price: 7500 },
      { id: "item-5", name: "リニアガイド HSR20", quantity: 8, price: 28000 },
      { id: "item-6", name: "ボールねじ SFU1605", quantity: 3, price: 35000 }
    ]
  },
  {
    id: "purchase-3",
    purchaseNumber: "PUR-2023-003",
    supplierName: "名古屋電子部品株式会社",
    orderDate: "2023-02-15",
    deliveryDate: "2023-03-10",
    amount: 280000,
    status: "pending",
    items: [
      { id: "item-7", name: "PLCユニット CP1E-N30", quantity: 2, price: 65000 },
      { id: "item-8", name: "タッチパネル GT2107", quantity: 1, price: 85000 },
      { id: "item-9", name: "サーボモーター HG-KR43", quantity: 2, price: 32500 }
    ]
  }
]

// ステータスバッジコンポーネント
function StatusBadge({ status }: { status: Purchase["status"] }) {
  const statusMap = {
    pending: { label: "未発注", variant: "outline" as const },
    ordered: { label: "発注済", variant: "secondary" as const },
    received: { label: "入荷済", variant: "default" as const },
    cancelled: { label: "キャンセル", variant: "destructive" as const }
  }
  
  const { label, variant } = statusMap[status]
  
  return <Badge variant={variant}>{label}</Badge>
}

// 仕入管理コンポーネント
export default function PurchaseManagement() {
  // 状態管理
  const [purchases, setPurchases] = useState<Purchase[]>(samplePurchases)
  const [filteredPurchases, setFilteredPurchases] = useState<Purchase[]>(samplePurchases)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<Purchase["status"] | "all">("all")
  const [supplierFilter, setSupplierFilter] = useState<string | "all">("all")
  const [incompleteOnly, setIncompleteOnly] = useState(false)
  
  // 検索とフィルタリング
  useEffect(() => {
    let result = [...purchases]
    
    // 検索クエリでフィルタリング
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(purchase => 
        purchase.purchaseNumber.toLowerCase().includes(query) ||
        purchase.supplierName.toLowerCase().includes(query)
      )
    }
    
    // ステータスでフィルタリング
    if (statusFilter !== "all") {
      result = result.filter(purchase => purchase.status === statusFilter)
    }
    
    // 仕入先でフィルタリング
    if (supplierFilter !== "all") {
      result = result.filter(purchase => purchase.supplierName === supplierFilter)
    }
    
    // 未入荷のみ表示
    if (incompleteOnly) {
      result = result.filter(purchase => purchase.status !== "received")
    }
    
    setFilteredPurchases(result)
  }, [purchases, searchQuery, statusFilter, supplierFilter, incompleteOnly])
  
  // 検索ハンドラー
  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }
  
  // 新規作成ハンドラー
  const handleAddNew = () => {
    alert("新規仕入作成ダイアログを表示")
  }
  
  // エクスポートハンドラー
  const handleExport = () => {
    alert("CSVエクスポート")
  }
  
  // 削除ハンドラー
  const handleDelete = (ids: string[]) => {
    if (confirm(`選択した${ids.length}件の仕入を削除しますか？`)) {
      setPurchases(prev => prev.filter(purchase => !ids.includes(purchase.id)))
    }
  }
  
  // フィルターリセットハンドラー
  const handleResetFilters = () => {
    setStatusFilter("all")
    setSupplierFilter("all")
    setIncompleteOnly(false)
  }
  
  // 未入荷フィルター切り替えハンドラー
  const handleIncompleteChange = (checked: boolean) => {
    setIncompleteOnly(checked)
  }
  
  // ユニークな仕入先リストを取得
  const suppliers = [...new Set(purchases.map(purchase => purchase.supplierName))]
  
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
            <label htmlFor="status-pending" className="text-sm">未発注</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="status-ordered"
              name="status"
              checked={statusFilter === "ordered"}
              onChange={() => setStatusFilter("ordered")}
              className="mr-2"
            />
            <label htmlFor="status-ordered" className="text-sm">発注済</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="status-received"
              name="status"
              checked={statusFilter === "received"}
              onChange={() => setStatusFilter("received")}
              className="mr-2"
            />
            <label htmlFor="status-received" className="text-sm">入荷済</label>
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
      
      <FilterSection title="仕入先">
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="supplier-all"
              name="supplier"
              checked={supplierFilter === "all"}
              onChange={() => setSupplierFilter("all")}
              className="mr-2"
            />
            <label htmlFor="supplier-all" className="text-sm">すべて</label>
          </div>
          {suppliers.map(supplier => (
            <div key={supplier} className="flex items-center">
              <input
                type="radio"
                id={`supplier-${supplier}`}
                name="supplier"
                checked={supplierFilter === supplier}
                onChange={() => setSupplierFilter(supplier)}
                className="mr-2"
              />
              <label htmlFor={`supplier-${supplier}`} className="text-sm truncate">{supplier}</label>
            </div>
          ))}
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
    item: Purchase; 
    isSelected: boolean; 
    onSelect: (item: Purchase) => void; 
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
              <div className="font-medium">{item.purchaseNumber}</div>
              <StatusBadge status={item.status} />
            </div>
            <div className="text-sm mb-1">{item.supplierName}</div>
            <div className="flex items-center text-xs text-muted-foreground gap-4">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                入荷予定: {formatDate(item.deliveryDate)}
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
      title="仕入詳細"
      tabs={[
        { value: "summary", label: "概要" },
        { value: "items", label: "アイテム" },
        { value: "supplier", label: "仕入先情報" },
        { value: "history", label: "履歴" }
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
              <h3 className="font-semibold">{filteredPurchases.find(p => p.id === "purchase-1")?.purchaseNumber}</h3>
              <StatusBadge status={filteredPurchases.find(p => p.id === "purchase-1")?.status || "pending"} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">仕入先</div>
                <div>{filteredPurchases.find(p => p.id === "purchase-1")?.supplierName}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">発注日</div>
                <div>{formatDate(filteredPurchases.find(p => p.id === "purchase-1")?.orderDate || "")}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">入荷予定日</div>
                <div>{formatDate(filteredPurchases.find(p => p.id === "purchase-1")?.deliveryDate || "")}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">金額</div>
                <div>{formatCurrency(filteredPurchases.find(p => p.id === "purchase-1")?.amount || 0)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DetailTab>
      
      <DetailTab value="items" label="アイテム">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">仕入アイテム</h3>
            <div className="space-y-2">
              {filteredPurchases.find(p => p.id === "purchase-1")?.items.map(item => (
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
      
      <DetailTab value="supplier" label="仕入先情報">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">仕入先情報</h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground">会社名</div>
                <div className="font-medium">東京金属工業株式会社</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">住所</div>
                <div>〒123-4567 東京都大田区金属町1-2-3</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">電話番号</div>
                <div>03-1234-5678</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">担当者</div>
                <div>鈴木 一郎</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">メールアドレス</div>
                <div>suzuki@tokyo-metal.example.com</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DetailTab>
      
      <DetailTab value="history" label="履歴">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">履歴</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <div className="w-24 text-sm text-muted-foreground">2023/01/25</div>
                <div>
                  <div className="font-medium">入荷完了</div>
                  <div className="text-sm text-muted-foreground">すべてのアイテムが入荷しました</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-24 text-sm text-muted-foreground">2023/01/12</div>
                <div>
                  <div className="font-medium">発送通知受領</div>
                  <div className="text-sm text-muted-foreground">仕入先から発送通知を受領しました</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-24 text-sm text-muted-foreground">2023/01/10</div>
                <div>
                  <div className="font-medium">発注</div>
                  <div className="text-sm text-muted-foreground">発注書を送信しました</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DetailTab>
    </DetailPanel>
  )
  
  // メインコンポーネントのレンダリング
  return (
    <ManagementTemplate
      title="仕入管理"
      items={purchases}
      filteredItems={filteredPurchases}
      onSearch={handleSearch}
      searchPlaceholder="仕入番号、仕入先で検索"
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
