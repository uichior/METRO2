"use client"

import { useState } from "react"
import { FolderKanban, Clock, CheckCircle, AlertTriangle, Users, Calendar, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface FilterPanelProps {
  onFilterChange?: (filter: { type: string; value: string }) => void
  activeFilters?: Record<string, string>
  projectCounts?: {
    total: number
    planning: number
    inProgress: number
    completed: number
    onHold: number
  }
  onSearch?: (term: string) => void
  onIncompleteOnlyChange?: (value: boolean) => void
}

export function FilterPanel({ 
  onFilterChange, 
  activeFilters = {}, 
  projectCounts,
  onSearch,
  onIncompleteOnlyChange
}: FilterPanelProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [incompleteOnly, setIncompleteOnly] = useState<boolean>(false)

  const handleFilterClick = (type: string, value: string) => {
    if (onFilterChange) {
      onFilterChange({ type, value })
    }
    
    if (type === 'category') {
      setSelectedCategory(value)
    }
  }

  const isActive = (type: string, value: string) => {
    return activeFilters[type] === value
  }
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    if (onSearch) {
      onSearch(value)
    }
  }
  
  const handleIncompleteOnlyChange = (checked: boolean) => {
    setIncompleteOnly(checked)
    if (onIncompleteOnlyChange) {
      onIncompleteOnlyChange(checked)
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* 検索ボックスと未完了のみスイッチ */}
      <div className="space-y-4">
        {/* 検索ボックスを削除しました */}
        
        {/* 計画中のフィルターを削除しました */}
      </div>
      
      <Separator className="mt-0" />

      <Accordion type="multiple" defaultValue={["status", "assignee", "date"]} className="space-y-2">
        <AccordionItem value="status" className="border-none">
          <AccordionTrigger className="py-1 hover:no-underline">
            <h3 className="text-sm font-medium">ステータス</h3>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-1 pt-1">
              <Button
                variant={isActive('status', 'すべて') ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FolderKanban className="h-4 w-4 mr-2" />
                    <span className="text-sm">すべて</span>
                  </div>
                  <Badge variant="outline">{projectCounts?.total || 0}</Badge>
                </div>
              </Button>
              {/* 計画中のボタンを削除しました */}
              <Button
                variant={isActive('status', '進行中') ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleFilterClick('status', '進行中')}
              >
                <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                進行中
                <Badge variant="outline" className="ml-auto">
                  {projectCounts?.inProgress || 0}
                </Badge>
              </Button>
              <Button
                variant={isActive('status', '完了') ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleFilterClick('status', '完了')}
              >
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                完了
                <Badge variant="outline" className="ml-auto">
                  {projectCounts?.completed || 0}
                </Badge>
              </Button>
              <Button
                variant={isActive('status', '中断') ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleFilterClick('status', '中断')}
              >
                <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
                中断
                <Badge variant="outline" className="ml-auto">
                  {projectCounts?.onHold || 0}
                </Badge>
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <Separator className="my-2" />

        <AccordionItem value="assignee" className="border-none">
          <AccordionTrigger className="py-1 hover:no-underline">
            <h3 className="text-sm font-medium">担当者</h3>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-1 pt-1">
              <Button
                variant={isActive('assignee', 'すべて') ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleFilterClick('assignee', 'すべて')}
              >
                <Users className="mr-2 h-4 w-4" />
                すべての担当者
              </Button>
              <Button
                variant={isActive('assignee', '自分') ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleFilterClick('assignee', '自分')}
              >
                <Users className="mr-2 h-4 w-4" />
                自分の担当
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <Separator className="my-2" />

        <AccordionItem value="date" className="border-none">
          <AccordionTrigger className="py-1 hover:no-underline">
            <h3 className="text-sm font-medium">期限</h3>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-1 pt-1">
              <Button
                variant={isActive('timeframe', 'すべて') ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleFilterClick('timeframe', 'すべて')}
              >
                すべての期間
              </Button>
              <Button
                variant={isActive('timeframe', '今月') ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleFilterClick('timeframe', '今月')}
              >
                今月
              </Button>
              <Button
                variant={isActive('timeframe', '今週') ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleFilterClick('timeframe', '今週')}
              >
                今週
              </Button>
              <Button
                variant={isActive('timeframe', '来月') ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleFilterClick('timeframe', '来月')}
              >
                来月
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
