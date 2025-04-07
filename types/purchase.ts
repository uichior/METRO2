/**
 * 購買管理関連の型定義
 */

/**
 * 購買ステータス
 */
export enum PurchaseStatus {
  PENDING = "pending",
  ORDERED = "ordered",
  PARTIAL_RECEIVED = "partial_received",
  RECEIVED = "received",
  CANCELLED = "cancelled",
  PAID = "paid",
  PARTIAL_PAID = "partial_paid"
}

/**
 * 購買アイテム
 */
export interface PurchaseItem {
  id: string;
  orderNumber: string;
  orderDate: string;
  supplier: string;
  status: PurchaseStatus;
  totalAmount: number;
  dueDate: string;
  paymentDate?: string;
  items: PurchaseLineItem[];
  notes?: string;
}

/**
 * 購買明細アイテム
 */
export interface PurchaseLineItem {
  id: string;
  partCode: string;
  partName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  amount: number;
  receivedQuantity?: number;
  receivedDate?: string;
}

/**
 * 購買履歴
 */
export interface PurchaseHistory {
  id: string;
  date: string;
  status: PurchaseStatus;
  amount?: number;
  note?: string;
  user?: string;
}

/**
 * 購買書類
 */
export interface PurchaseDocument {
  id: string;
  type: "order" | "delivery" | "invoice" | "receipt";
  filename: string;
  date: string;
  url: string;
}

/**
 * 仕入先
 */
export interface Supplier {
  id: string;
  code: string;
  name: string;
  address?: string;
  contact?: string;
  phone?: string;
  email?: string;
  paymentTerms?: string;
}

/**
 * 検収データ
 */
export interface ReceiveData {
  purchaseId: string;
  receiveDate: string;
  items: {
    lineItemId: string;
    receivedQuantity: number;
  }[];
  notes?: string;
}

/**
 * 支払データ
 */
export interface PaymentData {
  purchaseId: string;
  paymentDate: string;
  amount: number;
  method: "bank" | "cash" | "credit" | "other";
  reference?: string;
  notes?: string;
}

/**
 * 東京メトロの路線カラーをベースにした購買ステータスの色
 */
import { lineColors } from "@/constants/colors";

export const purchaseStatusColors = {
  [PurchaseStatus.PENDING]: {
    color: lineColors.hibiya,
    lightBgClass: `bg-opacity-20 bg-[${lineColors.hibiya}] text-[${lineColors.hibiya}] hover:bg-opacity-30`,
    variant: "default" as const
  },
  [PurchaseStatus.ORDERED]: {
    color: lineColors.ginza,
    lightBgClass: `bg-opacity-20 bg-[${lineColors.ginza}] text-[${lineColors.ginza}] hover:bg-opacity-30`,
    variant: "default" as const
  },
  [PurchaseStatus.PARTIAL_RECEIVED]: {
    color: lineColors.yurakucho,
    lightBgClass: `bg-opacity-20 bg-[${lineColors.yurakucho}] text-[${lineColors.yurakucho}] hover:bg-opacity-30`,
    variant: "default" as const
  },
  [PurchaseStatus.RECEIVED]: {
    color: lineColors.tozai,
    lightBgClass: `bg-opacity-20 bg-[${lineColors.tozai}] text-[${lineColors.tozai}] hover:bg-opacity-30`,
    variant: "default" as const
  },
  [PurchaseStatus.CANCELLED]: {
    color: lineColors.marunouchi,
    lightBgClass: `bg-opacity-20 bg-[${lineColors.marunouchi}] text-[${lineColors.marunouchi}] hover:bg-opacity-30`,
    variant: "default" as const
  },
  [PurchaseStatus.PARTIAL_PAID]: {
    color: lineColors.yurakucho,
    lightBgClass: `bg-opacity-20 bg-[${lineColors.yurakucho}] text-[${lineColors.yurakucho}] hover:bg-opacity-30`,
    variant: "default" as const
  },
  [PurchaseStatus.PAID]: {
    color: lineColors.namboku,
    lightBgClass: `bg-opacity-20 bg-[${lineColors.namboku}] text-[${lineColors.namboku}] hover:bg-opacity-30`,
    variant: "default" as const
  }
};
