import type { BaseRecord } from "./common"

/**
 * 項目のステータス
 */
export type ItemStatus = "有効" | "無効" | "廃止"

/**
 * 項目の種別
 */
export type ItemType = "部品" | "アセンブリ" | "ユニット" | "パネル" | "ハーネス" | "原材料"

/**
 * 項目の基本情報
 */
export interface Item extends BaseRecord {
  code: string
  name: string
  category: string
  unit: string
  unitPrice: number
  stockQuantity: number
  supplier?: string
  leadTime?: number
  status: ItemStatus
  partNumber: string
  drawingNumber?: string
  type: ItemType
  department?: string
  account?: string
  manufacturingCost?: number
  description?: string
  location?: string
  minStock: number
  maxStock: number
}

/**
 * BOM項目
 */
export interface BomItem {
  id: string
  parentId: string
  partCode: string
  partName: string
  quantity: number
  unit: string
  unitPrice: number
  amount: number
}

/**
 * 図面データ
 */
export interface Drawing {
  id: string
  itemId: string
  name: string
  revision: string
  format: string
  updatedAt: string
}

/**
 * ファイルデータ
 */
export interface ItemFile {
  id: string
  itemId: string
  name: string
  type: string
  size: string
  updatedAt: string
}

/**
 * 詳細情報
 */
export interface ItemDetail {
  id: string
  itemId: string
  recordDate: string
  manufacturer: string
  laborCost: number
  applyDate: string
  completionDate: string
  standardTime: number
  workUnitPrice: number
  paymentUnitPrice: number
  status: string
}

