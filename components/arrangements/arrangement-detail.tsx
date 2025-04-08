"use client"

import { Arrangement, ArrangementItem } from "./types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/lib/utils"
import { FileText, Download, Send, PackageCheck, Plus } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { DetailPanel, DetailTab } from "@/components/shared/detail-panel"

interface ArrangementDetailProps {
  selectedArrangement: Arrangement
}

// 手配アイテムのステータスに応じた色を返す関数
function getItemStatusColor(status: string): string {
  switch (status) {
    case '未手配':
      return 'bg-gray-100 text-gray-800'
    case '発注済':
      return 'bg-blue-100 text-blue-800'
    case '入荷済':
      return 'bg-green-100 text-green-800'
    case 'キャンセル':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export function ArrangementDetail({ selectedArrangement }: ArrangementDetailProps) {
  if (!selectedArrangement) return null
  
  // 手配アイテムをサプライヤーごとにグループ化
  const itemsBySupplier: Record<string, ArrangementItem[]> = {}
  selectedArrangement.items.forEach(item => {
    const supplier = item.supplier || '未割当'
    if (!itemsBySupplier[supplier]) {
      itemsBySupplier[supplier] = []
    }
    itemsBySupplier[supplier].push(item)
  })
  
  // タブの定義
  const tabs = [
    { value: "overview", label: "概要" },
    { value: "items", label: "手配アイテム" },
    { value: "suppliers", label: "仕入先" },
    { value: "details", label: "詳細" },
    { value: "history", label: "履歴" },
    { value: "documents", label: "書類" },
    { value: "notes", label: "メモ" }
  ]

  // アクションボタン
  const actionButtons = (
    <div className="flex gap-2">
      <Button variant="outline" size="sm">
        <FileText className="h-4 w-4 mr-2" />
        発注書作成
      </Button>
      <Button variant="outline" size="sm">
        <Download className="h-4 w-4 mr-2" />
        エクスポート
      </Button>
      <Button size="sm">
        <Send className="h-4 w-4 mr-2" />
        仕入先に送信
      </Button>
    </div>
  )
  
  return (
    <DetailPanel
      title={selectedArrangement.name}
      tabs={tabs}
      defaultTab="overview"
      actions={actionButtons}
    >
        
        {/* 概要タブ */}
        <DetailTab value="overview" label="概要">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">手配状況</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold">{selectedArrangement.progress}%</div>
                  <Badge variant="outline">{selectedArrangement.status}</Badge>
                </div>
                <Progress value={selectedArrangement.progress} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedArrangement.items.filter(i => i.status === '入荷済').length} / {selectedArrangement.items.length} アイテム完了
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">納期</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{selectedArrangement.requiredDate}</div>
                <p className="text-xs text-muted-foreground">
                  作成日: {selectedArrangement.createdDate}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">合計金額</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(selectedArrangement.totalAmount)}</div>
                <p className="text-xs text-muted-foreground">
                  仕入先: {selectedArrangement.supplierCount}社
                </p>
              </CardContent>
            </Card>
          </div>
        </DetailTab>
        
        {/* 手配アイテムタブ */}
        <DetailTab value="items" label="手配アイテム">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>手配アイテム</CardTitle>
                <CardDescription>手配が必要な全てのアイテム</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                アイテム追加
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground">
                  <div className="col-span-4">アイテム</div>
                  <div className="col-span-2">仕入先</div>
                  <div className="col-span-1 text-center">数量</div>
                  <div className="col-span-1 text-center">単位</div>
                  <div className="col-span-2 text-right">金額</div>
                  <div className="col-span-2 text-right">ステータス</div>
                </div>
                <Separator />
                {selectedArrangement.items.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 gap-2 text-sm">
                    <div className="col-span-4">
                      <div className="font-medium">{item.name}</div>
                      {item.description && (
                        <div className="text-xs text-muted-foreground">{item.description}</div>
                      )}
                    </div>
                    <div className="col-span-2">{item.supplier || '未割当'}</div>
                    <div className="col-span-1 text-center">{item.quantity}</div>
                    <div className="col-span-1 text-center">{item.unit}</div>
                    <div className="col-span-2 text-right">{formatCurrency(item.totalPrice)}</div>
                    <div className="col-span-2 text-right">
                      <Badge className={getItemStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Separator />
                <div className="grid grid-cols-12 gap-2 text-sm font-bold">
                  <div className="col-span-8 text-right">合計</div>
                  <div className="col-span-2 text-right">{formatCurrency(selectedArrangement.totalAmount)}</div>
                  <div className="col-span-2"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </DetailTab>
        
        {/* 仕入先タブ */}
        <DetailTab value="suppliers" label="仕入先">
          <Card>
            <CardHeader>
              <CardTitle>仕入先別アイテム</CardTitle>
              <CardDescription>仕入先ごとの手配アイテム</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(itemsBySupplier).map(([supplier, items]) => (
                  <div key={supplier} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-md font-medium">{supplier}</h3>
                      <Button variant="outline" size="sm">発注書作成</Button>
                    </div>
                    <div className="space-y-2 rounded-md border p-3">
                      <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground">
                        <div className="col-span-5">アイテム</div>
                        <div className="col-span-1 text-center">数量</div>
                        <div className="col-span-1 text-center">単位</div>
                        <div className="col-span-2 text-right">単価</div>
                        <div className="col-span-2 text-right">金額</div>
                        <div className="col-span-1 text-right">状態</div>
                      </div>
                      <Separator />
                      {items.map((item) => (
                        <div key={item.id} className="grid grid-cols-12 gap-2 text-sm">
                          <div className="col-span-5">{item.name}</div>
                          <div className="col-span-1 text-center">{item.quantity}</div>
                          <div className="col-span-1 text-center">{item.unit}</div>
                          <div className="col-span-2 text-right">{formatCurrency(item.unitPrice)}</div>
                          <div className="col-span-2 text-right">{formatCurrency(item.totalPrice)}</div>
                          <div className="col-span-1 text-right">
                            <Badge className={getItemStatusColor(item.status)} variant="outline">
                              {item.status === '未手配' ? '未' : item.status === '発注済' ? '発注' : '入荷'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                      <Separator />
                      <div className="grid grid-cols-12 gap-2 text-sm">
                        <div className="col-span-7 text-right font-medium">小計</div>
                        <div className="col-span-2 text-right">
                          {formatCurrency(items.reduce((sum, item) => sum + item.totalPrice, 0))}
                        </div>
                        <div className="col-span-3"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                仕入先追加
              </Button>
            </CardFooter>
          </Card>
        </DetailTab>
        
        {/* 詳細タブ */}
        <DetailTab value="details" label="詳細">
          <Card>
            <CardHeader>
              <CardTitle>手配情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">取引先</h4>
                  <p>{selectedArrangement.client}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">担当者</h4>
                  <p>{selectedArrangement.manager}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">作成日</h4>
                  <p>{selectedArrangement.createdDate}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">納期</h4>
                  <p>{selectedArrangement.requiredDate}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">完了日</h4>
                  <p>{selectedArrangement.completionDate || '未完了'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">ステータス</h4>
                  <Badge variant="outline">{selectedArrangement.status}</Badge>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="text-sm font-medium mb-1">説明</h4>
                <p className="text-sm">{selectedArrangement.description}</p>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">関連受注</h4>
                  <p>{selectedArrangement.orderId}</p>
                </div>
                {selectedArrangement.deliveryId && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">関連納品</h4>
                    <p>{selectedArrangement.deliveryId}</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <PackageCheck className="h-4 w-4 mr-2" />
                手配完了としてマーク
              </Button>
            </CardFooter>
          </Card>
        </DetailTab>
        
        {/* 履歴タブ */}
        <DetailTab value="history" label="履歴">
          <Card>
            <CardHeader>
              <CardTitle>履歴</CardTitle>
              <CardDescription>この手配の活動履歴</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedArrangement.history.map((entry, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 text-sm text-muted-foreground">{entry.date}</div>
                    <div>
                      <p className="text-sm font-medium">{entry.action}</p>
                      <p className="text-xs text-muted-foreground">担当: {entry.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </DetailTab>
        
        {/* 書類タブ */}
        <DetailTab value="documents" label="書類">
          <Card>
            <CardHeader>
              <CardTitle>関連書類</CardTitle>
              <CardDescription>手配に関連する書類</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {selectedArrangement.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>{doc.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-muted-foreground">{doc.size}</span>
                      <span className="text-xs text-muted-foreground">{doc.date}</span>
                      <Download className="h-4 w-4" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                書類追加
              </Button>
            </CardFooter>
          </Card>
        </DetailTab>
        
        {/* メモタブ */}
        <DetailTab value="notes" label="メモ">
          <Card>
            <CardHeader>
              <CardTitle>メモ</CardTitle>
              <CardDescription>手配に関するメモ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedArrangement.notes.map((note) => (
                  <div key={note.id} className="p-3 border rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{note.author}</span>
                      <span className="text-xs text-muted-foreground">{note.date}</span>
                    </div>
                    <p className="text-sm">{note.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                メモを追加
              </Button>
            </CardFooter>
          </Card>
        </DetailTab>
    </DetailPanel>
  )
}
