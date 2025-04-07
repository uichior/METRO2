import type React from "react"
export interface SortOption {
  key: string
  direction: "asc" | "desc"
}

export interface BaseRecord {
  id: string
}

export interface ConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: "default" | "destructive"
  children?: React.ReactNode
}

export interface ColumnDefinition {
  key: string
  label: string
  sortable?: boolean
  width?: string
  render?: (value: any, row: any) => React.ReactNode
}

export interface FormDialogProps {
  title?: string
  description?: string
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  children: React.ReactNode
  isSubmitting?: boolean
  isEditing?: boolean
}

export interface FilterOption {
  key: string
  label: string
  options: { value: string; label: string }[]
}

