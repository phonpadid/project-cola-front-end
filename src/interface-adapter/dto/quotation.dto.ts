import type { CompanyEntity } from '@/entities/company.entity'
import type { CustomerEntity } from '@/entities/customer.entity'
import type { Currency, QuotationEntity, QuotationStatus } from '@/entities/quotation.entity'
import type { ItemDTO } from './item.dto'

export interface GetAllQuotationDTO {
  id: string
  name: string
  endDate: string
  billTo: string
  total: number
  currency: Currency
  status: QuotationStatus
}

export interface QueryQuotationDTO
  extends Pick<QuotationEntity, 'id' | 'name' | 'endDate' | 'status'> {
  billTo: string
}

export interface CreateQuotationDTO {
  name: string
  from: Pick<CompanyEntity, 'id'>
  billTo: Pick<CustomerEntity, 'id'>
  currency: Currency
  items: ItemDTO[]
  startDate: Date
  endDate: Date
  tax?: number
  discount?: number
  note?: string
}

export interface UpdateQuotationDTO extends Omit<CreateQuotationDTO, 'items'> {}
