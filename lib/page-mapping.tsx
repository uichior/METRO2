import React from "react";
import { 
  ShoppingCart, 
  Truck, 
  FileText, 
  Hammer, 
  ShoppingBag, 
  CreditCard, 
  Warehouse, 
  PiggyBank 
} from "lucide-react";

// 路線カラー
export const lineColors = {
  marunouchi: "#E60012", // 丸ノ内線
  hibiya: "#9CAEB7",     // 日比谷線
  ginza: "#F7B52C",      // 銀座線
  chiyoda: "#00A95F",    // 千代田線
  tozai: "#009BBF",      // 東西線
  yurakucho: "#FCBA0C",  // 有楽町線
  hanzomon: "#8F76D6",   // 半蔵門線
  namboku: "#00ADA9",    // 南北線
  fukutoshin: "#9C5E31", // 副都心線
}

export interface PageItem {
  path: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  badge?: number;
}

export const pageMapping: Record<string, PageItem> = {
  orders: { path: "/orders", name: "受注", icon: <ShoppingCart className="h-5 w-5" />, color: lineColors.marunouchi, badge: 5 },
  delivery: { path: "/delivery", name: "納品", icon: <Truck className="h-5 w-5" />, color: lineColors.ginza, badge: 2 },
  billing: { path: "/billing", name: "請求", icon: <FileText className="h-5 w-5" />, color: lineColors.hibiya, badge: 3 },
  arrangement: { path: "/arrangement", name: "手配", icon: <Hammer className="h-5 w-5" />, color: lineColors.chiyoda },
  purchasing: { path: "/purchasing", name: "仕入", icon: <ShoppingBag className="h-5 w-5" />, color: lineColors.tozai },
  payment: { path: "/payment", name: "支払", icon: <CreditCard className="h-5 w-5" />, color: lineColors.yurakucho },
  inventory: { path: "/inventory", name: "在庫", icon: <Warehouse className="h-5 w-5" />, color: lineColors.namboku },
  budget: { path: "/budget", name: "予算", icon: <PiggyBank className="h-5 w-5" />, color: lineColors.hanzomon },
  dailyreport: { path: "/dailyreport", name: "日報", icon: <FileText className="h-5 w-5" />, color: lineColors.fukutoshin }
}

// パスからページキーを取得する関数
export function getPageKeyFromPath(path: string): string | undefined {
  // パスから最初のセグメントを取得（例：/orders/123 → orders）
  const segment = path.split('/')[1];
  
  // ページマッピングのキーと一致するか確認
  return Object.keys(pageMapping).find(key => key === segment);
}

// パスからページアイテムを取得する関数
export function getPageItemFromPath(path: string): PageItem | undefined {
  const key = getPageKeyFromPath(path);
  return key ? pageMapping[key] : undefined;
}
