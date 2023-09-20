import type { BankEntity } from '@/entities/bank.entity'
import type { BankDTO, ChangeStatusDTO } from '../dto/bank.dto'
import type { IGPaginate, IGPaginated } from '../interfaces/pagination.interface'
import type { IResponse } from '../interfaces/response.interface'

export interface IBankApi {
  getAll(
    args: IGPaginate<Pick<BankEntity, 'accountName' | 'company'>>
  ): Promise<IResponse<IGPaginated<BankEntity>>>

  create(item: BankDTO): Promise<IResponse<BankEntity>>

  update(item: BankDTO, id: string): Promise<IResponse<BankEntity>>

  remove(id: string): Promise<IResponse<BankEntity>>

  changeStatus(item: ChangeStatusDTO, id: string): Promise<IResponse<BankEntity>>
}
