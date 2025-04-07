"use client"

import { Download, Menu, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ComponentLabel } from "./component-label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { SimpleSearch } from "./simple-search"
import { UserProfile } from "./user-profile"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export interface FilterOption {
  value: string
  label: string
}

export interface FilterConfig {
  id: string
  label: string
  options: FilterOption[]
  defaultValue?: string
}

interface HeaderProps {
  onMenuToggle?: () => void
  onCustomerTypeChange?: (type: string) => void
  customerType?: string
  onAddNew?: () => void
  onExportCsv?: () => void
  onSearch?: (query: string) => void
  searchValue?: string
  searchPlaceholder?: string
  showUndeliveredOnly?: {
    checked: boolean
    onChange: (checked: boolean) => void
  }
  incompleteOnly?: {
    checked: boolean
    onChange: (checked: boolean) => void
  }
  title?: string
  user?: {
    name: string
    email: string
    role: string
    avatarUrl?: string
  }
  filters?: FilterConfig[]
  onFilterChange?: (filterId: string, value: string) => void
}

export function Header({ onMenuToggle, onCustomerTypeChange, customerType = "all", onAddNew, onExportCsv, onSearch, searchValue = "", searchPlaceholder = "検索...", showUndeliveredOnly, incompleteOnly, title, user, filters = [], onFilterChange }: HeaderProps) {
  return (
    <header className="h-14 bg-white border-b px-4 flex items-center justify-between shrink-0 relative pt-0 pb-0">
      <ComponentLabel name="Header" />
      <div className="flex items-center gap-4 flex-1">
        {title && (
          <h1 className="text-xl font-semibold hidden md:block">{title}</h1>
        )}
        {/* モバイルメニュートグル */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuToggle}>
          <Menu className="h-5 w-5" />
        </Button>

        {/* 検索バーとフィルター */}
        <div className="hidden md:flex items-center gap-4">
          {/* フィルター */}
          <div className="flex items-center gap-2">
            {filters.map((filter) => (
              <Select 
                key={filter.id} 
                defaultValue={filter.defaultValue || filter.options[0]?.value} 
                onValueChange={(value) => onFilterChange?.(filter.id, value)}
              >
                <SelectTrigger className="w-[100px] h-9 text-sm bg-background">
                  <SelectValue placeholder={filter.label} />
                </SelectTrigger>
                <SelectContent>
                  {filter.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
          </div>
          
          {/* 検索バー */}
          <SimpleSearch
            onSearch={onSearch}
            placeholder={searchPlaceholder || "検索..."}
            incompleteOnly={incompleteOnly?.checked}
            onIncompleteOnlyChange={incompleteOnly?.onChange}
          />

          {/* アクションボタン */}
          <div className="flex items-center gap-2">
            {/* 未納のみスイッチ */}
            {showUndeliveredOnly && (
              <div className="flex items-center gap-2 mr-2">
                <Switch
                  id="undelivered-only"
                  checked={showUndeliveredOnly.checked}
                  onCheckedChange={showUndeliveredOnly.onChange}
                  className="data-[state=checked]:bg-primary"
                />
                <Label htmlFor="undelivered-only" className="text-sm font-medium cursor-pointer whitespace-nowrap">
                  未納のみ
                </Label>
              </div>
            )}
            
            <Button onClick={onAddNew}>
              <Plus className="h-4 w-4 mr-1" />
              新規
            </Button>
            <Button variant="outline" onClick={onExportCsv}>
              <Download className="h-4 w-4 mr-1" />
              csv
            </Button>
          </div>
        </div>
      </div>
      
      {/* ユーザープロファイル */}
      <div className="flex items-center ml-auto">
        <UserProfile user={user} />
      </div>
    </header>
  )
}
