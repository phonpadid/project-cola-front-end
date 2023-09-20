import type { UserEntity } from '@/entities/user.entity'
import { HandleException } from '@/framework/common/handle-exception/handle-exception'
import { Toast } from '@/framework/toast/primevue-toast/toast'
import type { IUserApi } from '@/interface-adapter/apis/user.api'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import type { IToast } from '@/interface-adapter/toast/toast.interface'
import type { IGUseCase } from '@/interface-adapter/use-cases/use-case.interface'
import { UserApi } from '@/use-cases/inject-token'
import { inject, singleton } from 'tsyringe'

@singleton()
export class RemoveUserUseCase implements IGUseCase<IResponse<UserEntity>, string> {
  constructor(@inject(UserApi) private _api: IUserApi, @inject(Toast) private _toast: IToast) {}

  async execute(Id: string): Promise<void | IResponse<UserEntity>> {
    try {
      const result = await this._api.remove(Id as string)
      this._toast.info('ດຳເນີນການສຳເລັດ!', result.message as string)
      return result
    } catch (error: unknown) {
      new HandleException(error, this._toast)
    }
  }
}
