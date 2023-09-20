import type { CompanyEntity } from '@/entities/company.entity'
import type { ICompanyApi } from '@/interface-adapter/apis/company.api'
import type { CreateCompanyDTO, UpdateCompanyDTO } from '@/interface-adapter/dto/company.dto'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import { inject, singleton } from 'tsyringe'
import { MemoryApi } from './memory.api'

@singleton()
export class CompanyMemoryApi implements ICompanyApi {
  constructor(@inject(MemoryApi) private _memory: MemoryApi) {}

  async getAll(
    args: IGPaginate<Pick<CompanyEntity, 'name'>>
  ): Promise<IResponse<IGPaginated<CompanyEntity>>> {
    const { page, limit, filter, first } = args
    let totals = this._memory.company.length
    let result = this._memory.company

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

  async create(item: CreateCompanyDTO): Promise<IResponse<CompanyEntity>> {
    const companyId = String(this._memory.company.length + 1)
    const userId = String(this._memory.users.length + 1)

    this._memory.company.push({
      id: companyId,
      name: item.name,
      email: item.email,
      phone: item.phone,
      address: item.address,
      logo: item.logo ? item.logo.objectURL : undefined,
      users: [
        {
          id: userId
        }
      ]
    })

    this._memory.users.push({
      id: userId,
      name: item.user ? item.user?.username : '',
      email: item.email,
      password: item.user ? item.user?.password : '',
      profile: item.user ? item.user?.profile?.objectURL : undefined,
      role: { id: '2' },
      createdAt: new Date(),
      company: { id: companyId }
    })

    const data = this._memory.company.find((item) => item.id === companyId)

    return {
      data,
      message: 'ເພີ່ມຂໍ້ມູນບໍລິສັດສຳເລັດແລ້ວ',
      status: 'success'
    }
  }

  async getOne(id: string): Promise<IResponse<CompanyEntity>> {
    const result = this._memory.company.find((company) => company.id === id)

    return {
      data: result,
      status: 'success'
    }
  }

  async update(item: UpdateCompanyDTO, id: string): Promise<IResponse<CompanyEntity>> {
    const company = this._memory.company.find((item) => item.id === id)

    if (!company) {
      throw Error('ບໍ່ມິຂໍ້ມູນ')
    }

    if (company.logo) {
      company.logo = item.logo ? item.logo.objectURL : company.logo
    } else {
      if (item.logo) company.logo = item.logo.objectURL
    }
    company.name = item.name
    company.email = item.email
    company.address = item.address
    company.phone = item.phone

    return {
      data: company,
      status: 'success',
      message: 'ອັບເດດຂໍ້ມູນບໍລິສັດສຳເລັດແລ້ວ'
    }
  }

  async remove(id: string): Promise<IResponse<CompanyEntity>> {
    const idx = this._memory.company.findIndex((item) => item.id === id)

    if (!idx && idx !== 0) {
      throw Error('ບໍ່ມີຂໍ້ມູນ')
    }

    this._memory.company.splice(idx, 1)

    return {
      message: 'ລຶບຂໍ້ມູນບໍລິສັດສຳເລັດແລ້ວ',
      status: 'success'
    }
  }
}
