import type { CustomerEntity } from '@/entities/customer.entity'
import { CustomerMapper } from '@/framework/apis/axios/mapper/customer.mapper'
import type { ICustomerApi } from '@/interface-adapter/apis/customer.api'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import { inject, singleton } from 'tsyringe'
import { AxiosApi } from './axios.api'

@singleton()
export class CustomerApi implements ICustomerApi {
  constructor(
    @inject(AxiosApi) private _api: AxiosApi,
    @inject(CustomerMapper) private _mapper: CustomerMapper
  ) {}

  async getAll(
    args: IGPaginate<Pick<CustomerEntity, 'name'>>
  ): Promise<IResponse<IGPaginated<CustomerEntity>>> {
    const { page, limit, filter } = args

    const result = await this._api.sendReq({
      url: 'admin/list-customers',
      method: 'GET',
      query: { page, per_page: limit, search: filter?.name }
    })

    const data = result.data.listCustomers.data.map((item: any) => this._mapper.toEntity(item))

    return {
      data: {
        props: data,
        total: result.data.listCustomers.total
      },
      status: 'success'
    }
  }

  async create(item: CustomerEntity): Promise<IResponse<CustomerEntity>> {
    const data = this._mapper.toDTO(item)

    const formData = new FormData()
    formData.append('company_name', data.company_name)
    formData.append('email', data.email)
    formData.append('phone', data.phone)
    formData.append('address', data.address)
    formData.append('logo', data.logo)

    await this._api.sendReq({
      url: 'admin/add-customer',
      data: formData,
      method: 'POST',
      isMultipart: true
    })

    return { status: 'success', message: 'ເພີ່ມຂໍ້ມູນລູກຄ້າສຳເລັດແລ້ວ' }
  }

  async update(item: CustomerEntity, id: string): Promise<IResponse<CustomerEntity>> {
    const data = this._mapper.toDTO(item)

    const formData = new FormData()
    formData.append('company_name', data.company_name)
    formData.append('email', data.email)
    formData.append('phone', data.phone)
    formData.append('address', data.address)
    formData.append('logo', data.logo)

    await this._api.sendReq({
      url: `admin/edit-customer/${id}`,
      data: formData,
      method: 'POST',
      query: { _method: 'put' },
      isMultipart: true
    })

    return { status: 'success', message: 'ແກ້ໄຂຂໍ້ມູນລູກຄ້າສຳເລັດແລ້ວ' }
  }

  async remove(id: string): Promise<IResponse<CustomerEntity>> {
    await this._api.sendReq({ url: `admin/delete-customer/${id}`, method: 'DELETE' })
    return { status: 'success', message: 'ລົບຂໍ້ມູນລູກຄ້າສຳເລັດແລ້ວ' }
  }
}
