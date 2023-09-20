import { HandleException } from '@/framework/common/handle-exception/handle-exception'
import { Toast } from '@/framework/toast/primevue-toast/toast'
import type { IAuthenticationApi } from '@/interface-adapter/apis/authentication.api'
import type { LoginReqDTO } from '@/interface-adapter/dto/login.dto'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import type { IToast } from '@/interface-adapter/toast/toast.interface'
import type { IGUseCase } from '@/interface-adapter/use-cases/use-case.interface'
import { AuthenticationApi } from '@/use-cases/inject-token'
import { inject, singleton } from 'tsyringe'

@singleton()
export class LogoutUseCase implements IGUseCase<IResponse<string>, LoginReqDTO> {
  constructor(
    @inject(AuthenticationApi) private _api: IAuthenticationApi,
    @inject(Toast) private _toast: IToast
  ) {}

  async execute(): Promise<void | IResponse<string>> {
    try {
      const result = await this._api.logout()
      localStorage.removeItem('token')
      this._toast.success('ດຳເນີນການສຳເລັດ!', result.message as string)
      return result
    } catch (error: unknown) {
      new HandleException(error, this._toast)
    }
  }
}
