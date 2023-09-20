import type { CompanyEntity } from '@/entities/company.entity'
import { HandleException } from '@/framework/common/handle-exception/handle-exception'
import { Toast } from '@/framework/toast/primevue-toast/toast'
import type { ICompanyApi } from '@/interface-adapter/apis/company.api'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import type { IToast } from '@/interface-adapter/toast/toast.interface'
import type { IGUseCase } from '@/interface-adapter/use-cases/use-case.interface'
import { CompanyApi } from '@/use-cases/inject-token'
import { inject, singleton } from 'tsyringe'

@singleton()
export class RemoveCompanyUseCase implements IGUseCase<IResponse<CompanyEntity>, string> {
  constructor(
    @inject(CompanyApi) private _api: ICompanyApi,
    @inject(Toast) private _toast: IToast
  ) {}

  async execute(Id: string): Promise<void | IResponse<CompanyEntity>> {
    try {
      const result = await this._api.remove(Id as string)
      this._toast.info('ດຳເນີນການສຳເລັດ!', result.message as string)
      return result
    } catch (error: any) {
      new HandleException(error, this._toast)
    }
  }
}
