import type { BankStatus } from '@/entities/bank.entity'
import type { CompanyEntity } from '@/entities/company.entity'

export interface BankDTO {
  company?: Partial<CompanyEntity>
  bankName: string
  accountName: string
  accountNumber: string
  description?: string
}

export interface ChangeStatusDTO {
  status: BankStatus
}
