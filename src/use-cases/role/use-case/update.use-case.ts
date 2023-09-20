import type { RoleEntity } from '@/entities/role.entity'
import { HandleException } from '@/framework/common/handle-exception/handle-exception'
import { Toast } from '@/framework/toast/primevue-toast/toast'
import type { IRoleApi } from '@/interface-adapter/apis/role.api'
import type { UpdateRoleDTO } from '@/interface-adapter/dto/role.dto'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import type { IToast } from '@/interface-adapter/toast/toast.interface'
import type { IGUseCase } from '@/interface-adapter/use-cases/use-case.interface'
import { RoleApi } from '@/use-cases/inject-token'
import { inject, singleton } from 'tsyringe'

@singleton()
export class UpdateRoleUseCase implements IGUseCase<IResponse<RoleEntity>, UpdateRoleDTO, string> {
  constructor(@inject(RoleApi) private _api: IRoleApi, @inject(Toast) private _toast: IToast) {}

  async execute(input: UpdateRoleDTO, id: string): Promise<void | IResponse<RoleEntity>> {
    try {
      const result = await this._api.update(id, input)
      if (result.message) {
        this._toast.success('ດຳເນີນການສຳເລັດ!', result.message)
      }
      return result
    } catch (error: any) {
      new HandleException(error, this._toast)
    }
  }
}
