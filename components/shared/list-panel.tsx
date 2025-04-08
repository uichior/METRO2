"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus } from "lucide-react"

interface ListPanelProps {
  title: string
  searchPlaceholder?: string
  onSearch?: (query: string) => void
  onAdd?: () => void
  addButtonLabel?: string
  children: React.ReactNode
  isLoading?: boolean
  emptyState?: React.ReactNode
}

export function ListPanel({
  title,
  searchPlaceholder = "検索...",
  onSearch,
  onAdd,
  addButtonLabel = "新規作成",
  children,
  isLoading = false,
  emptyState
}: ListPanelProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          {onAdd && (
            <Button onClick={onAdd} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              {addButtonLabel}
            </Button>
          )}
        </div>
        {onSearch && (
          <div className="relative mt-2">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              className="pl-8"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        )}
      </CardHeader>
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
    </Card>
  )
}
