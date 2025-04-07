"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface SimpleSearchProps {
  onSearch?: (query: string) => void
  placeholder?: string
  className?: string
  onIncompleteOnlyChange?: (checked: boolean) => void
  incompleteOnly?: boolean
}

export function SimpleSearch({ 
  onSearch, 
  placeholder = "検索...", 
  className = "w-[200px] lg:w-[300px]",
  onIncompleteOnlyChange,
  incompleteOnly = true
}: SimpleSearchProps) {
  const [value, setValue] = useState("")
  const [isIncompleteOnly, setIsIncompleteOnly] = useState(incompleteOnly)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    if (onSearch) {
      onSearch(newValue)
    }
  }

  const handleIncompleteOnlyChange = (checked: boolean) => {
    setIsIncompleteOnly(checked)
    if (onIncompleteOnlyChange) {
      onIncompleteOnlyChange(checked)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <div className={`relative ${className}`}>
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full h-10 pl-8 pr-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="incomplete-only"
          checked={isIncompleteOnly}
          onCheckedChange={handleIncompleteOnlyChange}
          className="data-[state=checked]:bg-primary"
        />
        <Label htmlFor="incomplete-only" className="text-sm font-medium">未完のみ</Label>
      </div>
    </div>
  )
}
