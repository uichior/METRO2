import { cn } from "@/lib/utils"

export type MetroLine =
  | "hibiya" // 日比谷線
  | "yurakucho" // 有楽町線
  | "ginza" // 銀座線
  | "chiyoda" // 千代田線
  | "marunouchi" // 丸ノ内線
  | "hanzomon" // 半蔵門線
  | "tozai" // 東西線
  | "fukutoshin" // 副都心線
  | "namboku" // 南北線

interface MetroLogoProps {
  line: MetroLine
  size?: "sm" | "md" | "lg"
  className?: string
  showLabel?: boolean
  color?: string
  textSize?: "sm" | "md" | "lg" | "xl" | "2xl"
}

// lineColorsをエクスポートするように変更
export const lineColors: Record<MetroLine, string> = {
  hibiya: "#b5b5ac", // シルバー
  yurakucho: "#c1a470", // ゴールド
  ginza: "#ff9500", // オレンジ
  chiyoda: "#00bb85", // グリーン
  marunouchi: "#f62e36", // レッド
  hanzomon: "#8f76d6", // パープル
  tozai: "#009bbf", // スカイブルー
  fukutoshin: "#9c5e31", // ブラウン
  namboku: "#00ac9b", // エメラルド
}

const lineLetters: Record<MetroLine, string> = {
  hibiya: "H",
  yurakucho: "Y",
  ginza: "G",
  chiyoda: "C",
  marunouchi: "M",
  hanzomon: "Z",
  tozai: "T",
  fukutoshin: "F",
  namboku: "N",
}

const lineNames: Record<MetroLine, string> = {
  hibiya: "日比谷線",
  yurakucho: "有楽町線",
  ginza: "銀座線",
  chiyoda: "千代田線",
  marunouchi: "丸ノ内線",
  hanzomon: "半蔵門線",
  tozai: "東西線",
  fukutoshin: "副都心線",
  namboku: "南北線",
}

export function MetroLogo({ line, size = "md", className, showLabel = false, color, textSize }: MetroLogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
    xl: "text-3xl",
    "2xl": "text-4xl"
  }

  const actualTextSize = textSize || size;

  const strokeColor = color || lineColors[line];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0"
        >
          <rect 
            x="2" 
            y="2" 
            width="24" 
            height="24" 
            rx="4" 
            stroke={strokeColor} 
            strokeWidth="2.5" 
            fill="none" 
          />
          <path
            d="M8 20V8L14 16L20 8V20"
            stroke={strokeColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      {showLabel && <span className={cn("font-bold", textSizeClasses[actualTextSize])}>METRO</span>}
    </div>
  )
}

// ページ名とメトロ路線のマッピング
export const pageToMetroLine: Record<string, MetroLine> = {
  dashboard: "marunouchi", // ダッシュボードはそのままですが、後でオーバーライドします
  inventory: "ginza", // 銀座線（オレンジ）
  orders: "marunouchi", // 丸ノ内線（レッド）
  purchase: "yurakucho", // 有楽町線（ゴールド）
  procurement: "hanzomon", // 半蔵門線（パープル）
  delivery: "tozai", // 東西線（スカイブルー）
  budget: "fukutoshin", // 副都心線（ブラウン）
  payment: "namboku", // 南北線（エメラルド）
  billing: "chiyoda", // 千代田線（グリーン）
  "daily-report": "hibiya", // 日比谷線（シルバー）
  master: "marunouchi", // マスタもそのままですが、後でオーバーライドします
}
