import type { RoleEntity } from '@/entities/role.entity'
import type { IRoleApi } from '@/interface-adapter/apis/role.api'
import type { CreateRoleDTO, UpdateRoleDTO } from '@/interface-adapter/dto/role.dto'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import { inject, singleton } from 'tsyringe'
import { MemoryApi } from './memory.api'

@singleton()
export class RoleMemoryApi implements IRoleApi {
  constructor(@inject(MemoryApi) private _memory: MemoryApi) {}

  async getAll(args: IGPaginate<RoleEntity>): Promise<IResponse<IGPaginated<RoleEntity>>> {
    const { page, limit, first, filter } = args
    let results = this._memory.roles
    let totals = results.length

    if (filter.company && filter.company.id) {
      results = results.filter((item) => item.company?.id === filter.company?.id)
      totals = results.length
    }

    if (filter.name) {
      results = results.filter((item) => {
        if (filter.name) return item.name.toLowerCase().includes(filter.name.toLowerCase())
      })
      totals = results.length
    }

    if (page && limit) {
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      results = results.slice(startIndex, endIndex)
    }

    if (first && limit) {
      const startIndex = first - 1
      const endIndex = startIndex + limit - 1
      results = results.slice(startIndex, endIndex)
    }

    results = results.map((result) => ({
      ...result,
      permissions: result.permissions?.map((per) => ({
        id: per.id,
        name: this._memory.permissions.find((item) => item.id === per.id)?.name
      }))
    }))

    return {
      data: { props: results, total: totals },
      status: 'success'
    }
  }

  async create(input: CreateRoleDTO): Promise<IResponse<RoleEntity>> {
    const id = String(this._memory.roles.length + 1)

    this._memory.roles.push({
      id,
      name: input.name,
      company: input.company,
      permissions: input.permissions.map((per) => ({ id: per }))
    })

    return {
      data: this._memory.roles.find((user) => user.id === id),
      message: 'ເພີ່ມບົດບາດສຳເລັດ',
      status: 'success'
    }
  }

  async update(id: string, input: UpdateRoleDTO): Promise<IResponse<RoleEntity>> {
    const role = this._memory.roles.find((role) => role.id === id)

    if (!role) throw Error('ບໍ່ມີໍຂໍ້ມູນ')

    role.name = input.name
    role.permissions = input.permissions.map((per) => ({ id: per }))

    return {
      data: role,
      message: 'ອັບເດດບົດບາດສຳເລັດ',
      status: 'success'
    }
  }

  async remove(id: string): Promise<IResponse<RoleEntity>> {
    const idx = this._memory.roles.findIndex((item) => item.id === id)

    if (!idx) {
      throw Error('ບໍ່ມີຂໍ້ມູນ')
    }

    this._memory.roles.splice(idx, 1)

    return {
      message: 'ລຶບຂໍ້ມູນບົດບາດສຳເລັດແລ້ວ',
      status: 'success'
    }
  }
}
