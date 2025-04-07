"use client"

import { useState } from "react"
import { User, LogOut, Settings, Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ComponentLabel } from "./component-label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface UserProfileProps {
  user?: {
    name: string
    email: string
    role: string
    avatarUrl?: string
  }
}

export function UserProfile({ user = {
  name: "山田太郎",
  email: "taro.yamada@metro.example.com",
  role: "プロジェクトマネージャー",
  avatarUrl: ""
} }: UserProfileProps) {
  const [notificationCount, setNotificationCount] = useState(3)
  
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="flex items-center gap-2">
      <ComponentLabel name="UserProfile" />
      
      {/* 通知ボタン */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
                {notificationCount}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="end">
          <div className="p-2 border-b">
            <h3 className="font-medium">通知</h3>
          </div>
          <div className="max-h-80 overflow-y-auto">
            <div className="p-3 border-b hover:bg-muted/50 cursor-pointer">
              <div className="text-sm font-medium">新規タスクが割り当てられました</div>
              <div className="text-xs text-muted-foreground">5分前</div>
            </div>
            <div className="p-3 border-b hover:bg-muted/50 cursor-pointer">
              <div className="text-sm font-medium">プロジェクトのステータスが更新されました</div>
              <div className="text-xs text-muted-foreground">30分前</div>
            </div>
            <div className="p-3 hover:bg-muted/50 cursor-pointer">
              <div className="text-sm font-medium">会議の日程が変更されました</div>
              <div className="text-xs text-muted-foreground">2時間前</div>
            </div>
          </div>
          <div className="p-2 border-t">
            <Button variant="ghost" size="sm" className="w-full">すべての通知を見る</Button>
          </div>
        </PopoverContent>
      </Popover>
      
      {/* ユーザードロップダウン */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
              <p className="text-xs leading-none text-muted-foreground mt-1">
                {user.role}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>プロフィール</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>設定</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>ログアウト</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
