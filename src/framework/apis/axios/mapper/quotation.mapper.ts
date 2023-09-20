import type { QuotationEntity } from '@/entities/quotation.entity'
import type { CreateQuotationDTO } from '@/interface-adapter/dto/quotation.dto'
import type { IMapper } from '@/interface-adapter/mapper'
import { singleton } from 'tsyringe'

@singleton()
export class QuotationMapper implements IMapper<any, QuotationEntity, CreateQuotationDTO> {
  toEntity(res: any): QuotationEntity {
    return {
      id: res.id,
      name: res.name,
      startDate: res.startDate,
      endDate: res.endDate,
      billTo: res.billTo,
      from: res.from,
      status: res.status,
      currency: res.currency,
      discount: res.discount,
      items: res.items,
      note: res.note,
      tax: res.tax,
      total: res.total
    }
  }
}
