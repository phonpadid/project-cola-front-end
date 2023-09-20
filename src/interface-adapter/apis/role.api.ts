import type { RoleEntity } from '@/entities/role.entity'
import type { CreateRoleDTO, UpdateRoleDTO } from '../dto/role.dto'
import type { IGPaginate, IGPaginated } from '../interfaces/pagination.interface'
import type { IResponse } from '../interfaces/response.interface'

export interface IRoleApi {
  getAll(args: IGPaginate<RoleEntity>): Promise<IResponse<IGPaginated<RoleEntity>>>

  create(input: CreateRoleDTO): Promise<IResponse<RoleEntity>>

  update(id: string, input: UpdateRoleDTO): Promise<IResponse<RoleEntity>>

  remove(id: string): Promise<IResponse<RoleEntity>>
}
