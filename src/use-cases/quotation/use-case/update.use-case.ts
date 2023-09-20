import type { QuotationEntity } from '@/entities/quotation.entity'
import { HandleException } from '@/framework/common/handle-exception/handle-exception'
import { Toast } from '@/framework/toast/primevue-toast/toast'
import type { IQuotationApi } from '@/interface-adapter/apis/quotation.api'
import type { UpdateQuotationDTO } from '@/interface-adapter/dto/quotation.dto'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import type { IToast } from '@/interface-adapter/toast/toast.interface'
import type { IGUseCase } from '@/interface-adapter/use-cases/use-case.interface'
import { QuotationApi } from '@/use-cases/inject-token'
import { inject, singleton } from 'tsyringe'

@singleton()
export class UpdateQuotationUseCase
  implements IGUseCase<IResponse<QuotationEntity> | void, UpdateQuotationDTO, string>
{
  constructor(
    @inject(QuotationApi) private _api: IQuotationApi,
    @inject(Toast) private _toast: IToast
  ) {}

  async execute(input: UpdateQuotationDTO, id: string): Promise<void | IResponse<QuotationEntity>> {
    try {
      const result = await this._api.update(input, id)

      if (result.message) {
        this._toast.success('ດຳເນີນການສຳເລັດ!', result.message)
      }

      return result
    } catch (error: any) {
      new HandleException(error, this._toast)
    }
  }
}
