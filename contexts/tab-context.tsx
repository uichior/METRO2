"use client"

import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {
  BarChart3,
  TrendingUp,
  ShoppingCart,
  TruckIcon,
  PiggyBank,
  PackageOpen,
  FileText,
  Package,
  Building2,
  Briefcase,
  UserCircle,
  BookOpen,
  Layers,
  FileSpreadsheet,
  Receipt,
  Wallet,
  Boxes,
  ClipboardList,
} from "lucide-react"
import { usePathname } from "next/navigation"

// タブの型定義
export interface TabInfo {
  path: string
  label: string
  icon: React.ReactNode
  id: string
}

// コンテキストの型定義
interface TabContextType {
  tabs: TabInfo[]
  activeTabId: string
  setActiveTab: (tabId: string) => void
}

// アイコンのマッピング
export const iconMapping: Record<string, React.ReactNode> = {
  "/dashboard": <BarChart3 className="h-4 w-4" />,
  "/orders": <TrendingUp className="h-4 w-4" />,
  "/procurement": <ShoppingCart className="h-4 w-4" />,
  "/deliveries": <TruckIcon className="h-4 w-4" />,
  "/budget": <PiggyBank className="h-4 w-4" />,
  "/purchase": <PackageOpen className="h-4 w-4" />,
  "/billing": <Receipt className="h-4 w-4" />,
  "/payment": <Wallet className="h-4 w-4" />,
  "/inventory": <Boxes className="h-4 w-4" />,
  "/customers": <Building2 className="h-4 w-4" />,
  "/items": <Package className="h-4 w-4" />,
  "/daily-report": <ClipboardList className="h-4 w-4" />,
  "/master/drawing": <FileText className="h-4 w-4" />,
  "/master/item": <Package className="h-4 w-4" />,
  "/master/supplier": <Building2 className="h-4 w-4" />,
  "/master/contract": <Briefcase className="h-4 w-4" />,
  "/master/category": <Layers className="h-4 w-4" />,
  "/master/division": <BookOpen className="h-4 w-4" />,
  "/master/account": <FileSpreadsheet className="h-4 w-4" />,
  "/master/department": <Building2 className="h-4 w-4" />,
  "/master/employee": <UserCircle className="h-4 w-4" />,
}

// ラベルのマッピング
export const labelMapping: Record<string, string> = {
  "/dashboard": "ダッシュボード",
  "/orders": "受注管理",
  "/procurement": "手配管理",
  "/deliveries": "納品管理",
  "/budget": "予算管理",
  "/purchase": "仕入管理",
  "/billing": "請求管理",
  "/payment": "支払管理",
  "/inventory": "在庫管理",
  "/customers": "取引先",
  "/items": "アイテム",
  "/daily-report": "日報管理",
  "/master/drawing": "図面",
  "/master/item": "アイテム",
  "/master/supplier": "取引先",
  "/master/contract": "契約",
  "/master/category": "分類",
  "/master/division": "部門",
  "/master/account": "科目",
  "/master/department": "部署",
  "/master/employee": "社員",
}

// タブIDのマッピング
export const tabIdMapping: Record<string, string> = {
  "/dashboard": "dashboard",
  "/orders": "orders",
  "/procurement": "procurement",
  "/deliveries": "deliveries",
  "/budget": "budget",
  "/purchase": "purchase",
  "/billing": "billing",
  "/payment": "payment",
  "/inventory": "inventory",
  "/customers": "customers",
  "/items": "items",
  "/daily-report": "daily-report",
  "/master/drawing": "drawing",
  "/master/item": "item",
  "/master/supplier": "supplier",
  "/master/contract": "contract",
  "/master/category": "category",
  "/master/division": "division",
  "/master/account": "account",
  "/master/department": "department",
  "/master/employee": "employee",
}

// デフォルトのタブ
const defaultTab: TabInfo = {
  path: "/dashboard",
  label: "ダッシュボード",
  icon: <BarChart3 className="h-4 w-4" />,
  id: "dashboard",
}

// コンテキストの作成
const TabContext = createContext<TabContextType | undefined>(undefined)

// プロバイダーコンポーネント
export function TabProvider({ children }: { children: ReactNode }) {
  const [activeTabId, setActiveTabId] = useState<string>(defaultTab.id)
  const pathname = usePathname()

  const tabs: TabInfo[] = React.useMemo(() => {
    return [
      { path: "/dashboard", label: "ダッシュボード", icon: <BarChart3 className="h-4 w-4" />, id: "dashboard" },
      { path: "/orders", label: "受注管理", icon: <TrendingUp className="h-4 w-4" />, id: "orders" },
      { path: "/deliveries", label: "納品管理", icon: <TruckIcon className="h-4 w-4" />, id: "deliveries" },
      { path: "/billing", label: "請求管理", icon: <Receipt className="h-4 w-4" />, id: "billing" },
      { path: "/budget", label: "予算管理", icon: <PiggyBank className="h-4 w-4" />, id: "budget" },
      { path: "/procurement", label: "手配管理", icon: <ShoppingCart className="h-4 w-4" />, id: "procurement" },
      { path: "/purchase", label: "仕入管理", icon: <PackageOpen className="h-4 w-4" />, id: "purchase" },
      { path: "/payment", label: "支払管理", icon: <Wallet className="h-4 w-4" />, id: "payment" },
      { path: "/inventory", label: "在庫管理", icon: <Boxes className="h-4 w-4" />, id: "inventory" },
      { path: "/customers", label: "取引先", icon: <Building2 className="h-4 w-4" />, id: "customers" },
      { path: "/items", label: "アイテム", icon: <Package className="h-4 w-4" />, id: "items" },
      { path: "/daily-report", label: "日報管理", icon: <ClipboardList className="h-4 w-4" />, id: "daily-report" },
      { path: "/master/drawing", label: "図面", icon: <FileText className="h-4 w-4" />, id: "drawing" },
      { path: "/master/item", label: "アイテム", icon: <Package className="h-4 w-4" />, id: "item" },
      { path: "/master/supplier", label: "取引先", icon: <Building2 className="h-4 w-4" />, id: "supplier" },
      { path: "/master/contract", label: "契約", icon: <Briefcase className="h-4 w-4" />, id: "contract" },
      { path: "/master/category", label: "分類", icon: <Layers className="h-4 w-4" />, id: "category" },
      { path: "/master/division", label: "部門", icon: <BookOpen className="h-4 w-4" />, id: "division" },
      { path: "/master/account", label: "科目", icon: <FileSpreadsheet className="h-4 w-4" />, id: "account" },
      { path: "/master/department", label: "部署", icon: <Building2 className="h-4 w-4" />, id: "department" },
      { path: "/master/employee", label: "社員", icon: <UserCircle className="h-4 w-4" />, id: "employee" },
    ]
  }, [])

  // パスが変更されたときに、タブを更新する
  useEffect(() => {
    if (pathname) {
      const tabId = tabIdMapping[pathname] || "dashboard"
      setActiveTabId(tabId)
    }
  }, [pathname])

  const setActiveTab = (tabId: string) => {
    setActiveTabId(tabId)
  }

  return <TabContext.Provider value={{ tabs, activeTabId, setActiveTab }}>{children}</TabContext.Provider>
}

// カスタムフック
export function useTabs() {
  const context = useContext(TabContext)
  if (context === undefined) {
    throw new Error("useTabs must be used within a TabProvider")
  }
  return context
}

