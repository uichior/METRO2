"use client"

import React, { useState, useMemo } from "react"
import { ManagementTemplate } from "../templates/management-template"
import { DeliveryListItem } from "./delivery-list-item"
import { DeliveryDetail } from "./delivery-detail"
import { Delivery } from "./types"
import { Plus, Download, Trash } from "lucide-react"
import { DeliveryFilterPanel } from "./delivery-filter"

// サンプル納品データ
const sampleDeliveries: Delivery[] = [
  {
    id: "1",
    code: "DEL-2025-001",
    name: "工業用ポンプ一式",
    description: "大型工場向け高圧ポンプシステム一式の納品。特殊仕様の耐熱性能を備えた製品。",
    client: "株式会社メトロ工業",
    status: "配送中",
    deliveryDate: "2025-04-15",
    receiptDate: "",
    amount: 8500000,
    paidAmount: 4250000,
    quantity: 5,
    unitPrice: 1700000,
    manager: "山田太郎",
    team: ["佐藤一郎", "鈴木花子", "田中健太"],
    totalItems: 5,
    receivedItems: 0,
    isImportant: true,
    orderId: "ORD-2025-001",
    items: [
      {
        id: "i1",
        name: "高圧ポンプユニットA型",
        quantity: 2,
        unitPrice: 2500000,
        totalPrice: 5000000,
        status: "配送中",
        description: "耐熱性能強化モデル"
      },
      {
        id: "i2",
        name: "制御システム",
        quantity: 1,
        unitPrice: 1500000,
        totalPrice: 1500000,
        status: "配送中",
        description: "タッチパネル操作対応"
      },
      {
        id: "i3",
        name: "配管セット",
        quantity: 1,
        unitPrice: 800000,
        totalPrice: 800000,
        status: "配送中",
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
      { id: "n1", date: "2025-04-01", author: "山田太郎", content: "納品準備完了。配送手配済み。" },
      { id: "n2", date: "2025-04-05", author: "佐藤一郎", content: "配送開始。到着予定は4月15日。" },
      { id: "n3", date: "2025-04-10", author: "鈴木花子", content: "配送状況確認。予定通り進行中。" }
    ],
    documents: [
      { id: "d1", name: "納品書.pdf", size: "1.2MB", date: "2025-04-01" },
      { id: "d2", name: "検査証明書.docx", size: "3.5MB", date: "2025-04-02" },
      { id: "d3", name: "配送指示書.pdf", size: "0.8MB", date: "2025-04-05" }
    ],
    history: [
      { date: "2025-04-01", action: "納品準備完了", user: "山田太郎" },
      { date: "2025-04-02", action: "検査完了", user: "佐藤一郎" },
      { date: "2025-04-05", action: "配送開始", user: "鈴木花子" },
      { date: "2025-04-10", action: "配送状況確認", user: "田中健太" }
    ]
  },
  {
    id: "2",
    code: "DEL-2025-002",
    name: "生産ライン制御システム",
    description: "食品工場向け自動化生産ライン制御システム一式。タッチパネル操作、遠隔監視機能付き。",
    client: "フード・プロセッシング株式会社",
    status: "納品準備中",
    deliveryDate: "2025-05-10",
    receiptDate: "",
    amount: 12000000,
    paidAmount: 6000000,
    quantity: 1,
    unitPrice: 12000000,
    manager: "鈴木花子",
    team: ["山田太郎", "田中健太"],
    totalItems: 3,
    receivedItems: 0,
    isImportant: false,
    isUrgent: true,
    orderId: "ORD-2025-002",
    items: [
      {
        id: "i1",
        name: "メインコントローラー",
        quantity: 1,
        unitPrice: 5000000,
        totalPrice: 5000000,
        status: "製造完了",
        description: "冗長化システム"
      },
      {
        id: "i2",
        name: "操作パネル",
        quantity: 3,
        unitPrice: 1500000,
        totalPrice: 4500000,
        status: "製造完了",
        description: "防水・防塵仕様"
      },
      {
        id: "i3",
        name: "ソフトウェア開発",
        quantity: 1,
        unitPrice: 2500000,
        totalPrice: 2500000,
        status: "テスト中",
        description: "カスタム開発"
      }
    ],
    notes: [
      { id: "n1", date: "2025-04-20", author: "鈴木花子", content: "製造完了。最終テスト中。" },
      { id: "n2", date: "2025-04-25", author: "山田太郎", content: "ソフトウェアテスト実施中。来週完了予定。" }
    ],
    documents: [
      { id: "d1", name: "検査報告書.pdf", size: "1.1MB", date: "2025-04-20" },
      { id: "d2", name: "テスト仕様書.docx", size: "2.8MB", date: "2025-04-25" }
    ],
    history: [
      { date: "2025-04-20", action: "製造完了", user: "鈴木花子" },
      { date: "2025-04-25", action: "テスト開始", user: "山田太郎" }
    ]
  },
  {
    id: "3",
    code: "DEL-2025-003",
    name: "業務用空調設備",
    description: "オフィスビル向け省エネ型空調システム一式。中央管理システム付き。",
    client: "東京不動産開発株式会社",
    status: "納品済",
    deliveryDate: "2025-03-20",
    receiptDate: "2025-03-22",
    amount: 7500000,
    paidAmount: 7500000,
    quantity: 1,
    unitPrice: 7500000,
    manager: "田中健太",
    team: ["山田太郎", "佐藤一郎"],
    totalItems: 4,
    receivedItems: 4,
    isImportant: true,
    isUrgent: false,
    isReceived: true,
    orderId: "ORD-2025-003",
    items: [
      {
        id: "i1",
        name: "室外機",
        quantity: 2,
        unitPrice: 1500000,
        totalPrice: 3000000,
        status: "納品済",
        description: "省エネタイプ"
      },
      {
        id: "i2",
        name: "室内機",
        quantity: 10,
        unitPrice: 300000,
        totalPrice: 3000000,
        status: "納品済",
        description: "静音設計"
      },
      {
        id: "i3",
        name: "制御システム",
        quantity: 1,
        unitPrice: 1000000,
        totalPrice: 1000000,
        status: "納品済",
        description: "タッチパネル式"
      },
      {
        id: "i4",
        name: "設置工事",
        quantity: 1,
        unitPrice: 500000,
        totalPrice: 500000,
        status: "完了",
        description: "現地調整含む"
      }
    ],
    notes: [
      { id: "n1", date: "2025-03-15", author: "田中健太", content: "出荷完了。予定通り3/20に納品予定。" },
      { id: "n2", date: "2025-03-20", author: "山田太郎", content: "納品完了。顧客確認済み。" },
      { id: "n3", date: "2025-03-22", author: "佐藤一郎", content: "設置工事完了。動作確認済み。" }
    ],
    documents: [
      { id: "d1", name: "納品書.pdf", size: "1.0MB", date: "2025-03-20" },
      { id: "d2", name: "検収書.pdf", size: "0.9MB", date: "2025-03-22" },
      { id: "d3", name: "工事完了報告書.pdf", size: "1.5MB", date: "2025-03-22" }
    ],
    history: [
      { date: "2025-03-15", action: "出荷完了", user: "田中健太" },
      { date: "2025-03-20", action: "納品完了", user: "山田太郎" },
      { date: "2025-03-22", action: "設置完了", user: "佐藤一郎" },
      { date: "2025-03-22", action: "検収完了", user: "田中健太" }
    ]
  },
  {
    id: "4",
    code: "DEL-2025-004",
    name: "太陽光発電システム",
    description: "工場屋上向け大規模太陽光発電システム一式。蓄電システム付き。",
    client: "グリーンエナジー株式会社",
    status: "納品準備中",
    deliveryDate: "2025-04-30",
    receiptDate: "",
    amount: 25000000,
    paidAmount: 12500000,
    quantity: 1,
    unitPrice: 25000000,
    manager: "佐藤一郎",
    team: ["山田太郎", "鈴木花子", "田中健太"],
    totalItems: 3,
    receivedItems: 0,
    isImportant: true,
    isUrgent: true,
    orderId: "ORD-2025-004",
    items: [
      {
        id: "i1",
        name: "太陽光パネル",
        quantity: 100,
        unitPrice: 150000,
        totalPrice: 15000000,
        status: "製造完了",
        description: "高効率タイプ"
      },
      {
        id: "i2",
        name: "蓄電システム",
        quantity: 1,
        unitPrice: 8000000,
        totalPrice: 8000000,
        status: "製造完了",
        description: "大容量タイプ"
      },
      {
        id: "i3",
        name: "設置工事",
        quantity: 1,
        unitPrice: 2000000,
        totalPrice: 2000000,
        status: "未着手",
        description: "屋上設置"
      }
    ],
    notes: [
      { id: "n1", date: "2025-04-01", author: "佐藤一郎", content: "パネル製造完了。" },
      { id: "n2", date: "2025-04-10", author: "山田太郎", content: "蓄電システム製造完了。" }
    ],
    documents: [
      { id: "d1", name: "製品仕様書.pdf", size: "2.5MB", date: "2025-04-01" },
      { id: "d2", name: "納品計画書.docx", size: "1.8MB", date: "2025-04-10" }
    ],
    history: [
      { date: "2025-04-01", action: "パネル製造完了", user: "佐藤一郎" },
      { date: "2025-04-10", action: "蓄電システム製造完了", user: "山田太郎" },
      { date: "2025-04-15", action: "納品準備開始", user: "鈴木花子" }
    ]
  },
  {
    id: "5",
    code: "DEL-2025-005",
    name: "セキュリティシステム",
    description: "オフィスビル向け統合セキュリティシステム。顔認証・監視カメラ・入退室管理を統合。",
    client: "セキュリティソリューションズ株式会社",
    status: "納品済",
    deliveryDate: "2025-02-28",
    receiptDate: "2025-03-02",
    amount: 15000000,
    paidAmount: 15000000,
    quantity: 1,
    unitPrice: 15000000,
    manager: "鈴木花子",
    team: ["田中健太", "佐藤一郎"],
    totalItems: 4,
    receivedItems: 4,
    isImportant: false,
    isUrgent: false,
    isReceived: true,
    orderId: "ORD-2025-005",
    items: [
      {
        id: "i1",
        name: "監視カメラシステム",
        quantity: 1,
        unitPrice: 5000000,
        totalPrice: 5000000,
        status: "納品済",
        description: "4K対応"
      },
      {
        id: "i2",
        name: "顔認証システム",
        quantity: 1,
        unitPrice: 4000000,
        totalPrice: 4000000,
        status: "納品済",
        description: "AI搭載"
      },
      {
        id: "i3",
        name: "入退室管理システム",
        quantity: 1,
        unitPrice: 3000000,
        totalPrice: 3000000,
        status: "納品済",
        description: "カード・生体認証対応"
      },
      {
        id: "i4",
        name: "統合管理ソフトウェア",
        quantity: 1,
        unitPrice: 3000000,
        totalPrice: 3000000,
        status: "納品済",
        description: "クラウド対応"
      }
    ],
    notes: [
      { id: "n1", date: "2025-02-25", author: "鈴木花子", content: "出荷準備完了。" },
      { id: "n2", date: "2025-02-28", author: "田中健太", content: "納品完了。顧客確認済み。" },
      { id: "n3", date: "2025-03-02", author: "佐藤一郎", content: "設置・設定完了。動作確認済み。" }
    ],
    documents: [
      { id: "d1", name: "納品書.pdf", size: "1.1MB", date: "2025-02-28" },
      { id: "d2", name: "検収書.pdf", size: "0.9MB", date: "2025-03-02" },
      { id: "d3", name: "設定マニュアル.pdf", size: "5.5MB", date: "2025-03-02" }
    ],
    history: [
      { date: "2025-02-25", action: "出荷準備完了", user: "鈴木花子" },
      { date: "2025-02-28", action: "納品完了", user: "田中健太" },
      { date: "2025-03-02", action: "設置・設定完了", user: "佐藤一郎" },
      { date: "2025-03-02", action: "検収完了", user: "鈴木花子" }
    ]
  }
]

// フィルター設定
const filterConfigs = [
  {
    type: "status",
    label: "ステータス",
    options: ["すべて", "納品準備中", "配送中", "納品済", "キャンセル"],
    defaultValue: "すべて"
  },
  {
    type: "timeframe",
    label: "納品日",
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

export function DeliveryManagement() {
  // 選択された納品IDの状態管理
  const [selectedDeliveryIds, setSelectedDeliveryIds] = useState<string[]>([])
  
  // 納品データの状態管理
  const [deliveries, setDeliveries] = useState<Delivery[]>(sampleDeliveries)
  
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
  
  // 選択された納品
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(deliveries.length > 0 ? deliveries[0] : null)

  // 納品数のカウント
  const deliveryCounts = useMemo(() => {
    return {
      total: sampleDeliveries.length,
      preparing: sampleDeliveries.filter(d => d.status === '納品準備中').length,
      shipping: sampleDeliveries.filter(d => d.status === '配送中').length,
      delivered: sampleDeliveries.filter(d => d.status === '納品済').length,
      cancelled: sampleDeliveries.filter(d => d.status === 'キャンセル').length
    }
  }, [])

  // 新規納品追加ハンドラー
  const handleAddNew = () => {
    alert('新規納品を追加します')
  }
  
  // エクスポートハンドラー
  const handleExport = () => {
    alert('納品一覧をエクスポートします')
  }
  
  // 削除ハンドラー
  const handleDelete = (ids: string[]) => {
    alert(`選択した納品(${ids.join(', ')})を削除します`)
  }
  
  // 重要フラグ切り替えハンドラー
  const handleToggleImportant = (delivery: Delivery) => {
    setDeliveries(prevDeliveries => 
      prevDeliveries.map(d => 
        d.id === delivery.id ? { ...d, isImportant: !d.isImportant } : d
      )
    )
  }
  
  // 緊急フラグ切り替えハンドラー
  const handleToggleUrgent = (delivery: Delivery) => {
    setDeliveries(prevDeliveries => 
      prevDeliveries.map(d => 
        d.id === delivery.id ? { ...d, isUrgent: !d.isUrgent } : d
      )
    )
  }
  
  // 受領済みフラグ切り替えハンドラー
  const handleToggleReceived = (delivery: Delivery) => {
    const now = new Date().toISOString().split('T')[0];
    setDeliveries(prevDeliveries => 
      prevDeliveries.map(d => 
        d.id === delivery.id ? { 
          ...d, 
          isReceived: !d.isReceived,
          status: !d.isReceived ? '納品済' : d.status === '納品済' ? '配送中' : d.status,
          receiptDate: !d.isReceived ? now : d.receiptDate,
          receivedItems: !d.isReceived ? d.totalItems : 0
        } : d
      )
    )
  }
  
  // 納品削除ハンドラー
  const handleDeleteDelivery = (delivery: Delivery) => {
    if (confirm(`納品「${delivery.name}」を削除しますか？`)) {
      setDeliveries(prevDeliveries => prevDeliveries.filter(d => d.id !== delivery.id))
      if (selectedDelivery?.id === delivery.id) {
        setSelectedDelivery(null)
      }
    }
  }
  
  // フィルター適用関数
  const getFilteredItems = (deliveries: Delivery[], searchTerm: string, filters: Record<string, string>, incompleteOnly: boolean) => {
    let result = [...deliveries]
    
    // ステータスフィルター
    if (filters.status !== 'すべて') {
      result = result.filter(delivery => delivery.status === filters.status)
    }
    
    // 金額フィルター
    if (filters.amount !== 'すべて') {
      if (filters.amount === '～100万円') {
        result = result.filter(delivery => delivery.amount < 1000000)
      } else if (filters.amount === '～500万円') {
        result = result.filter(delivery => delivery.amount < 5000000)
      } else if (filters.amount === '～1000万円') {
        result = result.filter(delivery => delivery.amount < 10000000)
      } else if (filters.amount === '1000万円～') {
        result = result.filter(delivery => delivery.amount >= 10000000)
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
        result = result.filter(delivery => {
          const deliveryDate = new Date(delivery.deliveryDate)
          return deliveryDate >= startOfWeek && deliveryDate <= endOfWeek
        })
      } else if (filters.timeframe === '今月') {
        result = result.filter(delivery => {
          const deliveryDate = new Date(delivery.deliveryDate)
          return deliveryDate >= startOfMonth && deliveryDate <= endOfMonth
        })
      } else if (filters.timeframe === '次月') {
        result = result.filter(delivery => {
          const deliveryDate = new Date(delivery.deliveryDate)
          return deliveryDate >= startOfNextMonth && deliveryDate <= endOfNextMonth
        })
      }
    }
    
    // 検索フィルター
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      result = result.filter(delivery => {
        return (
          delivery.name.toLowerCase().includes(searchLower) ||
          delivery.code.toLowerCase().includes(searchLower) ||
          delivery.description.toLowerCase().includes(searchLower) ||
          delivery.client.toLowerCase().includes(searchLower) ||
          delivery.manager.toLowerCase().includes(searchLower)
        )
      })
    }
    
    // 未完了のみ表示
    if (incompleteOnly) {
      result = result.filter(delivery => delivery.status !== '納品済' && delivery.status !== 'キャンセル')
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

  // フィルタリングされた納品
  const filteredDeliveries = useMemo(() => {
    return getFilteredItems(deliveries, searchQuery, activeFilters, incompleteOnly);
  }, [deliveries, searchQuery, activeFilters, incompleteOnly]);
  
  // 検索ハンドラー
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <ManagementTemplate
      title="納品管理"
      items={deliveries}
      filteredItems={filteredDeliveries}
      selectedIds={selectedDeliveryIds}
      setSelectedIds={setSelectedDeliveryIds}
      selectedItem={selectedDelivery}
      setSelectedItem={setSelectedDelivery}
      onSearch={handleSearch}
      searchPlaceholder="納品を検索..."
      incompleteOnly={incompleteOnly}
      onIncompleteChange={setIncompleteOnly}
      onAddNew={handleAddNew}
      onExport={handleExport}
      onDelete={handleDelete}
      filterPanel={
        <DeliveryFilterPanel 
          onFilterChange={handleFilterChange}
          activeFilters={activeFilters}
          deliveryCounts={deliveryCounts}
        />
      }
      listItemComponent={({ item, isSelected, onSelect, isChecked, onCheckChange }) => (
        <DeliveryListItem 
          delivery={item}
          isSelected={isSelected}
          onSelect={onSelect}
          isChecked={isChecked}
          onCheckChange={onCheckChange}
          onToggleImportant={handleToggleImportant}
          onToggleUrgent={handleToggleUrgent}
          onToggleReceived={handleToggleReceived}
          onDelete={handleDeleteDelivery}
        />
      )}
      detailComponent={selectedDelivery && <DeliveryDetail selectedDelivery={selectedDelivery} />}
    />
  )
}
