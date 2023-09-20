import type { RoleEntity } from '@/entities/role.entity'
import { HandleException } from '@/framework/common/handle-exception/handle-exception'
import { Toast } from '@/framework/toast/primevue-toast/toast'
import type { IRoleApi } from '@/interface-adapter/apis/role.api'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import type { IToast } from '@/interface-adapter/toast/toast.interface'
import type { IGUseCase } from '@/interface-adapter/use-cases/use-case.interface'
import { RoleApi } from '@/use-cases/inject-token'
import { inject, singleton } from 'tsyringe'

@singleton()
export class RemoveRoleUseCase implements IGUseCase<IResponse<RoleEntity>, string> {
  constructor(@inject(RoleApi) private _api: IRoleApi, @inject(Toast) private _toast: IToast) {}

  async execute(id: string): Promise<void | IResponse<RoleEntity>> {
    try {
      const result = await this._api.remove(id as string)
      this._toast.info('ດຳເນີນການສຳເລັດ!', result.message as string)
      return result
    } catch (error: unknown) {
      new HandleException(error, this._toast)
    }
  }
}
