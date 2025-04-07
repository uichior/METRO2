"use client"

import { ReactNode } from "react"
import { BaseItem } from "./management-page-template"

export interface DetailPanelProps<T extends BaseItem | null> {
  selectedItem: T
  itemName: string
  children?: ReactNode
}

export function DetailPanel<T extends BaseItem | null>({
  selectedItem,
  itemName,
  children
}: DetailPanelProps<T>) {
  return (
    <div className="flex-1 h-full overflow-auto">
      <div className="p-6">
        {selectedItem ? (
          <div>
            {children}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">選択された{itemName}がありません</p>
          </div>
        )}
      </div>
    </div>
  )
}
