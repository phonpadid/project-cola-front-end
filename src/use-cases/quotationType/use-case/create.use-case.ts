import type { QuotationTypeEntity } from '@/entities/quotationType.entity'
import { HandleException } from '@/framework/common/handle-exception/handle-exception'
import { Toast } from '@/framework/toast/primevue-toast/toast'
import type { IQuotationTypeApi } from '@/interface-adapter/apis/quotationType.api'
import type { QuotationTypeDTO } from '@/interface-adapter/dto/quotationType.dto'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import type { IToast } from '@/interface-adapter/toast/toast.interface'
import type { IGUseCase } from '@/interface-adapter/use-cases/use-case.interface'
import { QuotationTypeApi } from '@/use-cases/inject-token'
import { inject, singleton } from 'tsyringe'

@singleton()
export class CreateQuotationTypeUseCase
  implements IGUseCase<IResponse<QuotationTypeEntity>, QuotationTypeDTO>
{
  constructor(
    @inject(QuotationTypeApi) private _api: IQuotationTypeApi,
    @inject(Toast) private _toast: IToast
  ) {}

  async execute(input: QuotationTypeDTO): Promise<void | IResponse<QuotationTypeEntity>> {
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
