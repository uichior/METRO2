"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, Users2Icon, DollarSignIcon, FileIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Delivery } from "./types"
import { DetailPanel, DetailTab } from "@/components/shared/detail-panel"

// 金額をフォーマットする関数
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('ja-JP', { 
    style: 'currency', 
    currency: 'JPY',
    maximumFractionDigits: 0
  }).format(amount)
}

// ステータスに応じたスタイルを取得する関数
const getStatusStyle = (status: string) => {
  switch (status) {
    case '納品準備中':
      return "bg-blue-100 text-blue-800 hover:bg-blue-200"
    case '配送中':
      return "bg-amber-100 text-amber-800 hover:bg-amber-200"
    case '納品済':
      return "bg-green-100 text-green-800 hover:bg-green-200"
    case 'キャンセル':
      return "bg-red-100 text-red-800 hover:bg-red-200"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200"
  }
}

// 納品詳細のプロパティ定義
interface DeliveryDetailProps {
  selectedDelivery: Delivery
}

export function DeliveryDetail({ selectedDelivery }: DeliveryDetailProps) {
  // 進捗率を計算する
  const progressPercentage = Math.round((selectedDelivery.receivedItems / selectedDelivery.totalItems) * 100)
  
  // タブの定義
  const tabs = [
    { value: "overview", label: "概要" },
    { value: "items", label: "アイテム" },
    { value: "details", label: "詳細情報" },
    { value: "files", label: "添付ファイル" }
  ]

  // ステータスバッジ
  const statusBadge = (
    <Badge className={cn("text-sm", getStatusStyle(selectedDelivery.status))}>
      {selectedDelivery.status}
    </Badge>
  )

  return (
    <DetailPanel 
      title={selectedDelivery.name} 
      tabs={tabs}
      defaultTab="overview"
      actions={statusBadge}
    >
        
        {/* 概要タブ */}
        <DetailTab value="overview" label="概要">
          <Card>
            <CardHeader>
              <CardTitle>概要</CardTitle>
              <CardDescription>納品の基本情報</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground flex items-center">
                    <CalendarIcon className="mr-1 h-4 w-4" /> 納品予定日
                  </h4>
                  <p>{new Date(selectedDelivery.deliveryDate).toLocaleDateString('ja-JP')}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground flex items-center">
                    <CalendarIcon className="mr-1 h-4 w-4" /> 受領日
                  </h4>
                  <p>
                    {selectedDelivery.receiptDate 
                      ? new Date(selectedDelivery.receiptDate).toLocaleDateString('ja-JP')
                      : '未受領'}
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground flex items-center">
                    <Users2Icon className="mr-1 h-4 w-4" /> 担当者
                  </h4>
                  <p>{selectedDelivery.manager}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground flex items-center">
                    <DollarSignIcon className="mr-1 h-4 w-4" /> 金額
                  </h4>
                  <p className="font-medium">{formatCurrency(selectedDelivery.amount)}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-muted-foreground">納品進捗状況</h4>
                  <span className="text-sm text-muted-foreground">{progressPercentage}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {selectedDelivery.receivedItems} / {selectedDelivery.totalItems} アイテム受領済み
                </p>
              </div>
              
              {selectedDelivery.orderId && (
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">関連受注</h4>
                  <p className="font-mono">{selectedDelivery.orderId}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </DetailTab>
        
        {/* アイテムタブ */}
        <DetailTab value="items" label="アイテム">
          <h3 className="text-lg font-medium">納品アイテム一覧</h3>
          <div className="space-y-2">
            {selectedDelivery.items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{item.name}</h4>
                        <Badge className={cn(getStatusStyle(item.status))}>
                          {item.status}
                        </Badge>
                      </div>
                      {item.description && (
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {item.quantity}個 × {formatCurrency(item.unitPrice)}
                      </p>
                      <p className="font-medium">{formatCurrency(item.totalPrice)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DetailTab>
        
        {/* 詳細情報タブ */}
        <DetailTab value="details" label="詳細情報">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">説明</h4>
                <p className="text-sm text-muted-foreground">{selectedDelivery.description}</p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">チーム</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDelivery.team.map((member, index) => (
                    <Badge key={index} variant="outline">{member}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">支払い状況</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-muted-foreground">合計金額</p>
                    <p className="font-medium">{formatCurrency(selectedDelivery.amount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">支払い済み</p>
                    <p className="font-medium">{formatCurrency(selectedDelivery.paidAmount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">残額</p>
                    <p className="font-medium">{formatCurrency(selectedDelivery.amount - selectedDelivery.paidAmount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">支払い率</p>
                    <p className="font-medium">{Math.round((selectedDelivery.paidAmount / selectedDelivery.amount) * 100)}%</p>
                  </div>
                </div>
              </div>
              
              {selectedDelivery.notes && selectedDelivery.notes.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">備考</h4>
                  <div className="space-y-2">
                    {selectedDelivery.notes.map((note) => (
                      <div key={note.id} className="text-sm border rounded-md p-2">
                        <div className="flex justify-between text-muted-foreground text-xs mb-1">
                          <span>{note.author}</span>
                          <span>{new Date(note.date).toLocaleDateString('ja-JP')}</span>
                        </div>
                        <p>{note.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedDelivery.history && selectedDelivery.history.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">履歴</h4>
                  <div className="space-y-1">
                    {selectedDelivery.history.map((item, index) => (
                      <div key={index} className="text-sm flex justify-between">
                        <span>{item.action}</span>
                        <span className="text-muted-foreground">
                          {new Date(item.date).toLocaleDateString('ja-JP')} - {item.user}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </DetailTab>
        
        {/* 添付ファイルタブ */}
        <DetailTab value="files" label="添付ファイル">
          <h3 className="text-lg font-medium">添付ファイル</h3>
          <div className="space-y-2">
            {selectedDelivery.attachments?.map((file) => (
              <Card key={file.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <FileIcon className="h-8 w-8 text-muted-foreground" />
                    <div className="flex-1">
                      <h4 className="font-medium">{file.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {file.type} • {(file.size / 1024).toFixed(0)} KB • 
                        {new Date(file.uploadDate).toLocaleDateString('ja-JP')} • 
                        {file.uploadedBy}
                      </p>
                    </div>
                    <a 
                      href={file.url} 
                      className="text-sm text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      ダウンロード
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {selectedDelivery.documents?.map((doc, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <FileIcon className="h-8 w-8 text-muted-foreground" />
                    <div className="flex-1">
                      <h4 className="font-medium">{doc.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {doc.size} • {new Date(doc.date).toLocaleDateString('ja-JP')}
                      </p>
                    </div>
                    <a 
                      href="#" 
                      className="text-sm text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      ダウンロード
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {(!selectedDelivery.attachments || selectedDelivery.attachments.length === 0) && 
             (!selectedDelivery.documents || selectedDelivery.documents.length === 0) && (
              <p className="text-muted-foreground text-center py-4">添付ファイルはありません</p>
            )}
          </div>
        </DetailTab>
    </DetailPanel>
  )
}
