import type { QuotationTypeEntity } from '@/entities/quotationType.entity'
import type { QuotationTypeDTO } from '../dto/quotationType.dto'
import type { IGPaginate, IGPaginated } from '../interfaces/pagination.interface'
import type { IResponse } from '../interfaces/response.interface'

export interface IQuotationTypeApi {
  getAll(
    args: IGPaginate<Pick<QuotationTypeEntity, 'name'>>
  ): Promise<IResponse<IGPaginated<QuotationTypeEntity>>>

  create(item: QuotationTypeDTO): Promise<IResponse<QuotationTypeEntity>>

  update(item: QuotationTypeDTO, id: string): Promise<IResponse<QuotationTypeEntity>>

  remove(id: string): Promise<IResponse<QuotationTypeEntity>>
}
