// 請求書の型定義
export interface BillingItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  description: string;
}

export interface BillingNote {
  id: string;
  date: string;
  author: string;
  content: string;
}

export interface BillingDocument {
  id: string;
  name: string;
  size: string;
  date: string;
}

export interface BillingHistory {
  date: string;
  action: string;
  user: string;
}

export interface Billing {
  id: string;
  code: string;
  name: string;
  description: string;
  client: string;
  status: string;
  issueDate: string;
  dueDate: string;
  paymentDate: string;
  amount: number;
  paidAmount: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  manager: string;
  team: string[];
  isImportant: boolean;
  isUrgent?: boolean;
  isPaid?: boolean;
  orderId: string;
  deliveryId?: string;
  items: BillingItem[];
  notes: BillingNote[];
  documents: BillingDocument[];
  history: BillingHistory[];
}
