import type { BaseRecord } from "./common"

/**
 * 納品ステータス
 */
export type DeliveryStatus = "出荷待ち" | "出荷準備中" | "出荷済" | "納品完了"

/**
 * 納品アイテム
 */
export interface DeliveryItem {
  id: string
  name: string
  quantity: number
  unit: string
  price: number
}

/**
 * 納品履歴
 */
export interface DeliveryHistory {
  date: string
  action: string
  user: string
}

/**
 * 納品関連文書
 */
export interface DeliveryDocument {
  name: string
  type: string
  size: string
  date: string
}

/**
 * 納品データ
 */
export interface Delivery extends BaseRecord {
  orderId: string
  customer: string
  product: string
  quantity: number
  orderDate: string
  scheduledDate: string
  actualDate?: string
  status: DeliveryStatus
  invoiceNo?: string
  deliveryNote?: string
  deliveredBy?: string
  receivedBy?: string
  notes?: string
  address: string
  contact: string
  items: DeliveryItem[]
  history: DeliveryHistory[]
  documents: DeliveryDocument[]
}

/**
 * 納品フォームデータ
 */
export interface DeliveryFormData {
  orderId: string
  customer: string
  product: string
  quantity: number
  scheduledDate: string
  status: DeliveryStatus
  address: string
  contact: string
  notes?: string
  items: DeliveryItem[]
}

/**
 * 請求データ
 */
export interface InvoiceData {
  invoiceNumber: string
  issueDate: string
  dueDate: string
  customerName: string
  customerAddress: string
  deliveries: Delivery[]
  totalAmount: number
  taxRate: number
  taxAmount: number
  grandTotal: number
  notes?: string
  terms?: string
}

