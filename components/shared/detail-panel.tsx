"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface DetailTabProps {
  value: string
  label: string
  children: React.ReactNode
}

export function DetailTab({ value, label, children }: DetailTabProps) {
  return (
    <TabsContent value={value} className="mt-4 space-y-4">
      {children}
    </TabsContent>
  )
}

interface DetailPanelProps {
  title: string
  onClose?: () => void
  defaultTab?: string
  tabs?: { value: string; label: string }[]
  children: React.ReactNode
  actions?: React.ReactNode
  isLoading?: boolean
}

export function DetailPanel({
  title,
  onClose,
  defaultTab,
  tabs,
  children,
  actions,
  isLoading = false
}: DetailPanelProps) {
  // タブがある場合はTabsコンポーネントを使用、ない場合は通常のCardを使用
  const hasTabs = tabs && tabs.length > 0
  
  const content = (
    <>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <div className="flex items-center gap-2">
            {actions}
            {onClose && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-muted-foreground">読み込み中...</p>
          </div>
        ) : children}
      </CardContent>
    </>
  )
  
  return (
    <Card className="h-full flex flex-col">
      {hasTabs ? (
        <Tabs defaultValue={defaultTab || tabs[0].value} className="flex flex-col h-full">
          <div className="px-4 pt-4">
            <div className="flex items-center justify-between">
              <CardTitle>{title}</CardTitle>
              <div className="flex items-center gap-2">
                {actions}
                {onClose && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            <TabsList className="mt-4">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {children}
        </Tabs>
      ) : (
        content
      )}
    </Card>
  )
}
