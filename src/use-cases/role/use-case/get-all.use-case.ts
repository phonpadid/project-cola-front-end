import type { RoleEntity } from '@/entities/role.entity'
import { HandleException } from '@/framework/common/handle-exception/handle-exception'
import { Toast } from '@/framework/toast/primevue-toast/toast'
import type { IRoleApi } from '@/interface-adapter/apis/role.api'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import type { IToast } from '@/interface-adapter/toast/toast.interface'
import type { IGUseCase } from '@/interface-adapter/use-cases/use-case.interface'
import { RoleApi } from '@/use-cases/inject-token'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetRoleUseCase
  implements IGUseCase<IResponse<IGPaginated<RoleEntity>>, IGPaginate<RoleEntity>>
{
  constructor(@inject(RoleApi) private _api: IRoleApi, @inject(Toast) private _toast: IToast) {}

  async execute(input: IGPaginate<RoleEntity>): Promise<void | IResponse<IGPaginated<RoleEntity>>> {
    try {
      return await this._api.getAll(input)
    } catch (error: unknown) {
      new HandleException(error, this._toast)
    }
  }
}
