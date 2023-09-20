import type { CompanyEntity } from './company.entity'
import type { CustomerEntity } from './customer.entity'
import type { ItemEntity } from './item.enttiy'

export type Currency = '₭' | '$' | '฿'

export type QuotationStatus = 'created' | 'in progress' | 'complate' | 'approve' | 'canceled'

export interface QuotationEntity {
  id: string
  name: string
  startDate: Date
  endDate: Date
  total: number
  from: Partial<CompanyEntity>
  billTo: Partial<CustomerEntity>
  currency: Currency
  status: QuotationStatus
  items: Partial<ItemEntity>[]
  tax?: number
  discount?: number
  note?: string
}
