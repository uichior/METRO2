"use client"

import { ReactNode } from "react"
import { Menu, Search, HelpCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { getPageItemFromPath } from "@/lib/page-mapping"
import { Button } from "@/components/ui/button"
import { ComponentLabel } from "./component-label"
import { UserProfile } from "./user-profile"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface User {
  name: string
  email: string
  role: string
  avatarUrl?: string
}

interface HeaderProps {
  // 基本設定
  title?: string
  onMenuToggle?: () => void
  user?: User
  
  // 検索機能
  showSearch?: boolean
  onSearch?: (query: string) => void
  searchPlaceholder?: string
  
  // 通知機能
  showNotifications?: boolean
  notificationCount?: number
  onNotificationClick?: () => void
  
  // ヘルプ機能
  showHelp?: boolean
  onHelpClick?: () => void
  
  // カスタムコンテンツ
  leftContent?: ReactNode
  centerContent?: ReactNode
  rightContent?: ReactNode
  
  // スタイル
  className?: string
  variant?: "default" | "transparent" | "dark"
}

const defaultUser: User = {
  name: "山田太郎",
  email: "taro.yamada@metro.example.com",
  role: "管理者",
  avatarUrl: ""
}

export function Header({
  // 基本設定
  title,
  onMenuToggle: externalMenuToggle,
  user = defaultUser,
  
  // 検索機能
  showSearch = true,
  onSearch,
  searchPlaceholder = "検索...",
  
  // 通知機能
  showNotifications = false,
  notificationCount = 0,
  onNotificationClick,
  
  // ヘルプ機能
  showHelp = false,
  onHelpClick,
  
  // カスタムコンテンツ
  leftContent,
  centerContent,
  rightContent,
  
  // スタイル設定
  className,
  variant = "default"
}: HeaderProps) {
  // Reactフックは常に同じ順序で呼び出す必要がある
  const { state: sidebarState, toggleSidebar } = useSidebar()
  const pathname = usePathname()
  
  // 現在のパスに対応するページ情報を取得
  const pageItem = getPageItemFromPath(pathname)
  
  // 外部からのメニュートグルとサイドバートグルを統合
  const onMenuToggle = externalMenuToggle || toggleSidebar
  
  // バリアントに基づいたスタイルを設定
  const headerStyles = {
    default: "bg-white border-b",
    transparent: "bg-transparent",
    dark: "bg-gray-900 text-white border-gray-800"
  }
  
  return (
    <header className={cn(
      "h-16 px-4 flex items-center justify-between shrink-0 relative",
      headerStyles[variant],
      className
    )}>
      <ComponentLabel name="Header" />
      
      {/* 左側コンテンツ */}
      <div className="flex items-center gap-4">
        {/* サイドバー開閉ボタン */}
        {onMenuToggle && (
          <Button variant="ghost" size="icon" onClick={onMenuToggle}>
            {sidebarState === "expanded" ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </Button>
        )}
        
        {/* ヘッダータイトル */}
        {title && (
          <div className="flex items-center gap-2">
            {/* 現在のページに対応するアイコンを表示 */}
            {pageItem && (
              <div className="flex items-center justify-center h-6 w-6">
                {pageItem.icon}
              </div>
            )}
            <h1 className="text-xl font-semibold">{title}</h1>
          </div>
        )}
        
        {/* 検索ボックスを左側に移動 */}
        {showSearch && (
          <div className="hidden md:flex items-center ml-6">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder={searchPlaceholder}
                className="w-full pl-9 h-9 bg-gray-100 border-gray-200"
                onChange={(e) => onSearch?.(e.target.value)}
              />
            </div>
          </div>
        )}
        
        {/* カスタム左側コンテンツ */}
        {leftContent}
      </div>
      
      {/* 中央コンテンツ */}
      <div className="flex-1 flex justify-center">
        
        {/* カスタム中央コンテンツ */}
        {centerContent}
      </div>
      
      {/* 右側コンテンツ */}
      <div className="flex items-center gap-3">
        {/* カスタム右側コンテンツ */}
        {rightContent}
        
        {/* ヘルプボタン */}
        {showHelp && (
          <Button variant="ghost" size="icon" onClick={onHelpClick}>
            <HelpCircle className="h-5 w-5" />
          </Button>
        )}
        
        {/* 通知ボタンはUserProfileコンポーネントに移動 */}
        
        {/* ユーザープロファイル */}
        <UserProfile user={user} />
      </div>
    </header>
  )
}
