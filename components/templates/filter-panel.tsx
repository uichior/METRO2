"use client"

import { ReactNode } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export interface FilterPanelProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  children?: ReactNode
}

export function FilterPanel({
  searchTerm,
  onSearchChange,
  children
}: FilterPanelProps) {
  return (
    <div className="w-80 h-full border-r border-border overflow-y-auto">
      <div className="p-4">
        <div className="space-y-4">
          {/* 検索ボックス */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="検索..."
              className="pl-8 h-9"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          
          {/* フィルターコンテンツ */}
          {children}
        </div>
      </div>
    </div>
  )
}
