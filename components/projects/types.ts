export interface Project {
  id: string
  code: string
  name: string
  description: string
  client: string
  status: string
  startDate: string
  endDate: string
  budget: number
  cost: number
  manager: string
  team: string[]
  totalTasks: number
  completedTasks: number
  milestones: Milestone[]
  attachments: Attachment[]
  unitPrice?: number
  quantity?: number
  amount?: number
}

export interface Milestone {
  id: string
  name: string
  dueDate: string
  status: string
  description?: string
}

export interface Attachment {
  id: string
  name: string
  type: string
  size: number
  uploadDate: string
  uploadedBy: string
  url: string
}
