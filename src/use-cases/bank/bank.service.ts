import type { BankEntity } from '@/entities/bank.entity'
import type { BankDTO, ChangeStatusDTO } from '@/interface-adapter/dto/bank.dto'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import { inject, singleton } from 'tsyringe'
import { ChangeStatusBankUseCase } from './use-case/change-status.use-case'
import { CreateBankUseCase } from './use-case/create.use-case'
import { GetAllBankUseCase } from './use-case/get-all.use-case'
import { RemoveBankUseCase } from './use-case/remove.use-case'
import { UpdateBankUseCase } from './use-case/update.use-case'

@singleton()
export class BankService {
  constructor(
    @inject(GetAllBankUseCase) private _getAll: GetAllBankUseCase,
    @inject(CreateBankUseCase) private _create: CreateBankUseCase,
    @inject(UpdateBankUseCase) private _update: UpdateBankUseCase,
    @inject(RemoveBankUseCase) private _remove: RemoveBankUseCase,
    @inject(ChangeStatusBankUseCase) private _changeStatus: ChangeStatusBankUseCase
  ) {}

  async getAll(
    input: IGPaginate<Pick<BankEntity, 'accountName' | 'company'>>
  ): Promise<void | IResponse<IGPaginated<BankEntity>>> {
    return await this._getAll.execute(input)
  }

  async create(input: BankDTO): Promise<void | IResponse<BankEntity>> {
    return await this._create.execute(input)
  }

  async update(input: BankDTO, id: string): Promise<void | IResponse<BankEntity>> {
    return await this._update.execute(input, id)
  }

  async remove(Id: string): Promise<void | IResponse<BankEntity>> {
    return await this._remove.execute(Id)
  }

  async changeStatus(input: ChangeStatusDTO, id: string): Promise<void | IResponse<BankEntity>> {
    return await this._changeStatus.execute(input, id)
  }
}
