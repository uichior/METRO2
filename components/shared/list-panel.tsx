"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus } from "lucide-react"

interface ListPanelProps {
  title?: string
  searchPlaceholder?: string
  onSearch?: (query: string) => void
  children: React.ReactNode
  isLoading?: boolean
  emptyState?: React.ReactNode
  footerContent?: React.ReactNode
}

export function ListPanel({
  title,
  searchPlaceholder = "検索...",
  onSearch,
  children,
  isLoading = false,
  emptyState,
  footerContent
}: ListPanelProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-1 overflow-auto p-2">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">読み込み中...</p>
          </div>
        ) : children && Array.isArray(children) && children.length > 0 ? (
          <div className="space-y-2">
            {children}
          </div>
        ) : (
          emptyState || (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">データがありません</p>
            </div>
          )
        )}
      </CardContent>
      
      {footerContent && (
        <div className="border-t p-2 bg-muted/10 text-sm text-muted-foreground">
          {footerContent}
        </div>
      )}
    </Card>
  )
}
