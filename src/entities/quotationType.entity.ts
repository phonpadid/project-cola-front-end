import type { QuotationEntity } from './quotation.entity'

export interface QuotationTypeEntity {
  id: string
  name: string
  rateKip: number
  rateBath: number
  rateDollar: number
  quotation?: Partial<QuotationEntity>[]
}
