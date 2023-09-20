import type { UserEntity } from '@/entities/user.entity'
import { HandleException } from '@/framework/common/handle-exception/handle-exception'
import { Toast } from '@/framework/toast/primevue-toast/toast'
import type { IUserApi } from '@/interface-adapter/apis/user.api'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import type { IToast } from '@/interface-adapter/toast/toast.interface'
import type { IGUseCase } from '@/interface-adapter/use-cases/use-case.interface'
import { UserApi } from '@/use-cases/inject-token'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetUserUseCase
  implements
    IGUseCase<IResponse<IGPaginated<UserEntity>>, IGPaginate<Pick<UserEntity, 'name' | 'company'>>>
{
  constructor(@inject(UserApi) private _api: IUserApi, @inject(Toast) private _toast: IToast) {}

  async execute(
    args: IGPaginate<Pick<UserEntity, 'name' | 'company'>>
  ): Promise<void | IResponse<IGPaginated<UserEntity>>> {
    try {
      return await this._api.getAll(args)
    } catch (error: any) {
      new HandleException(error, this._toast)
    }
  }
}
