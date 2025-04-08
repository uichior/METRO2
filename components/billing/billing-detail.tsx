"use client"

import { Billing } from "./types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/lib/utils"
import { FileText, Download, Send, CreditCard } from "lucide-react"
import { DetailPanel, DetailTab } from "@/components/shared/detail-panel"

interface BillingDetailProps {
  selectedBilling: Billing
}

export function BillingDetail({ selectedBilling }: BillingDetailProps) {
  if (!selectedBilling) return null
  
  // 支払い状況を計算
  const paymentStatus = selectedBilling.paidAmount / selectedBilling.totalAmount * 100
  
  // タブの定義
  const tabs = [
    { value: "overview", label: "概要" },
    { value: "details", label: "詳細" },
    { value: "items", label: "明細" },
    { value: "history", label: "履歴" },
    { value: "documents", label: "書類" },
    { value: "notes", label: "メモ" }
  ]

  // アクションボタン
  const actionButtons = (
    <div className="flex gap-2">
      <Button variant="outline" size="sm">
        <FileText className="h-4 w-4 mr-2" />
        PDFプレビュー
      </Button>
      <Button variant="outline" size="sm">
        <Download className="h-4 w-4 mr-2" />
        ダウンロード
      </Button>
      <Button size="sm">
        <Send className="h-4 w-4 mr-2" />
        送信
      </Button>
    </div>
  )
  
  return (
    <DetailPanel
      title={selectedBilling.name}
      tabs={tabs}
      defaultTab="overview"
      actions={actionButtons}
    >
        
        {/* 概要タブ */}
        <DetailTab value="overview" label="概要">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">請求金額</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(selectedBilling.totalAmount)}</div>
                <p className="text-xs text-muted-foreground">税込</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">支払い状況</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold">{paymentStatus.toFixed(0)}%</div>
                  <Badge variant={selectedBilling.isPaid ? "default" : "outline"}>
                    {selectedBilling.isPaid ? "支払済" : "未払い"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatCurrency(selectedBilling.paidAmount)} / {formatCurrency(selectedBilling.totalAmount)}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">支払期限</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{selectedBilling.dueDate}</div>
                <p className="text-xs text-muted-foreground">
                  {selectedBilling.status === '期限超過' ? '期限を過ぎています' : '期限内です'}
                </p>
              </CardContent>
            </Card>
          </div>
        </DetailTab>
        
        {/* 詳細タブ */}
        <DetailTab value="details" label="詳細">
          <Card>
            <CardHeader>
              <CardTitle>請求情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">取引先</h4>
                  <p>{selectedBilling.client}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">担当者</h4>
                  <p>{selectedBilling.manager}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">発行日</h4>
                  <p>{selectedBilling.issueDate}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">支払期限</h4>
                  <p>{selectedBilling.dueDate}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">支払日</h4>
                  <p>{selectedBilling.paymentDate || '未払い'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">ステータス</h4>
                  <Badge variant="outline">{selectedBilling.status}</Badge>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="text-sm font-medium mb-1">説明</h4>
                <p className="text-sm">{selectedBilling.description}</p>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">関連受注</h4>
                  <p>{selectedBilling.orderId}</p>
                </div>
                {selectedBilling.deliveryId && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">関連納品</h4>
                    <p>{selectedBilling.deliveryId}</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <CreditCard className="h-4 w-4 mr-2" />
                支払い記録
              </Button>
            </CardFooter>
          </Card>
        </DetailTab>
        
        {/* 明細タブ */}
        <DetailTab value="items" label="明細">
          <Card>
            <CardHeader>
              <CardTitle>請求明細</CardTitle>
              <CardDescription>請求書に含まれる全ての項目</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground">
                  <div className="col-span-5">項目</div>
                  <div className="col-span-2 text-right">単価</div>
                  <div className="col-span-1 text-center">数量</div>
                  <div className="col-span-2 text-right">小計</div>
                  <div className="col-span-2 text-right">説明</div>
                </div>
                <Separator />
                {selectedBilling.items.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 gap-2 text-sm">
                    <div className="col-span-5">{item.name}</div>
                    <div className="col-span-2 text-right">{formatCurrency(item.unitPrice)}</div>
                    <div className="col-span-1 text-center">{item.quantity}</div>
                    <div className="col-span-2 text-right">{formatCurrency(item.totalPrice)}</div>
                    <div className="col-span-2 text-right text-muted-foreground">{item.description}</div>
                  </div>
                ))}
                <Separator />
                <div className="grid grid-cols-12 gap-2 text-sm">
                  <div className="col-span-8 text-right font-medium">小計</div>
                  <div className="col-span-2 text-right">{formatCurrency(selectedBilling.amount)}</div>
                  <div className="col-span-2"></div>
                </div>
                <div className="grid grid-cols-12 gap-2 text-sm">
                  <div className="col-span-8 text-right font-medium">消費税 ({selectedBilling.taxRate}%)</div>
                  <div className="col-span-2 text-right">{formatCurrency(selectedBilling.taxAmount)}</div>
                  <div className="col-span-2"></div>
                </div>
                <div className="grid grid-cols-12 gap-2 text-sm font-bold">
                  <div className="col-span-8 text-right">合計</div>
                  <div className="col-span-2 text-right">{formatCurrency(selectedBilling.totalAmount)}</div>
                  <div className="col-span-2"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </DetailTab>
        
        {/* 履歴タブ */}
        <DetailTab value="history" label="履歴">
          <Card>
            <CardHeader>
              <CardTitle>履歴</CardTitle>
              <CardDescription>この請求書の活動履歴</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedBilling.history.map((entry, index) => (
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
              <CardDescription>請求書に関連する書類</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {selectedBilling.documents.map((doc) => (
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
          </Card>
        </DetailTab>
        
        {/* メモタブ */}
        <DetailTab value="notes" label="メモ">
          <Card>
            <CardHeader>
              <CardTitle>メモ</CardTitle>
              <CardDescription>請求書に関するメモ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedBilling.notes.map((note) => (
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
              <Button variant="outline" className="w-full">メモを追加</Button>
            </CardFooter>
          </Card>
        </DetailTab>
    </DetailPanel>
  )
}
