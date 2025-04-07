"use client"

import type { ReactNode } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export interface TabConfig {
  id: string
  label: string
  content: ReactNode
}

interface ManagementDetailProps {
  id?: string
  title?: string
  subtitle?: string
  status?: {
    label: string
    variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning"
  }
  children?: ReactNode
  actionButtons?: ReactNode
  tabs?: TabConfig[]
}

export function ManagementDetail({
  id,
  title,
  subtitle,
  status,
  children,
  actionButtons,
  tabs = [],
}: ManagementDetailProps) {
  // ステータスバッジのスタイルを決定
  const getBadgeVariant = () => {
    if (!status) return "default"

    switch (status.variant) {
      case "success":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "warning":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200"
      case "destructive":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "secondary":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
      default:
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
    }
  }

  return (
    <div className="w-full md:w-[60%] flex flex-col overflow-hidden bg-gray-50">
      {/* 詳細ヘッダー */}
      <div className="border-b bg-white p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="flex items-center">
              {id && <h2 className="text-2xl font-bold">{id}</h2>}
              {status && <Badge className={`ml-2 ${getBadgeVariant()}`}>{status.label}</Badge>}
            </div>
            {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          {actionButtons && <div className="flex gap-2">{actionButtons}</div>}
        </div>

        {/* タブナビゲーション */}
        {tabs.length > 0 && (
          <Tabs defaultValue={tabs[0]?.id} className="mt-4">
            <TabsList className="bg-muted/50 p-0 h-9">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="rounded-none data-[state=active]:bg-background data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary h-9"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
      </div>

      {/* 詳細コンテンツ */}
      <div className="flex-1 overflow-auto p-4">
        {tabs.length > 0 ? (
          <Tabs defaultValue={tabs[0]?.id}>
            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-0 p-0">
                {tab.content}
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          children
        )}
      </div>
    </div>
  )
}

