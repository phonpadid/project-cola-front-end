import type { QuotationEntity } from './quotation.entity'

export interface ItemEntity {
  id?: string
  orderNumber: number
  quotation?: Pick<QuotationEntity, 'id'> | QuotationEntity
  name: string
  description?: string
  price?: number
  qty?: number
}
