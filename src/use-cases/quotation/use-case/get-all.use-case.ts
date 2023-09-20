import { HandleException } from '@/framework/common/handle-exception/handle-exception'
import { Toast } from '@/framework/toast/primevue-toast/toast'
import type { IQuotationApi } from '@/interface-adapter/apis/quotation.api'
import type { GetAllQuotationDTO, QueryQuotationDTO } from '@/interface-adapter/dto/quotation.dto'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import type { IToast } from '@/interface-adapter/toast/toast.interface'
import type { IGUseCase } from '@/interface-adapter/use-cases/use-case.interface'
import { QuotationApi } from '@/use-cases/inject-token'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAllQuotationUseCase
  implements IGUseCase<IResponse<IGPaginated<GetAllQuotationDTO>>, IGPaginate<QueryQuotationDTO>>
{
  constructor(
    @inject(QuotationApi) private _api: IQuotationApi,
    @inject(Toast) private _toast: IToast
  ) {}
  async execute(
    input: IGPaginate<QueryQuotationDTO>
  ): Promise<void | IResponse<IGPaginated<GetAllQuotationDTO>>> {
    try {
      return await this._api.getAll(input)
    } catch (error: any) {
      new HandleException(error, this._toast)
    }
  }
}
