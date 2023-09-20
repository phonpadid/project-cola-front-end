import type { UserEntity } from '@/entities/user.entity'
import type { UserDTO } from '../dto/user.dto'
import type { IGPaginate, IGPaginated } from '../interfaces/pagination.interface'
import type { IResponse } from '../interfaces/response.interface'

export interface IUserApi {
  getAll(
    args: IGPaginate<Pick<UserEntity, 'name' | 'company'>>
  ): Promise<IResponse<IGPaginated<UserEntity>>>

  create(input: UserDTO): Promise<IResponse<UserEntity>>

  getOne(id: string): Promise<IResponse<UserEntity>>

  update(id: string, input: UserDTO): Promise<IResponse<UserEntity>>

  remove(id: string): Promise<IResponse<UserEntity>>
}
