"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ShoppingCart,
  Warehouse,
  Calendar,
  Briefcase,
  FileText,
  CreditCard,
  Settings,
} from "lucide-react"

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

  return (
    <Sidebar 
      variant="sidebar" 
      collapsible="icon" 
      className="border-r border-border bg-black text-white"
    >
      <div className="h-14 flex items-center justify-between px-3 border-b border-gray-800">
        {isExpanded && (
          <span className="text-xl font-bold text-white">METRO</span>
        )}
        <SidebarTrigger className={isExpanded ? "h-4 w-4 text-white" : "h-4 w-4 mx-auto text-white"} />
      </div>
      
      <SidebarContent>
        <div className="py-2"></div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/dashboard")}
              className={cn(
                "flex h-10 w-full items-center rounded-md px-4 text-sm",
                isActive("/dashboard") 
                  ? "bg-white/10 text-white font-medium" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Link href="/dashboard" className="flex items-center w-full">
                <LayoutDashboard className="mr-3 h-4 w-4" />
                <span>ダッシュボード</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/orders")}
              className={cn(
                "flex h-10 w-full items-center rounded-md px-4 text-sm",
                isActive("/orders") 
                  ? "bg-white/10 text-white font-medium" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Link href="/orders" className="flex items-center w-full">
                <ShoppingCart className="mr-3 h-4 w-4" />
                <span>受注管理</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/inventory")}
              className={cn(
                "flex h-10 w-full items-center rounded-md px-4 text-sm",
                isActive("/inventory") 
                  ? "bg-white/10 text-white font-medium" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Link href="/inventory" className="flex items-center w-full">
                <Warehouse className="mr-3 h-4 w-4" />
                <span>在庫管理</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/production")}
              className={cn(
                "flex h-10 w-full items-center rounded-md px-4 text-sm",
                isActive("/schedule") 
                  ? "bg-white/10 text-white font-medium" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Link href="/schedule" className="flex items-center w-full">
                <Calendar className="mr-3 h-4 w-4" />
                <span>スケジュール</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/projects")}
              className={cn(
                "flex h-10 w-full items-center rounded-md px-4 text-sm",
                isActive("/projects") 
                  ? "bg-white/20 text-white font-medium" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Link href="/projects" className="flex items-center w-full">
                <Briefcase className="mr-3 h-4 w-4" />
                <span>プロジェクト管理</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/billing")}
              className={cn(
                "flex h-10 w-full items-center rounded-md px-4 text-sm",
                isActive("/billing") 
                  ? "bg-white/10 text-white font-medium" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Link href="/billing" className="flex items-center w-full">
                <CreditCard className="mr-3 h-4 w-4" />
                <span>請求管理</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/payments")}
              className={cn(
                "flex h-10 w-full items-center rounded-md px-4 text-sm",
                isActive("/payments") 
                  ? "bg-white/10 text-white font-medium" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Link href="/payments" className="flex items-center w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>支払管理</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive("/settings")}
              className={cn(
                "flex h-10 w-full items-center rounded-md px-4 text-sm",
                isActive("/settings") 
                  ? "bg-white/10 text-white font-medium" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Link href="/settings" className="flex items-center w-full">
                <Settings className="mr-3 h-4 w-4" />
                <span>設定</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
