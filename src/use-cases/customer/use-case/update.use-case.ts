import type { CustomerEntity } from '@/entities/customer.entity'
import { HandleException } from '@/framework/common/handle-exception/handle-exception'
import { Toast } from '@/framework/toast/primevue-toast/toast'
import type { ICustomerApi } from '@/interface-adapter/apis/customer.api'
import type { CustomerDTO } from '@/interface-adapter/dto/customer.dto'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import type { IToast } from '@/interface-adapter/toast/toast.interface'
import type { IGUseCase } from '@/interface-adapter/use-cases/use-case.interface'
import { CustomerApi } from '@/use-cases/inject-token'
import { inject, singleton } from 'tsyringe'

@singleton()
export class UpdateCustomerUseCase
  implements IGUseCase<IResponse<CustomerEntity>, CustomerDTO, string>
{
  constructor(
    @inject(CustomerApi) private _api: ICustomerApi,
    @inject(Toast) private _toast: IToast
  ) {}

  async execute(input: CustomerDTO, id: string): Promise<void | IResponse<CustomerEntity>> {
    try {
      const result = await this._api.update(input, id)
      this._toast.success('ດຳເນີນການສຳເລັດ!', result.message as string)
      return result
    } catch (error: any) {
      new HandleException(error, this._toast)
    }
  }
}
