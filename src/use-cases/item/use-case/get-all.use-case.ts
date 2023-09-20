import type { ItemEntity } from '@/entities/item.enttiy'
import { HandleException } from '@/framework/common/handle-exception/handle-exception'
import { Toast } from '@/framework/toast/primevue-toast/toast'
import type { IItemApi } from '@/interface-adapter/apis/item.api'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import type { IToast } from '@/interface-adapter/toast/toast.interface'
import type { IGUseCase } from '@/interface-adapter/use-cases/use-case.interface'
import { ItemApi } from '@/use-cases/inject-token'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAllItemUseCase
  implements
    IGUseCase<IResponse<IGPaginated<ItemEntity>>, IGPaginate<Pick<ItemEntity, 'quotation'>>>
{
  constructor(@inject(ItemApi) private _api: IItemApi, @inject(Toast) private _toast: IToast) {}

  async execute(
    input: IGPaginate<Pick<ItemEntity, 'quotation'>>
  ): Promise<void | IResponse<IGPaginated<ItemEntity>>> {
    try {
      return await this._api.getAll(input)
    } catch (error: any) {
      new HandleException(error, this._toast)
    }
  }
}
