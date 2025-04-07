import { cn } from "@/lib/utils"

interface ComponentLabelProps {
  name: string
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  className?: string
}

export function ComponentLabel({ name, position = "top-right", className }: ComponentLabelProps) {
  return (
    <div
      className={cn(
        "absolute text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 border border-gray-200 rounded z-10 opacity-70 hover:opacity-100 transition-opacity",
        position === "top-left" && "top-1 left-1",
        position === "top-right" && "top-1 right-1",
        position === "bottom-left" && "bottom-1 left-1",
        position === "bottom-right" && "bottom-1 right-1",
        className,
      )}
    >
      {name}
    </div>
  )
}

