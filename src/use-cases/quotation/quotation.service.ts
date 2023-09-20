import type { QuotationEntity, QuotationStatus } from '@/entities/quotation.entity'
import type {
  CreateQuotationDTO,
  GetAllQuotationDTO,
  QueryQuotationDTO,
  UpdateQuotationDTO
} from '@/interface-adapter/dto/quotation.dto'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import { inject, singleton } from 'tsyringe'
import { ChangeStatusQuotationUseCase } from './use-case/change-status.use-case'
import { CreateQuotationUseCase } from './use-case/create.use-case'
import { GetAllQuotationUseCase } from './use-case/get-all.use-case'
import { GetOneQuotaionUseCase } from './use-case/get-one.use-case'
import { UpdateQuotationUseCase } from './use-case/update.use-case'

@singleton()
export class QuotationService {
  constructor(
    @inject(GetAllQuotationUseCase) private _getAll: GetAllQuotationUseCase,
    @inject(CreateQuotationUseCase) private _create: CreateQuotationUseCase,
    @inject(GetOneQuotaionUseCase) private _getOne: GetOneQuotaionUseCase,
    @inject(UpdateQuotationUseCase) private _update: UpdateQuotationUseCase,
    @inject(ChangeStatusQuotationUseCase) private _changeStatus: ChangeStatusQuotationUseCase
  ) {}

  async getAll(
    args: IGPaginate<QueryQuotationDTO>
  ): Promise<void | IResponse<IGPaginated<GetAllQuotationDTO>>> {
    return await this._getAll.execute(args)
  }

  async create(input: CreateQuotationDTO): Promise<void | IResponse<QuotationEntity>> {
    return await this._create.execute(input)
  }

  async getOne(id: string): Promise<void | IResponse<QuotationEntity>> {
    return await this._getOne.execute(id)
  }

  async update(id: string, input: UpdateQuotationDTO) {
    return await this._update.execute(input, id)
  }

  async chnageStatus(id: string, input: QuotationStatus) {
    return await this._changeStatus.execute(input, id)
  }
}
