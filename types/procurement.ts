import type { BaseRecord } from "./common"

/**
 * 調達品目のステータス
 */
export type ProcurementStatus = "未手配" | "手配済" | "納品済" | "キャンセル"

/**
 * 調達種別
 */
export type ProcurementType = "外注" | "内製"

/**
 * 優先度
 */
export type PriorityLevel = "低" | "通常" | "高" | "緊急"

/**
 * 調達品目の基本情報
 */
export interface ProcurementItem extends BaseRecord {
  orderId: string
  itemId: string
  itemCode: string
  itemName: string
  quantity: number
  unit: string
  unitPrice: number
  totalAmount: number
  supplier: string
  requestDate: string
  requiredDate: string
  status: ProcurementStatus
  priority: PriorityLevel
  notes?: string
  procurementType: ProcurementType
  receiveDate?: string
}

/**
 * 調達フォームデータ
 */
export interface ProcurementFormData {
  itemId: string
  itemCode: string
  itemName: string
  quantity: number
  unitPrice: number
  supplier: string
  requiredDate: string
  priority: PriorityLevel
  notes?: string
  procurementType: ProcurementType
}

/**
 * 受領データ
 */
export interface ReceiveData {
  procurementId: string
  receiveDate: string
  quantity: number
  amount: number
  isPartial: boolean
  notes?: string
}

/**
 * 発注書データ
 */
export interface PurchaseOrderData {
  orderNumber: string
  orderDate: string
  supplier: string
  items: ProcurementItem[]
  totalAmount: number
  deliveryDate: string
  shippingAddress: string
  notes?: string
  terms?: string
}

