import type { QuotationTypeEntity } from '@/entities/quotationType.entity'
import { HandleException } from '@/framework/common/handle-exception/handle-exception'
import { Toast } from '@/framework/toast/primevue-toast/toast'
import type { IQuotationTypeApi } from '@/interface-adapter/apis/quotationType.api'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import type { IToast } from '@/interface-adapter/toast/toast.interface'
import type { IGUseCase } from '@/interface-adapter/use-cases/use-case.interface'
import { QuotationTypeApi } from '@/use-cases/inject-token'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAllQuotationTypeUseCase
  implements
    IGUseCase<
      IResponse<IGPaginated<QuotationTypeEntity>>,
      IGPaginate<Pick<QuotationTypeEntity, 'name'>>
    >
{
  constructor(
    @inject(QuotationTypeApi) private _api: IQuotationTypeApi,
    @inject(Toast) private _toast: IToast
  ) {}

  async execute(
    input: IGPaginate<Pick<QuotationTypeEntity, 'name'>>
  ): Promise<void | IResponse<IGPaginated<QuotationTypeEntity>>> {
    try {
      return await this._api.getAll(input)
    } catch (error: any) {
      new HandleException(error, this._toast)
    }
  }
}
