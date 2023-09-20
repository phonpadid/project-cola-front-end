import type { QuotationEntity, QuotationStatus } from '@/entities/quotation.entity'
import type {
  CreateQuotationDTO,
  GetAllQuotationDTO,
  QueryQuotationDTO,
  UpdateQuotationDTO
} from '../dto/quotation.dto'
import type { IGPaginate, IGPaginated } from '../interfaces/pagination.interface'
import type { IResponse } from '../interfaces/response.interface'

export interface IQuotationApi {
  getAll(args: IGPaginate<QueryQuotationDTO>): Promise<IResponse<IGPaginated<GetAllQuotationDTO>>>

  create(item: CreateQuotationDTO): Promise<IResponse<QuotationEntity>>

  getOne(id: string): Promise<IResponse<QuotationEntity>>

  update(item: UpdateQuotationDTO, id: string): Promise<IResponse<QuotationEntity>>

  changeStatus(id: string, status: QuotationStatus): Promise<IResponse<QuotationEntity>>

  remove(id: string): Promise<IResponse<QuotationEntity>>
}
