import type { UserEntity } from '@/entities/user.entity'
import type { UserDTO } from '@/interface-adapter/dto/user.dto'
import type { IGPaginate, IGPaginated } from '@/interface-adapter/interfaces/pagination.interface'
import type { IResponse } from '@/interface-adapter/interfaces/response.interface'
import { inject, singleton } from 'tsyringe'
import { CreateUserUseCase } from './use-case/create.use-case'
import { GetUserUseCase } from './use-case/get-all.use-case'
import { GetOneUserUseCase } from './use-case/get-one.use-case'
import { RemoveUserUseCase } from './use-case/remove.use-case'
import { UpdateUserUseCase } from './use-case/update.use-case'

@singleton()
export class UserService {
  constructor(
    @inject(GetUserUseCase) private _getAll: GetUserUseCase,
    @inject(CreateUserUseCase) private _create: CreateUserUseCase,
    @inject(UpdateUserUseCase) private _update: UpdateUserUseCase,
    @inject(GetOneUserUseCase) private _getOne: GetOneUserUseCase,
    @inject(RemoveUserUseCase) private _remove: RemoveUserUseCase
  ) {}

  async getAll(
    input: IGPaginate<Pick<UserEntity, 'name' | 'company'>>
  ): Promise<void | IResponse<IGPaginated<UserEntity>>> {
    return await this._getAll.execute(input)
  }

  async create(input: UserDTO): Promise<void | IResponse<UserEntity>> {
    return await this._create.execute(input)
  }

  async getOne(id: string): Promise<void | IResponse<UserEntity>> {
    return await this._getOne.execute(id)
  }

  async update(id: string, input: UserDTO): Promise<void | IResponse<UserEntity>> {
    return await this._update.execute(input, id)
  }

  async remove(Id: string): Promise<void | IResponse<UserEntity>> {
    return await this._remove.execute(Id)
  }
}
