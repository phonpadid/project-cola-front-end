import type { BankEntity } from '@/entities/bank.entity'
import { HandleException } from '@/framework/common/handle-exception/handle-exception'
import { Toast } from '@/framework/toast/primevue-toast/toast'
import type { IBankApi } from '@/interface-adapter/apis/bank.api'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import type { IToast } from '@/interface-adapter/toast/toast.interface'
import type { IGUseCase } from '@/interface-adapter/use-cases/use-case.interface'
import { BankApi } from '@/use-cases/inject-token'
import { inject, singleton } from 'tsyringe'

@singleton()
export class RemoveBankUseCase implements IGUseCase<IResponse<BankEntity>, string> {
  constructor(@inject(BankApi) private _api: IBankApi, @inject(Toast) private _toast: IToast) {}

  async execute(id: string): Promise<void | IResponse<BankEntity>> {
    try {
      const result = await this._api.remove(id as string)
      this._toast.info('ດຳເນີນການສຳເລັດ!', result.message as string)
      return result
    } catch (error: unknown) {
      new HandleException(error, this._toast)
    }
  }
}
