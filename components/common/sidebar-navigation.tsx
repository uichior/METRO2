"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { MetroLogo } from "./metro-logo"
// ページマッピングの定義
interface PageItem {
  name: string;
  path: string;
  icon: React.ReactElement;
  badge?: string;
}

const pageMapping: Record<string, PageItem> = {
  orders: {
    name: "受注管理",
    path: "/orders",
    icon: <ShoppingCart size={20} />,
    badge: "新規"
  },
  deliveries: {
    name: "納品管理",
    path: "/deliveries",
    icon: <Truck size={20} />
  },
  billing: {
    name: "請求管理",
    path: "/billing",
    icon: <FileText size={20} />
  },
  arrangements: {
    name: "手配管理",
    path: "/arrangements",
    icon: <Hammer size={20} />
  },
  purchases: {
    name: "仕入管理",
    path: "/purchases",
    icon: <Package size={20} />,
    badge: "新規"
  }
}
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
  ChevronRight,
  LogOut,
  User,
  Bell,
  Search,
  Package
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// 共通のページマッピングを使用

export function SidebarNavigation() {
  const pathname = usePathname()
  const { state } = useSidebar()
  const isExpanded = state === "expanded"

  // 現在のパスに基づいてアクティブなメニュー項目を判断する関数
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(path)
  }

  // カラーマッピングは後で実装するため、一時的に削除しています

  return (
    <Sidebar 
      variant="sidebar" 
      collapsible="icon" 
      className="border-r border-border text-black transition-all duration-300 ease-in-out"
    >
      <div className={cn(
        "h-16 flex items-center border-b border-gray-800",
        isExpanded ? "justify-between px-6" : "justify-center"
      )}>
        <div className="flex items-center gap-2">
          <MetroLogo size="sm" color="black" />
          {isExpanded && (
            <span className="text-xl font-bold text-black">METRO</span>
          )}
        </div>
      </div>
      
      {/* 検索ボックスを削除 */}
      
      <SidebarContent>
        <div className="py-2"></div>
        <SidebarMenu>
          {/* メインナビゲーション - 動的に生成 */}
          {Object.entries(pageMapping).map(([key, item]) => (
            <SidebarMenuItem key={key} className="mb-2">
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.path)}
                      className="flex h-12 w-full items-center rounded-lg px-4 text-sm group relative overflow-hidden text-black hover:bg-black/10 hover:text-black"
                    >
                      <Link href={item.path} className="flex items-center w-full">
                        <div className="flex items-center justify-center h-9 w-9 rounded-md mr-3">
                          {React.cloneElement(item.icon as React.ReactElement, { style: { color: "black" } })}
                        </div>
                        {isExpanded && (
                          <div className="flex flex-1 items-center justify-between">
                            <span>{item.name}</span>
                            {item.badge && (
                              <Badge 
                                variant="outline" 
                                className="ml-auto bg-white text-black text-xs font-normal py-0 h-5 border-black"
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  {!isExpanded && (
                    <TooltipContent side="right" className="flex items-center gap-2 text-black">
                      <span>{item.name}</span>
                      {item.badge && (
                        <Badge variant="outline" className="bg-white text-black text-xs border-black">
                          {item.badge}
                        </Badge>
                      )}
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        
        {/* ヘルプボタンを削除 */}
        <div className="mt-auto px-3 py-4 border-t border-gray-800">
          {/* ユーザーアイコンなどの追加コンテンツが必要な場合はここに追加 */}
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
