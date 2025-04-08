"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterSectionProps {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}

// 折りたたみ可能なフィルターセクション
export function FilterSection({ title, defaultOpen = true, children }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  
  return (
    <div className="space-y-2">
      <div 
        className="flex items-center justify-between cursor-pointer" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-sm font-medium">{title}</h3>
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
  children: React.ReactNode
}

// メインのフィルターパネル
export function FilterPanel({ title = "フィルター", onReset, children }: FilterPanelProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          {onReset && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onReset}
            >
              リセット
            </Button>
          )}
        </div>
        <div className="space-y-4">
          {children}
        </div>
      </CardContent>
    </Card>
  )
}
