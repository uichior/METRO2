"use client"

import { Schedule } from "./schedule-list-item"
import { Button } from "@/components/ui/button"
import { CalendarClock, Users, MapPin, Clock, CheckCircle, XCircle } from "lucide-react"
import { ManagementDetailView, DetailTab } from "../templates/management-detail-view"

interface ScheduleDetailProps {
  selectedItem: Schedule | null
}

export function ScheduleDetail({ selectedItem }: ScheduleDetailProps) {
  if (!selectedItem) {
    return <div className="flex items-center justify-center h-full text-muted-foreground">スケジュールを選択してください</div>
  }

  // ステータスに応じたバリアント
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "pending": return "warning"
      case "completed": return "success"
      case "cancelled": return "destructive"
      default: return "default"
    }
  }

  // ステータスラベルの取得
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return "予定"
      case "completed": return "完了"
      case "cancelled": return "中止"
      default: return status
    }
  }

  // アクションボタン
  const actionButtons = (
    <div className="flex space-x-2">
      {selectedItem.status === "pending" && (
        <>
          <Button variant="outline" size="sm">
            <XCircle className="h-4 w-4 mr-1" />
            中止
          </Button>
          <Button size="sm">
            <CheckCircle className="h-4 w-4 mr-1" />
            完了
          </Button>
        </>
      )}
      {selectedItem.status !== "pending" && (
        <Button variant="outline" size="sm">
          再スケジュール
        </Button>
      )}
    </div>
  )

  // タブの定義
  const tabs: DetailTab[] = [
    {
      id: "overview",
      label: "概要",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">日時</h3>
              <div className="flex items-center">
                <CalendarClock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{selectedItem.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>10:00 - 11:30</span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">場所</h3>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>東京オフィス 会議室A</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">参加者</h3>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>山田太郎, 佐藤次郎, 鈴木花子</span>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">メモ</h3>
            <p className="text-muted-foreground">
              プロジェクトの進捗確認と今後のスケジュール調整を行います。
              資料は事前に共有済みです。
            </p>
          </div>
        </div>
      )
    },
    {
      id: "documents",
      label: "資料",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">添付資料はありません</p>
        </div>
      )
    }
  ]

  return (
    <ManagementDetailView
      title={selectedItem.title}
      subtitle={selectedItem.location || ""}
      status={{
        label: getStatusLabel(selectedItem.status),
        variant: getStatusVariant(selectedItem.status)
      }}
      actionButtons={actionButtons}
      tabs={tabs}
    />
  )
}
