import type { ItemEntity } from '@/entities/item.enttiy'
import { HandleException } from '@/framework/common/handle-exception/handle-exception'
import { Toast } from '@/framework/toast/primevue-toast/toast'
import type { IItemApi } from '@/interface-adapter/apis/item.api'
import type { ItemDTO } from '@/interface-adapter/dto/item.dto'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import type { IToast } from '@/interface-adapter/toast/toast.interface'
import type { IGUseCase } from '@/interface-adapter/use-cases/use-case.interface'
import { ItemApi } from '@/use-cases/inject-token'
import { inject, singleton } from 'tsyringe'

@singleton()
export class UpdateItemUseCase implements IGUseCase<IResponse<ItemEntity>, ItemDTO, string> {
  constructor(@inject(ItemApi) private _api: IItemApi, @inject(Toast) private _toast: IToast) {}

  async execute(input: ItemDTO, id: string): Promise<void | IResponse<ItemEntity>> {
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
