"use client"

import { useState } from "react"
import { Calendar, Clock, CheckCircle, XCircle, Users } from "lucide-react"
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

export interface ScheduleFilterPanelProps {
  onIncompleteOnlyChange?: (value: boolean) => void
}

export function ScheduleFilterPanel({ onIncompleteOnlyChange }: ScheduleFilterPanelProps) {
  const [incompleteOnly, setIncompleteOnly] = useState<boolean>(false)
  
  const handleIncompleteOnlyChange = (checked: boolean) => {
    setIncompleteOnly(checked)
    if (onIncompleteOnlyChange) {
      onIncompleteOnlyChange(checked)
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* 未完了のみスイッチ */}
      <div className="flex items-center justify-between">
        <span className="text-sm">未完了のみ</span>
        <Switch 
          checked={incompleteOnly}
          onCheckedChange={handleIncompleteOnlyChange}
        />
      </div>
      
      <Separator className="mt-0" />

      <Accordion type="multiple" defaultValue={["status", "date", "participants"]} className="space-y-2">
        {/* ステータスフィルター */}
        <AccordionItem value="status" className="border-none">
          <AccordionTrigger className="py-1 hover:no-underline">
            <h3 className="text-sm font-medium">ステータス</h3>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-1 pt-1">
              <Button
                variant="ghost"
                className="w-full justify-start"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">すべて</span>
                  </div>
                  <Badge variant="outline">10</Badge>
                </div>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-blue-500" />
                    <span className="text-sm">予定</span>
                  </div>
                  <Badge variant="outline">5</Badge>
                </div>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">完了</span>
                  </div>
                  <Badge variant="outline">3</Badge>
                </div>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <XCircle className="h-4 w-4 mr-2 text-red-500" />
                    <span className="text-sm">中止</span>
                  </div>
                  <Badge variant="outline">2</Badge>
                </div>
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* 日付フィルター */}
        <AccordionItem value="date" className="border-none">
          <AccordionTrigger className="py-1 hover:no-underline">
            <h3 className="text-sm font-medium">日付</h3>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="start-date" className="text-xs">開始日</Label>
                  <Input type="date" id="start-date" className="h-9" />
                </div>
                <div>
                  <Label htmlFor="end-date" className="text-xs">終了日</Label>
                  <Input type="date" id="end-date" className="h-9" />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* 参加者フィルター */}
        <AccordionItem value="participants" className="border-none">
          <AccordionTrigger className="py-1 hover:no-underline">
            <h3 className="text-sm font-medium">参加者</h3>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-1 pt-1">
              <Button
                variant="ghost"
                className="w-full justify-start"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span className="text-sm">すべて</span>
                  </div>
                  <Badge variant="outline">10</Badge>
                </div>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
              >
                <div className="flex items-center">
                  <span className="text-sm">山田太郎</span>
                </div>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
              >
                <div className="flex items-center">
                  <span className="text-sm">佐藤次郎</span>
                </div>
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
              >
                <div className="flex items-center">
                  <span className="text-sm">鈴木花子</span>
                </div>
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
