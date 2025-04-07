"use client"

import React, { useState, useMemo } from "react"
import { ManagementTemplate } from "../templates/management-template"
import { OrderListItem } from "./order-list-item"
import { OrderDetail } from "./order-detail"
import { Order } from "./types"
import { Plus, Download, Trash } from "lucide-react"
import { FilterPanel } from "./order-filter"

// サンプル受注データ
const sampleOrders: Order[] = [
  {
    id: "1",
    code: "ORD-2025-001",
    name: "工業用ポンプ一式",
    description: "大型工場向け高圧ポンプシステム一式の製造および納品。特殊仕様の耐熱性能を備えた製品。",
    client: "株式会社メトロ工業",
    status: "製造中",
    orderDate: "2025-01-10",
    deliveryDate: "2025-04-15",
    amount: 8500000,
    paidAmount: 4250000,
    quantity: 5,
    unitPrice: 1700000,
    manager: "山田太郎",
    team: ["佐藤一郎", "鈴木花子", "田中健太"],
    totalItems: 5,
    deliveredItems: 0,
    isImportant: true,
    items: [
      {
        id: "i1",
        name: "高圧ポンプユニットA型",
        quantity: 2,
        unitPrice: 2500000,
        totalPrice: 5000000,
        status: "製造中",
        description: "耐熱性能強化モデル"
      },
      {
        id: "i2",
        name: "制御システム",
        quantity: 1,
        unitPrice: 1500000,
        totalPrice: 1500000,
        status: "製造中",
        description: "タッチパネル操作対応"
      },
      {
        id: "i3",
        name: "配管セット",
        quantity: 1,
        unitPrice: 800000,
        totalPrice: 800000,
        status: "製造中",
        description: "耐熱・耐圧仕様"
      },
      {
        id: "i4",
        name: "設置工事",
        quantity: 1,
        unitPrice: 1200000,
        totalPrice: 1200000,
        status: "未着手",
        description: "現地調整含む"
      }
    ],
    notes: [
      { id: "n1", date: "2025-01-10", author: "山田太郎", content: "受注確定。特殊仕様の確認が必要。" },
      { id: "n2", date: "2025-01-15", author: "佐藤一郎", content: "製造開始。部品調達に2週間必要。" },
      { id: "n3", date: "2025-02-01", author: "鈴木花子", content: "耐熱性能テスト完了。基準値クリア。" }
    ],
    documents: [
      { id: "d1", name: "受注書.pdf", size: "1.2MB", date: "2025-01-10" },
      { id: "d2", name: "仕様書.docx", size: "3.5MB", date: "2025-01-12" },
      { id: "d3", name: "設計図面.dwg", size: "8.7MB", date: "2025-01-20" }
    ],
    history: [
      { date: "2025-01-10", action: "受注登録", user: "山田太郎" },
      { date: "2025-01-12", action: "仕様確定", user: "佐藤一郎" },
      { date: "2025-01-15", action: "製造開始", user: "鈴木花子" },
      { date: "2025-02-01", action: "進捗更新 30%", user: "田中健太" }
    ]
  },
  {
    id: "2",
    code: "ORD-2025-002",
    name: "生産ライン制御システム",
    description: "食品工場向け自動化生産ライン制御システム一式。タッチパネル操作、遠隔監視機能付き。",
    client: "フード・プロセッシング株式会社",
    status: "受注済",
    orderDate: "2025-01-20",
    deliveryDate: "2025-05-10",
    amount: 12000000,
    paidAmount: 6000000,
    quantity: 1,
    unitPrice: 12000000,
    manager: "鈴木花子",
    team: ["山田太郎", "田中健太"],
    totalItems: 3,
    deliveredItems: 0,
    isImportant: false,
    isUrgent: true,
    items: [
      {
        id: "i1",
        name: "メインコントローラー",
        quantity: 1,
        unitPrice: 5000000,
        totalPrice: 5000000,
        status: "受注済",
        description: "冗長化システム"
      },
      {
        id: "i2",
        name: "操作パネル",
        quantity: 3,
        unitPrice: 1500000,
        totalPrice: 4500000,
        status: "受注済",
        description: "防水・防塵仕様"
      },
      {
        id: "i3",
        name: "ソフトウェア開発",
        quantity: 1,
        unitPrice: 2500000,
        totalPrice: 2500000,
        status: "受注済",
        description: "カスタム開発"
      }
    ],
    notes: [
      { id: "n1", date: "2025-01-20", author: "鈴木花子", content: "受注確定。クライアントとの初回ミーティング完了。" },
      { id: "n2", date: "2025-01-25", author: "山田太郎", content: "要件定義書作成中。来週クライアント確認予定。" }
    ],
    documents: [
      { id: "d1", name: "受注書.pdf", size: "1.1MB", date: "2025-01-20" },
      { id: "d2", name: "要件定義書.docx", size: "2.8MB", date: "2025-01-25" }
    ],
    history: [
      { date: "2025-01-20", action: "受注登録", user: "鈴木花子" },
      { date: "2025-01-25", action: "要件定義開始", user: "山田太郎" }
    ]
  },
  {
    id: "3",
    code: "ORD-2025-003",
    name: "業務用空調設備",
    description: "オフィスビル向け省エネ型空調システム一式。中央管理システム付き。",
    client: "東京不動産開発株式会社",
    status: "出荷準備中",
    orderDate: "2025-01-05",
    deliveryDate: "2025-03-20",
    amount: 7500000,
    paidAmount: 7500000,
    quantity: 1,
    unitPrice: 7500000,
    manager: "田中健太",
    team: ["山田太郎", "佐藤一郎"],
    totalItems: 4,
    deliveredItems: 3,
    isImportant: true,
    isUrgent: true,
    items: [
      {
        id: "i1",
        name: "室外機",
        quantity: 2,
        unitPrice: 1500000,
        totalPrice: 3000000,
        status: "出荷準備中",
        description: "省エネタイプ"
      },
      {
        id: "i2",
        name: "室内機",
        quantity: 10,
        unitPrice: 300000,
        totalPrice: 3000000,
        status: "出荷準備中",
        description: "静音設計"
      },
      {
        id: "i3",
        name: "制御システム",
        quantity: 1,
        unitPrice: 1000000,
        totalPrice: 1000000,
        status: "出荷準備中",
        description: "タッチパネル式"
      },
      {
        id: "i4",
        name: "設置工事",
        quantity: 1,
        unitPrice: 500000,
        totalPrice: 500000,
        status: "未着手",
        description: "現地調整含む"
      }
    ],
    notes: [
      { id: "n1", date: "2025-01-05", author: "田中健太", content: "受注確定。3月中旬の納品希望。" },
      { id: "n2", date: "2025-01-10", author: "佐藤一郎", content: "製造開始。部品は全て在庫あり。" },
      { id: "n3", date: "2025-02-15", author: "山田太郎", content: "製造完了。出荷準備開始。" }
    ],
    documents: [
      { id: "d1", name: "受注書.pdf", size: "1.0MB", date: "2025-01-05" },
      { id: "d2", name: "設計図面.dwg", size: "5.2MB", date: "2025-01-08" },
      { id: "d3", name: "納品書.pdf", size: "0.8MB", date: "2025-02-15" }
    ],
    history: [
      { date: "2025-01-05", action: "受注登録", user: "田中健太" },
      { date: "2025-01-10", action: "製造開始", user: "佐藤一郎" },
      { date: "2025-02-15", action: "製造完了", user: "山田太郎" },
      { date: "2025-02-20", action: "出荷準備開始", user: "田中健太" }
    ]
  },
  {
    id: "4",
    code: "ORD-2025-004",
    name: "太陽光発電システム",
    description: "工場屋上向け大規模太陽光発電システム一式。蓄電システム付き。",
    client: "グリーンエナジー株式会社",
    status: "納品済",
    orderDate: "2024-11-15",
    deliveryDate: "2025-02-28",
    amount: 15000000,
    paidAmount: 15000000,
    quantity: 1,
    unitPrice: 15000000,
    manager: "佐藤一郎",
    team: ["山田太郎", "鈴木花子", "田中健太"],
    totalItems: 3,
    deliveredItems: 3,
    isImportant: false,
    isDelivered: true,
    items: [
      {
        id: "i1",
        name: "ソーラーパネル",
        quantity: 100,
        unitPrice: 50000,
        totalPrice: 5000000,
        status: "納品済",
        description: "高効率タイプ"
      },
      {
        id: "i2",
        name: "蓄電システム",
        quantity: 2,
        unitPrice: 3000000,
        totalPrice: 6000000,
        status: "納品済",
        description: "大容量タイプ"
      },
      {
        id: "i3",
        name: "設置工事",
        quantity: 1,
        unitPrice: 4000000,
        totalPrice: 4000000,
        status: "納品済",
        description: "屋上設置"
      }
    ],
    notes: [
      { id: "n1", date: "2024-11-15", author: "佐藤一郎", content: "受注確定。2月末までの納品希望。" },
      { id: "n2", date: "2024-12-01", author: "山田太郎", content: "パネル発注完了。1月中旬入荷予定。" },
      { id: "n3", date: "2025-01-20", author: "鈴木花子", content: "パネル入荷。設置工事開始。" },
      { id: "n4", date: "2025-02-25", author: "田中健太", content: "設置完了。動作確認済み。" },
      { id: "n5", date: "2025-02-28", author: "佐藤一郎", content: "納品完了。クライアント満足。" }
    ],
    documents: [
      { id: "d1", name: "受注書.pdf", size: "1.3MB", date: "2024-11-15" },
      { id: "d2", name: "設計図面.dwg", size: "7.8MB", date: "2024-11-20" },
      { id: "d3", name: "納品書.pdf", size: "1.1MB", date: "2025-02-28" },
      { id: "d4", name: "完了報告書.pdf", size: "2.5MB", date: "2025-02-28" }
    ],
    history: [
      { date: "2024-11-15", action: "受注登録", user: "佐藤一郎" },
      { date: "2024-12-01", action: "部材発注", user: "山田太郎" },
      { date: "2025-01-20", action: "設置開始", user: "鈴木花子" },
      { date: "2025-02-25", action: "設置完了", user: "田中健太" },
      { date: "2025-02-28", action: "納品完了", user: "佐藤一郎" }
    ]
  },
  {
    id: "5",
    code: "ORD-2025-005",
    name: "セキュリティシステム",
    description: "オフィスビル向け統合セキュリティシステム。顔認証・監視カメラ・入退室管理を統合。",
    client: "セキュリティソリューションズ株式会社",
    status: "キャンセル",
    orderDate: "2025-01-25",
    deliveryDate: "2025-04-30",
    amount: 9000000,
    paidAmount: 0,
    quantity: 1,
    unitPrice: 9000000,
    manager: "鈴木花子",
    team: ["田中健太"],
    totalItems: 4,
    deliveredItems: 0,
    isImportant: false,
    items: [
      {
        id: "i1",
        name: "監視カメラシステム",
        quantity: 1,
        unitPrice: 3000000,
        totalPrice: 3000000,
        status: "キャンセル",
        description: "高解像度カメラ20台"
      },
      {
        id: "i2",
        name: "顔認証システム",
        quantity: 1,
        unitPrice: 2000000,
        totalPrice: 2000000,
        status: "キャンセル",
        description: "AIエンジン搭載"
      },
      {
        id: "i3",
        name: "入退室管理システム",
        quantity: 1,
        unitPrice: 2500000,
        totalPrice: 2500000,
        status: "キャンセル",
        description: "ICカード対応"
      },
      {
        id: "i4",
        name: "設置工事",
        quantity: 1,
        unitPrice: 1500000,
        totalPrice: 1500000,
        status: "キャンセル",
        description: "配線工事含む"
      }
    ],
    notes: [
      { id: "n1", date: "2025-01-25", author: "鈴木花子", content: "受注確定。4月末までの納品希望。" },
      { id: "n2", date: "2025-02-05", author: "田中健太", content: "要件定義開始。" },
      { id: "n3", date: "2025-02-15", author: "鈴木花子", content: "クライアントから予算削減の連絡。再見積もり中。" },
      { id: "n4", date: "2025-02-20", author: "鈴木花子", content: "クライアントの予算削減により、プロジェクトキャンセル。" }
    ],
    documents: [
      { id: "d1", name: "受注書.pdf", size: "1.2MB", date: "2025-01-25" },
      { id: "d2", name: "要件定義書.docx", size: "2.3MB", date: "2025-02-05" },
      { id: "d3", name: "キャンセル通知.pdf", size: "0.5MB", date: "2025-02-20" }
    ],
    history: [
      { date: "2025-01-25", action: "受注登録", user: "鈴木花子" },
      { date: "2025-02-05", action: "要件定義開始", user: "田中健太" },
      { date: "2025-02-15", action: "再見積もり依頼", user: "鈴木花子" },
      { date: "2025-02-20", action: "キャンセル", user: "鈴木花子" }
    ]
  }
]

// フィルター設定
const filterConfigs = [
  {
    type: "status",
    label: "ステータス",
    options: ["すべて", "受注済", "製造中", "出荷準備中", "配送中", "納品済", "キャンセル"],
    defaultValue: "すべて"
  },
  {
    type: "timeframe",
    label: "納期",
    options: ["すべて", "今週", "今月", "次月"],
    defaultValue: "すべて"
  },
  {
    type: "amount",
    label: "金額",
    options: ["すべて", "～100万円", "～500万円", "～1000万円", "1000万円～"],
    defaultValue: "すべて"
  }
]

export function OrderManagement() {
  // 選択された受注IDの状態管理
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([])
  
  // 受注データの状態管理
  const [orders, setOrders] = useState<Order[]>(sampleOrders)
  
  // フィルターの状態管理
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({
    status: 'すべて',
    timeframe: 'すべて',
    amount: 'すべて'
  })

  // 検索クエリの状態管理
  const [searchQuery, setSearchQuery] = useState<string>('')
  
  // 未完了のみ表示の状態管理
  const [incompleteOnly, setIncompleteOnly] = useState<boolean>(true)
  
  // 選択された受注
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders.length > 0 ? orders[0] : null)

  // 受注数のカウント
  const orderCounts = useMemo(() => {
    return {
      total: sampleOrders.length,
      ordered: sampleOrders.filter(o => o.status === '受注済').length,
      manufacturing: sampleOrders.filter(o => o.status === '製造中').length,
      shipping: sampleOrders.filter(o => o.status === '出荷準備中').length,
      delivered: sampleOrders.filter(o => o.status === '納品済').length,
      cancelled: sampleOrders.filter(o => o.status === 'キャンセル').length
    }
  }, [])

  // 新規受注追加ハンドラー
  const handleAddNew = () => {
    alert('新規受注を追加します')
  }
  
  // エクスポートハンドラー
  const handleExport = () => {
    alert('受注一覧をエクスポートします')
  }
  
  // 削除ハンドラー
  const handleDelete = (ids: string[]) => {
    alert(`選択した受注(${ids.join(', ')})を削除します`)
  }
  
  // 重要フラグ切り替えハンドラー
  const handleToggleImportant = (order: Order) => {
    setOrders(prevOrders => 
      prevOrders.map(o => 
        o.id === order.id ? { ...o, isImportant: !o.isImportant } : o
      )
    )
  }
  
  // 緊急フラグ切り替えハンドラー
  const handleToggleUrgent = (order: Order) => {
    setOrders(prevOrders => 
      prevOrders.map(o => 
        o.id === order.id ? { ...o, isUrgent: !o.isUrgent } : o
      )
    )
  }
  
  // 納品済みフラグ切り替えハンドラー
  const handleToggleDelivered = (order: Order) => {
    setOrders(prevOrders => 
      prevOrders.map(o => 
        o.id === order.id ? { 
          ...o, 
          isDelivered: !o.isDelivered,
          status: !o.isDelivered ? '納品済' : o.status === '納品済' ? '出荷準備中' : o.status
        } : o
      )
    )
  }
  
  // 受注削除ハンドラー
  const handleDeleteOrder = (order: Order) => {
    if (confirm(`受注「${order.name}」を削除しますか？`)) {
      setOrders(prevOrders => prevOrders.filter(o => o.id !== order.id))
      if (selectedOrder?.id === order.id) {
        setSelectedOrder(null)
      }
    }
  }
  
  // フィルター適用関数
  const getFilteredItems = (orders: Order[], searchTerm: string, filters: Record<string, string>, incompleteOnly: boolean) => {
    let result = [...orders]
    
    // ステータスフィルター
    if (filters.status !== 'すべて') {
      result = result.filter(order => order.status === filters.status)
    }
    
    // 金額フィルター
    if (filters.amount !== 'すべて') {
      if (filters.amount === '～100万円') {
        result = result.filter(order => order.amount < 1000000)
      } else if (filters.amount === '～500万円') {
        result = result.filter(order => order.amount < 5000000)
      } else if (filters.amount === '～1000万円') {
        result = result.filter(order => order.amount < 10000000)
      } else if (filters.amount === '1000万円～') {
        result = result.filter(order => order.amount >= 10000000)
      }
    }
    
    // 納期フィルター
    if (filters.timeframe !== 'すべて') {
      const today = new Date()
      const dayOfWeek = today.getDay()
      const startOfWeek = new Date(today)
      startOfWeek.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)) // 月曜日を週の始まりとする
      startOfWeek.setHours(0, 0, 0, 0)
      
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)
      endOfWeek.setHours(23, 59, 59, 999)
      
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
      
      const startOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
      const endOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0)
      
      if (filters.timeframe === '今週') {
        result = result.filter(order => {
          const deliveryDate = new Date(order.deliveryDate)
          return deliveryDate >= startOfWeek && deliveryDate <= endOfWeek
        })
      } else if (filters.timeframe === '今月') {
        result = result.filter(order => {
          const deliveryDate = new Date(order.deliveryDate)
          return deliveryDate >= startOfMonth && deliveryDate <= endOfMonth
        })
      } else if (filters.timeframe === '次月') {
        result = result.filter(order => {
          const deliveryDate = new Date(order.deliveryDate)
          return deliveryDate >= startOfNextMonth && deliveryDate <= endOfNextMonth
        })
      }
    }
    
    // 検索フィルター
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      result = result.filter(order => {
        return (
          order.name.toLowerCase().includes(searchLower) ||
          order.code.toLowerCase().includes(searchLower) ||
          order.description.toLowerCase().includes(searchLower) ||
          order.client.toLowerCase().includes(searchLower) ||
          order.manager.toLowerCase().includes(searchLower)
        )
      })
    }
    
    // 未完了のみ表示
    if (incompleteOnly) {
      result = result.filter(order => order.status !== '納品済' && order.status !== 'キャンセル')
    }
    
    return result
  }

  // フィルター変更ハンドラー
  const handleFilterChange = (filter: { type: string; value: string }) => {
    setActiveFilters(prev => ({
      ...prev,
      [filter.type]: filter.value
    }))
  }

  // フィルタリングされた受注
  const filteredOrders = useMemo(() => {
    return getFilteredItems(orders, searchQuery, activeFilters, incompleteOnly);
  }, [orders, searchQuery, activeFilters, incompleteOnly]);
  
  // 検索ハンドラー
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <ManagementTemplate
      title="受注管理"
      items={orders}
      filteredItems={filteredOrders}
      selectedIds={selectedOrderIds}
      setSelectedIds={setSelectedOrderIds}
      selectedItem={selectedOrder}
      setSelectedItem={setSelectedOrder}
      onSearch={handleSearch}
      searchPlaceholder="受注を検索..."
      incompleteOnly={incompleteOnly}
      onIncompleteChange={setIncompleteOnly}
      onAddNew={handleAddNew}
      onExport={handleExport}
      onDelete={handleDelete}
      filterPanel={
        <FilterPanel 
          onFilterChange={handleFilterChange}
          activeFilters={activeFilters}
          orderCounts={orderCounts}
        />
      }
      listItemComponent={({ item, isSelected, onSelect, isChecked, onCheckChange }) => (
        <OrderListItem 
          order={item}
          isSelected={isSelected}
          onSelect={onSelect}
          isChecked={isChecked}
          onCheckChange={onCheckChange}
          onToggleImportant={handleToggleImportant}
          onToggleUrgent={handleToggleUrgent}
          onToggleDelivered={handleToggleDelivered}
          onDelete={handleDeleteOrder}
        />
      )}
      detailComponent={selectedOrder && <OrderDetail selectedOrder={selectedOrder} />}
    />
  )
}
