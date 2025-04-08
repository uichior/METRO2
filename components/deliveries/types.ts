export interface Delivery {
  id: string
  code: string
  name: string
  description: string
  client: string
  status: string
  deliveryDate: string
  receiptDate?: string
  amount: number
  paidAmount: number
  quantity?: number
  unitPrice?: number
  manager: string
  team: string[]
  totalItems: number
  receivedItems: number
  items: DeliveryItem[]
  attachments?: Attachment[]
  documents?: Document[]
  notes?: Note[]
  history?: HistoryItem[]
  isImportant?: boolean
  isUrgent?: boolean
  isReceived?: boolean
  orderId?: string
}

export interface Document {
  id: string
  name: string
  size: string
  date: string
}

export interface Note {
  id: string
  date: string
  author: string
  content: string
}

export interface HistoryItem {
  date: string
  action: string
  user: string
}

export interface DeliveryItem {
  id: string
  name: string
  quantity: number
  unitPrice: number
  totalPrice: number
  status: string
  description: string
}

export interface Attachment {
  id: string
  name: string
  type: string
  size: number
  uploadDate: string
  uploadedBy: string
  url: string
}
