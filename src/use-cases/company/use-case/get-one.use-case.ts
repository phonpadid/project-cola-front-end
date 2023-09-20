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
export class GetOneCompanyUseCase implements IGUseCase<IResponse<CompanyEntity>, string> {
  constructor(
    @inject(CompanyApi) private _api: ICompanyApi,
    @inject(Toast) private _toast: IToast
  ) {}


  async execute(input: string): Promise<void | IResponse<CompanyEntity>> {
    try {
      return await this._api.getOne(input)
    } catch (error: any) {
      new HandleException(error, this._toast)
    }
  }
}
