"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ChevronDown, Search, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterSectionProps {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
  icon?: React.ReactNode
}

// 折りたたみ可能なフィルターセクション
export function FilterSection({ title, defaultOpen = true, children, icon }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  
  return (
    <div className="space-y-2">
      <div 
        className="flex items-center justify-between cursor-pointer" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {icon && <span className="mr-3">{icon}</span>}
          <h3 className="text-sm font-medium">{title}</h3>
        </div>
        <ChevronDown className={cn(
          "h-4 w-4 transition-transform",
          isOpen ? "transform rotate-0" : "transform rotate-180"
        )} />
      </div>
      {isOpen && (
        <div className="space-y-2">
          {children}
        </div>
      )}
    </div>
  )
}

interface FilterPanelProps {
  title?: string
  onReset?: () => void
  onSearch?: (query: string) => void
  searchPlaceholder?: string
  incompleteOnly?: boolean
  onIncompleteChange?: (checked: boolean) => void
  incompleteLabel?: string
  children: React.ReactNode
  icon?: React.ReactNode
}

// メインのフィルターパネル
export function FilterPanel({ 
  title = "フィルター", 
  onReset, 
  onSearch,
  searchPlaceholder = "検索...",
  incompleteOnly = false,
  onIncompleteChange,
  incompleteLabel = "未入荷のみ",
  children,
  icon
}: FilterPanelProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-4 space-y-4">
        {/* 検索ボックス */}
        {onSearch && (
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              className="pl-8"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearch(e.target.value)}
            />
          </div>
        )}
        
        {/* スイッチとリセットボタン */}
        <div className="flex items-center justify-between">
          {onIncompleteChange && (
            <div className="flex items-center space-x-2">
              <Switch 
                id="incomplete-only" 
                checked={incompleteOnly} 
                onCheckedChange={onIncompleteChange}
              />
              <Label htmlFor="incomplete-only" className="text-sm">
                {incompleteLabel}
              </Label>
            </div>
          )}
          
          {onReset && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onReset}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
        
        {/* タイトル */}
        <div className="flex items-center mb-2">
          {icon && <span className="mr-3">{icon}</span>}
          <h2 className="text-sm font-medium">{title}</h2>
        </div>
        
        {/* フィルター要素 */}
        <div className="space-y-4">
          {children}
        </div>
      </CardContent>
    </Card>
  )
}
