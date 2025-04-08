"use client"

import React, { useState, useMemo } from "react"
import { ManagementTemplate } from "../templates/management-template"
import { BillingListItem } from "./billing-list-item"
import { BillingDetail } from "./billing-detail"
import { Billing } from "./types"
import { Plus, Download, Trash } from "lucide-react"
import { BillingFilterPanel } from "./billing-filter"

// サンプル請求データ
const sampleBillings: Billing[] = [
  {
    id: "1",
    code: "INV-2025-001",
    name: "工業用ポンプ一式",
    description: "大型工場向け高圧ポンプシステム一式の請求書。特殊仕様の耐熱性能を備えた製品。",
    client: "株式会社メトロ工業",
    status: "発行済",
    issueDate: "2025-04-05",
    dueDate: "2025-05-05",
    paymentDate: "",
    amount: 8500000,
    paidAmount: 4250000,
    taxRate: 10,
    taxAmount: 850000,
    totalAmount: 9350000,
    manager: "山田太郎",
    team: ["佐藤一郎", "鈴木花子", "田中健太"],
    isImportant: true,
    isUrgent: false,
    isPaid: false,
    orderId: "ORD-2025-001",
    deliveryId: "DEL-2025-001",
    items: [
      {
        id: "i1",
        name: "高圧ポンプユニットA型",
        quantity: 2,
        unitPrice: 2500000,
        totalPrice: 5000000,
        description: "耐熱性能強化モデル"
      },
      {
        id: "i2",
        name: "制御システム",
        quantity: 1,
        unitPrice: 1500000,
        totalPrice: 1500000,
        description: "タッチパネル操作対応"
      },
      {
        id: "i3",
        name: "配管セット",
        quantity: 1,
        unitPrice: 800000,
        totalPrice: 800000,
        description: "耐熱・耐圧仕様"
      },
      {
        id: "i4",
        name: "設置工事",
        quantity: 1,
        unitPrice: 1200000,
        totalPrice: 1200000,
        description: "現地調整含む"
      }
    ],
    notes: [
      { id: "n1", date: "2025-04-01", author: "山田太郎", content: "請求書作成完了。承認待ち。" },
      { id: "n2", date: "2025-04-05", author: "佐藤一郎", content: "請求書発行済み。顧客に送付済み。" }
    ],
    documents: [
      { id: "d1", name: "請求書.pdf", size: "1.2MB", date: "2025-04-05" },
      { id: "d2", name: "納品書.pdf", size: "0.8MB", date: "2025-04-01" },
      { id: "d3", name: "受注書.pdf", size: "0.7MB", date: "2025-03-15" }
    ],
    history: [
      { date: "2025-04-01", action: "請求書作成", user: "山田太郎" },
      { date: "2025-04-03", action: "承認", user: "佐藤一郎" },
      { date: "2025-04-05", action: "発行", user: "山田太郎" },
      { date: "2025-04-05", action: "送付", user: "山田太郎" }
    ]
  },
  {
    id: "2",
    code: "INV-2025-002",
    name: "生産ライン制御システム",
    description: "食品工場向け自動化生産ライン制御システム一式。タッチパネル操作、遠隔監視機能付き。",
    client: "フード・プロセッシング株式会社",
    status: "下書き",
    issueDate: "2025-04-25",
    dueDate: "2025-05-25",
    paymentDate: "",
    amount: 12000000,
    paidAmount: 0,
    taxRate: 10,
    taxAmount: 1200000,
    totalAmount: 13200000,
    manager: "鈴木花子",
    team: ["山田太郎", "田中健太"],
    isImportant: false,
    isUrgent: true,
    isPaid: false,
    orderId: "ORD-2025-002",
    deliveryId: "DEL-2025-002",
    items: [
      {
        id: "i1",
        name: "メインコントローラー",
        quantity: 1,
        unitPrice: 5000000,
        totalPrice: 5000000,
        description: "冗長化システム"
      },
      {
        id: "i2",
        name: "操作パネル",
        quantity: 3,
        unitPrice: 1500000,
        totalPrice: 4500000,
        description: "防水・防塵仕様"
      },
      {
        id: "i3",
        name: "ソフトウェア開発",
        quantity: 1,
        unitPrice: 2500000,
        totalPrice: 2500000,
        description: "カスタム開発"
      }
    ],
    notes: [
      { id: "n1", date: "2025-04-20", author: "鈴木花子", content: "請求書下書き作成。内容確認中。" }
    ],
    documents: [
      { id: "d1", name: "請求書下書き.pdf", size: "1.1MB", date: "2025-04-20" }
    ],
    history: [
      { date: "2025-04-20", action: "下書き作成", user: "鈴木花子" }
    ]
  },
  {
    id: "3",
    code: "INV-2025-003",
    name: "業務用空調設備",
    description: "オフィスビル向け省エネ型空調システム一式。中央管理システム付き。",
    client: "東京不動産開発株式会社",
    status: "支払済",
    issueDate: "2025-03-25",
    dueDate: "2025-04-25",
    paymentDate: "2025-04-20",
    amount: 7500000,
    paidAmount: 7500000,
    taxRate: 10,
    taxAmount: 750000,
    totalAmount: 8250000,
    manager: "田中健太",
    team: ["山田太郎", "佐藤一郎"],
    isImportant: true,
    isUrgent: false,
    isPaid: true,
    orderId: "ORD-2025-003",
    deliveryId: "DEL-2025-003",
    items: [
      {
        id: "i1",
        name: "室外機",
        quantity: 2,
        unitPrice: 1500000,
        totalPrice: 3000000,
        description: "省エネタイプ"
      },
      {
        id: "i2",
        name: "室内機",
        quantity: 10,
        unitPrice: 300000,
        totalPrice: 3000000,
        description: "静音設計"
      },
      {
        id: "i3",
        name: "制御システム",
        quantity: 1,
        unitPrice: 1000000,
        totalPrice: 1000000,
        description: "タッチパネル式"
      },
      {
        id: "i4",
        name: "設置工事",
        quantity: 1,
        unitPrice: 500000,
        totalPrice: 500000,
        description: "現地調整含む"
      }
    ],
    notes: [
      { id: "n1", date: "2025-03-25", author: "田中健太", content: "請求書発行済み。顧客に送付済み。" },
      { id: "n2", date: "2025-04-20", author: "佐藤一郎", content: "入金確認済み。" }
    ],
    documents: [
      { id: "d1", name: "請求書.pdf", size: "1.0MB", date: "2025-03-25" },
      { id: "d2", name: "入金証明書.pdf", size: "0.9MB", date: "2025-04-20" }
    ],
    history: [
      { date: "2025-03-23", action: "請求書作成", user: "田中健太" },
      { date: "2025-03-24", action: "承認", user: "山田太郎" },
      { date: "2025-03-25", action: "発行・送付", user: "田中健太" },
      { date: "2025-04-20", action: "入金確認", user: "佐藤一郎" }
    ]
  },
  {
    id: "4",
    code: "INV-2025-004",
    name: "太陽光発電システム",
    description: "工場屋上向け大規模太陽光発電システム一式。蓄電システム付き。",
    client: "グリーンエナジー株式会社",
    status: "発行済",
    issueDate: "2025-04-10",
    dueDate: "2025-05-10",
    paymentDate: "",
    amount: 25000000,
    paidAmount: 12500000,
    taxRate: 10,
    taxAmount: 2500000,
    totalAmount: 27500000,
    manager: "佐藤一郎",
    team: ["山田太郎", "鈴木花子", "田中健太"],
    isImportant: true,
    isUrgent: true,
    isPaid: false,
    orderId: "ORD-2025-004",
    deliveryId: "DEL-2025-004",
    items: [
      {
        id: "i1",
        name: "太陽光パネル",
        quantity: 100,
        unitPrice: 150000,
        totalPrice: 15000000,
        description: "高効率タイプ"
      },
      {
        id: "i2",
        name: "蓄電システム",
        quantity: 1,
        unitPrice: 8000000,
        totalPrice: 8000000,
        description: "大容量タイプ"
      },
      {
        id: "i3",
        name: "設置工事",
        quantity: 1,
        unitPrice: 2000000,
        totalPrice: 2000000,
        description: "屋上設置"
      }
    ],
    notes: [
      { id: "n1", date: "2025-04-10", author: "佐藤一郎", content: "請求書発行済み。顧客に送付済み。" },
      { id: "n2", date: "2025-04-15", author: "山田太郎", content: "前金50%入金確認済み。" }
    ],
    documents: [
      { id: "d1", name: "請求書.pdf", size: "1.3MB", date: "2025-04-10" },
      { id: "d2", name: "前金領収書.pdf", size: "0.8MB", date: "2025-04-15" }
    ],
    history: [
      { date: "2025-04-08", action: "請求書作成", user: "佐藤一郎" },
      { date: "2025-04-09", action: "承認", user: "田中健太" },
      { date: "2025-04-10", action: "発行・送付", user: "佐藤一郎" },
      { date: "2025-04-15", action: "前金入金確認", user: "山田太郎" }
    ]
  },
  {
    id: "5",
    code: "INV-2025-005",
    name: "セキュリティシステム",
    description: "オフィスビル向け統合セキュリティシステム。顔認証・監視カメラ・入退室管理を統合。",
    client: "セキュリティソリューションズ株式会社",
    status: "期限超過",
    issueDate: "2025-03-01",
    dueDate: "2025-04-01",
    paymentDate: "",
    amount: 15000000,
    paidAmount: 0,
    taxRate: 10,
    taxAmount: 1500000,
    totalAmount: 16500000,
    manager: "鈴木花子",
    team: ["田中健太", "佐藤一郎"],
    isImportant: false,
    isUrgent: true,
    isPaid: false,
    orderId: "ORD-2025-005",
    deliveryId: "DEL-2025-005",
    items: [
      {
        id: "i1",
        name: "監視カメラシステム",
        quantity: 1,
        unitPrice: 5000000,
        totalPrice: 5000000,
        description: "4K対応"
      },
      {
        id: "i2",
        name: "顔認証システム",
        quantity: 1,
        unitPrice: 4000000,
        totalPrice: 4000000,
        description: "AI搭載"
      },
      {
        id: "i3",
        name: "入退室管理システム",
        quantity: 1,
        unitPrice: 3000000,
        totalPrice: 3000000,
        description: "カード・生体認証対応"
      },
      {
        id: "i4",
        name: "統合管理ソフトウェア",
        quantity: 1,
        unitPrice: 3000000,
        totalPrice: 3000000,
        description: "クラウド対応"
      }
    ],
    notes: [
      { id: "n1", date: "2025-03-01", author: "鈴木花子", content: "請求書発行済み。顧客に送付済み。" },
      { id: "n2", date: "2025-04-05", author: "田中健太", content: "支払い期限超過。顧客に連絡済み。" },
      { id: "n3", date: "2025-04-07", author: "佐藤一郎", content: "顧客より5月10日までの支払い延長の依頼あり。" }
    ],
    documents: [
      { id: "d1", name: "請求書.pdf", size: "1.2MB", date: "2025-03-01" },
      { id: "d2", name: "支払い督促状.pdf", size: "0.7MB", date: "2025-04-05" }
    ],
    history: [
      { date: "2025-02-28", action: "請求書作成", user: "鈴木花子" },
      { date: "2025-03-01", action: "承認", user: "田中健太" },
      { date: "2025-03-01", action: "発行・送付", user: "鈴木花子" },
      { date: "2025-04-02", action: "期限超過", user: "システム" },
      { date: "2025-04-05", action: "督促連絡", user: "田中健太" },
      { date: "2025-04-07", action: "支払い延長依頼受理", user: "佐藤一郎" }
    ]
  }
]

// フィルター設定
const filterConfigs = [
  {
    type: "status",
    label: "ステータス",
    options: ["すべて", "下書き", "発行済", "支払済", "期限超過"],
    defaultValue: "すべて"
  },
  {
    type: "dueDate",
    label: "支払期限",
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

export function BillingManagement() {
  // 選択された請求IDの状態管理
  const [selectedBillingIds, setSelectedBillingIds] = useState<string[]>([])
  
  // 請求データの状態管理
  const [billings, setBillings] = useState<Billing[]>(sampleBillings)
  
  // フィルターの状態管理
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({
    status: 'すべて',
    dueDate: 'すべて',
    amount: 'すべて'
  })

  // 検索クエリの状態管理
  const [searchQuery, setSearchQuery] = useState<string>('')
  
  // 未払いのみ表示の状態管理
  const [unpaidOnly, setUnpaidOnly] = useState<boolean>(true)
  
  // 選択された請求
  const [selectedBilling, setSelectedBilling] = useState<Billing | null>(billings.length > 0 ? billings[0] : null)

  // 請求数のカウント
  const billingCounts = useMemo(() => {
    return {
      total: sampleBillings.length,
      draft: sampleBillings.filter(b => b.status === '下書き').length,
      issued: sampleBillings.filter(b => b.status === '発行済').length,
      paid: sampleBillings.filter(b => b.status === '支払済').length,
      overdue: sampleBillings.filter(b => b.status === '期限超過').length
    }
  }, [])

  // 新規請求追加ハンドラー
  const handleAddNew = () => {
    alert('新規請求書を追加します')
  }
  
  // エクスポートハンドラー
  const handleExport = () => {
    alert('請求一覧をエクスポートします')
  }
  
  // 削除ハンドラー
  const handleDelete = (ids: string[]) => {
    alert(`選択した請求書(${ids.join(', ')})を削除します`)
  }
  
  // 重要フラグ切り替えハンドラー
  const handleToggleImportant = (billing: Billing) => {
    setBillings(prevBillings => 
      prevBillings.map(b => 
        b.id === billing.id ? { ...b, isImportant: !b.isImportant } : b
      )
    )
  }
  
  // 緊急フラグ切り替えハンドラー
  const handleToggleUrgent = (billing: Billing) => {
    setBillings(prevBillings => 
      prevBillings.map(b => 
        b.id === billing.id ? { ...b, isUrgent: !b.isUrgent } : b
      )
    )
  }
  
  // 支払済みフラグ切り替えハンドラー
  const handleTogglePaid = (billing: Billing) => {
    const now = new Date().toISOString().split('T')[0];
    setBillings(prevBillings => 
      prevBillings.map(b => 
        b.id === billing.id ? { 
          ...b, 
          isPaid: !b.isPaid,
          status: !b.isPaid ? '支払済' : b.status === '支払済' ? '発行済' : b.status,
          paymentDate: !b.isPaid ? now : '',
          paidAmount: !b.isPaid ? b.totalAmount : 0
        } : b
      )
    )
  }
  
  // 請求削除ハンドラー
  const handleDeleteBilling = (billing: Billing) => {
    if (confirm(`請求書「${billing.name}」を削除しますか？`)) {
      setBillings(prevBillings => prevBillings.filter(b => b.id !== billing.id))
      if (selectedBilling?.id === billing.id) {
        setSelectedBilling(null)
      }
    }
  }
  
  // フィルター適用関数
  const getFilteredItems = (billings: Billing[], searchTerm: string, filters: Record<string, string>, unpaidOnly: boolean) => {
    let result = [...billings]
    
    // ステータスフィルター
    if (filters.status !== 'すべて') {
      result = result.filter(billing => billing.status === filters.status)
    }
    
    // 金額フィルター
    if (filters.amount !== 'すべて') {
      if (filters.amount === '～100万円') {
        result = result.filter(billing => billing.totalAmount < 1000000)
      } else if (filters.amount === '～500万円') {
        result = result.filter(billing => billing.totalAmount < 5000000)
      } else if (filters.amount === '～1000万円') {
        result = result.filter(billing => billing.totalAmount < 10000000)
      } else if (filters.amount === '1000万円～') {
        result = result.filter(billing => billing.totalAmount >= 10000000)
      }
    }
    
    // 支払期限フィルター
    if (filters.dueDate !== 'すべて') {
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
      
      if (filters.dueDate === '今週') {
        result = result.filter(billing => {
          const dueDate = new Date(billing.dueDate)
          return dueDate >= startOfWeek && dueDate <= endOfWeek
        })
      } else if (filters.dueDate === '今月') {
        result = result.filter(billing => {
          const dueDate = new Date(billing.dueDate)
          return dueDate >= startOfMonth && dueDate <= endOfMonth
        })
      } else if (filters.dueDate === '次月') {
        result = result.filter(billing => {
          const dueDate = new Date(billing.dueDate)
          return dueDate >= startOfNextMonth && dueDate <= endOfNextMonth
        })
      }
    }
    
    // 検索フィルター
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      result = result.filter(billing => {
        return (
          billing.name.toLowerCase().includes(searchLower) ||
          billing.code.toLowerCase().includes(searchLower) ||
          billing.description.toLowerCase().includes(searchLower) ||
          billing.client.toLowerCase().includes(searchLower) ||
          billing.manager.toLowerCase().includes(searchLower)
        )
      })
    }
    
    // 未払いのみ表示
    if (unpaidOnly) {
      result = result.filter(billing => billing.status !== '支払済')
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

  // フィルタリングされた請求
  const filteredBillings = useMemo(() => {
    return getFilteredItems(billings, searchQuery, activeFilters, unpaidOnly);
  }, [billings, searchQuery, activeFilters, unpaidOnly]);
  
  // 検索ハンドラー
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <ManagementTemplate
      title="請求管理"
      items={billings}
      filteredItems={filteredBillings}
      selectedIds={selectedBillingIds}
      setSelectedIds={setSelectedBillingIds}
      selectedItem={selectedBilling}
      setSelectedItem={setSelectedBilling}
      onSearch={handleSearch}
      searchPlaceholder="請求書を検索..."
      incompleteOnly={unpaidOnly}
      onIncompleteChange={setUnpaidOnly}
      onAddNew={handleAddNew}
      onExport={handleExport}
      onDelete={handleDelete}
      filterPanel={
        <BillingFilterPanel 
          onFilterChange={handleFilterChange}
          activeFilters={activeFilters}
          billingCounts={billingCounts}
        />
      }
      listItemComponent={({ item, isSelected, onSelect, isChecked, onCheckChange }) => (
        <BillingListItem 
          billing={item}
          isSelected={isSelected}
          onSelect={onSelect}
          isChecked={isChecked}
          onCheckChange={onCheckChange}
          onToggleImportant={handleToggleImportant}
          onToggleUrgent={handleToggleUrgent}
          onTogglePaid={handleTogglePaid}
          onDelete={handleDeleteBilling}
        />
      )}
      detailComponent={selectedBilling && <BillingDetail selectedBilling={selectedBilling} />}
    />
  )
}
