import type { CompanyEntity } from '@/entities/company.entity'
import type { ICompanyApi } from '@/interface-adapter/apis/company.api'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import { inject, singleton } from 'tsyringe'
import { AxiosApi } from './axios.api'
import { CompanyMapper } from './mapper/company.mapper'

@singleton()
export class CompanyApi implements ICompanyApi {
  constructor(
    @inject(AxiosApi) private _api: AxiosApi,
    @inject(CompanyMapper) private _mapper: CompanyMapper
  ) {}

  async getAll(
    args: IGPaginate<Pick<CompanyEntity, 'name'>>
  ): Promise<IResponse<IGPaginated<CompanyEntity>>> {
    const { page, limit, filter } = args

    const result = await this._api.sendReq({
      url: 'admin/list-companies',
      method: 'GET',
      query: { page, per_page: limit, search: filter?.name }
    })

    const data = result.data.listCompanies.data.map((item: any) => this._mapper.toEntity(item))

    return {
      data: {
        props: data,
        total: result.data.listCompanies.total
      },
      status: 'success'
    }
  }

  async create(item: CompanyEntity): Promise<IResponse<CompanyEntity>> {
    const data = this._mapper.toDTO(item)

    const formData = new FormData()
    formData.append('company_name', data.company_name)
    formData.append('email', data.email)
    formData.append('phone', data.phone)
    formData.append('address', data.address)
    formData.append('logo', data.logo)

    await this._api.sendReq({
      url: 'admin/add-company',
      data: formData,
      method: 'POST',
      isMultipart: true
    })

    return { status: 'success', message: 'ເພີ່ມຂໍ້ມູນລູກຄ້າສຳເລັດແລ້ວ' }
  }

  async update(item: CompanyEntity, id: string): Promise<IResponse<CompanyEntity>> {
    const data = this._mapper.toDTO(item)

    const formData = new FormData()
    formData.append('company_name', data.company_name)
    formData.append('email', data.email)
    formData.append('phone', data.phone)
    formData.append('address', data.address)
    formData.append('logo', data.logo)

    await this._api.sendReq({
      url: `admin/edit-company/${id}`,
      data: formData,
      method: 'POST',
      query: { _method: 'put' },
      isMultipart: true
    })

    return { status: 'success', message: 'ແກ້ໄຂຂໍ້ມູນລູກຄ້າສຳເລັດແລ້ວ' }
  }

  async remove(id: string): Promise<IResponse<CompanyEntity>> {
    await this._api.sendReq({ url: `admin/delete-company/${id}`, method: 'DELETE' })
    return { status: 'success', message: 'ລົບຂໍ້ມູນລູກຄ້າສຳເລັດແລ້ວ' }
  }
}
