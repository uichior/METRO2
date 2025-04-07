"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ManagementDetailView, type DetailTab } from "../templates/management-detail-view"
import { Project } from "./types"
import { FileText, CheckCircle, Clock } from "lucide-react"

interface ProjectDetailProps {
  selectedProject: Project | null
}

export function ProjectDetail({ selectedProject }: ProjectDetailProps) {
  if (!selectedProject) {
    return <div className="flex items-center justify-center h-full text-muted-foreground">プロジェクトを選択してください</div>
  }

  // ステータスに応じたバリアント
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "計画中": return "secondary"
      case "進行中": return "warning"
      case "完了": return "success"
      case "中断": return "destructive"
      default: return "default"
    }
  }

  // 進捗率の計算
  const progressPercentage = Math.round((selectedProject.completedTasks / (selectedProject.totalTasks || 1)) * 100)

  // 予算消費率の計算
  const budgetUsagePercentage = Math.round((selectedProject.cost / (selectedProject.budget || 1)) * 100)
  
  // タブは内部で管理するため、ここでは定義しません
  
  // タブの定義
  const tabs: DetailTab[] = [
    {
      id: "overview",
      label: "概要",
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            {/* 基本情報カード */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">基本情報</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">プロジェクトコード</div>
                    <Input value={selectedProject.code} readOnly className="bg-background border-muted" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">プロジェクト名</div>
                    <Input value={selectedProject.name} readOnly className="bg-background border-muted" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">クライアント</div>
                    <Input value={selectedProject.client} readOnly className="bg-background border-muted" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">プロジェクト期間</div>
                    <div className="flex gap-2">
                      <Input 
                        value={new Date(selectedProject.startDate).toLocaleDateString("ja-JP")} 
                        readOnly 
                        className="bg-background border-muted" 
                      />
                      <span className="flex items-center">～</span>
                      <Input 
                        value={new Date(selectedProject.endDate).toLocaleDateString("ja-JP")} 
                        readOnly 
                        className="bg-background border-muted" 
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 進捗状況カード */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">進捗状況</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <div className="text-sm font-medium text-muted-foreground">タスク進捗</div>
                      <div className="text-sm font-medium">{progressPercentage}%</div>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">
                      {selectedProject.completedTasks} / {selectedProject.totalTasks} タスク完了
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <div className="text-sm font-medium text-muted-foreground">予算消費</div>
                      <div className="text-sm font-medium">{budgetUsagePercentage}%</div>
                    </div>
                    <Progress 
                      value={budgetUsagePercentage} 
                      className={`h-2 ${budgetUsagePercentage > 100 ? "bg-red-200" : ""}`}
                      indicatorClassName={budgetUsagePercentage > 100 ? "bg-red-500" : undefined}
                    />
                    <div className="text-xs text-muted-foreground mt-1">
                      {selectedProject.cost.toLocaleString()}円 / {selectedProject.budget.toLocaleString()}円
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">担当者</div>
                    <Input value={selectedProject.manager} readOnly className="bg-background border-muted" />
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">チームメンバー</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedProject.team.map((member, index) => (
                        <div key={index} className="bg-muted rounded-md p-2">
                          {member}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* プロジェクト説明カード */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">プロジェクト説明</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  value={selectedProject.description} 
                  readOnly 
                  className="bg-background border-muted min-h-[100px]" 
                />
              </CardContent>
            </Card>
          </div>
        </div>
      ),
    },
    {
      id: "milestones",
      label: "マイルストーン",
      content: (
        <div className="space-y-4">
          <div className="grid gap-4">
            {selectedProject.milestones.map((milestone, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-muted rounded-md p-2">
                      {milestone.status === "完了" ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : (
                        <Clock className="h-6 w-6 text-yellow-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{milestone.name}</h3>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="text-xs bg-muted px-2 py-1 rounded">
                          期限: {new Date(milestone.dueDate).toLocaleDateString("ja-JP")}
                        </div>
                        <div className={`text-xs px-2 py-1 rounded ${milestone.status === "完了" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                          {milestone.status}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "attachments",
      label: "添付ファイル",
      content: (
        <div className="space-y-4">
          <div className="grid gap-4">
            {selectedProject.attachments.map((attachment) => (
              <Card key={attachment.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-muted rounded-md p-2">
                      <FileText className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{attachment.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {attachment.type} • {(attachment.size / 1024).toFixed(1)} KB
                      </p>
                      <p className="text-xs text-muted-foreground">
                        アップロード: {new Date(attachment.uploadDate).toLocaleDateString("ja-JP")} ({attachment.uploadedBy})
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      ダウンロード
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ),
    },
  ]

  return (
    <ManagementDetailView
      title={selectedProject.name}
      subtitle={`${selectedProject.code} - ${selectedProject.client}`}
      status={{
        label: selectedProject.status,
        variant: getStatusVariant(selectedProject.status)
      }}
      actionButtons={
        <>
          <Button variant="outline" size="sm">
            編集
          </Button>
          <Button variant="outline" size="sm">
            レポート
          </Button>
        </>
      }
      tabs={tabs}
    />
  )
}
