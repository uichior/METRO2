import { useState, useMemo, useEffect } from "react"
import type { Order } from "@/types/order"

interface OrdersFilterProps {
  orders: Order[]
  initialSearchTerm?: string
}

interface PriorityFilters {
  urgent: boolean
  highPriority: boolean
}

export function useOrdersFilter({ orders, initialSearchTerm = "" }: OrdersFilterProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
  
  // initialSearchTerm が変更されたときに searchTerm を更新
  useEffect(() => {
    setSearchTerm(initialSearchTerm)
  }, [initialSearchTerm])
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null)
  const [priorityFilters, setPriorityFilters] = useState<PriorityFilters>({
    urgent: false,
    highPriority: false
  })
  const [selectedProductType, setSelectedProductType] = useState("all")
  const [showUndeliveredOnly, setShowUndeliveredOnly] = useState(true)

  // 検索とフィルタリングを適用
  const filteredOrders = useMemo(() => {
    return orders.filter((order: Order) => {
      // 検索条件
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        // 複数のフィールドを検索対象にする
        const matchesSearch = (
          // 注文ID
          order.id.toLowerCase().includes(searchLower) ||
          // 製品名
          order.product.toLowerCase().includes(searchLower) ||
          // 製品コード
          order.productCode.toLowerCase().includes(searchLower) ||
          // 製品カテゴリ
          order.category.toLowerCase().includes(searchLower) ||
          // 取引先名
          (order.customer?.name || '').toLowerCase().includes(searchLower) ||
          // 担当者
          (order.customer?.contactPerson || '').toLowerCase().includes(searchLower) ||
          // 営業担当者
          order.salesPerson.toLowerCase().includes(searchLower) ||
          // ステータス
          order.status.toLowerCase().includes(searchLower) ||
          // 優先度
          order.priority.toLowerCase().includes(searchLower) ||
          // 金額
          order.totalAmount.toString().includes(searchLower) ||
          // 納期日
          order.deliveryDate.toLowerCase().includes(searchLower) ||
          // 注文日
          order.orderDate.toLowerCase().includes(searchLower) ||
          // メモ
          order.notes.toLowerCase().includes(searchLower)
        );
        
        if (!matchesSearch) {
          return false;
        }
      }
      
      // ステータスフィルター
      if (selectedStatus && selectedStatus !== "すべて" && order.status !== selectedStatus) {
        return false
      }
      
      // 取引先フィルター
      if (selectedPartner && order.customer?.name !== selectedPartner) {
        return false
      }
      
      // 優先度フィルター
      if (priorityFilters.urgent && !order.isUrgent) {
        return false
      }
      
      if (priorityFilters.highPriority && !order.isHighPriority) {
        return false
      }
      
      // 製品タイプフィルター
      if (selectedProductType !== "all" && order.productType !== selectedProductType) {
        return false
      }
      
      // 未納のみフィルター
      if (showUndeliveredOnly && (order.status === "出荷完了" || order.status === "納品完了")) {
        return false
      }
      
      return true
    })
  }, [
    orders, 
    searchTerm, 
    selectedStatus, 
    selectedPartner, 
    selectedProductType, 
    priorityFilters, 
    showUndeliveredOnly
  ])

  // 取引先一覧を取得（重複なし）
  const customers = useMemo(() => {
    return Array.from(
      new Set(orders.filter((order) => order.customer?.name).map((order) => order.customer.name))
    )
  }, [orders])

  // ステータスフィルターの設定
  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status === "すべて" ? null : status)
  }

  // 取引先フィルターの設定
  const handleCustomerFilter = (customer: string | null) => {
    setSelectedPartner(customer)
  }

  // 製品タイプフィルターの設定
  const handleProductTypeFilter = (type: string) => {
    setSelectedProductType(type)
  }

  // 優先度フィルターの切り替え
  const togglePriorityFilter = (type: 'urgent' | 'highPriority') => {
    setPriorityFilters(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  return {
    filteredOrders,
    customers,
    searchTerm,
    setSearchTerm,
    selectedStatus,
    selectedPartner,
    priorityFilters,
    selectedProductType,
    showUndeliveredOnly,
    setShowUndeliveredOnly,
    handleStatusFilter,
    handleCustomerFilter,
    handleProductTypeFilter,
    togglePriorityFilter
  }
}
