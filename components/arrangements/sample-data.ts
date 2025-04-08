import { Arrangement } from "./types"

// サンプル手配データ
export const sampleArrangements: Arrangement[] = [
  {
    id: "1",
    code: "ARR-2025-001",
    name: "工業用ポンプ部品一式",
    description: "大型工場向け高圧ポンプシステム用の部品手配。特殊仕様の耐熱性能を備えた部品を含む。",
    client: "株式会社メトロ工業",
    status: "手配中",
    orderId: "ORD-2025-001",
    deliveryId: "DEL-2025-001",
    createdDate: "2025-04-01",
    requiredDate: "2025-04-20",
    completionDate: "",
    manager: "山田太郎",
    team: ["佐藤一郎", "鈴木花子"],
    totalAmount: 3500000,
    isImportant: true,
    isUrgent: false,
    isCompleted: false,
    progress: 60,
    supplierCount: 3,
    items: [
      {
        id: "i1",
        name: "高圧ポンプケーシング",
        quantity: 2,
        unit: "個",
        unitPrice: 450000,
        totalPrice: 900000,
        supplier: "東京金属工業",
        status: "入荷済",
        deliveryDate: "2025-04-10",
        description: "耐熱性能強化モデル"
      },
      {
        id: "i2",
        name: "インペラー",
        quantity: 2,
        unit: "個",
        unitPrice: 350000,
        totalPrice: 700000,
        supplier: "東京金属工業",
        status: "入荷済",
        deliveryDate: "2025-04-10",
        description: "チタン合金製"
      },
      {
        id: "i3",
        name: "モーターユニット",
        quantity: 2,
        unit: "セット",
        unitPrice: 600000,
        totalPrice: 1200000,
        supplier: "電機システム株式会社",
        status: "発注済",
        deliveryDate: "2025-04-15",
        description: "防爆仕様"
      },
      {
        id: "i4",
        name: "制御基板",
        quantity: 2,
        unit: "枚",
        unitPrice: 250000,
        totalPrice: 500000,
        supplier: "電機システム株式会社",
        status: "発注済",
        deliveryDate: "2025-04-15",
        description: "カスタム仕様"
      },
      {
        id: "i5",
        name: "配管部品セット",
        quantity: 1,
        unit: "セット",
        unitPrice: 200000,
        totalPrice: 200000,
        supplier: "大阪配管部品",
        status: "未手配",
        description: "耐熱・耐圧仕様"
      }
    ],
    notes: [
      { id: "n1", date: "2025-04-01", author: "山田太郎", content: "手配開始。東京金属工業に発注書送付済み。" },
      { id: "n2", date: "2025-04-03", author: "佐藤一郎", content: "電機システム株式会社に発注書送付済み。" },
      { id: "n3", date: "2025-04-10", author: "山田太郎", content: "東京金属工業からの部品入荷確認。" }
    ],
    documents: [
      { id: "d1", name: "発注書_東京金属工業.pdf", size: "0.8MB", date: "2025-04-01" },
      { id: "d2", name: "発注書_電機システム.pdf", size: "0.7MB", date: "2025-04-03" },
      { id: "d3", name: "納品書_東京金属工業.pdf", size: "0.9MB", date: "2025-04-10" }
    ],
    history: [
      { date: "2025-04-01", action: "手配作成", user: "山田太郎" },
      { date: "2025-04-01", action: "東京金属工業に発注", user: "山田太郎" },
      { date: "2025-04-03", action: "電機システム株式会社に発注", user: "佐藤一郎" },
      { date: "2025-04-10", action: "東京金属工業からの部品入荷", user: "山田太郎" }
    ]
  },
  {
    id: "2",
    code: "ARR-2025-002",
    name: "生産ライン制御部品",
    description: "食品工場向け自動化生産ライン制御システム用の部品手配。",
    client: "フード・プロセッシング株式会社",
    status: "未手配",
    orderId: "ORD-2025-002",
    deliveryId: "",
    createdDate: "2025-04-05",
    requiredDate: "2025-04-25",
    completionDate: "",
    manager: "鈴木花子",
    team: ["山田太郎"],
    totalAmount: 4800000,
    isImportant: false,
    isUrgent: true,
    isCompleted: false,
    progress: 0,
    supplierCount: 2,
    items: [
      {
        id: "i1",
        name: "メインコントローラー",
        quantity: 1,
        unit: "台",
        unitPrice: 2500000,
        totalPrice: 2500000,
        supplier: "電機システム株式会社",
        status: "未手配",
        description: "冗長化システム"
      },
      {
        id: "i2",
        name: "操作パネル",
        quantity: 3,
        unit: "台",
        unitPrice: 600000,
        totalPrice: 1800000,
        supplier: "電機システム株式会社",
        status: "未手配",
        description: "防水・防塵仕様"
      },
      {
        id: "i3",
        name: "センサーユニット",
        quantity: 5,
        unit: "個",
        unitPrice: 100000,
        totalPrice: 500000,
        supplier: "センサーテック",
        status: "未手配",
        description: "高精度温度・湿度センサー"
      }
    ],
    notes: [
      { id: "n1", date: "2025-04-05", author: "鈴木花子", content: "手配リスト作成完了。発注準備中。" }
    ],
    documents: [
      { id: "d1", name: "手配リスト.xlsx", size: "0.5MB", date: "2025-04-05" }
    ],
    history: [
      { date: "2025-04-05", action: "手配作成", user: "鈴木花子" }
    ]
  },
  {
    id: "3",
    code: "ARR-2025-003",
    name: "業務用空調部品",
    description: "オフィスビル向け省エネ型空調システム用の部品手配。",
    client: "東京不動産開発株式会社",
    status: "手配完了",
    orderId: "ORD-2025-003",
    deliveryId: "DEL-2025-003",
    createdDate: "2025-03-15",
    requiredDate: "2025-04-05",
    completionDate: "2025-04-03",
    manager: "田中健太",
    team: ["佐藤一郎"],
    totalAmount: 5200000,
    isImportant: true,
    isUrgent: false,
    isCompleted: true,
    progress: 100,
    supplierCount: 2,
    items: [
      {
        id: "i1",
        name: "室外機ユニット",
        quantity: 2,
        unit: "台",
        unitPrice: 1200000,
        totalPrice: 2400000,
        supplier: "エアコンテック",
        status: "入荷済",
        deliveryDate: "2025-04-01",
        description: "省エネタイプ"
      },
      {
        id: "i2",
        name: "室内機ユニット",
        quantity: 10,
        unit: "台",
        unitPrice: 180000,
        totalPrice: 1800000,
        supplier: "エアコンテック",
        status: "入荷済",
        deliveryDate: "2025-04-01",
        description: "静音設計"
      },
      {
        id: "i3",
        name: "制御システム",
        quantity: 1,
        unit: "セット",
        unitPrice: 1000000,
        totalPrice: 1000000,
        supplier: "電機システム株式会社",
        status: "入荷済",
        deliveryDate: "2025-04-03",
        description: "タッチパネル式"
      }
    ],
    notes: [
      { id: "n1", date: "2025-03-15", author: "田中健太", content: "手配開始。エアコンテックに発注書送付済み。" },
      { id: "n2", date: "2025-03-16", author: "佐藤一郎", content: "電機システム株式会社に発注書送付済み。" },
      { id: "n3", date: "2025-04-01", author: "田中健太", content: "エアコンテックからの部品入荷確認。" },
      { id: "n4", date: "2025-04-03", author: "佐藤一郎", content: "電機システム株式会社からの部品入荷確認。全ての部品が揃いました。" }
    ],
    documents: [
      { id: "d1", name: "発注書_エアコンテック.pdf", size: "0.8MB", date: "2025-03-15" },
      { id: "d2", name: "発注書_電機システム.pdf", size: "0.7MB", date: "2025-03-16" },
      { id: "d3", name: "納品書_エアコンテック.pdf", size: "0.9MB", date: "2025-04-01" },
      { id: "d4", name: "納品書_電機システム.pdf", size: "0.7MB", date: "2025-04-03" },
      { id: "d5", name: "検収書.pdf", size: "1.0MB", date: "2025-04-03" }
    ],
    history: [
      { date: "2025-03-15", action: "手配作成", user: "田中健太" },
      { date: "2025-03-15", action: "エアコンテックに発注", user: "田中健太" },
      { date: "2025-03-16", action: "電機システム株式会社に発注", user: "佐藤一郎" },
      { date: "2025-04-01", action: "エアコンテックからの部品入荷", user: "田中健太" },
      { date: "2025-04-03", action: "電機システム株式会社からの部品入荷", user: "佐藤一郎" },
      { date: "2025-04-03", action: "手配完了", user: "田中健太" }
    ]
  },
  {
    id: "4",
    code: "ARR-2025-004",
    name: "太陽光発電システム部品",
    description: "工場屋上向け大規模太陽光発電システム用の部品手配。",
    client: "グリーンエナジー株式会社",
    status: "手配中",
    orderId: "ORD-2025-004",
    deliveryId: "",
    createdDate: "2025-04-02",
    requiredDate: "2025-05-02",
    completionDate: "",
    manager: "佐藤一郎",
    team: ["山田太郎", "鈴木花子"],
    totalAmount: 18000000,
    isImportant: true,
    isUrgent: true,
    isCompleted: false,
    progress: 30,
    supplierCount: 3,
    items: [
      {
        id: "i1",
        name: "太陽光パネル",
        quantity: 100,
        unit: "枚",
        unitPrice: 120000,
        totalPrice: 12000000,
        supplier: "ソーラーテック",
        status: "発注済",
        deliveryDate: "2025-04-25",
        description: "高効率タイプ"
      },
      {
        id: "i2",
        name: "パワーコンディショナー",
        quantity: 5,
        unit: "台",
        unitPrice: 600000,
        totalPrice: 3000000,
        supplier: "電機システム株式会社",
        status: "発注済",
        deliveryDate: "2025-04-20",
        description: "大容量タイプ"
      },
      {
        id: "i3",
        name: "蓄電システム",
        quantity: 1,
        unit: "セット",
        unitPrice: 3000000,
        totalPrice: 3000000,
        supplier: "バッテリーテック",
        status: "未手配",
        description: "大容量リチウムイオン"
      }
    ],
    notes: [
      { id: "n1", date: "2025-04-02", author: "佐藤一郎", content: "手配開始。ソーラーテックと電機システム株式会社に発注書送付済み。" },
      { id: "n2", date: "2025-04-05", author: "山田太郎", content: "バッテリーテックへの発注は在庫確認後に行う予定。" }
    ],
    documents: [
      { id: "d1", name: "発注書_ソーラーテック.pdf", size: "1.0MB", date: "2025-04-02" },
      { id: "d2", name: "発注書_電機システム.pdf", size: "0.8MB", date: "2025-04-02" }
    ],
    history: [
      { date: "2025-04-02", action: "手配作成", user: "佐藤一郎" },
      { date: "2025-04-02", action: "ソーラーテックに発注", user: "佐藤一郎" },
      { date: "2025-04-02", action: "電機システム株式会社に発注", user: "佐藤一郎" }
    ]
  },
  {
    id: "5",
    code: "ARR-2025-005",
    name: "セキュリティシステム部品",
    description: "オフィスビル向け統合セキュリティシステム用の部品手配。",
    client: "セキュリティソリューションズ株式会社",
    status: "キャンセル",
    orderId: "ORD-2025-005",
    deliveryId: "",
    createdDate: "2025-03-20",
    requiredDate: "2025-04-20",
    completionDate: "2025-04-05",
    manager: "鈴木花子",
    team: ["田中健太"],
    totalAmount: 7500000,
    isImportant: false,
    isUrgent: false,
    isCompleted: false,
    progress: 0,
    supplierCount: 2,
    items: [
      {
        id: "i1",
        name: "監視カメラ",
        quantity: 20,
        unit: "台",
        unitPrice: 150000,
        totalPrice: 3000000,
        supplier: "セキュリティデバイス",
        status: "キャンセル",
        description: "4K対応"
      },
      {
        id: "i2",
        name: "顔認証システム",
        quantity: 5,
        unit: "セット",
        unitPrice: 500000,
        totalPrice: 2500000,
        supplier: "セキュリティデバイス",
        status: "キャンセル",
        description: "AI搭載"
      },
      {
        id: "i3",
        name: "入退室管理システム",
        quantity: 10,
        unit: "セット",
        unitPrice: 200000,
        totalPrice: 2000000,
        supplier: "電機システム株式会社",
        status: "キャンセル",
        description: "カード・生体認証対応"
      }
    ],
    notes: [
      { id: "n1", date: "2025-03-20", author: "鈴木花子", content: "手配開始。見積依頼中。" },
      { id: "n2", date: "2025-04-05", author: "田中健太", content: "顧客からのプロジェクト中止連絡により、全ての手配をキャンセル。" }
    ],
    documents: [
      { id: "d1", name: "見積依頼書.pdf", size: "0.7MB", date: "2025-03-20" },
      { id: "d2", name: "キャンセル通知.pdf", size: "0.5MB", date: "2025-04-05" }
    ],
    history: [
      { date: "2025-03-20", action: "手配作成", user: "鈴木花子" },
      { date: "2025-03-25", action: "見積回答受領", user: "田中健太" },
      { date: "2025-04-05", action: "手配キャンセル", user: "田中健太" }
    ]
  }
]
