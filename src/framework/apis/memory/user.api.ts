import type { UserEntity } from '@/entities/user.entity'
import type { IUserApi } from '@/interface-adapter/apis/user.api'
import type { UserDTO } from '@/interface-adapter/dto/user.dto'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import { inject, singleton } from 'tsyringe'
import { MemoryApi } from './memory.api'

@singleton()
export class UserMemoryApi implements IUserApi {
  constructor(@inject(MemoryApi) private _memory: MemoryApi) {}

  async getAll(
    args: IGPaginate<Pick<UserEntity, 'name' | 'company'>>
  ): Promise<IResponse<IGPaginated<UserEntity>>> {
    const { page, limit, filter } = args
    let userCompany = this._memory.users
    let totals = userCompany.length

    if (filter.company && filter.company.id) {
      userCompany = userCompany.filter((item) => item.company?.id === filter.company?.id)
      totals = userCompany.length
    }

    if (filter.name) {
      userCompany = userCompany.filter((item) => {
        if (filter.name) return item.name.toLowerCase().includes(filter.name.toLowerCase())
      })
      totals = userCompany.length
    }

    if (page && limit) {
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      userCompany = userCompany.slice(startIndex, endIndex)
    }

    userCompany.forEach((company) => {
      const _companyRole = this._memory.roles.find((role) => role.id === company.role.id)
      if (_companyRole) {
        company.role = _companyRole
      }
    })

    return {
      data: { props: userCompany, total: totals },
      status: 'success'
    }
  }

  async create(input: UserDTO): Promise<IResponse<UserEntity>> {
    const id = String(this._memory.users.length + 1)

    this._memory.users.push({
      id,
      name: input.name,
      email: input.email,
      tel: input.tel,
      password: input.password,
      profile: input.profile?.objectURL,
      role: {
        id: input.role.id
      },
      company: {
        id: input.company?.id
      },
      createdAt: new Date()
    })

    return {
      data: this._memory.users.find((user) => user.id === id),
      message: 'ເພີ່ມຜູ້ໃຊ້ສຳເລັດ',
      status: 'success'
    }
  }

  async getOne(id: string): Promise<IResponse<UserEntity>> {
    const user = this._memory.users.find((user) => user.id === id)

    if (!user) throw Error('ບໍ່ມີໍຂໍ້ມູນ')

    return {
      data: user,
      status: 'success'
    }
  }

  async update(id: string, input: UserDTO): Promise<IResponse<UserEntity>> {
    const user = this._memory.users.find((user) => user.id === id)

    if (!user) throw Error('ບໍ່ມີໍຂໍ້ມູນ')

    user.name = input.name
    user.email = input.email
    user.tel = input.tel
    user.password = input.password
    if (input.profile) {
      user.profile = input.profile.objectURL
    }
    user.role = {
      id: input.role.id
    }

    return {
      data: user,
      message: 'ອັບເດດຜູ້ໃຊ້ສຳເລັດ',
      status: 'success'
    }
  }

  async remove(id: string): Promise<IResponse<UserEntity>> {
    const idx = this._memory.users.findIndex((item) => item.id === id)

    if (!idx) {
      throw Error('ບໍ່ມີຂໍ້ມູນ')
    }

    this._memory.users.splice(idx, 1)

    return {
      message: 'ລຶບຂໍ້ມູນຜູ້ໃຊ້ສຳເລັດແລ້ວ',
      status: 'success'
    }
  }
}
