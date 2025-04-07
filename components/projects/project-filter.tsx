"use client"

import { useState } from "react"
import { FolderKanban, Clock, CheckCircle, AlertTriangle, Users, Calendar, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export interface FilterPanelProps {
  onFilterChange: (filter: { type: string; value: string }) => void
  activeFilters: Record<string, string>
  projectCounts: {
    total: number
    planning: number
    inProgress: number
    completed: number
    onHold: number
  }
}

export function FilterPanel({ onFilterChange, activeFilters, projectCounts }: FilterPanelProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleFilterClick = (type: string, value: string) => {
    onFilterChange({ type, value })
    
    if (type === 'category') {
      setSelectedCategory(value)
    }
  }

  const isActive = (type: string, value: string) => {
    return activeFilters[type] === value
  }

  return (
    <div className="p-4 space-y-6">
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
                onClick={() => handleFilterClick('status', 'すべて')}
              >
                <FolderKanban className="mr-2 h-4 w-4" />
                すべて
                <Badge variant="outline" className="ml-auto">
                  {projectCounts.total}
                </Badge>
              </Button>
              <Button
                variant={isActive('status', '計画中') ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleFilterClick('status', '計画中')}
              >
                <Calendar className="mr-2 h-4 w-4 text-blue-500" />
                計画中
                <Badge variant="outline" className="ml-auto">
                  {projectCounts.planning}
                </Badge>
              </Button>
              <Button
                variant={isActive('status', '進行中') ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleFilterClick('status', '進行中')}
              >
                <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                進行中
                <Badge variant="outline" className="ml-auto">
                  {projectCounts.inProgress}
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
                  {projectCounts.completed}
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
                  {projectCounts.onHold}
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
