"use client"

import { Order } from "./types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { FileIcon, CalendarIcon, Users2Icon, DollarSignIcon } from "lucide-react"

interface OrderDetailProps {
  selectedOrder: Order | null
}

export function OrderDetail({ selectedOrder }: OrderDetailProps) {
  if (!selectedOrder) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">受注を選択してください</p>
      </div>
    )
  }

  // ステータスに応じたスタイルを取得
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "受注済": return "bg-amber-500 text-white"
      case "製造中": return "bg-blue-500 text-white"
      case "出荷準備中": return "bg-purple-500 text-white"
      case "配送中": return "bg-indigo-500 text-white"
      case "納品済": return "bg-green-500 text-white"
      case "キャンセル": return "bg-destructive text-destructive-foreground"
      default: return "bg-primary text-primary-foreground"
    }
  }

  // 金額のフォーマット
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', { 
      style: 'currency', 
      currency: 'JPY',
      maximumFractionDigits: 0
    }).format(amount)
  }

  // 進捗率の計算
  const progressPercentage = Math.round((selectedOrder.deliveredItems / selectedOrder.totalItems) * 100)

  return (
    <div className="space-y-6 p-6 pb-16">
      {/* ヘッダー情報 */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{selectedOrder.name}</h2>
          <Badge className={cn("text-sm", getStatusStyle(selectedOrder.status))}>
            {selectedOrder.status}
          </Badge>
        </div>
        <p className="text-muted-foreground">{selectedOrder.code} - {selectedOrder.client}</p>
      </div>



      {/* タブコンテンツ */}
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">概要</TabsTrigger>
          <TabsTrigger value="items">アイテム</TabsTrigger>
          <TabsTrigger value="details">詳細情報</TabsTrigger>
          <TabsTrigger value="files">添付ファイル</TabsTrigger>
        </TabsList>
        
        {/* 概要タブ */}
        <TabsContent value="overview" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>概要</CardTitle>
              <CardDescription>受注の基本情報</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground flex items-center">
                    <CalendarIcon className="mr-1 h-4 w-4" /> 受注日
                  </h4>
                  <p>{new Date(selectedOrder.orderDate).toLocaleDateString('ja-JP')}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground flex items-center">
                    <CalendarIcon className="mr-1 h-4 w-4" /> 納品予定日
                  </h4>
                  <p>{new Date(selectedOrder.deliveryDate).toLocaleDateString('ja-JP')}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground flex items-center">
                    <Users2Icon className="mr-1 h-4 w-4" /> 担当者
                  </h4>
                  <p>{selectedOrder.manager}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground flex items-center">
                    <DollarSignIcon className="mr-1 h-4 w-4" /> 金額
                  </h4>
                  <p className="font-medium">{formatCurrency(selectedOrder.amount)}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-muted-foreground">進捗状況</h4>
                  <span className="text-sm text-muted-foreground">{progressPercentage}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {selectedOrder.deliveredItems} / {selectedOrder.totalItems} アイテム納品済み
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* アイテムタブ */}
        <TabsContent value="items" className="space-y-4 pt-4">
          <h3 className="text-lg font-medium">受注アイテム一覧</h3>
          <div className="space-y-2">
            {selectedOrder.items.map((item) => (
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
        </TabsContent>
        
        {/* 詳細情報タブ */}
        <TabsContent value="details" className="space-y-4 pt-4">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">説明</h4>
                <p className="text-sm text-muted-foreground">{selectedOrder.description}</p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">チーム</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedOrder.team.map((member, index) => (
                    <Badge key={index} variant="outline">{member}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">支払い状況</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-muted-foreground">合計金額</p>
                    <p className="font-medium">{formatCurrency(selectedOrder.amount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">支払い済み</p>
                    <p className="font-medium">{formatCurrency(selectedOrder.paidAmount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">残額</p>
                    <p className="font-medium">{formatCurrency(selectedOrder.amount - selectedOrder.paidAmount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">支払い率</p>
                    <p className="font-medium">{Math.round((selectedOrder.paidAmount / selectedOrder.amount) * 100)}%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* 添付ファイルタブ */}
        <TabsContent value="files" className="space-y-4 pt-4">
          <h3 className="text-lg font-medium">添付ファイル</h3>
          <div className="space-y-2">
            {selectedOrder.attachments?.map((file) => (
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
