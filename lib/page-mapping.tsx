import React from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Truck,
  FileText,
  Hammer,
  ShoppingBag,
  Warehouse,
  PiggyBank,
  CreditCard,
  Settings,
  Package,
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
};

// ページマッピングの型定義
export type PageMapping = {
  name: string;
  path: string;
  icon: React.ReactNode;
  badge: string;
  color?: string;
};

// ページマッピング
export const pageMapping: Record<string, PageMapping> = {
  dashboard: {
    name: "ダッシュボード",
    path: "/dashboard",
    icon: <LayoutDashboard size={24} />,
    badge: "",
    color: lineColors.marunouchi
  },

  orders: {
    name: "受注管理",
    path: "/orders",
    icon: <ShoppingCart size={24} />,
    badge: "3",
    color: lineColors.marunouchi
  },
  deliveries: {
    name: "納品管理",
    path: "/deliveries",
    icon: <Truck size={24} />,
    badge: "2",
    color: lineColors.ginza
  },
  billing: {
    name: "請求管理",
    path: "/billing",
    icon: <FileText size={24} />,
    badge: "3",
    color: lineColors.hibiya
  },
  arrangements: {
    name: "手配管理",
    path: "/arrangements",
    icon: <Package size={24} />,
    badge: "5",
    color: lineColors.chiyoda
  },
  purchasing: {
    name: "仕入管理",
    path: "/purchasing",
    icon: <ShoppingBag size={24} />,
    badge: "",
    color: lineColors.tozai
  },
  inventory: {
    name: "在庫管理",
    path: "/inventory",
    icon: <Warehouse size={24} />,
    badge: "",
    color: lineColors.namboku
  },
  finance: {
    name: "財務",
    path: "/finance",
    icon: <PiggyBank size={24} />,
    badge: "",
    color: lineColors.hanzomon
  },
  settings: {
    name: "設定",
    path: "/settings",
    icon: <Settings size={24} />,
    badge: "",
    color: lineColors.fukutoshin
  }
};

// パスからページキーを取得する関数
export function getPageKeyFromPath(path: string): string | undefined {
  // パスから最初のセグメントを取得（例：/orders/123 → orders）
  const segment = path.split('/')[1];
  
  // ページマッピングのキーと一致するか確認
  return Object.keys(pageMapping).find(key => key === segment);
}

// パスからページアイテムを取得する関数
export function getPageItemFromPath(path: string): PageMapping | undefined {
  const key = getPageKeyFromPath(path);
  return key ? pageMapping[key] : undefined;
}
