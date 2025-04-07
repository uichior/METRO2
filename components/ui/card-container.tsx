import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface CardContainerProps {
  children: ReactNode
  className?: string
}

export function CardContainer({ children, className }: CardContainerProps) {
  return <div className={cn("bg-white rounded-lg shadow-sm border overflow-hidden", className)}>{children}</div>
}

