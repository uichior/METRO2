import { useState } from "react"
import type { ReactNode } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ManagementLayoutProps {
  navigationPanel?: ReactNode
  listPanel: ReactNode
  detailPanel: ReactNode
  className?: string
}

export function ManagementLayout({ navigationPanel, listPanel, detailPanel, className }: ManagementLayoutProps) {
  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <div className={`relative flex gap-0 overflow-hidden h-full w-full ${className || ''}`}>
      {/* モバイル用ナビゲーションボタン（左下に配置） */}
      {navigationPanel && (
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden fixed bottom-4 left-4 z-50 shadow-md"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      )}

      {/* モバイル用ナビゲーションオーバーレイ */}
      {navigationPanel && isNavOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsNavOpen(false)} />
      )}

      {/* ナビゲーションサイドバー */}
      {navigationPanel && (
        <div 
          className={`fixed lg:relative top-0 left-0 h-full w-60 shrink-0 bg-black text-white z-50 transform transition-transform duration-300 overflow-auto border-r border-gray-800 ${isNavOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} relative`}
        >

          <div className="lg:hidden flex justify-end p-2">
            <Button variant="ghost" size="icon" onClick={() => setIsNavOpen(false)} className="text-white hover:bg-gray-800">
              <X className="h-4 w-4" />
            </Button>
          </div>
          {navigationPanel}
        </div>
      )}

      {/* リストパネル */}
      <div className="w-[36rem] shrink-0 overflow-auto h-full border-r relative">

        {listPanel}
      </div>

      {/* 詳細パネル */}
      <div className="flex-1 overflow-auto h-full relative">

        {detailPanel}
      </div>
    </div>
  )
}
