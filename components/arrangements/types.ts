// 手配管理の型定義

// 手配アイテム（材料や部品など）
export interface ArrangementItem {
  id: string
  name: string
  quantity: number
  unit: string
  unitPrice: number
  totalPrice: number
  supplier?: string
  status: string // 未手配、発注済、入荷済など
  deliveryDate?: string
  description?: string
}

// 手配メモ
export interface ArrangementNote {
  id: string
  date: string
  author: string
  content: string
}

// 手配関連書類
export interface ArrangementDocument {
  id: string
  name: string
  size: string
  date: string
}

// 手配履歴
export interface ArrangementHistory {
  date: string
  action: string
  user: string
}

// 手配メイン
export interface Arrangement {
  id: string
  code: string
  name: string
  description: string
  status: string // 未手配、手配中、手配完了、キャンセルなど
  client: string
  orderId: string
  deliveryId?: string
  createdDate: string
  requiredDate: string
  completionDate?: string
  manager: string
  team: string[]
  totalAmount: number
  isImportant: boolean
  isUrgent: boolean
  isCompleted: boolean
  items: ArrangementItem[]
  notes: ArrangementNote[]
  documents: ArrangementDocument[]
  history: ArrangementHistory[]
  progress: number // 進捗率（0-100%）
  supplierCount: number // 仕入先数
}
