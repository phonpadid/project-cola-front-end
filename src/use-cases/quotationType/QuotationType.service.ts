import type { QuotationTypeEntity } from '@/entities/quotationType.entity'
import type { QuotationTypeDTO } from '@/interface-adapter/dto/quotationType.dto'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import { inject, singleton } from 'tsyringe'
import { CreateQuotationTypeUseCase } from './use-case/create.use-case'
import { GetAllQuotationTypeUseCase } from './use-case/get-all.use-case'
import { RemoveQuotationTypeUseCase } from './use-case/remove.use-case'
import { UpdateQuotationTypeUseCase } from './use-case/update.use-case'

@singleton()
export class QuotationTypeService {
  constructor(
    @inject(GetAllQuotationTypeUseCase) private _getAll: GetAllQuotationTypeUseCase,
    @inject(CreateQuotationTypeUseCase) private _create: CreateQuotationTypeUseCase,
    @inject(UpdateQuotationTypeUseCase) private _update: UpdateQuotationTypeUseCase,
    @inject(RemoveQuotationTypeUseCase) private _remove: RemoveQuotationTypeUseCase
  ) {}

  async getAll(
    input: IGPaginate<Pick<QuotationTypeEntity, 'name'>>
  ): Promise<void | IResponse<IGPaginated<QuotationTypeEntity>>> {
    return await this._getAll.execute(input)
  }

  async create(input: QuotationTypeDTO): Promise<void | IResponse<QuotationTypeEntity>> {
    return await this._create.execute(input)
  }

  async update(
    input: QuotationTypeDTO,
    id: string
  ): Promise<void | IResponse<QuotationTypeEntity>> {
    return await this._update.execute(input, id)
  }

  async remove(Id: string): Promise<void | IResponse<QuotationTypeEntity>> {
    return await this._remove.execute(Id)
  }
}
