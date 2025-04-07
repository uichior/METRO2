"use client"

import { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export interface DetailSection {
  title: string
  content: ReactNode
}

export interface DetailTab {
  id: string
  label: string
  content: ReactNode
}

export interface ManagementDetailViewProps {
  id?: string
  title?: string
  subtitle?: string
  status?: {
    label: string
    variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning"
  }
  actionButtons?: ReactNode
  sections?: DetailSection[]
  tabs?: DetailTab[]
  children?: ReactNode
}

export function ManagementDetailView({
  id,
  title,
  subtitle,
  status,
  actionButtons,
  sections = [],
  tabs = [],
  children,
}: ManagementDetailViewProps) {
  // ステータスバッジのスタイルを決定
  const getBadgeVariant = () => {
    if (!status) return ""

    switch (status.variant) {
      case "success":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-amber-100 text-amber-800"
      case "destructive":
        return "bg-red-100 text-red-800"
      case "secondary":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  // 詳細情報がない場合の表示
  if (!id && !title && sections.length === 0 && tabs.length === 0 && !children) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        アイテムを選択してください
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* ヘッダー部分 */}
      <Card className="border-0 shadow-none rounded-none">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center">
                {id && <CardTitle className="text-xl font-medium">{id}</CardTitle>}
                {title && <CardTitle className="text-xl font-medium">{title}</CardTitle>}
                {status && <Badge className={`ml-2 ${getBadgeVariant()}`}>{status.label}</Badge>}
              </div>
              {subtitle && <CardDescription>{subtitle}</CardDescription>}
            </div>
            {actionButtons && <div className="flex gap-2">{actionButtons}</div>}
          </div>
        </CardHeader>
      </Card>

      {/* タブナビゲーション */}
      {tabs.length > 0 ? (
        <Tabs defaultValue={tabs[0]?.id} className="flex-1 overflow-hidden">
          <div className="border-b bg-gray-50 shadow-sm">
            <div className="px-4 pt-2">
              <TabsList className="bg-black h-10 border border-gray-700 rounded-t-md shadow-sm gap-2 p-1">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-black data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-white font-medium rounded-md px-4"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="p-4 h-full">
                {tab.content}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      ) : (
        <div className="flex-1 overflow-auto p-4">
          {sections.length > 0 ? (
            <div className="space-y-6">
              {sections.map((section, index) => (
                <Card key={index} className="shadow-sm">
                  <CardHeader className="py-3">
                    <CardTitle className="text-md">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>{section.content}</CardContent>
                </Card>
              ))}
            </div>
          ) : (
            children
          )}
        </div>
      )}
    </div>
  )
}
