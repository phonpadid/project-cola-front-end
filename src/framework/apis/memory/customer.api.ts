import type { CustomerEntity } from '@/entities/customer.entity'
import type { ICustomerApi } from '@/interface-adapter/apis/customer.api'
import type { CustomerDTO } from '@/interface-adapter/dto/customer.dto'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import { inject, singleton } from 'tsyringe'
import { MemoryApi } from './memory.api'

@singleton()
export class CustomerMemoryApi implements ICustomerApi {
  constructor(@inject(MemoryApi) private _memory: MemoryApi) {}

  async getAll(
    args: IGPaginate<Pick<CustomerEntity, 'name'>>
  ): Promise<IResponse<IGPaginated<CustomerEntity>>> {
    const { page, limit, filter, first } = args
    let totals = this._memory.customers.length
    let result = this._memory.customers

    if (filter?.name) {
      result = result.filter((item) => {
        if (filter?.name) return item.name?.toLowerCase().includes(filter?.name.toLowerCase())
      })
      totals = result.length
    }

    if (page && limit) {
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      result = result.slice(startIndex, endIndex)
    }

    if (first && limit) {
      const startIndex = first - 1
      const endIndex = startIndex + limit - 1
      result = result.slice(startIndex, endIndex)
    }

   
    return {
      data: { props: result, total: totals },
      status: 'success'
    }
  }

  async getOne(id: string): Promise<IResponse<CustomerEntity>> {
    const data = this._memory.customers.find((item) => item.id === id)

    return {
      data,
      status: 'success'
    }
  }

  async create(item: CustomerDTO): Promise<IResponse<CustomerEntity>> {
    const customerId = String(this._memory.customers.length + 1)

    this._memory.customers.push({
      id: customerId,
      name: item.name,
      email: item.email,
      phone: item.phone,
      address: item.address,
      logo: item.logo ? item.logo.objectURL : undefined
    })

    const data = this._memory.company.find((item) => item.id === customerId)

    return {
      data,
      message: 'ເພີ່ມຂໍ້ມູນລູກຄ້າສຳເລັດແລ້ວ',
      status: 'success'
    }
  }

  async update(item: CustomerDTO, id: string): Promise<IResponse<CustomerEntity>> {
    const customer = this._memory.customers.find((item) => item.id === id)

    if (!customer) {
      throw Error('ບໍ່ມິຂໍ້ມູນ')
    }

    if (customer.logo) {
      customer.logo = item.logo ? item.logo.objectURL : customer.logo
    } else {
      if (item.logo) customer.logo = item.logo.objectURL
    }
    customer.name = item.name
    customer.email = item.email
    customer.address = item.address
    customer.phone = item.phone

    return {
      data: customer,
      status: 'success',
      message: 'ອັບເດດຂໍ້ມູນລູກຄ້າສຳເລັດແລ້ວ'
    }
  }

  async remove(id: string): Promise<IResponse<CustomerEntity>> {
    const idx = this._memory.customers.findIndex((item) => item.id === id)

    if (!idx && idx !== 0) {
      throw Error('ບໍ່ມີຂໍ້ມູນ')
    }

    this._memory.customers.splice(idx, 1)

    return {
      message: 'ລຶບຂໍ້ມູນລູກຄ້າສຳເລັດແລ້ວ',
      status: 'success'
    }
  }
}
