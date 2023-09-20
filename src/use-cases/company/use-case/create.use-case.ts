import type { CompanyEntity } from '@/entities/company.entity'
import { HandleException } from '@/framework/common/handle-exception/handle-exception'
import { Toast } from '@/framework/toast/primevue-toast/toast'
import type { ICompanyApi } from '@/interface-adapter/apis/company.api'
import type { CreateCompanyDTO } from '@/interface-adapter/dto/company.dto'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import type { IToast } from '@/interface-adapter/toast/toast.interface'
import type { IGUseCase } from '@/interface-adapter/use-cases/use-case.interface'
import { CompanyApi } from '@/use-cases/inject-token'
import { inject, singleton } from 'tsyringe'

@singleton()
export class CreateCompanyUseCase implements IGUseCase<IResponse<CompanyEntity>, CreateCompanyDTO> {
  constructor(
    @inject(CompanyApi) private _api: ICompanyApi,
    @inject(Toast) private _toast: IToast
  ) {}

  async execute(input: CreateCompanyDTO): Promise<void | IResponse<CompanyEntity>> {
    try {
      const result = await this._api.create(input)
      this._toast.success('ດຳເນີນການສຳເລັດ!', result.message as string)
      return result
    } catch (error: any) {
      new HandleException(error, this._toast)
    }
  }
}
