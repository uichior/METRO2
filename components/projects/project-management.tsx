"use client"

import { useState, useMemo, useEffect } from "react"
import { ManagementPageTemplate } from "../templates/management-page-template"
import { ProjectListItem } from "./project-list-item"
import { ProjectDetail } from "./project-detail"
import { Project } from "./types"
import { FilterPanel } from "./project-filter"
import { ActionButton, ManagementList } from "../common/management-list"
import { Edit, Trash, Archive, Mail, Copy, Tag, CheckSquare, Share } from "lucide-react"

// サンプルプロジェクトデータ
const sampleProjects: Project[] = [
  {
    id: "1",
    code: "PRJ-2025-001",
    name: "新工場設備導入プロジェクト",
    description: "東京工場における新規製造ラインの設計、導入、および稼働までの一連のプロジェクト。生産効率を30%向上させることが目標。",
    client: "株式会社メトロ製造",
    status: "進行中",
    startDate: "2025-01-15",
    endDate: "2025-07-30",
    budget: 25000000,
    cost: 12500000,
    manager: "山田太郎",
    team: ["佐藤一郎", "鈴木花子", "田中健太", "伊藤美咲"],
    totalTasks: 48,
    completedTasks: 22,
    unitPrice: 500000,
    quantity: 50,
    milestones: [
      {
        id: "m1",
        name: "要件定義完了",
        dueDate: "2025-02-15",
        status: "完了",
        description: "製造ライン要件の最終確定"
      },
      {
        id: "m2",
        name: "設計フェーズ完了",
        dueDate: "2025-03-30",
        status: "完了",
        description: "製造ライン設計書の承認"
      },
      {
        id: "m3",
        name: "機器導入完了",
        dueDate: "2025-05-15",
        status: "進行中",
        description: "全ての機器の設置と初期設定"
      },
      {
        id: "m4",
        name: "テスト完了",
        dueDate: "2025-06-30",
        status: "未着手",
        description: "品質テストと性能評価"
      },
      {
        id: "m5",
        name: "本番稼働開始",
        dueDate: "2025-07-30",
        status: "未着手",
        description: "新製造ラインの正式稼働"
      }
    ],
    attachments: [
      {
        id: "a1",
        name: "要件定義書.pdf",
        type: "PDF",
        size: 2048,
        uploadDate: "2025-01-20",
        uploadedBy: "山田太郎",
        url: "#"
      },
      {
        id: "a2",
        name: "設計図面.dwg",
        type: "CAD",
        size: 4096,
        uploadDate: "2025-03-05",
        uploadedBy: "佐藤一郎",
        url: "#"
      },
      {
        id: "a3",
        name: "進捗報告書_Q1.xlsx",
        type: "Excel",
        size: 1536,
        uploadDate: "2025-04-01",
        uploadedBy: "山田太郎",
        url: "#"
      }
    ]
  },
  {
    id: "2",
    code: "PRJ-2025-002",
    name: "販売管理システム刷新",
    description: "既存の販売管理システムを最新のクラウドベースシステムに移行するプロジェクト。営業部門の業務効率化と顧客管理の強化が目的。",
    client: "メトロ営業部",
    status: "計画中",
    startDate: "2025-05-01",
    endDate: "2025-11-30",
    budget: 18000000,
    cost: 2000000,
    manager: "鈴木次郎",
    team: ["高橋裕子", "渡辺健", "中村真理"],
    totalTasks: 36,
    completedTasks: 4,
    unitPrice: 300000,
    quantity: 60,
    milestones: [
      {
        id: "m1",
        name: "要件定義",
        dueDate: "2025-06-15",
        status: "進行中",
        description: "新システムの要件定義と現行システムの分析"
      },
      {
        id: "m2",
        name: "ベンダー選定",
        dueDate: "2025-07-30",
        status: "未着手",
        description: "システム提供ベンダーの選定と契約"
      },
      {
        id: "m3",
        name: "データ移行計画",
        dueDate: "2025-08-30",
        status: "未着手",
        description: "現行システムからのデータ移行計画策定"
      },
      {
        id: "m4",
        name: "システム導入",
        dueDate: "2025-10-15",
        status: "未着手",
        description: "新システムの導入とテスト"
      },
      {
        id: "m5",
        name: "本番稼働",
        dueDate: "2025-11-30",
        status: "未着手",
        description: "新システムの本番環境での稼働開始"
      }
    ],
    attachments: [
      {
        id: "a1",
        name: "現行システム分析.pdf",
        type: "PDF",
        size: 3072,
        uploadDate: "2025-04-15",
        uploadedBy: "鈴木次郎",
        url: "#"
      },
      {
        id: "a2",
        name: "要件定義書ドラフト.docx",
        type: "Word",
        size: 1024,
        uploadDate: "2025-04-20",
        uploadedBy: "高橋裕子",
        url: "#"
      }
    ]
  },
  {
    id: "3",
    code: "PRJ-2025-003",
    name: "展示会出展プロジェクト",
    description: "国際製造技術展への出展プロジェクト。新製品のプロモーションと潜在顧客の発掘が目的。",
    client: "メトロ営業部",
    status: "完了",
    startDate: "2025-01-10",
    endDate: "2025-03-20",
    budget: 8000000,
    cost: 7500000,
    manager: "田中三郎",
    team: ["小林健太", "山本恵", "中島大輔"],
    totalTasks: 24,
    completedTasks: 24,
    unitPrice: 200000,
    quantity: 40,
    milestones: [
      {
        id: "m1",
        name: "出展申込",
        dueDate: "2025-01-15",
        status: "完了",
        description: "展示会への出展申込と小間の確保"
      },
      {
        id: "m2",
        name: "展示内容決定",
        dueDate: "2025-01-30",
        status: "完了",
        description: "展示製品と展示方法の決定"
      },
      {
        id: "m3",
        name: "ブース設計",
        dueDate: "2025-02-15",
        status: "完了",
        description: "展示ブースのデザインと制作"
      },
      {
        id: "m4",
        name: "展示会出展",
        dueDate: "2025-03-10",
        status: "完了",
        description: "展示会への出展と運営"
      },
      {
        id: "m5",
        name: "フォローアップ",
        dueDate: "2025-03-20",
        status: "完了",
        description: "商談リストの整理と顧客フォローアップ"
      }
    ],
    attachments: [
      {
        id: "a1",
        name: "展示会出展申込書.pdf",
        type: "PDF",
        size: 1024,
        uploadDate: "2025-01-12",
        uploadedBy: "田中三郎",
        url: "#"
      },
      {
        id: "a2",
        name: "ブースデザイン.jpg",
        type: "Image",
        size: 2048,
        uploadDate: "2025-02-05",
        uploadedBy: "小林健太",
        url: "#"
      },
      {
        id: "a3",
        name: "商談リスト.xlsx",
        type: "Excel",
        size: 1536,
        uploadDate: "2025-03-15",
        uploadedBy: "田中三郎",
        url: "#"
      },
      {
        id: "a4",
        name: "出展報告書.pdf",
        type: "PDF",
        size: 4096,
        uploadDate: "2025-03-20",
        uploadedBy: "田中三郎",
        url: "#"
      }
    ]
  },
  {
    id: "4",
    code: "PRJ-2025-004",
    name: "品質管理システム改善",
    description: "製造工程における品質管理システムの改善プロジェクト。不良品率の低減と品質トレーサビリティの向上が目的。",
    client: "メトロ品質管理部",
    status: "中断",
    startDate: "2025-02-01",
    endDate: "2025-08-31",
    budget: 12000000,
    cost: 3000000,
    manager: "佐藤四郎",
    team: ["伊藤健", "加藤由美", "木村太一"],
    totalTasks: 30,
    completedTasks: 8,
    unitPrice: 400000,
    quantity: 30,
    milestones: [
      {
        id: "m1",
        name: "現状分析",
        dueDate: "2025-02-28",
        status: "完了",
        description: "現行品質管理プロセスの分析と課題抽出"
      },
      {
        id: "m2",
        name: "改善計画策定",
        dueDate: "2025-03-31",
        status: "完了",
        description: "品質管理プロセス改善計画の策定"
      },
      {
        id: "m3",
        name: "システム設計",
        dueDate: "2025-05-15",
        status: "中断",
        description: "新品質管理システムの設計"
      },
      {
        id: "m4",
        name: "システム導入",
        dueDate: "2025-07-15",
        status: "未着手",
        description: "新システムの導入とテスト"
      },
      {
        id: "m5",
        name: "運用開始",
        dueDate: "2025-08-31",
        status: "未着手",
        description: "新品質管理システムの本格運用開始"
      }
    ],
    attachments: [
      {
        id: "a1",
        name: "品質管理現状分析.pdf",
        type: "PDF",
        size: 3072,
        uploadDate: "2025-02-25",
        uploadedBy: "佐藤四郎",
        url: "#"
      },
      {
        id: "a2",
        name: "改善計画書.docx",
        type: "Word",
        size: 2048,
        uploadDate: "2025-03-20",
        uploadedBy: "伊藤健",
        url: "#"
      },
      {
        id: "a3",
        name: "中断報告書.pdf",
        type: "PDF",
        size: 1024,
        uploadDate: "2025-04-10",
        uploadedBy: "佐藤四郎",
        url: "#"
      }
    ]
  }
]

// フィルター設定
const filterConfigs = [
  {
    id: "status",
    label: "ステータス",
    options: [
      { value: "すべて", label: "すべて" },
      { value: "計画中", label: "計画中" },
      { value: "進行中", label: "進行中" },
      { value: "完了", label: "完了" },
      { value: "中断", label: "中断" }
    ],
    defaultValue: "すべて"
  },
  {
    id: "budget",
    label: "予算",
    options: [
      { value: "すべて", label: "すべて" },
      { value: "1000万円未満", label: "1000万円未満" },
      { value: "1000万円以上3000万円未満", label: "1000万円以上3000万円未満" },
      { value: "3000万円以上", label: "3000万円以上" }
    ],
    defaultValue: "すべて"
  }
]

export function ProjectManagement() {
  // 検索語の状態管理
  const [searchTerm, setSearchTerm] = useState<string>('')
  // 選択されたプロジェクトIDの状態管理
  const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>([])
  
  // フィルターの状態管理
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({
    status: 'すべて',
    assignee: 'すべて',
    timeframe: 'すべて'
  })

  // プロジェクト数のカウント
  const projectCounts = useMemo(() => {
    return {
      total: sampleProjects.length,
      planning: sampleProjects.filter(p => p.status === '計画中').length,
      inProgress: sampleProjects.filter(p => p.status === '進行中').length,
      completed: sampleProjects.filter(p => p.status === '完了').length,
      onHold: sampleProjects.filter(p => p.status === '中断').length
    }
  }, [])

  // ナビゲーションパネルからのフィルター変更ハンドラー
  const handleNavigationFilterChange = ({ type, value }: { type: string; value: string }) => {
    setActiveFilters(prev => ({
      ...prev,
      [type]: value
    }))
  }
  
  // 新規プロジェクト追加ハンドラー
  const handleAddNew = () => {
    alert('新規プロジェクトを追加します')
    // 実際の実装ではここでモーダルを表示するなど
  }
  
  // エクスポートハンドラー
  const handleExport = () => {
    alert('プロジェクト一覧をエクスポートします')
    // 実際の実装ではCSVダウンロードなど
  }
  
  // 選択変更ハンドラー
  const handleSelectionChange = (selectedIds: string[]) => {
    setSelectedProjectIds(selectedIds)
  }
  
  // アクションボタンのハンドラー
  const handleEdit = (ids: string[]) => {
    alert(`選択したプロジェクト(${ids.join(', ')})を編集します`)
  }
  
  const handleDelete = (ids: string[]) => {
    alert(`選択したプロジェクト(${ids.join(', ')})を削除します`)
  }
  
  const handleArchive = (ids: string[]) => {
    alert(`選択したプロジェクト(${ids.join(', ')})をアーカイブします`)
  }
  
  const handleSendMail = (ids: string[]) => {
    alert(`選択したプロジェクト(${ids.join(', ')})に関するメールを送信します`)
  }
  
  const handleDuplicate = (ids: string[]) => {
    if (ids.length !== 1) {
      alert('複製は1件のみ選択してください')
      return
    }
    alert(`プロジェクト(${ids[0]})を複製します`)
  }
  
  // アクションボタンの定義
  const actionButtons: ActionButton[] = [
    {
      label: '編集',
      icon: <Edit className="h-4 w-4" />,
      onClick: handleEdit
    },
    {
      label: '削除',
      icon: <Trash className="h-4 w-4" />,
      onClick: handleDelete,
      color: 'destructive'
    },
    {
      label: 'アーカイブ',
      icon: <Archive className="h-4 w-4" />,
      onClick: handleArchive
    },
    {
      label: 'メール送信',
      icon: <Mail className="h-4 w-4" />,
      onClick: handleSendMail
    },
    {
      label: '複製',
      icon: <Copy className="h-4 w-4" />,
      onClick: handleDuplicate,
      disabled: selectedProjectIds.length !== 1
    },
    {
      label: 'ステータス変更',
      icon: <Tag className="h-4 w-4" />,
      onClick: (ids) => alert(`選択したプロジェクト(${ids.join(', ')})のステータスを変更します`)
    },
    {
      label: 'タスク完了',
      icon: <CheckSquare className="h-4 w-4" />,
      onClick: (ids) => alert(`選択したプロジェクト(${ids.join(', ')})のタスクを完了としてマークします`)
    },
    {
      label: '共有',
      icon: <Share className="h-4 w-4" />,
      onClick: (ids) => alert(`選択したプロジェクト(${ids.join(', ')})を共有します`)
    }
  ]
  
  // アプリレイアウトからのイベントを受け取る
  useEffect(() => {
    // 検索イベント
    const handleAppSearch = (event: CustomEvent<{query: string}>) => {
      setSearchTerm(event.detail.query)
    }
    
    // 新規追加イベント
    const handleAppAddNew = () => {
      handleAddNew()
    }
    
    // エクスポートイベント
    const handleAppExport = () => {
      handleExport()
    }
    
    // フィルター変更イベント
    const handleAppFilterChange = (event: CustomEvent<{filterId: string, value: string}>) => {
      const { filterId, value } = event.detail
      // ヘッダーからのフィルターを受け取り、ナビゲーションパネルのフィルターと統合する
      if (filterId === 'year' || filterId === 'month') {
        // 年や月のフィルターはプロジェクトの開始日や終了日に影響する
        console.log(`フィルター変更: ${filterId} = ${value}`)
      }
    }
    
    // イベントリスナーを登録
    window.addEventListener('app-search', handleAppSearch as EventListener)
    window.addEventListener('app-add-new', handleAppAddNew)
    window.addEventListener('app-export', handleAppExport)
    window.addEventListener('app-filter-change', handleAppFilterChange as EventListener)
    
    // クリーンアップ
    return () => {
      window.removeEventListener('app-search', handleAppSearch as EventListener)
      window.removeEventListener('app-add-new', handleAppAddNew)
      window.removeEventListener('app-export', handleAppExport)
      window.removeEventListener('app-filter-change', handleAppFilterChange as EventListener)
    }
  }, [])

  // プロジェクトのフィルターパネル
  const filterPanel = (
    <FilterPanel
      onFilterChange={({ type, value }) => {
        setActiveFilters(prev => ({
          ...prev,
          [type]: value
        }))
      }}
      activeFilters={activeFilters}
      projectCounts={{
        total: sampleProjects.length,
        planning: sampleProjects.filter(p => p.status === '計画中').length,
        inProgress: sampleProjects.filter(p => p.status === '進行中').length,
        completed: sampleProjects.filter(p => p.status === '完了').length,
        onHold: sampleProjects.filter(p => p.status === '中断').length
      }}
    />
  )

  // フィルタリングされたプロジェクト
  const filteredProjects = useMemo(() => {
    return sampleProjects.filter(project => {
      // 検索語句によるフィルタリング
      if (searchTerm && !(
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.manager.toLowerCase().includes(searchTerm.toLowerCase())
      )) {
        return false
      }
      
      // ステータスフィルター
      if (activeFilters.status !== 'すべて' && project.status !== activeFilters.status) {
        return false
      }
      
      // 担当者フィルター
      if (activeFilters.assignee !== 'すべて' && project.manager !== activeFilters.assignee) {
        return false
      }
      
      // 期間フィルター（簡易実装）
      if (activeFilters.timeframe !== 'すべて') {
        // 実際には日付範囲の詳細なフィルタリングが必要
        return true
      }
      
      return true
    })
  }, [activeFilters, searchTerm])

  // 合計金額計算関数
  const calculateTotalAmount = (projects: Project[]) => {
    return projects.reduce((total, project) => {
      const amount = project.amount || (project.unitPrice && project.quantity ? project.unitPrice * project.quantity : 0)
      return total + amount
    }, 0)
  }

  return (
    <ManagementPageTemplate
      title="プロジェクト管理"
      itemName="プロジェクト"
      items={filteredProjects}
      getFilteredItems={() => filteredProjects}
      filterPanel={filterPanel}
      listItemComponent={({ item, isSelected, onSelect }) => (
        <ProjectListItem 
          project={item as Project} 
          isSelected={isSelected} 
          onSelect={onSelect}
          selectionProps={{
            selectedIds: selectedProjectIds,
            onSelectItem: (id, checked) => {
              const newSelectedIds = checked 
                ? [...selectedProjectIds, id]
                : selectedProjectIds.filter(selectedId => selectedId !== id);
              setSelectedProjectIds(newSelectedIds);
            }
          }}
        />
      )}
      selectedIds={selectedProjectIds}
      onSelectionChange={handleSelectionChange}
      actionButtons={actionButtons}
      calculateTotalAmount={calculateTotalAmount}
      detailComponent={({ selectedItem }) => (
        <ProjectDetail selectedProject={selectedItem as Project} />
      )}
      filterConfigs={filterConfigs}
      onAddNew={handleAddNew}
      onExport={handleExport}
    />
  )
}
