import type { QuotationEntity, QuotationStatus } from '@/entities/quotation.entity'
import { HandleException } from '@/framework/common/handle-exception/handle-exception'
import { Toast } from '@/framework/toast/primevue-toast/toast'
import type { IQuotationApi } from '@/interface-adapter/apis/quotation.api'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import type { IToast } from '@/interface-adapter/toast/toast.interface'
import type { IGUseCase } from '@/interface-adapter/use-cases/use-case.interface'
import { QuotationApi } from '@/use-cases/inject-token'
import { inject, singleton } from 'tsyringe'

@singleton()
export class ChangeStatusQuotationUseCase
  implements IGUseCase<IResponse<QuotationEntity> | void, QuotationStatus, string>
{
  constructor(
    @inject(QuotationApi) private _api: IQuotationApi,
    @inject(Toast) private _toast: IToast
  ) {}

  async execute(input: QuotationStatus, id: string): Promise<void | IResponse<QuotationEntity>> {
    try {
      const result = await this._api.changeStatus(id, input)

      if (result.message) {
        this._toast.success('ດຳເນີນການສຳເລັດ!', result.message)
      }

      return result
    } catch (error: any) {
      new HandleException(error, this._toast)
    }
  }
}
