import type { BankEntity } from '@/entities/bank.entity'
import { HandleException } from '@/framework/common/handle-exception/handle-exception'
import { Toast } from '@/framework/toast/primevue-toast/toast'
import type { IBankApi } from '@/interface-adapter/apis/bank.api'
import type { ChangeStatusDTO } from '@/interface-adapter/dto/bank.dto'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import type { IToast } from '@/interface-adapter/toast/toast.interface'
import type { IGUseCase } from '@/interface-adapter/use-cases/use-case.interface'
import { BankApi } from '@/use-cases/inject-token'
import { inject, singleton } from 'tsyringe'

@singleton()
export class ChangeStatusBankUseCase
  implements IGUseCase<IResponse<BankEntity>, ChangeStatusDTO, string>
{
  constructor(@inject(BankApi) private _api: IBankApi, @inject(Toast) private _toast: IToast) {}

  async execute(input: ChangeStatusDTO, id: string): Promise<void | IResponse<BankEntity>> {
    try {
      const result = await this._api.changeStatus(input, id as string)
      this._toast.success('ດຳເນີນການສຳເລັດ!', result.message as string)
      return result
    } catch (error: unknown) {
      new HandleException(error, this._toast)
    }
  }
}
