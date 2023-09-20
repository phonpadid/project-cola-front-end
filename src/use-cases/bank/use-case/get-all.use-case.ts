import type { BankEntity } from '@/entities/bank.entity'
import { HandleException } from '@/framework/common/handle-exception/handle-exception'
import { Toast } from '@/framework/toast/primevue-toast/toast'
import type { IBankApi } from '@/interface-adapter/apis/bank.api'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import type { IToast } from '@/interface-adapter/toast/toast.interface'
import type { IGUseCase } from '@/interface-adapter/use-cases/use-case.interface'
import { BankApi } from '@/use-cases/inject-token'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAllBankUseCase
  implements
    IGUseCase<
      IResponse<IGPaginated<BankEntity>>,
      IGPaginate<Pick<BankEntity, 'accountName' | 'company'>>
    >
{
  constructor(@inject(BankApi) private _api: IBankApi, @inject(Toast) private _toast: IToast) {}

  async execute(
    input: IGPaginate<Pick<BankEntity, 'accountName' | 'company'>>
  ): Promise<void | IResponse<IGPaginated<BankEntity>>> {
    try {
      return await this._api.getAll(input)
    } catch (error: any) {
      new HandleException(error, this._toast)
    }
  }
}
