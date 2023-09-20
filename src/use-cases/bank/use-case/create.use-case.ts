import type { BankEntity } from '@/entities/bank.entity'
import { HandleException } from '@/framework/common/handle-exception/handle-exception'
import { Toast } from '@/framework/toast/primevue-toast/toast'
import type { IBankApi } from '@/interface-adapter/apis/bank.api'
import type { BankDTO } from '@/interface-adapter/dto/bank.dto'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import type { IToast } from '@/interface-adapter/toast/toast.interface'
import type { IGUseCase } from '@/interface-adapter/use-cases/use-case.interface'
import { BankApi } from '@/use-cases/inject-token'
import { inject, singleton } from 'tsyringe'

@singleton()
export class CreateBankUseCase implements IGUseCase<IResponse<BankEntity>, BankDTO> {
  constructor(@inject(BankApi) private _api: IBankApi, @inject(Toast) private _toast: IToast) {}

  async execute(input: BankDTO): Promise<void | IResponse<BankEntity>> {
    try {
      const result = await this._api.create(input)
      if (result.message) {
        this._toast.success('ດຳເນີນການສຳເລັດ!', result.message)
      }
      return result
    } catch (error: any) {
      new HandleException(error, this._toast)
    }
  }
}
