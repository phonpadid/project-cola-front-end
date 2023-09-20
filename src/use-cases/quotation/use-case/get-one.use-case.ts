import type { QuotationEntity } from '@/entities/quotation.entity'
import { HandleException } from '@/framework/common/handle-exception/handle-exception'
import { Toast } from '@/framework/toast/primevue-toast/toast'
import type { IQuotationApi } from '@/interface-adapter/apis/quotation.api'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import type { IToast } from '@/interface-adapter/toast/toast.interface'
import type { IGUseCase } from '@/interface-adapter/use-cases/use-case.interface'
import { QuotationApi } from '@/use-cases/inject-token'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetOneQuotaionUseCase implements IGUseCase<IResponse<QuotationEntity>, string> {
  constructor(
    @inject(QuotationApi) private _api: IQuotationApi,
    @inject(Toast) private _toast: IToast
  ) {}

  async execute(id: string): Promise<void | IResponse<QuotationEntity>> {
    try {
      return await this._api.getOne(id)
    } catch (error: any) {
      new HandleException(error, this._toast)
    }
  }
}
