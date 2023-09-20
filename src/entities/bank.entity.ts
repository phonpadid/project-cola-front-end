import type { CompanyEntity } from './company.entity'

export type BankStatus = 'active' | 'inactive'

export interface BankEntity {
  id: string
  bankName: string
  accountName: string
  accountNumber: string
  description?: string
  company?: Partial<CompanyEntity>
  status?: BankStatus
}
