import type { RoleEntity } from '@/entities/role.entity'
import type { CreateRoleDTO, UpdateRoleDTO } from '@/interface-adapter/dto/role.dto'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import { inject, singleton } from 'tsyringe'
import { CreateRoleUseCase } from './use-case/create.use-case'
import { GetRoleUseCase } from './use-case/get-all.use-case'
import { RemoveRoleUseCase } from './use-case/remove.use-case'
import { UpdateRoleUseCase } from './use-case/update.use-case'

@singleton()
export class RoleService {
  constructor(
    @inject(GetRoleUseCase) private _getAll: GetRoleUseCase,
    @inject(CreateRoleUseCase) private _create: CreateRoleUseCase,
    @inject(UpdateRoleUseCase) private _update: UpdateRoleUseCase,
    @inject(RemoveRoleUseCase) private _remove: RemoveRoleUseCase
  ) {}

  async getAll(input: IGPaginate<RoleEntity>): Promise<void | IResponse<IGPaginated<RoleEntity>>> {
    return await this._getAll.execute(input)
  }

  async create(input: CreateRoleDTO): Promise<void | IResponse<RoleEntity>> {
    return await this._create.execute(input)
  }

  async update(id: string, input: UpdateRoleDTO): Promise<void | IResponse<RoleEntity>> {
    return await this._update.execute(input, id)
  }

  async remove(id: string): Promise<void | IResponse<RoleEntity>> {
    return await this._remove.execute(id)
  }
}
