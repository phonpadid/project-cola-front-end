import { HandleException } from '@/framework/common/handle-exception/handle-exception'
import { Toast } from '@/framework/toast/primevue-toast/toast'
import type { IAuthenticationApi } from '@/interface-adapter/apis/authentication.api'
import type { LoginReqDTO, LoginResDTO } from '@/interface-adapter/dto/login.dto'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import type { IToast } from '@/interface-adapter/toast/toast.interface'
import type { IGUseCase } from '@/interface-adapter/use-cases/use-case.interface'
import { AuthenticationApi } from '@/use-cases/inject-token'
import { inject, singleton } from 'tsyringe'

@singleton()
export class AuthenticationUseCase implements IGUseCase<IResponse<LoginResDTO>, LoginReqDTO> {
  constructor(
    @inject(AuthenticationApi) private _api: IAuthenticationApi,
    @inject(Toast) private _toast: IToast
  ) {}

  async execute(input: LoginReqDTO): Promise<void | IResponse<LoginResDTO>> {
    try {
      const result = await this._api.login(input)
      localStorage.setItem('token', result.data?.token as string)
      this._toast.success('ດຳເນີນການສຳເລັດ!', result.message as string)
      return result
    } catch (error: unknown) {
      new HandleException(error, this._toast)
    }
  }
}
