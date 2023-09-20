import type { UserEntity } from '@/entities/user.entity'
import { HandleException } from '@/framework/common/handle-exception/handle-exception'
import { Toast } from '@/framework/toast/primevue-toast/toast'
import type { IAuthenticationApi } from '@/interface-adapter/apis/authentication.api'
import type { UpdateProfileDTO } from '@/interface-adapter/dto/user.dto'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import type { IToast } from '@/interface-adapter/toast/toast.interface'
import type { IGUseCase } from '@/interface-adapter/use-cases/use-case.interface'
import { AuthenticationApi } from '@/use-cases/inject-token'
import { inject, singleton } from 'tsyringe'

@singleton()
export class UpdateProfileUseCase implements IGUseCase<IResponse<UserEntity>, UpdateProfileDTO> {
  constructor(
    @inject(AuthenticationApi) private _api: IAuthenticationApi,
    @inject(Toast) private _toast: IToast
  ) {}

  async execute(input: UpdateProfileDTO): Promise<void | IResponse<UserEntity>> {
    try {
      const result = await this._api.updateProfile(input)
      this._toast.success('ດຳເນີນການສຳເລັດ!', result.message ? result.message : '')
      return result
    } catch (error: unknown) {
      new HandleException(error, this._toast)
    }
  }
}
