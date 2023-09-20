import type { CustomerEntity } from '@/entities/customer.entity'
import { HandleException } from '@/framework/common/handle-exception/handle-exception'
import { Toast } from '@/framework/toast/primevue-toast/toast'
import type { ICustomerApi } from '@/interface-adapter/apis/customer.api'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import type { IToast } from '@/interface-adapter/toast/toast.interface'
import type { IGUseCase } from '@/interface-adapter/use-cases/use-case.interface'
import { CustomerApi } from '@/use-cases/inject-token'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAllCustomerUseCase
  implements
    IGUseCase<IResponse<IGPaginated<CustomerEntity>>, IGPaginate<Pick<CustomerEntity, 'name'>>>
{
  constructor(
    @inject(CustomerApi) private _api: ICustomerApi,
    @inject(Toast) private _toast: IToast
  ) {}

  async execute(
    input: IGPaginate<Pick<CustomerEntity, 'name'>>
  ): Promise<void | IResponse<IGPaginated<CustomerEntity>>> {
    try {
      return await this._api.getAll(input)
    } catch (error: any) {
      new HandleException(error, this._toast)
    }
  }
}
