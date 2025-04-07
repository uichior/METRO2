import { AlertCircle, CheckCircle2, Clock, CircleDashed, Truck, Package } from "lucide-react"
import { Badge } from "@/components/ui/badge"

/**
 * 注文ステータスに応じたバッジを生成する関数
 * @param status ステータス文字列
 * @returns バッジコンポーネント
 */
export function getStatusBadge(status: string) {
  switch (status) {
    case "受注確認":
    case "未着手":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
          <AlertCircle className="w-3 h-3 mr-1" />
          {status}
        </Badge>
      )
    case "製造中":
    case "進行中":
      return (
        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
          <Clock className="w-3 h-3 mr-1" />
          {status}
        </Badge>
      )
    case "製造完了":
    case "完了":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          {status}
        </Badge>
      )
    case "出荷準備中":
      return (
        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
          <Package className="w-3 h-3 mr-1" />
          {status}
        </Badge>
      )
    case "出荷完了":
      return (
        <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
          <Truck className="w-3 h-3 mr-1" />
          {status}
        </Badge>
      )
    case "納品完了":
      return (
        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          {status}
        </Badge>
      )
    default:
      return (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
          <CircleDashed className="w-3 h-3 mr-1" />
          {status}
        </Badge>
      )
  }
}
